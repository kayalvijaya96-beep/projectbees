# ProjectBee — API Specification

**Version:** 1.0  
**Style:** JSON APIs via secure server routes and/or Supabase Edge Functions  
**Status:** Contract blueprint; align exact routes with the chosen framework.

## 1. General conventions
- Base path: `/api/v1`.
- JSON request/response bodies.
- HTTPS only in production.
- Authenticate using verified Supabase Auth sessions.
- Protected endpoints derive user identity from the verified token.
- Validate every request with schemas.
- Never trust client role, price, stock, total or verified-purchase flags.
- Use request IDs and safe error responses.
- Apply rate limits to OTP, search, checkout and abuse-sensitive actions.

## 2. Response shape

Success:
```json
{
  "data": {},
  "meta": {
    "request_id": "server-generated-id"
  }
}
```

Error:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request could not be processed."
  },
  "meta": {
    "request_id": "server-generated-id"
  }
}
```

Do not return stack traces, SQL, secrets or unnecessary internal details.

## 3. Public catalogue
- `GET /catalogue/products` — published products only; supports query, board, class, subject, category, project type, price range, availability, sort and pagination.
- `GET /catalogue/products/{slug}` — guest-safe product preview.
- `GET /catalogue/categories` — active public categories.
- `GET /catalogue/filters` — available filter values.
- `GET /content/pages/{slug}` — published public page.

Public responses must omit restricted fields server-side.

## 4. Customer authentication
Supabase Auth email OTP endpoints may be used directly according to the configured provider and supported client SDK. Application wrapper endpoints, if used:
- `POST /auth/email-otp/request`
- `POST /auth/email-otp/verify`

Apply expiration, single-use semantics, rate limits and generic responses. Do not log OTPs or disclose account existence.

## 5. Customer profile and addresses
- `GET /me`
- `PATCH /me`
- `GET /me/addresses`
- `POST /me/addresses`
- `PATCH /me/addresses/{addressId}`
- `DELETE /me/addresses/{addressId}`

All operations are scoped to the authenticated customer. Validate class range, board and optional profile fields.

## 6. Cart
- `GET /me/cart`
- `POST /me/cart/items`
- `PATCH /me/cart/items/{itemId}`
- `DELETE /me/cart/items/{itemId}`

Validate product publication status and quantity. Totals are calculated by the server.

## 7. Checkout and COD
- `POST /checkout/preview`
- `POST /checkout/intents`
- `POST /checkout/whatsapp-otp/request`
- `POST /checkout/whatsapp-otp/verify`
- `POST /checkout/orders`

The OTP challenge must be bound to a checkout intent and phone number. Enforce expiry, attempt limits, resend cooldown, provider webhook signature verification where applicable and replay protection. OTP is evidence of control of the number, not proof of guardian identity or consent.

`POST /checkout/orders` must:
- Require authenticated customer.
- Require valid verified checkout intent.
- Recalculate price and shipping server-side.
- Revalidate stock and product status.
- Enforce idempotency.
- Create order and inventory changes atomically.
- Set payment method to COD and initial payment status to unpaid.

## 8. Customer orders and reviews
- `GET /me/orders`
- `GET /me/orders/{orderId}`
- `POST /me/orders/{orderId}/reviews`
- `GET /catalogue/products/{productId}/reviews`

Customers can access only their own orders. Review eligibility is derived server-side from qualifying delivered order items.

## 9. Admin endpoints
Examples; each endpoint requires active Admin status and its specific permission:
- `GET /admin/dashboard`
- `GET /admin/products`
- `POST /admin/products`
- `PATCH /admin/products/{productId}`
- `POST /admin/products/{productId}/publish`
- `POST /admin/products/{productId}/archive`
- `POST /admin/products/{productId}/media`
- `GET /admin/categories`
- `POST /admin/categories`
- `PATCH /admin/categories/{categoryId}`
- `POST /admin/inventory/adjustments`
- `GET /admin/orders`
- `GET /admin/orders/{orderId}`
- `POST /admin/orders/{orderId}/transitions`
- `POST /admin/orders/{orderId}/cod-collection`
- `GET /admin/reviews`
- `POST /admin/reviews/{reviewId}/moderation`
- `GET /admin/reports`

Do not rely on frontend route visibility. Every mutation must be validated and audited.

## 10. Super Admin endpoints
- `GET /super-admin/admins`
- `POST /super-admin/admins/invitations`
- `PATCH /super-admin/admins/{adminId}/status`
- `PUT /super-admin/admins/{adminId}/permissions`
- `GET /super-admin/permissions`
- `GET /super-admin/audit-logs`
- `GET /super-admin/settings`
- `PATCH /super-admin/settings`
- `GET /super-admin/system-health`

All endpoints require the single active Super Admin identity. Protect bootstrap and recovery operations separately; do not expose a public Super Admin creation endpoint.

## 11. Uploads and webhooks
- Issue short-lived upload permissions or signed URLs only after authorization.
- Validate file content, type and size.
- Webhook handlers verify provider signatures, timestamps and replay/idempotency.
- Do not accept arbitrary embed HTML or script URLs.

## 12. Standard error codes
- `UNAUTHENTICATED`
- `FORBIDDEN`
- `NOT_FOUND`
- `VALIDATION_ERROR`
- `RATE_LIMITED`
- `CONFLICT`
- `OUT_OF_STOCK`
- `OTP_EXPIRED`
- `OTP_INVALID`
- `IDEMPOTENCY_CONFLICT`
- `INVALID_STATE_TRANSITION`
- `PROVIDER_UNAVAILABLE`
- `INTERNAL_ERROR`

## 13. API acceptance tests
Test guest access, customer ownership, Admin permission denials, Super Admin-only access, invalid payloads, rate limits, OTP replay, price tampering, checkout retries, inventory concurrency, order-state transitions and review eligibility.
