-- ProjectBee Migration: 20261110000002_rls_policies.sql
-- Description: Row Level Security (RLS) Policies and Helper Authorization Functions

-- 1. Authorization Helper Functions
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM admin_accounts 
    WHERE user_id = auth.uid() 
      AND is_super_admin = TRUE 
      AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION is_admin_with_permission(required_permission TEXT)
RETURNS BOOLEAN SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_uid UUID := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RETURN FALSE;
  END IF;

  -- Super Admin has all permissions automatically
  IF EXISTS (
    SELECT 1 FROM admin_accounts 
    WHERE user_id = v_uid AND is_super_admin = TRUE AND status = 'active'
  ) THEN
    RETURN TRUE;
  END IF;

  -- Check explicit role assignment
  RETURN EXISTS (
    SELECT 1 
    FROM admin_role_assignments ara
    JOIN admin_accounts a ON ara.admin_user_id = a.user_id
    JOIN role_permissions rp ON ara.role_id = rp.role_id
    JOIN permissions p ON rp.permission_id = p.id
    WHERE a.user_id = v_uid 
      AND a.status = 'active'
      AND p.permission_key = required_permission
  );
END;
$$ LANGUAGE plpgsql;

-- 2. Enable RLS on All Tables
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_academic_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkout_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE cod_collection_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_moderation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_role_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE serviceable_pincodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_pages ENABLE ROW LEVEL SECURITY;

-- 3. Public Taxonomy Policies (Read-Only for Guests and Customers)
CREATE POLICY "Public can view active boards" ON boards
  FOR SELECT USING (is_active = TRUE OR is_admin_with_permission('categories.view'));

CREATE POLICY "Public can view classes" ON classes
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can view active subjects" ON subjects
  FOR SELECT USING (is_active = TRUE OR is_admin_with_permission('categories.view'));

CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = TRUE OR is_admin_with_permission('categories.view'));

CREATE POLICY "Public can check serviceable pincodes" ON serviceable_pincodes
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can view published content pages" ON content_pages
  FOR SELECT USING (is_published = TRUE OR is_admin_with_permission('content.view'));

-- 4. Products & Catalogue Policies
CREATE POLICY "Public can view published products" ON products
  FOR SELECT USING (status = 'published' OR is_admin_with_permission('products.view'));

CREATE POLICY "Admins can insert products" ON products
  FOR INSERT WITH CHECK (is_admin_with_permission('products.create'));

CREATE POLICY "Admins can update products" ON products
  FOR UPDATE USING (is_admin_with_permission('products.edit'));

CREATE POLICY "Public can view media of published products" ON product_media
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE id = product_media.product_id AND (status = 'published' OR is_admin_with_permission('products.view')))
  );

CREATE POLICY "Admins can manage product media" ON product_media
  FOR ALL USING (is_admin_with_permission('media.manage'));

CREATE POLICY "Public can view academic mappings of published products" ON product_academic_mappings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE id = product_academic_mappings.product_id AND (status = 'published' OR is_admin_with_permission('products.view')))
  );

CREATE POLICY "Admins can manage academic mappings" ON product_academic_mappings
  FOR ALL USING (is_admin_with_permission('products.edit'));

-- 5. Inventory Policies (Restricted to Admins)
CREATE POLICY "Admins can view inventory" ON inventory
  FOR SELECT USING (is_admin_with_permission('inventory.view'));

CREATE POLICY "Admins can update inventory" ON inventory
  FOR UPDATE USING (is_admin_with_permission('inventory.adjust'));

CREATE POLICY "Admins can view stock movements" ON stock_movements
  FOR SELECT USING (is_admin_with_permission('inventory.view'));

-- 6. Customer Profile & Addresses (Owner Scoped)
CREATE POLICY "Users can manage own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Admins can view customer profiles for support" ON profiles
  FOR SELECT USING (is_admin_with_permission('customers.support_view'));

CREATE POLICY "Users can manage own addresses" ON user_addresses
  FOR ALL USING (auth.uid() = user_id);

-- 7. Carts & Cart Items (Owner Scoped)
CREATE POLICY "Users can manage own carts" ON carts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own cart items" ON cart_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM carts WHERE id = cart_items.cart_id AND user_id = auth.uid())
  );

-- 8. Checkout & OTP Challenges (Owner Scoped)
CREATE POLICY "Users can manage own checkout intents" ON checkout_intents
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own otp challenges" ON otp_challenges
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM checkout_intents WHERE id = otp_challenges.checkout_intent_id AND user_id = auth.uid())
  );

-- 9. Orders & Fulfilment (Owner & Admin Scoped)
CREATE POLICY "Customers can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view permitted orders" ON orders
  FOR SELECT USING (is_admin_with_permission('orders.view'));

CREATE POLICY "Admins can update permitted orders" ON orders
  FOR UPDATE USING (is_admin_with_permission('orders.update'));

CREATE POLICY "Customers can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_items.order_id AND user_id = auth.uid())
  );

CREATE POLICY "Admins can view order items" ON order_items
  FOR SELECT USING (is_admin_with_permission('orders.view'));

CREATE POLICY "Admins can record COD collection" ON cod_collection_records
  FOR ALL USING (is_admin_with_permission('orders.record_cod'));

-- 10. Reviews & Moderation
CREATE POLICY "Public can view approved reviews" ON reviews
  FOR SELECT USING (status = 'approved' OR auth.uid() = user_id OR is_admin_with_permission('reviews.view'));

CREATE POLICY "Customers can submit review for delivered orders" ON reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE oi.id = reviews.order_item_id
        AND o.user_id = auth.uid()
        AND o.order_status = 'delivered'
    )
  );

CREATE POLICY "Admins can moderate reviews" ON reviews
  FOR UPDATE USING (is_admin_with_permission('reviews.moderate'));

CREATE POLICY "Admins can view and create moderation events" ON review_moderation_events
  FOR ALL USING (is_admin_with_permission('reviews.moderate'));

-- 11. Administration, RBAC & Super Admin Governance
CREATE POLICY "Super Admin can view and manage admin accounts" ON admin_accounts
  FOR ALL USING (is_super_admin());

CREATE POLICY "Admins can view their own admin account" ON admin_accounts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Super Admin can manage roles and permissions" ON roles
  FOR ALL USING (is_super_admin());

CREATE POLICY "Super Admin can manage permissions" ON permissions
  FOR ALL USING (is_super_admin());

CREATE POLICY "Super Admin can manage role permissions" ON role_permissions
  FOR ALL USING (is_super_admin());

CREATE POLICY "Super Admin can manage admin role assignments" ON admin_role_assignments
  FOR ALL USING (is_super_admin());

CREATE POLICY "Admins can view assigned roles" ON admin_role_assignments
  FOR SELECT USING (admin_user_id = auth.uid());

CREATE POLICY "Super Admin can view audit logs" ON audit_logs
  FOR SELECT USING (is_super_admin());

CREATE POLICY "Authenticated users can read system settings" ON system_settings
  FOR SELECT USING (TRUE);

CREATE POLICY "Super Admin can manage system settings" ON system_settings
  FOR ALL USING (is_super_admin());
