# ProjectBee — Security Checklist

**Version:** 1.0  
**Purpose:** Implementation, verification and pre-launch security checklist. This is not a legal certification.

Status: `[ ]` Not started · `[~]` In progress · `[x]` Implemented and tested · `[N/A]` Not applicable with reason.

## 1. Governance and release gates
- [ ] Assign security owner and incident contact.
- [ ] Separate development, staging and production.
- [ ] Restrict production access to named personnel.
- [ ] Maintain system, provider and privileged-account inventory.
- [ ] Review this checklist before launch and periodically.
- [ ] Resolve all critical/high findings before launch.
- [ ] Obtain qualified legal/privacy review for applicable Indian child-data and e-commerce requirements.

## 2. Authentication
- [ ] Customer email OTP expires and is single-use.
- [ ] OTP attempts and resend requests are rate-limited.
- [ ] Authentication responses do not reveal account existence.
- [ ] Sessions expire/revoke correctly.
- [ ] Admin accounts are provisioned, not publicly registered.
- [ ] Exactly one active Super Admin is enforced.
- [ ] MFA enabled for privileged accounts where supported.
- [ ] Deactivated Admins lose access promptly.
- [ ] Secure Super Admin recovery process documented.

## 3. Authorization
- [ ] Every protected operation checks verified actor identity server-side.
- [ ] Every Admin operation checks active status and required permission.
- [ ] Customer ownership is checked for profiles, addresses, carts and orders.
- [ ] Admins cannot grant themselves permissions or promote themselves.
- [ ] Admins cannot access Super Admin endpoints.
- [ ] Frontend hiding is not treated as security.
- [ ] Negative authorization tests pass.

## 4. Supabase and database
- [ ] RLS enabled on all exposed tables.
- [ ] Policies are deny-by-default.
- [ ] SELECT, INSERT, UPDATE and DELETE policies reviewed separately.
- [ ] Views and RPC functions do not bypass access controls.
- [ ] SECURITY DEFINER functions use safe search path and explicit authorization.
- [ ] Constraints and foreign keys protect data integrity.
- [ ] Order/inventory changes are transactional.
- [ ] Audit logs cannot be edited/deleted by ordinary application roles.
- [ ] Storage buckets have intentional public/private policies.
- [ ] Backup restore has been tested.

## 5. API and secrets
- [ ] Edge Functions validate authentication and authorization.
- [ ] Inputs are schema-validated and query fields allowlisted.
- [ ] Parameterized queries/safe query builders used.
- [ ] Request size, timeouts and rate limits configured.
- [ ] CORS allowlist configured; CORS is not mistaken for authorization.
- [ ] Service-role key remains server-side.
- [ ] Provider secrets remain in secret management.
- [ ] No secrets in Git, frontend bundles, source maps or logs.
- [ ] Separate credentials for each environment.
- [ ] Errors do not disclose stack traces or database internals.

## 6. WhatsApp OTP and COD
- [ ] OTP generated and verified server-side.
- [ ] OTP expires, is single-use and cannot be replayed.
- [ ] OTP bound to phone and checkout intent.
- [ ] Attempt and resend limits enforced.
- [ ] OTP never appears in logs or API responses.
- [ ] Provider webhook signatures verified.
- [ ] Webhook processing idempotent.
- [ ] Provider failure does not silently bypass verification.
- [ ] UI accurately explains that OTP proves number control only.
- [ ] Do not claim OTP verifies age, identity, parent relationship or guardian consent.

## 7. Child privacy
- [ ] Collect only necessary personal data.
- [ ] Avoid full DOB, school name, precise location or child photos without reviewed need.
- [ ] Gender optional and not used to restrict services.
- [ ] Optional profile questions can be skipped.
- [ ] Do not use child data for unrelated advertising/profiling.
- [ ] Restrict Admin access to personal data by need and permission.
- [ ] Define retention, deletion, correction and access request processes.
- [ ] Privacy notices are clear and age-appropriate.
- [ ] Obtain legally required verifiable parental/guardian consent through a separately reviewed process.
- [ ] Guardian name plus OTP is not represented as proof of legal consent.

## 8. Catalogue and media
- [ ] Public APIs expose published products only.
- [ ] Draft/archived products excluded from public search.
- [ ] Uploads validated by content, type and size.
- [ ] Block executable and arbitrary HTML uploads.
- [ ] Rich text sanitized.
- [ ] Social embeds restricted to allowlisted providers.
- [ ] No arbitrary iframe/script URLs.
- [ ] Private media uses signed URLs.

## 9. Cart, orders and reviews
- [ ] Server recalculates price, shipping and totals.
- [ ] Client-supplied stock and discount values are not trusted.
- [ ] Checkout revalidates price, status and stock.
- [ ] Inventory updates atomic; overselling tested.
- [ ] Idempotency prevents duplicate orders.
- [ ] Order state transitions validated server-side.
- [ ] COD remains unpaid until collection recorded.
- [ ] Review eligibility derived from qualifying delivered order.
- [ ] Client cannot self-assign verified-purchase status.
- [ ] Moderation actions are permission-controlled and audited.

## 10. Admin and Super Admin
- [ ] Granular permissions documented.
- [ ] Privileged mutations are audit-logged.
- [ ] Audit records include actor, action, resource and timestamp.
- [ ] Logs exclude secrets, OTPs and unnecessary personal data.
- [ ] Admin invitation/deactivation tested.
- [ ] Destructive actions have confirmation and audit trail.
- [ ] Export permissions separate from read permissions.
- [ ] Super Admin-only controls protected server-side.

## 11. Frontend and infrastructure
- [ ] HTTPS enforced.
- [ ] Content Security Policy and security headers reviewed.
- [ ] User content escaped/sanitized.
- [ ] No privileged logic/secrets in client code.
- [ ] Logout clears user-specific cached data.
- [ ] Admin consoles not indexed.
- [ ] Branch protection and code review enabled.
- [ ] Production migrations reviewed and rehearsed in staging.
- [ ] Backup restore and rollback tested.
- [ ] Monitoring and alerting active.

## 12. Testing
- [ ] RLS tests for every exposed table.
- [ ] Cross-customer IDOR tests.
- [ ] Admin permission-denial tests.
- [ ] Super Admin endpoint tests.
- [ ] OTP expiry, replay and rate-limit tests.
- [ ] Checkout idempotency and concurrent stock tests.
- [ ] Price tampering tests.
- [ ] XSS, upload and unsafe embed tests.
- [ ] Log review for personal data and secrets.
- [ ] Independent penetration test considered before scaling.

## 13. Go-live approval
- [ ] No unresolved critical/high security issue.
- [ ] Production secrets checked.
- [ ] Auth, RLS and permission tests pass.
- [ ] COD end-to-end test passes.
- [ ] Child privacy and guardian consent approach reviewed by qualified counsel.
- [ ] Required policies approved and published.
- [ ] Monitoring, backups, recovery and support owners confirmed.

Release owner: __________  Date: __________  Environment: __________
