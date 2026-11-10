# ProjectBee — Database Schema Blueprint

**Version:** 1.0  
**Database:** Supabase PostgreSQL  
**Important:** Blueprint only. Reconcile with the live project and existing migrations before applying changes.

## 1. Design principles
- UUID primary keys for core entities.
- Use foreign keys and constraints for integrity.
- Use `timestamptz` for event timestamps.
- Use numeric/decimal types for money, never floating point.
- Enable RLS on all tables exposed through Supabase APIs.
- Keep historical order item snapshots independent of later product edits.
- Store only necessary personal data.
- Use migrations; do not edit production schema manually without a controlled process.

## 2. Suggested entities

### Identity and profile
- `profiles`: `id` (references auth user), `display_name`, `gender` (nullable), `class_level` (nullable or constrained 1–12), `board_id` (nullable), `profile_completion`, `created_at`, `updated_at`.
- `user_addresses`: `id`, `user_id`, `recipient_name`, `guardian_contact_name`, `phone`, `address_line_1`, `address_line_2`, `city`, `state`, `postal_code`, `delivery_instructions`, timestamps.
- Do not store full date of birth unless a reviewed requirement exists.

### Academic taxonomy
- `boards`: `id`, `code` (CBSE/ICSE), `name`, `is_active`.
- `classes`: `id`, `class_number` (1–12), `display_name`.
- `subjects`: `id`, `name`, `slug`, `is_active`.
- `categories`: `id`, `parent_id`, `name`, `slug`, `description`, `sort_order`, `is_active`.

### Catalogue
- `products`: `id`, `sku`, `slug`, `title`, `short_description`, `description`, `selling_price`, `compare_at_price` (nullable), `status` (draft/published/archived), `stock_tracking_enabled`, timestamps.
- `product_academic_mappings`: `id`, `product_id`, `board_id`, `class_id`, `subject_id` (nullable), `category_id`, `project_type` (nullable).
- `product_media`: `id`, `product_id`, `storage_path` or approved public URL, `alt_text`, `sort_order`, `is_primary`.
- `product_external_links`: `id`, `product_id`, `provider` (allowlisted), `url`, `label`, `is_active`.
- `product_search_terms`: `id`, `product_id`, `term`, `term_type` (keyword/synonym).
- `product_price_history`: `id`, `product_id`, `old_price`, `new_price`, `changed_by`, `reason`, `created_at`.

### Inventory
- `inventory`: `product_id`, `available_quantity`, `reserved_quantity`, `low_stock_threshold`, `updated_at`.
- `stock_movements`: `id`, `product_id`, `movement_type`, `quantity_delta`, `reason`, `actor_id`, `reference_type`, `reference_id`, `created_at`.

### Cart
- `carts`: `id`, `user_id`, `status`, timestamps.
- `cart_items`: `id`, `cart_id`, `product_id`, `quantity`, timestamps.
- Never trust client-provided cart totals.

### Checkout and OTP
- `checkout_intents`: `id`, `user_id`, `phone`, `status`, `expires_at`, `created_at`.
- `otp_challenges`: `id`, `checkout_intent_id`, `phone`, `provider`, `otp_hash` (if persisted), `expires_at`, `verified_at`, `attempt_count`, `created_at`.
- Do not store plaintext OTPs or log them. Keep provider identifiers and metadata minimal.

### Orders
- `orders`: `id`, `order_number`, `user_id`, `address_snapshot` (minimize fields), `guardian_contact_name` where required, `phone_snapshot`, `subtotal`, `shipping_amount`, `total_amount`, `payment_method` (COD in V1), `payment_status`, `order_status`, `idempotency_key`, timestamps.
- `order_items`: `id`, `order_id`, `product_id` (nullable if product later removed), `sku_snapshot`, `title_snapshot`, `unit_price_snapshot`, `quantity`, `line_total`.
- `order_status_history`: `id`, `order_id`, `old_status`, `new_status`, `reason`, `actor_id`, `created_at`.
- `cod_collection_records`: `id`, `order_id`, `amount_collected`, `collected_by`, `collected_at`, `reference_note`.

### Reviews
- `reviews`: `id`, `product_id`, `user_id`, `order_item_id`, `rating`, `review_text`, `status`, `created_at`, `updated_at`.
- `review_moderation_events`: `id`, `review_id`, `actor_id`, `action`, `reason`, `created_at`.
- Verified-purchase eligibility must be derived from qualifying order state, not a client flag.

### Admin and governance
- `admin_accounts`: `user_id`, `status`, `created_at`, `deactivated_at`.
- `roles`: `id`, `name`, `description`.
- `permissions`: `id`, `permission_key`, `description`.
- `admin_role_assignments`: `admin_user_id`, `role_id`, `assigned_by`, `created_at`.
- `role_permissions`: `role_id`, `permission_id`.
- `admin_permission_overrides` only if a documented need exists; avoid unnecessary complexity.
- Enforce exactly one active Super Admin through a carefully designed bootstrap/control mechanism.
- `audit_logs`: `id`, `actor_id`, `actor_role`, `action`, `resource_type`, `resource_id`, `request_id`, `safe_metadata`, `created_at`.
- `system_settings`: `key`, validated `value`, `updated_by`, `updated_at`; never store raw secrets here.

### Public content and support
- `content_pages`: `id`, `slug`, `title`, `body`, `status`, `updated_by`, timestamps.
- `support_requests`: `id`, `user_id` (nullable for guest contact if allowed), `category`, `message`, `status`, timestamps. Minimize personal information.

## 3. Key constraints and indexes
- Unique product SKU and slug.
- Unique board code and class number.
- Unique product/class/board/subject mapping where appropriate.
- Positive quantity and non-negative price checks.
- Rating constrained to approved range, typically 1–5.
- Unique idempotency key within the appropriate user/order scope.
- Index products by publication status, title/search vector and common academic filters.
- Index orders by user, order number, status and created time.
- Index audit logs by actor, action and created time.
- Index stock movements by product and created time.

## 4. RLS policy intent
- Guests: read only published public catalogue fields and approved public content.
- Customers: read/update their own profile and addresses; read their own carts and orders; write only permitted records through validated flows.
- Admins: access operational data only after server-side active-status and permission checks.
- Super Admin: access governance functions only for the single authorized identity.
- Audit logs: ordinary application roles cannot update/delete.
- Storage: separate public product media from private uploads; enforce upload authorization.

## 5. Transactions and business invariants
- Order creation, inventory reservation/deduction and idempotency must be atomic.
- Order status changes must follow an allowed transition map.
- COD payment status remains unpaid until an authorized collection event.
- Order item snapshots preserve the purchased title, SKU and price.
- Review eligibility is computed from qualifying delivered order items.
- Prevent cross-user access by checking ownership on every query and mutation.

## 6. Migration instructions
1. Inspect existing tables, functions, triggers, policies and buckets.
2. Compare them with this blueprint.
3. Produce a mapping and non-destructive migration proposal.
4. Back up and test in staging.
5. Apply incremental migrations with review.
6. Run RLS, integrity and rollback tests.
