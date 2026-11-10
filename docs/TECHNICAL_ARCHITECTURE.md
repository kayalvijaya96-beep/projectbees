# ProjectBee — Technical Architecture

**Version:** 1.0  
**Architecture style:** Responsive web applications with a shared Supabase backend

## 1. Architecture goals
- Secure customer, Admin and Super Admin experiences.
- One canonical catalogue, inventory and order data source.
- Mobile-first performance.
- Server-side authorization and validation.
- Maintainable, incremental delivery.
- Avoid unnecessary infrastructure and media costs.

## 2. Logical architecture

```text
Customer Browser       Admin Browser       Super Admin Browser
       |                     |                       |
       +---------------------+-----------------------+
                             |
                    Web application layer
                             |
                Authenticated API / Edge Functions
                             |
       +---------------------+----------------------+
       |                     |                      |
  Supabase Auth         PostgreSQL + RLS       Supabase Storage
       |                     |                      |
       +---------------------+----------------------+
                             |
                External service integrations
                  Email OTP / WhatsApp OTP
```

## 3. Suggested technology
Validate against the existing repository before selecting or changing versions:
- Frontend: React with TypeScript; Next.js or the existing approved framework.
- Styling: Tailwind CSS and reusable accessible components.
- Backend/data: Supabase PostgreSQL.
- Authentication: Supabase Auth email OTP.
- Server-side workflows: Supabase Edge Functions and/or secure server routes.
- Media: Supabase Storage with bucket policies.
- Hosting: existing approved deployment platform.
- Version control: GitHub.
- Development environment: Antigravity.

Do not introduce a second backend or duplicate user database without a documented reason.

## 4. Application boundaries
Customer website:
- Guest catalogue/search.
- Customer authentication, profile and addresses.
- Cart, COD checkout and order history.
- Reviews and public pages.

Admin Console:
- Catalogue, media, category, pricing and inventory operations.
- Order fulfilment and COD collection records.
- Review moderation, content and permitted reports.

Super Admin Console:
- Single Super Admin access.
- Admin provisioning and permission management.
- Global configuration and audit oversight.

These may be separate routes/apps or packages, but must share API contracts and the same canonical backend.

## 5. Backend boundaries
Use PostgreSQL as the source of truth for:
- Users/profile references.
- Academic taxonomy.
- Products and media metadata.
- Inventory and stock movements.
- Carts and addresses.
- Orders and order item snapshots.
- Reviews and moderation.
- Admin identities, roles and permissions.
- Audit events and system settings.

Use Edge Functions/server routes for privileged operations such as OTP orchestration, checkout, inventory transactions, role management and integrations. Never expose the Supabase service-role key to browsers.

## 6. Authentication and authorization
- Customer: email OTP.
- Admin/Super Admin: secure provisioned identities; MFA for privileged users where supported.
- Determine actor identity from verified auth context.
- Check active status and permission on the server for each privileged operation.
- RLS protects exposed database access.
- UI route guards improve UX but are not security boundaries.

## 7. Search architecture
Start with PostgreSQL full-text search and indexed structured filters. Consider `pg_trgm` for typo tolerance and partial matching where supported. Maintain normalized search text, tags and synonyms. Index common filters such as board, class, category, status and availability. Measure search quality and latency before adding a dedicated search service.

## 8. Checkout and inventory architecture
- Client submits product identifiers and quantities, not trusted prices.
- Server loads current prices and stock.
- Validate delivery and checkout data.
- Verify the WhatsApp OTP challenge bound to the checkout intent.
- Create order and update/reserve stock atomically.
- Use idempotency to prevent duplicate orders.
- Preserve order item snapshots.
- COD remains unpaid until collection is recorded.

## 9. Media architecture
- Store product images in controlled Storage buckets.
- Store social media URLs as metadata.
- Allow embeds only from trusted providers.
- Avoid hosting large duplicate videos unless there is a business requirement.
- Validate uploaded files by content, size and allowed type.

## 10. Environments and deployment
Maintain separate development, staging and production Supabase projects. Keep secrets in environment/secret management. Apply reviewed migrations through a controlled process. Use protected GitHub branches and deployment credentials with least privilege. Configure HTTPS, monitoring, backups and rollback procedures.

## 11. Observability
Use request IDs, structured safe logs, error monitoring and alerts for OTP failures, checkout errors, webhook failures, authorization denials and privileged account changes. Never log OTPs, tokens, passwords or unnecessary child personal data.

## 12. Architecture decisions requiring validation
- Existing framework and repository structure.
- Hosting provider and deployment flow.
- WhatsApp OTP provider and webhook verification method.
- Email delivery provider and sender-domain configuration.
- Shipping rates, serviceability and tracking integration.
- Exact schema and migration approach.
- Backup plan and recovery objectives.
- Legal requirements for children's data and guardian consent.

## 13. Non-functional requirements
- Responsive mobile-first UX.
- Accessible keyboard navigation and contrast.
- Server-side authorization on every protected operation.
- RLS and automated negative tests.
- Search performance measured against expected catalogue size.
- Atomic order/inventory operations.
- Backup restoration tested.
- No critical/high security issues at launch.
