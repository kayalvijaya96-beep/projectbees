-- ProjectBee Migration: 20261110000003_functions_and_triggers.sql
-- Description: Business Invariants, Atomic Checkout Function, Single Super Admin Trigger, and Search Indexing

-- 1. Single Super Admin Invariant Enforcement Trigger
CREATE OR REPLACE FUNCTION check_super_admin_mutation()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_active_super_admins INT;
BEGIN
  -- If attempting to deactivate, suspend, or revoke super admin flag
  IF (TG_OP = 'UPDATE') THEN
    IF (OLD.is_super_admin = TRUE AND (NEW.is_super_admin = FALSE OR NEW.status != 'active')) THEN
      SELECT COUNT(*) INTO v_active_super_admins 
      FROM admin_accounts 
      WHERE is_super_admin = TRUE AND status = 'active' AND user_id != OLD.user_id;

      IF v_active_super_admins = 0 THEN
        RAISE EXCEPTION 'CANNOT_REMOVE_LAST_SUPER_ADMIN: Exactly one active Super Admin must always exist on the platform.';
      END IF;
    END IF;
  ELSIF (TG_OP = 'DELETE') THEN
    IF OLD.is_super_admin = TRUE THEN
      SELECT COUNT(*) INTO v_active_super_admins 
      FROM admin_accounts 
      WHERE is_super_admin = TRUE AND status = 'active' AND user_id != OLD.user_id;

      IF v_active_super_admins = 0 THEN
        RAISE EXCEPTION 'CANNOT_DELETE_LAST_SUPER_ADMIN: Exactly one active Super Admin must always exist on the platform.';
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_protect_super_admin ON admin_accounts;
CREATE TRIGGER trg_protect_super_admin
  BEFORE UPDATE OR DELETE ON admin_accounts
  FOR EACH ROW EXECUTE FUNCTION check_super_admin_mutation();

-- 2. Full Text Search Vector Generation on Products
CREATE OR REPLACE FUNCTION update_product_search_vector()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.short_description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.sku, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.full_description, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_product_search_vector ON products;
CREATE TRIGGER trg_product_search_vector
  BEFORE INSERT OR UPDATE OF title, short_description, full_description, sku ON products
  FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();

-- 3. Atomic COD Order Creation RPC Function
-- Executes inside a single atomic database transaction
CREATE OR REPLACE FUNCTION place_cod_order(
  p_checkout_intent_id UUID,
  p_idempotency_key VARCHAR
)
RETURNS JSONB SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_intent RECORD;
  v_user_id UUID := auth.uid();
  v_order_id UUID;
  v_order_number VARCHAR;
  v_item RECORD;
  v_avail_qty INT;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'UNAUTHENTICATED: Authentication required to place order.';
  END IF;

  -- 1. Check idempotency: Return existing order if already submitted
  SELECT id, order_number INTO v_order_id, v_order_number 
  FROM orders 
  WHERE idempotency_key = p_idempotency_key;

  IF v_order_id IS NOT NULL THEN
    RETURN jsonb_build_object(
      'order_id', v_order_id,
      'order_number', v_order_number,
      'status', 'existing'
    );
  END IF;

  -- 2. Fetch and lock checkout intent
  SELECT * INTO v_intent 
  FROM checkout_intents 
  WHERE id = p_checkout_intent_id AND user_id = v_user_id
  FOR UPDATE;

  IF v_intent.id IS NULL THEN
    RAISE EXCEPTION 'NOT_FOUND: Checkout intent does not exist or does not belong to user.';
  END IF;

  IF v_intent.status != 'otp_verified' THEN
    RAISE EXCEPTION 'VALIDATION_ERROR: WhatsApp OTP verification has not been completed.';
  END IF;

  IF v_intent.expires_at < NOW() THEN
    RAISE EXCEPTION 'OTP_EXPIRED: Checkout intent has expired. Please re-initiate checkout.';
  END IF;

  -- 3. Generate sequential order number (e.g. PB-202611-00123)
  v_order_number := 'PB-' || to_char(NOW(), 'YYYYMM') || '-' || lpad((floor(random() * 90000 + 10000)::text), 5, '0');

  -- 4. Verify stock and deduct atomically
  FOR v_item IN SELECT * FROM jsonb_to_recordset(v_intent.items_snapshot) 
    AS x(product_id UUID, title TEXT, sku TEXT, selling_price NUMERIC, quantity INT, line_total NUMERIC)
  LOOP
    -- Atomically deduct inventory
    UPDATE inventory 
    SET available_quantity = available_quantity - v_item.quantity,
        updated_at = NOW()
    WHERE product_id = v_item.product_id 
      AND available_quantity >= v_item.quantity;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'OUT_OF_STOCK: Product "%" is currently out of stock or requested quantity unavailable.', v_item.title;
    END IF;

    -- Record stock movement ledger
    INSERT INTO stock_movements (
      product_id,
      movement_type,
      quantity_delta,
      reason,
      actor_id,
      reference_type,
      reference_id
    ) VALUES (
      v_item.product_id,
      'order_placed',
      -v_item.quantity,
      'COD Order ' || v_order_number,
      v_user_id,
      'order',
      NULL
    );
  END LOOP;

  -- 5. Insert Order
  INSERT INTO orders (
    order_number,
    user_id,
    checkout_intent_id,
    address_snapshot,
    guardian_contact_name,
    phone_snapshot,
    subtotal,
    shipping_amount,
    total_amount,
    payment_method,
    payment_status,
    order_status,
    idempotency_key
  ) VALUES (
    v_order_number,
    v_user_id,
    v_intent.id,
    v_intent.address_snapshot,
    v_intent.address_snapshot->>'guardian_contact_name',
    v_intent.phone,
    v_intent.subtotal,
    v_intent.shipping_amount,
    v_intent.total_amount,
    'COD',
    'unpaid',
    'pending_confirmation',
    p_idempotency_key
  ) RETURNING id INTO v_order_id;

  -- 6. Insert Order Items from snapshot
  FOR v_item IN SELECT * FROM jsonb_to_recordset(v_intent.items_snapshot) 
    AS x(product_id UUID, title TEXT, sku TEXT, selling_price NUMERIC, quantity INT, line_total NUMERIC)
  LOOP
    INSERT INTO order_items (
      order_id,
      product_id,
      sku_snapshot,
      title_snapshot,
      unit_price_snapshot,
      quantity,
      line_total
    ) VALUES (
      v_order_id,
      v_item.product_id,
      v_item.sku,
      v_item.title,
      v_item.selling_price,
      v_item.quantity,
      v_item.line_total
    );
  END LOOP;

  -- 7. Update status of checkout intent and clear customer cart
  UPDATE checkout_intents SET status = 'completed' WHERE id = v_intent.id;
  DELETE FROM cart_items WHERE cart_id IN (SELECT id FROM carts WHERE user_id = v_user_id);

  -- 8. Record Initial Order Status History
  INSERT INTO order_status_history (
    order_id,
    old_status,
    new_status,
    reason,
    actor_id
  ) VALUES (
    v_order_id,
    NULL,
    'pending_confirmation',
    'Order placed via COD with verified WhatsApp OTP challenge.',
    v_user_id
  );

  RETURN jsonb_build_object(
    'order_id', v_order_id,
    'order_number', v_order_number,
    'status', 'created'
  );
END;
$$ LANGUAGE plpgsql;

