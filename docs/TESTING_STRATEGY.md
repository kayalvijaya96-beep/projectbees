# ProjectBee — Testing Strategy

**Version:** 1.0  
**Purpose:** Define quality gates for customer, Admin, Super Admin and backend workflows.

## 1. Testing principles
- Test business rules at the backend, not only through UI tests.
- Include negative/unauthorized cases for every protected workflow.
- Use isolated test accounts and non-production data.
- Never use real children's personal data in test fixtures.
- Run tests on every relevant change and before release.

## 2. Test layers
### Unit
- Input validation.
- Price and shipping calculations.
- Order-state transition rules.
- Permission evaluation.
- Search normalization and ranking helpers.
- Review eligibility.

### Integration
- Supabase Auth.
- RLS policies.
- Edge Functions/server routes.
- Storage upload/download policies.
- Email and WhatsApp provider adapters.
- Database transactions and constraints.

### End-to-end
- Guest browsing/search.
- Customer OTP login and onboarding.
- Address and cart.
- COD checkout and order confirmation.
- Order history.
- Admin catalogue and inventory operations.
- Admin order fulfilment.
- Super Admin invitation and permission management.
- Verified review and moderation.

### Non-functional
- Mobile responsiveness.
- Accessibility.
- Search latency and relevance.
- Checkout concurrency.
- Security and privacy.
- Backup restoration and rollback.

## 3. Role test matrix
| Action | Guest | Customer | Admin without permission | Authorized Admin | Super Admin |
|---|---|---|---|---|---|
| Browse published catalogue | Allow | Allow | Allow | Allow | Allow |
| Read own profile | Deny | Allow | N/A | N/A | N/A |
| Read another customer's order | Deny | Deny | Deny | Only if specifically permitted/needed | Only if authorized operationally |
| Create/publish product | Deny | Deny | Deny | Permission-based | Allow |
| Adjust inventory | Deny | Deny | Deny | Permission-based | Allow |
| Manage Admin permissions | Deny | Deny | Deny | Deny | Allow |
| Read audit logs | Deny | Deny | Deny | Deny | Allow |

## 4. Core test cases

### Guest catalogue
- Search works without authentication.
- Only published products are returned.
- Guest preview omits restricted fields.
- Draft and archived products cannot be discovered by guessing IDs/slugs.
- Filters combine correctly and pagination is stable.

### Authentication/profile
- Valid email OTP succeeds.
- Invalid, expired and reused OTP fails.
- Rate limits apply.
- Authentication responses do not reveal account existence.
- Optional profile cards can be skipped.
- Customer A cannot access Customer B's profile or addresses.

### Search
- Search title, description, tags and synonyms.
- Handle common misspellings where supported.
- Apply board/class/category filters correctly.
- Explicit query for another class is not blocked by profile defaults.
- No unpublished product leaks through search facets or counts.

### Cart/checkout
- Client cannot tamper with price or total.
- Checkout revalidates stock and product status.
- Invalid/expired/replayed WhatsApp OTP fails.
- OTP challenge cannot be reused for a different checkout.
- Duplicate request does not create duplicate order.
- Concurrent checkout cannot oversell stock.
- COD order starts unpaid.
- COD collection requires authorized action.

### Orders
- Customer sees only own orders.
- Invalid state transitions are rejected.
- Every transition has actor/time/reason where required.
- Order item snapshots remain unchanged after catalogue price/title edits.

### Admin
- Every permission is tested for allow and deny.
- Admin cannot change own permissions.
- Admin cannot create/promote Super Admin.
- Unauthorized exports fail.
- Product and stock changes create audit records.
- Admin cannot edit/delete audit logs.

### Super Admin
- Only configured Super Admin can access endpoints.
- Admin invitation and deactivation work.
- Permission updates take effect.
- Single Super Admin invariant cannot be violated.
- Audit filters return correct records without secrets or unnecessary personal data.

### Reviews
- Only qualifying delivered order items permit verified-purchase review.
- Client-supplied verification flag is ignored.
- Duplicate review policy enforced.
- Moderation requires permission and reason.
- Review text is safely rendered.

### Uploads/content
- Reject invalid file types and oversized files.
- Sanitize product descriptions and CMS content.
- Reject arbitrary iframe/script URLs.
- Validate external links against allowlist.

## 5. Security test scenarios
- IDOR using another user's IDs.
- SQL injection attempts in search and filters.
- XSS in product descriptions, reviews and support text.
- CSRF/session risks where relevant to chosen auth model.
- OTP brute force, replay and resend abuse.
- Privilege escalation through modified request payloads.
- Service-role key search in source, bundles and logs.
- Webhook signature failure and replay.
- Rate-limit bypass attempts.
- Sensitive data exposure through logs and analytics.

## 6. Performance and accessibility
- Test common mobile viewport sizes and slow network conditions.
- Optimize image loading and avoid oversized media.
- Measure search latency using representative catalogue volume.
- Measure key page performance and checkout response time.
- Keyboard-test navigation, dialogs and forms.
- Check labels, focus order, contrast and screen-reader semantics.

## 7. Test environments and data
- Separate development, staging and production.
- Use synthetic test identities and addresses.
- Never copy production child/customer data into development.
- Keep provider test credentials separate from production.
- Reset test data safely and predictably.

## 8. Release gates
- All critical customer journeys pass.
- All role/permission negative tests pass.
- RLS and ownership tests pass.
- OTP and checkout replay/idempotency tests pass.
- No unresolved critical/high security issue.
- Backup restoration and rollback tested.
- Privacy/legal review completed.
- Known medium/low issues documented with owner and target date.

## 9. Defect severity
- Critical: unauthorized access to customer data, exposed privileged key, Super Admin privilege escalation. Block release.
- High: cross-customer access, permission bypass, price/order manipulation. Block release.
- Medium: constrained abuse or privacy/logging weakness. Fix before launch or document time-bound mitigation.
- Low: hardening or minor UX issue with no meaningful exploit path. Track.

## 10. Test report template
For each release record:
- Build/version:
- Environment:
- Tester:
- Date:
- Test suite and result:
- Failed cases:
- Security findings:
- Privacy findings:
- Known issues:
- Go/no-go decision:
