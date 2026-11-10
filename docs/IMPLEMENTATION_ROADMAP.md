# ProjectBee — Implementation Roadmap

**Version:** 1.0  
**Purpose:** Phase-by-phase delivery plan for Antigravity.

## Delivery principles
1. Inspect before modifying existing code or schema.
2. Use one shared Supabase backend.
3. Build mobile-first.
4. Implement server-side authorization and tests with each feature.
5. V1 is COD only.
6. Admins act within assigned permissions; no approval workflow.
7. Super Admin oversees via audit logs.
8. Do not collect unnecessary child data.
9. Complete a phase only when its acceptance criteria pass.

## Phase 0 — Discovery
- Inspect repository, framework, package manager and build scripts.
- Inspect Supabase tables, migrations, functions, RLS and Storage.
- Inspect existing customer/Admin/Super Admin work.
- Compare implementation with all documents.
- Produce gap report and non-destructive migration plan.
**Exit:** Existing work and risks understood; no production data changed.

## Phase 1 — Design foundation
- Confirm approved logo and logo-derived colors.
- Define typography, spacing, buttons, cards, forms and navigation.
- Build responsive and accessible shared components.
- Define loading, empty, error and success states.
**Exit:** Reusable mobile/desktop design system reviewed.

## Phase 2 — Backend and security foundation
- Reconcile schema with live database.
- Create reviewed migrations.
- Configure environments and Auth.
- Implement RBAC and Super Admin bootstrap.
- Enable/test RLS and Storage policies.
- Add safe logging, error format and automated tests.
**Exit:** Migrations, auth, RLS and negative tests pass in staging.

## Phase 3 — Academic taxonomy and catalogue
- Seed CBSE/ICSE and classes 1–12.
- Create maintainable subjects/categories/project types.
- Implement products, media, prices, publication and inventory.
- Add safe social links and search metadata.
**Exit:** Admin can manage valid products; unpublished items remain private.

## Phase 4 — Public website and discovery
- Build homepage, navigation and class/category landing pages.
- Build guest-safe catalogue and product preview.
- Implement search, filters, sorting and pagination.
- Build About, Mission, Vision, Contact, FAQ and policy pages.
- Add metadata and sitemap.
**Exit:** Guests can browse/search; restricted data is not returned.

## Phase 5 — Customer identity and onboarding
- Implement email OTP.
- Implement progressive profile cards and skippable optional fields.
- Implement profile and address management.
- Personalize defaults by class/board without restricting explicit search.
**Exit:** Customer can sign in and access only their own data.

## Phase 6 — Cart and COD checkout
- Implement cart and server-side total calculation.
- Validate address, product status and inventory.
- Integrate selected WhatsApp OTP provider.
- Bind verification to checkout intent and phone.
- Implement atomic order creation and idempotency.
- Keep COD unpaid until collection.
**Exit:** End-to-end COD order passes replay, retry and concurrency tests.

## Phase 7 — Admin operations
- Build Admin dashboard and permission-aware modules.
- Implement catalogue, media, categories, price and stock management.
- Implement order fulfilment and COD collection recording.
- Add basic operational reports.
**Exit:** Admin can perform permitted tasks; invalid transitions denied and actions audited.

## Phase 8 — Super Admin
- Build Super Admin console.
- Implement Admin invitations, activation and permission assignment.
- Enforce single Super Admin.
- Implement audit search, settings and safe health indicators.
**Exit:** Admin cannot escalate; Super Admin can inspect audit events.

## Phase 9 — Reviews, content and support
- Implement delivered-purchase review eligibility.
- Implement review moderation and audit.
- Implement safe CMS and support request workflow.
**Exit:** Verified-purchase logic enforced server-side; content sanitized.

## Phase 10 — QA, privacy and launch readiness
- Run end-to-end customer/Admin/Super Admin journeys.
- Run RLS, IDOR, permissions, OTP, checkout and concurrency tests.
- Test mobile, accessibility, performance and backup restore.
- Complete legal/privacy review and publish approved policies.
**Exit:** No critical/high security issues; business owner signs off.

## Phase 11 — Controlled launch
- Launch to limited audience where feasible.
- Monitor search, OTP, checkout, inventory and fulfilment.
- Review audit activity and customer feedback.
- Fix launch blockers before scaling.
**Exit:** Operational team can fulfil orders and support users.

## Critical path
Discovery → Design/Backend foundation → Taxonomy/catalogue → Public discovery + customer identity → COD checkout → Admin operations → Super Admin/reviews → QA/legal review → Launch.

## Antigravity protocol
At each phase:
1. Read relevant documents.
2. Inspect current code and schema.
3. List files, migrations, functions and tests to change.
4. Define acceptance tests before implementation.
5. Implement in small increments.
6. Report changed files, migrations, tests, known issues and blockers.
7. Wait for approval before destructive changes or moving across major phase gates.

## V1 definition of done
Guests can discover products; customers can sign in and place COD orders; prices and inventory are validated server-side; Admins can manage catalogue and fulfilment within permissions; Super Admin can manage Admin access and inspect audit logs; reviews are verified; privacy/security tests pass; legal review, monitoring, backups and support are ready.
