# ProjectBee — Environment Setup & Configuration Guide

**Version:** 1.0  
**Target Platform:** ProjectBee (YugaYatra Retail (OPC) Private Limited)  
**Maintained By:** Lead Software Architect & Senior Full-Stack Engineer  
**Last Updated:** November 2026

---

## 1. System Prerequisites & Local Tooling

The ProjectBee workspace is configured for development on modern operating systems (Windows 11 / macOS / Linux).

### 1.1 Detected Local Environment
- **Operating System:** Windows (PowerShell Shell)
- **Node.js Runtime:** `v20.18.0` (LTS)
- **Package Manager:** `npm 10.8.2` (Default) / `pnpm` (Monorepo standard)
- **Version Control:** `git version 2.47.0.windows.1`
- **Database Engine:** Supabase PostgreSQL 15+ (Local via Docker or Cloud Project)

### 1.2 Package Manager Setup (pnpm)
ProjectBee uses `pnpm` workspaces for fast, disk-efficient monorepo management. If `pnpm` is not globally installed in your PATH, enable it via Node.js Corepack:

```powershell
# Enable Corepack (included with Node.js 20+)
corepack enable
corepack prepare pnpm@latest --activate

# Verify installation
pnpm --version
```
*Alternative via npm (if Corepack is restricted):*
```powershell
npm install -g pnpm
```

### 1.3 Supabase CLI Setup
The Supabase CLI is used for local database management, migrations, and Edge Functions.
```powershell
# Option A: Run directly via npx without global install
npx supabase --version

# Option B: Install via Scoop (Windows)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Option C: Install globally via npm
npm install -g supabase
```

---

## 2. Monorepo Topology & Folder Structure

ProjectBee follows a clean, decoupled monorepo structure separating Customer-facing and Administrative applications while sharing types and core UI tokens.

```text
projectbees/
├── apps/
│   ├── web/                     # Next.js App Router (Customer Storefront & Public Pages)
│   │   ├── app/                 # App Router pages (guest catalogue, checkout, me, public)
│   │   ├── components/          # Customer-specific UI components
│   │   ├── lib/                 # Customer utilities & client Supabase client
│   │   ├── public/              # Static assets (approved ProjectBee logo, banners)
│   │   └── package.json
│   │
│   └── admin/                   # Next.js App Router (Admin & Super Admin Unified Console)
│       ├── app/                 # Admin console routes (dashboard, catalogue, orders, super-admin)
│       ├── components/          # Admin-specific tables, charts, forms
│       ├── lib/                 # Admin authorization hooks, audit log helpers
│       └── package.json
│
├── packages/
│   ├── shared-types/            # Canonical TypeScript types, DB models, Zod validation schemas
│   │   ├── src/
│   │   │   ├── database.types.ts
│   │   │   ├── schemas.ts       # Zod checkout, product, and review schemas
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── ui/                      # Shared accessible UI components (Tailwind + Radix primitives)
│   │   ├── src/                 # Buttons, Inputs, Dialogs, Badges, Skeleton loaders
│   │   └── package.json
│   │
│   └── supabase-config/         # Shared Supabase browser/server client initializers
│       ├── src/
│       └── package.json
│
├── supabase/
│   ├── migrations/              # Version-controlled SQL migration scripts
│   ├── functions/               # Supabase Edge Functions (e.g. whatsapp-otp-webhook)
│   ├── seed/                    # Initial academic taxonomy, classes 1-12, default roles
│   └── config.toml              # Supabase CLI configuration
│
├── docs/                        # Complete technical and product documentation pack
├── pnpm-workspace.yaml          # Monorepo workspace definition
├── package.json                 # Monorepo root scripts & dev dependencies
├── turbo.json                   # Turborepo build pipeline configuration
└── README_FIRST.md
```

---

## 3. External Services & Required Accounts

Before launching to staging or production, the following external service accounts and API credentials are required:

| Service / Provider | Purpose | Environment Tier | Minimum Required Tier |
|---|---|---|---|
| **Supabase** | Managed PostgreSQL, Supabase Auth, Storage Buckets, Row Level Security | Dev / Staging / Prod | Pro tier recommended for production (custom SMTP, daily backups, dedicated compute) |
| **Meta WhatsApp Business API** / **Indian BSP** (Gupshup / Twilio / Interakt) | Sending OTP challenges and order status updates to Indian mobile numbers via WhatsApp | Staging / Prod (Mock adapter used in Dev) | Verified Meta Business Account with pre-approved WhatsApp OTP Template |
| **Transactional Email Provider** (Resend / AWS SES / SendGrid) | Supabase Auth customer Email OTP delivery with high deliverability | Staging / Prod | Standard transactional plan with custom domain SPF/DKIM verification |
| **Hosting Platform** (Vercel / Cloudflare) | Next.js Edge & Server-Side Rendering hosting for `apps/web` and `apps/admin` | Staging / Prod | Pro team tier supporting preview environments and zero-trust domain routing |
| **Version Control** (GitHub) | Source code repository, PR review enforcement, branch protection, CI/CD | All | GitHub Team with secret scanning and branch protection enabled |

---

## 4. Comprehensive Environment Variable Inventory

> [!CAUTION]
> **Zero Secret Leakage Rule:** Never prefix backend database passwords, service-role keys, or provider API secrets with `NEXT_PUBLIC_`. Client-exposed variables are visible in compiled JavaScript bundles.

### 4.1 Monorepo Root (`.env.example`)
```bash
# Global Project Metadata
PROJECT_NAME="ProjectBee"
ENVIRONMENT="development" # development | staging | production
```

### 4.2 Customer Storefront (`apps/web/.env.local.example`)
```bash
# Public Variables (Accessible in Browser)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
NEXT_PUBLIC_DEFAULT_BOARD="CBSE"
NEXT_PUBLIC_SUPPORT_EMAIL="support@projectbee.in"
NEXT_PUBLIC_SUPPORT_PHONE="+918000000000"

# Server-Only Secrets (Never exposed to browser)
# Used in Server Actions & API route handlers
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # Required for privileged checkout & OTP transactions
WHATSAPP_API_PROVIDER="mock" # 'mock' for local dev, 'meta_cloud' for staging/prod
WHATSAPP_API_TOKEN="EAAxxxxxxx"
WHATSAPP_PHONE_NUMBER_ID="1000000000000"
WHATSAPP_TEMPLATE_NAME="projectbee_otp_verification"
OTP_ENCRYPTION_SECRET="super-secure-32-char-random-secret"
```

### 4.3 Admin & Super Admin Console (`apps/admin/.env.local.example`)
```bash
# Public Variables
NEXT_PUBLIC_ADMIN_SITE_URL="http://localhost:3001"
NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Server-Only Secrets
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPER_ADMIN_EMAILS="superadmin@projectbee.in"
AUDIT_LOG_ALERT_WEBHOOK_URL="https://hooks.slack.com/services/..."
```

### 4.4 Supabase CLI & Functions (`supabase/.env.example`)
```bash
SUPABASE_ACCESS_TOKEN="sbp_xxxxxxxxxxxx"
SUPABASE_PROJECT_REF="your-project-ref"
SUPABASE_DB_PASSWORD="your-strong-db-password"
```

---

## 5. Step-by-Step Local Development Bootstrapping

Follow these sequential steps to initialize the local development environment:

### Step 1: Initialize Monorepo Dependencies
```powershell
# Navigate to workspace root
cd C:\Users\kayal\projectbees

# Install all workspace dependencies via pnpm
pnpm install
```

### Step 2: Initialize Supabase Local Stack
```powershell
# Initialize Supabase config if not present
npx supabase init

# Start local Docker-based Supabase stack (PostgreSQL, Auth, Storage, Studio)
npx supabase start
```
*Note: This command outputs local credentials:*
- **API URL:** `http://127.0.0.1:54321`
- **GraphQL URL:** `http://127.0.0.1:54321/graphql/v1`
- **DB URL:** `postgresql://postgres:postgres@127.0.0.1:54322/postgres`
- **Studio URL:** `http://127.0.0.1:54323`
- **Anon Key:** `eyJhbGci...`
- **Service Role Key:** `eyJhbGci...`

### Step 3: Apply Database Migrations & Seed Data
```powershell
# Apply all schema migrations in supabase/migrations
npx supabase migration up

# Seed academic taxonomy (CBSE, ICSE, Classes 1-12, Categories, Subjects, Roles)
npx supabase db reset
```

### Step 4: Bootstrap Single Super Admin Identity
Execute the secure bootstrap script to provision the single Super Admin account:
```powershell
# Run the super admin bootstrap CLI helper
pnpm --filter @projectbee/admin run bootstrap:superadmin --email "admin@projectbee.in"
```

### Step 5: Start Development Servers
Run the full monorepo development stack concurrently:
```powershell
# Start both apps/web (port 3000) and apps/admin (port 3001)
pnpm dev
```
- **Customer Storefront:** Accessible at `http://localhost:3000`
- **Admin Console:** Accessible at `http://localhost:3001`
- **Supabase Studio:** Accessible at `http://localhost:54323`

---

## 6. Multi-Environment Staging & Deployment Strategy

To prevent configuration drift and guarantee stability, ProjectBee utilizes three isolated environments:

```mermaid
flowchart LR
    A["Local Development\n(Mock OTP / Local DB)"] -->|PR Merged| B["Staging Environment\n(Test WhatsApp / Staging Supabase)"]
    B -->|QA & Security Gate Sign-off| C["Production Environment\n(Live WhatsApp / Prod Supabase)"]
```

### 6.1 Environment Segregation
1. **Local Development:**
   - Database: Local Supabase Docker container.
   - WhatsApp OTP: In-memory mock adapter printing OTP to local server console.
   - Email: Inbucket local mailbox emulator (`http://localhost:54324`).
2. **Staging Environment:**
   - Dedicated Supabase Staging project with test data (no real child or customer data).
   - WhatsApp Test phone numbers configured via Meta Cloud API Sandbox.
   - Hosted on `staging.projectbee.in` and `admin-staging.projectbee.in`.
3. **Production Environment:**
   - Dedicated Supabase Production project with automated daily PITR (Point-in-Time Recovery).
   - Dedicated Indian WhatsApp BSP account and transactional email provider.
   - Strict IP allowlisting or VPN for `admin.projectbee.in`.

---

## 7. Operational Health Checks & Verification Commands

Verify environment health using the following commands:

```powershell
# 1. Typecheck all workspace packages
pnpm run typecheck

# 2. Run unit & integration tests
pnpm run test

# 3. Check for security vulnerabilities & leaked credentials
pnpm run audit
```
