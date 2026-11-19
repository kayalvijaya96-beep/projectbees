-- ProjectBee Migration: 20261110000004_backend_expansion.sql
-- Description: Expansion for Wishlists, Coupons, Payments, Notifications, and Rating Aggregates

-- 1. Wishlists & Wishlist Items
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (wishlist_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_items_user ON wishlist_items(wishlist_id);

-- 2. Coupons & Redemptions
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')),
  discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value > 0),
  min_order_amount NUMERIC(10, 2) DEFAULT 0 CHECK (min_order_amount >= 0),
  max_discount_amount NUMERIC(10, 2) CHECK (max_discount_amount IS NULL OR max_discount_amount > 0),
  valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_to TIMESTAMPTZ NOT NULL,
  usage_limit INT CHECK (usage_limit IS NULL OR usage_limit > 0),
  usage_count INT NOT NULL DEFAULT 0 CHECK (usage_count >= 0),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE RESTRICT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID UNIQUE NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  discount_applied NUMERIC(10, 2) NOT NULL CHECK (discount_applied >= 0),
  redeemed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (coupon_id, user_id, order_id)
);

-- 3. Payments Ledger (Dual COD & Razorpay Gateway)
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  payment_gateway VARCHAR(30) NOT NULL DEFAULT 'COD' CHECK (payment_gateway IN ('COD', 'RAZORPAY')),
  gateway_order_id VARCHAR(100),
  gateway_payment_id VARCHAR(100),
  gateway_signature VARCHAR(255),
  amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  status payment_status_enum NOT NULL DEFAULT 'unpaid',
  raw_response JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_gateway_id ON payments(gateway_payment_id);

-- 4. Customer Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'order_confirmed', 'order_shipped', 'order_delivered', 'cancellation'
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_read BOOLEAN DEFAULT FALSE,
  sent_email BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);

-- 5. Product Rating Aggregations & Review Sync
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS average_rating NUMERIC(2, 1) DEFAULT 5.0 CHECK (average_rating BETWEEN 1.0 AND 5.0),
ADD COLUMN IF NOT EXISTS reviews_count INT DEFAULT 0 CHECK (reviews_count >= 0);

CREATE OR REPLACE FUNCTION recompute_product_rating_aggregate()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_prod_id UUID;
  v_avg NUMERIC(2, 1);
  v_count INT;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_prod_id := OLD.product_id;
  ELSE
    v_prod_id := NEW.product_id;
  END IF;

  SELECT 
    COALESCE(ROUND(AVG(rating)::numeric, 1), 5.0), 
    COUNT(*) 
  INTO v_avg, v_count
  FROM reviews 
  WHERE product_id = v_prod_id AND status = 'approved';

  UPDATE products 
  SET average_rating = v_avg,
      reviews_count = v_count,
      updated_at = NOW()
  WHERE id = v_prod_id;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_recompute_product_rating ON reviews;
CREATE TRIGGER trg_recompute_product_rating
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION recompute_product_rating_aggregate();

-- 6. Enable RLS on newly created tables
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies
-- Wishlists: Owner only
CREATE POLICY "Users can manage their own wishlist" ON wishlists
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own wishlist items" ON wishlist_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM wishlists 
      WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid()
    )
  );

-- Coupons: Public read for active, Admin full access
CREATE POLICY "Public can view active coupons" ON coupons
  FOR SELECT USING (is_active = TRUE AND valid_to >= NOW());

CREATE POLICY "Admins can manage coupons" ON coupons
  FOR ALL USING (is_admin_with_permission('inventory.manage') OR is_super_admin());

-- Payments: User can view their own payments, Admin can view all
CREATE POLICY "Users can view their own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view and manage payments" ON payments
  FOR ALL USING (is_admin_with_permission('orders.view') OR is_super_admin());

-- Notifications: User can view & mark read their own
CREATE POLICY "Users can manage their own notifications" ON notifications
  FOR ALL USING (auth.uid() = user_id);
