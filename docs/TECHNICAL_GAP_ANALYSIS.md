# ProjectBee — Technical Gap Analysis & Architecture Refinement

**Author:** Lead Software Architect & Senior Full-Stack Engineer  
**Date:** November 2026  
**Status:** Approved for Architectural Review  
**Target Platform:** ProjectBee (YugaYatra Retail (OPC) Private Limited)  
**Scope:** Complete review of PRD, Admin PRD, Super Admin PRD, Technical Architecture, Database Schema, API Specification, Security Checklist, Roadmap, and Testing Strategy.

---

## 1. Executive Summary & Review Scope

ProjectBee is a specialized Indian e-commerce platform dedicated to educational DIY kits, science models, academic charts, and school project supplies tailored to CBSE and ICSE students across Classes 1 through 12. Version 1 (V1) is deliberately scoped to Cash on Delivery (COD) payments only, with launch focus in Bengaluru and scalable pan-India logistics.

This technical gap analysis assesses the architectural completeness, consistency, data integrity, security posture, and legal feasibility of the ProjectBee documentation pack before the commencement of code development.

### Key Findings
1. **Strong Architectural Foundation:** The proposed architecture (Next.js, Supabase PostgreSQL, Row Level Security, Edge Functions, Tailwind CSS) is well-suited for high-performance, mobile-first e-commerce.
2. **Critical Gaps Identified:** 
   - Lack of a formal atomic binding between the WhatsApp OTP verification state, the checkout intent, and the final order creation payload.
   - Ambiguity in Admin vs. Customer authentication segregation within Supabase Auth.
   - Undefined schema mechanics for enforcing the **Single Super Admin Invariant** at the database level.
   - Ambiguity surrounding the exact fields permitted for Guest preview vs. authenticated Customers.
   - Lack of an explicit inventory reservation vs. instant deduction model during COD checkout.
   - Missing shipping fee calculation and PIN code serviceability specifications.
   - Incomplete DDL specifics for product attributes/specifications, audit log immutability, and soft-delete/archival cascades.

---

## 2. Cross-Document Contradiction & Ambiguity Matrix

| Issue ID | Area | Conflict / Ambiguity Description | Affected Documents | Resolution / Architectural Decision |
|---|---|---|---|---|
| **GAP-01** | **Authentication** | Customer uses passwordless Email OTP. Admins are "provisioned identities with MFA". Supabase Auth manages both in `auth.users`. How do we prevent customers from creating passwords or admins from signing up via customer OTP? | `PRD.md`, `ADMIN_PRD.md`, `TECHNICAL_ARCHITECTURE.md` | **Separate Auth Strategies via Shared Supabase Auth:**<br>1. Customers authenticate strictly via `supabase.auth.signInWithOtp({ email })`. Public password signup is disabled in Supabase Auth.<br>2. Admins are created exclusively via Supabase Admin API (`auth.admin.inviteUserByEmail` or `createUser`) with a verified email and temporary password requiring immediate change and MFA enrollment.<br>3. An `admin_accounts` table linked to `auth.users.id` acts as the definitive gatekeeper. Application routes and RLS verify membership in `admin_accounts` with `status = 'active'`. |
| **GAP-02** | **Guest Visibility** | `PRD.md` (§7, §8) states guests see "approved subset: title, thumbnail, class, board, category, short description. Full details, ordering or other restricted fields can require sign-in." However, e-commerce conversion requires price visibility for guests. | `PRD.md`, `API_SPECIFICATION.md` | **Explicit Field Policy:**<br>- **Guest Safe:** `id`, `slug`, `title`, `short_description`, `thumbnail_url`, `selling_price`, `compare_at_price`, `board`, `class_range`, `subject`, `category`, `stock_status` (`in_stock` / `out_of_stock`).<br>- **Restricted (Customer Only):** `full_description`, `included_materials_list`, `dimensions_specs`, `high_res_gallery`, `customer_reviews_full_text`, `stock_exact_quantity`. |
| **GAP-03** | **Checkout & WhatsApp OTP Binding** | `API_SPECIFICATION.md` separates `whatsapp-otp/verify` and `checkout/orders`. If the client calls verify and then posts orders, what stops a malicious client from mutating cart items, price, or address between verification and order placement? | `PRD.md`, `API_SPECIFICATION.md`, `TECHNICAL_ARCHITECTURE.md` | **Immutable Intent Locking:**<br>When `POST /checkout/intents` is called, a `checkout_intents` record locks the exact cart hash, delivery address snapshot, delivery charge, and calculated total. The WhatsApp OTP challenge is bound strictly to `checkout_intent_id`. `POST /checkout/orders` accepts `checkout_intent_id` and validates that `intent.status = 'verified'` and `intent.expires_at > NOW()`. The order is created directly from the locked intent snapshot, completely ignoring client-provided amounts. |
| **GAP-04** | **Single Super Admin Invariant** | `SUPER_ADMIN_PRD.md` mandates *exactly one active Super Admin* at all times, enforced in database logic. Ordinary Admins cannot alter Super Admin status. | `SUPER_ADMIN_PRD.md`, `DATABASE_SCHEMA.md` | **Database Constraint & Trigger:**<br>Create a dedicated single-row configuration table or a partial unique index on `admin_accounts`:<br>`CREATE UNIQUE INDEX single_active_super_admin_idx ON admin_accounts (is_super_admin) WHERE (is_super_admin = TRUE AND status = 'active');`<br>Coupled with a PostgreSQL trigger blocking deletion or deactivation of the last active Super Admin, and revoking direct table grants from the `authenticated` role. |
| **GAP-05** | **Admin Approval Workflow** | Some PRD sections describe Admin actions needing oversight, while Rule & Roadmap states: "Admins operate according to assigned permissions; no approval workflow is required." | `ADMIN_PRD.md`, `SUPER_ADMIN_PRD.md`, Prompt rules | **Immediate Execution with Audit Trail:**<br>No multi-step approval queue (maker-checker) in V1. If an Admin possesses `products.publish` or `inventory.adjust`, the mutation executes immediately. Super Admin oversight is strictly post-action via tamper-resistant `audit_logs`. |
| **GAP-06** | **Inventory Management: Reserve vs. Deduct** | `DATABASE_SCHEMA.md` lists `available_quantity` and `reserved_quantity` in `inventory`, but COD does not have a payment gateway holding state. When does reservation turn into deduction? | `DATABASE_SCHEMA.md`, `TECHNICAL_ARCHITECTURE.md` | **Atomic Immediate Deduction with Movement Ledger:**<br>For COD, order creation directly decrements `available_quantity` and logs a `stock_movements` record of type `order_placed`. If an order is cancelled or marked `delivery_failed`, a compensating transaction increments `available_quantity` with type `order_cancelled` or `return_restock`. `reserved_quantity` is reserved for future V2 online payments or short checkout holds (15-minute OTP window). |
| **GAP-07** | **Shipping Calculation & Serviceability** | Documents mention Bengaluru launch with pan-India rollout, but omit shipping rate calculation rules and PIN code verification. | `PRD.md`, `API_SPECIFICATION.md`, `DATABASE_SCHEMA.md` | **V1 Shipping Engine Specification:**<br>Implement a rules-based shipping module:<br>1. Flat rate (e.g., ₹50) for orders under ₹499; free shipping on orders ≥ ₹499.<br>2. Bengaluru delivery priority via PIN code validation (560xxx series).<br>3. PIN code serviceability table (`serviceable_pincodes`) to reject unserviceable addresses before checkout intent creation. |
| **GAP-08** | **Child Data & Parental Consent** | PRD specifies collecting student name, class, optional gender, and guardian contact name + phone with WhatsApp OTP. It correctly notes that OTP proves phone control, not legal consent or guardian identity. | `PRD.md`, `SECURITY_CHECKLIST.md` | **DPDP Act 2023 Alignment:**<br>1. Customer onboarding terms must feature an explicit checkbox for Parents/Guardians confirming they are either the legal guardian or an adult purchasing on behalf of a minor.<br>2. No child full DOB, Aadhaar, school name, or photos collected.<br>3. Clear parental consent text displayed at WhatsApp verification step.<br>4. Profile data purge/export workflow documented for DPDP compliance. |

---

## 3. Database Schema Gap Analysis & Refinement Blueprint

### 3.1 Missing Entities & Schema Omissions
The initial schema in `DATABASE_SCHEMA.md` provides an excellent blueprint, but lacks specific operational columns, enum types, and foreign key rules required for production implementation.

#### Critical Gaps Identified in Schema Blueprint:
1. **Product Specifications & Materials:** Educational kits need structured attributes (e.g., "batteries included: yes/no", "difficulty level", "assembly time", "dimensions", "weight", "safety warning"). A `specifications` `JSONB` column on `products` is required.
2. **Order Enums:** `order_status` and `payment_status` should be formal PostgreSQL ENUMs rather than arbitrary text strings to guarantee state machine integrity.
3. **Serviceable Logistics:** A `serviceable_pincodes` table is required to reject delivery addresses in regions where COD delivery is not supported.
4. **Audit Log Immutability:** `audit_logs` must be made append-only using PostgreSQL rules/triggers preventing `UPDATE` and `DELETE` even by authenticated database users.
5. **Soft Delete / Archival Strategy:** Hard deletions of products, categories, or taxonomy items would break historical `order_items` references. Foreign keys on snapshots must use `ON DELETE RESTRICT` or `ON DELETE SET NULL`, and operational entities must use `status = 'archived'`.

### 3.2 Refined DDL Architecture Specification

```sql
-- Core Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Enums
CREATE TYPE product_status_enum AS ENUM ('draft', 'published', 'archived');
CREATE TYPE order_status_enum AS ENUM (
  'pending_confirmation',
  'confirmed',
  'processing',
  'packed',
  'shipped',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'delivery_failed'
);
CREATE TYPE payment_status_enum AS ENUM ('unpaid', 'paid', 'refunded', 'failed');
CREATE TYPE stock_movement_type_enum AS ENUM (
  'initial_stock',
  'manual_adjustment',
  'order_placed',
  'order_cancelled',
  'return_restock',
  'damaged_scrap'
);
CREATE TYPE admin_status_enum AS ENUM ('active', 'suspended', 'deactivated');
CREATE TYPE review_status_enum AS ENUM ('pending_review', 'approved', 'rejected', 'flagged');

-- 1. Academic Taxonomy
CREATE TABLE boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) UNIQUE NOT NULL, -- 'CBSE', 'ICSE'
  name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_number INT UNIQUE NOT NULL CHECK (class_number BETWEEN 1 AND 12),
  display_name VARCHAR(50) NOT NULL, -- 'Class 1', 'Class 10'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES categories(id) ON DELETE RESTRICT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Customer Profiles & Addresses
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(100) NOT NULL,
  gender VARCHAR(20), -- optional ('male', 'female', 'other', 'prefer_not_to_say')
  class_level INT CHECK (class_level BETWEEN 1 AND 12),
  board_id UUID REFERENCES boards(id) ON DELETE SET NULL,
  profile_completion INT DEFAULT 50 CHECK (profile_completion BETWEEN 0 AND 100),
  is_parent_guardian BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_name VARCHAR(100) NOT NULL,
  guardian_contact_name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  address_line_1 VARCHAR(255) NOT NULL,
  address_line_2 VARCHAR(255),
  landmark VARCHAR(150),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL DEFAULT 'Karnataka',
  postal_code VARCHAR(10) NOT NULL,
  delivery_instructions TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Products & Inventory
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  specifications JSONB DEFAULT '{}'::jsonb, -- e.g. {"materials": [...], "weight_grams": 450, "difficulty": "Medium"}
  selling_price NUMERIC(10, 2) NOT NULL CHECK (selling_price >= 0),
  compare_at_price NUMERIC(10, 2) CHECK (compare_at_price >= selling_price),
  status product_status_enum DEFAULT 'draft',
  stock_tracking_enabled BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_academic_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  project_type VARCHAR(50), -- 'working_model', 'still_model', 'chart', 'diy_kit'
  UNIQUE (product_id, board_id, class_id, category_id)
);

CREATE TABLE product_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  storage_path VARCHAR(255) NOT NULL,
  alt_text VARCHAR(255),
  sort_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE inventory (
  product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  available_quantity INT NOT NULL DEFAULT 0 CHECK (available_quantity >= 0),
  reserved_quantity INT NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
  low_stock_threshold INT NOT NULL DEFAULT 5,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  movement_type stock_movement_type_enum NOT NULL,
  quantity_delta INT NOT NULL,
  reason TEXT NOT NULL,
  actor_id UUID REFERENCES auth.users(id),
  reference_type VARCHAR(50), -- 'order', 'manual_adjustment'
  reference_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Cart & Checkout Intent
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (cart_id, product_id)
);

CREATE TABLE checkout_intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  phone VARCHAR(15) NOT NULL,
  delivery_address_id UUID NOT NULL REFERENCES user_addresses(id),
  address_snapshot JSONB NOT NULL,
  items_snapshot JSONB NOT NULL, -- [{"product_id", "title", "sku", "price", "quantity", "line_total"}]
  subtotal NUMERIC(10, 2) NOT NULL,
  shipping_amount NUMERIC(10, 2) NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending_otp' CHECK (status IN ('pending_otp', 'otp_verified', 'completed', 'expired')),
  idempotency_key VARCHAR(100) UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE otp_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checkout_intent_id UUID NOT NULL REFERENCES checkout_intents(id) ON DELETE CASCADE,
  phone VARCHAR(15) NOT NULL,
  otp_hash VARCHAR(255) NOT NULL,
  provider VARCHAR(50) DEFAULT 'whatsapp_cloud_api',
  attempt_count INT DEFAULT 0 CHECK (attempt_count <= 5),
  expires_at TIMESTAMPTZ NOT NULL,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Orders & Fulfilment
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(30) UNIQUE NOT NULL, -- e.g. 'PB-202611-00123'
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  checkout_intent_id UUID UNIQUE REFERENCES checkout_intents(id),
  address_snapshot JSONB NOT NULL,
  guardian_contact_name VARCHAR(100) NOT NULL,
  phone_snapshot VARCHAR(15) NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
  shipping_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (shipping_amount >= 0),
  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
  payment_method VARCHAR(20) DEFAULT 'COD',
  payment_status payment_status_enum DEFAULT 'unpaid',
  order_status order_status_enum DEFAULT 'pending_confirmation',
  tracking_number VARCHAR(100),
  courier_partner VARCHAR(100),
  idempotency_key VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  sku_snapshot VARCHAR(50) NOT NULL,
  title_snapshot VARCHAR(255) NOT NULL,
  unit_price_snapshot NUMERIC(10, 2) NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  line_total NUMERIC(10, 2) NOT NULL
);

CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  old_status order_status_enum,
  new_status order_status_enum NOT NULL,
  reason TEXT,
  actor_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cod_collection_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID UNIQUE NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  amount_collected NUMERIC(10, 2) NOT NULL,
  collected_by UUID NOT NULL REFERENCES auth.users(id),
  collected_at TIMESTAMPTZ DEFAULT NOW(),
  reference_note TEXT
);

-- 6. Ratings & Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_item_id UUID UNIQUE NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  status review_status_enum DEFAULT 'pending_review',
  is_verified_purchase BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

CREATE TABLE review_moderation_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL REFERENCES auth.users(id),
  action VARCHAR(50) NOT NULL, -- 'approved', 'rejected', 'flagged'
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Administration, RBAC & Single Super Admin Invariant
CREATE TABLE admin_accounts (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  is_super_admin BOOLEAN DEFAULT FALSE,
  status admin_status_enum DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deactivated_at TIMESTAMPTZ
);

-- Enforce Exactly One Active Super Admin
CREATE UNIQUE INDEX single_active_super_admin_idx 
ON admin_accounts (is_super_admin) 
WHERE (is_super_admin = TRUE AND status = 'active');

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  permission_key VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE role_permissions (
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE admin_role_assignments (
  admin_user_id UUID NOT NULL REFERENCES admin_accounts(user_id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES admin_accounts(user_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (admin_user_id, role_id)
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users(id),
  actor_role VARCHAR(50) NOT NULL,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100) NOT NULL,
  resource_id VARCHAR(100),
  request_id VARCHAR(100),
  safe_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Immutability Rule for Audit Logs
CREATE OR REPLACE RULE no_update_audit_logs AS ON UPDATE TO audit_logs DO INSTEAD NOTHING;
CREATE OR REPLACE RULE no_delete_audit_logs AS ON DELETE TO audit_logs DO INSTEAD NOTHING;

-- 8. Logistics & Settings
CREATE TABLE serviceable_pincodes (
  pincode VARCHAR(10) PRIMARY KEY,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  is_cod_available BOOLEAN DEFAULT TRUE,
  estimated_delivery_days INT DEFAULT 3
);

CREATE TABLE system_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES admin_accounts(user_id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE content_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  content_markdown TEXT NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  updated_by UUID REFERENCES admin_accounts(user_id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 4. API Contract Gap Analysis

The initial `API_SPECIFICATION.md` outline provides endpoints but lacks exact payload definitions, query parameter specifications, and security headers. Below are the required contract expansions.

### 4.1 Missing API Endpoints
1. `GET /api/v1/catalogue/pincodes/{pincode}/serviceability` — Check whether COD and delivery are supported for a customer's postal code before checkout.
2. `PATCH /api/v1/me/addresses/{addressId}/default` — Set an address as default.
3. `POST /api/v1/admin/orders/{orderId}/cancel` — Dedicated administrative cancellation endpoint requiring an audit reason.
4. `POST /api/v1/admin/orders/{orderId}/shipping` — Attach courier name and tracking number.
5. `GET /api/v1/super-admin/admins/export-audit` — Super Admin audit trail export with data minimization filters.

### 4.2 Critical Endpoint Payloads & Validation Schemas (Zod)

#### A. Checkout Intent Creation (`POST /api/v1/checkout/intents`)
```typescript
import { z } from 'zod';

export const CreateCheckoutIntentSchema = z.object({
  address_id: z.string().uuid("Invalid address ID"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian mobile number"),
  idempotency_key: z.string().uuid("Valid UUID required for idempotency"),
});
```

#### B. WhatsApp OTP Request & Verification
```typescript
export const RequestWhatsAppOtpSchema = z.object({
  checkout_intent_id: z.string().uuid(),
});

export const VerifyWhatsAppOtpSchema = z.object({
  checkout_intent_id: z.string().uuid(),
  otp_code: z.string().length(6, "OTP must be 6 digits"),
});
```

#### C. Order Finalization (`POST /api/v1/checkout/orders`)
```typescript
export const FinalizeOrderSchema = z.object({
  checkout_intent_id: z.string().uuid(),
  idempotency_key: z.string().uuid(),
});
```
*Note: The client provides zero financial or line-item fields in `FinalizeOrderSchema`. The server extracts the validated items, recalculates real-time price and stock, and creates the order inside an atomic transaction.*

---

## 5. Security & Privacy Deep Dive (DPDP Act 2023)

### 5.1 Verifiable Parental Consent vs. Phone OTP
- **Legal Reality:** Under India's Digital Personal Data Protection (DPDP) Act 2023, processing personal data of children requires verifiable consent from parents/guardians.
- **Architectural Safeguard:** A WhatsApp OTP verifies *possession of the SIM card*, not adulthood or legal relationship.
- **System Implementation:**
  1. The UI explicitly states: *"ProjectBee orders must be confirmed by a parent or legal guardian. By verifying this mobile number, you confirm that you are the parent/guardian authorized to approve this Cash on Delivery order."*
  2. The database stores `guardian_contact_name` and logs the OTP verification timestamp.
  3. No child biometric, precise location, school affiliation, or photo data is ever collected.

### 5.2 Row Level Security (RLS) Policy Blueprint
All tables have `ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;`.
- **Public Tables (Guests):** `products`, `categories`, `boards`, `classes`, `subjects`, `content_pages`.
  - Policy: `SELECT` allowed where `status = 'published'` or `is_active = TRUE`.
- **User Scoped Tables:** `profiles`, `user_addresses`, `carts`, `cart_items`, `checkout_intents`, `orders`, `order_items`, `reviews`.
  - Policy: `SELECT, INSERT, UPDATE, DELETE` restricted to `auth.uid() = user_id`.
- **Admin Scoped Tables:** Enforced via a helper function `is_admin_with_permission(perm_key TEXT)`:
```sql
CREATE OR REPLACE FUNCTION is_admin_with_permission(required_permission TEXT)
RETURNS BOOLEAN SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_is_super BOOLEAN;
  v_has_perm BOOLEAN;
BEGIN
  IF v_user_id IS NULL THEN
    RETURN FALSE;
  END IF;

  -- Super Admin bypasses individual permission keys
  SELECT is_super_admin INTO v_is_super 
  FROM admin_accounts 
  WHERE user_id = v_user_id AND status = 'active';

  IF v_is_super IS TRUE THEN
    RETURN TRUE;
  END IF;

  -- Check explicit role-assigned permissions
  SELECT EXISTS (
    SELECT 1 
    FROM admin_role_assignments ara
    JOIN role_permissions rp ON ara.role_id = rp.role_id
    JOIN permissions p ON rp.permission_id = p.id
    WHERE ara.admin_user_id = v_user_id AND p.permission_key = required_permission
  ) INTO v_has_perm;

  RETURN COALESCE(v_has_perm, FALSE);
END;
$$ LANGUAGE plpgsql;
```

---

## 6. Technical Implementation Risks & Mitigation Register

| Risk ID | Risk Description | Severity | Impact | Mitigation Strategy |
|---|---|---|---|---|
| **TR-01** | **WhatsApp Template / DLT Registration Bottleneck** | High | Unable to send OTPs to Indian phone numbers on launch. | In India, commercial WhatsApp Business API messages require pre-approved templates and Meta Business verification. **Mitigation:** Implement a pluggable `OtpService` adapter interface with a local mock/dev adapter (`ConsoleOtpProvider`), allowing complete end-to-end testing while official WhatsApp Cloud API templates are pending approval. |
| **TR-02** | **Concurrent Checkout Overselling** | High | Two parents ordering the last science kit simultaneously. | **Mitigation:** Utilize PostgreSQL atomic conditional deduction inside an Edge Function/Server Action transaction: `UPDATE inventory SET available_quantity = available_quantity - $qty WHERE product_id = $id AND available_quantity >= $qty`. If affected rows = 0, throw an `OUT_OF_STOCK` error and roll back. |
| **TR-03** | **Supabase Free/Pro Auth Email Rate Limits** | Medium | Customers cannot receive Email OTP for login. | **Mitigation:** Supabase built-in SMTP is rate-limited to 3-4 emails/hour. Must configure custom SMTP with a verified transactional email provider (Resend or AWS SES) prior to staging deployment. |
| **TR-04** | **Client Bundle Secret Leakage** | Critical | Admin or service role credentials leaked in public Next.js bundle. | **Mitigation:** Strictly ban `SUPABASE_SERVICE_ROLE_KEY` from any file referenced in client components. Implement automated pre-commit scanning with GitGuardian/TruffleHog. |
| **TR-05** | **Super Admin Account Lockout** | High | Single Super Admin loses access or MFA token. | **Mitigation:** Document and script a server-side CLI disaster recovery command running with service-role privileges that can reset/reassign the Super Admin identity directly in the database. |

---

## 7. Architectural Decisions for Stakeholder Confirmation

Before launching into coding:
1. **WhatsApp Provider:** Confirm whether Meta Direct Cloud API, Twilio, or Gupshup will be utilized for the Indian WhatsApp BSP.
2. **Transactional Email:** Confirm whether Resend or AWS SES will be used for Supabase Auth custom SMTP.
3. **Logistics & PIN codes:** Confirm the initial list of serviceable PIN codes for the Bengaluru launch.
4. **Brand Assets:** Confirm path and placement of the approved ProjectBee logo SVG and color tokens in the design system.
