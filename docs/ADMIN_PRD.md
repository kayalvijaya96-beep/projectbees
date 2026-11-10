# ProjectBee — Admin Product Requirements Document

**Version:** 1.0  
**Audience:** Authorized operational Admin users

## 1. Purpose
The Admin Console is the operational workspace for managing ProjectBee's dynamic catalogue, inventory, orders, customer support and approved content. Admins can perform actions without a separate approval workflow when their assigned permissions allow it. Super Admin oversight is provided through audit logs.

## 2. Access and security
- Admin accounts are provisioned/invited by the Super Admin; no public Admin registration.
- Authenticate using the approved secure identity flow.
- Enforce active status and permissions on the server for every protected action.
- Use least-privilege, granular permissions.
- Admins cannot promote themselves, assign their own permissions or create a Super Admin.
- Deactivation and permission changes must take effect promptly.
- Log privileged actions with actor, action, resource, timestamp and safe change metadata.

## 3. Dashboard
Display operational summaries such as:
- New and active orders.
- Orders by fulfilment status.
- Low/out-of-stock products.
- Recent catalogue updates.
- Pending review moderation.
- Relevant operational alerts.

Only show metrics and records permitted by the Admin's permissions.

## 4. Catalogue management
Admins with the relevant permissions can:
- Create, edit, publish, unpublish and archive products.
- Manage title, descriptions, SKU/internal reference, price and availability.
- Associate products with CBSE/ICSE, classes 1–12, subjects, categories and tags.
- Manage product attributes, included materials and specifications.
- Set selling price and update it dynamically.
- View price/change history.
- Manage product status and featured placement.
- Preview how a product appears on the customer website.
- Preserve historical order snapshots when a catalogue item changes.

## 5. Media management
- Upload, reorder and remove product images.
- Validate actual file type and size.
- Use approved Supabase Storage buckets and access policies.
- Store approved Instagram, Facebook and YouTube links.
- Provide safe previews/embeds only for allowlisted providers.
- Never accept arbitrary iframe HTML or script URLs.
- Avoid unnecessary video uploads to reduce storage and bandwidth costs.

## 6. Category and taxonomy management
- Create and edit categories and subcategories.
- Manage subject, board and class associations.
- Set display order and visibility.
- Prevent deletion where historical products or orders depend on a record; archive or reassign instead.
- Validate taxonomy changes before publishing.

## 7. Pricing and inventory
- Update selling prices subject to assigned permission.
- Maintain stock quantity and availability.
- Record every stock adjustment with reason and actor.
- Maintain stock movement history.
- Define low-stock thresholds.
- Prevent negative inventory unless an explicitly approved business rule allows it.
- Use atomic backend operations to prevent overselling.

## 8. Order management
- View and filter orders according to permission.
- Open order details needed for fulfilment.
- Update order status only through valid backend transitions.
- Record shipment/tracking information if used.
- Record COD collection only when actually collected.
- Record cancellation, failed delivery and operational notes.
- Preserve a history of status changes and actors.
- Do not expose unrelated customer data.

## 9. Customer support
- View only customer details necessary to resolve assigned issues.
- Record support notes without storing unnecessary sensitive information.
- Avoid exporting customer lists unless specifically permitted.
- Log sensitive customer-data access where appropriate.

## 10. Reviews and moderation
- View ratings and reviews.
- Hide, restore or flag content according to permission.
- Require a reason for moderation actions.
- Record moderation history.
- Never fabricate verified-purchase status; the backend derives eligibility from order records.

## 11. Content management
Where permission is granted, manage approved public content such as About, Mission, Vision, FAQs, Contact information and policy page content. Sanitize rich text and validate links before publishing. Legal policies require authorized review before publication.

## 12. Reports and exports
- Basic sales, order, inventory and product performance reports.
- Date and status filters.
- Export permissions must be separate from ordinary read permissions.
- Exports must minimize personal data and be audit-logged.
- Do not expose child/customer information to staff without a legitimate operational need.

## 13. Admin settings
Admins may access only operational settings explicitly granted to them. Global security settings, role definitions and Super Admin controls remain restricted.

## 14. Suggested permission keys
- `dashboard.view`
- `products.view`, `products.create`, `products.edit`, `products.publish`, `products.archive`
- `categories.view`, `categories.manage`
- `media.manage`
- `pricing.view`, `pricing.edit`
- `inventory.view`, `inventory.adjust`
- `orders.view`, `orders.update`, `orders.cancel`, `orders.record_cod`
- `reviews.view`, `reviews.moderate`
- `content.view`, `content.edit`, `content.publish`
- `customers.support_view`
- `reports.view`, `reports.export`

Final assignments are controlled by the Super Admin. Backend checks must enforce every permission.

## 15. Acceptance criteria
- Admin sees only permitted modules and records.
- Unauthorized API calls are rejected even if manually constructed.
- Product, media, category, price and stock changes are persisted and validated.
- Order transitions follow the backend state machine.
- COD collection is separately recorded.
- Reviews can be moderated only by authorized staff.
- All privileged mutations are auditable.
- Admins cannot alter audit history or escalate their privileges.
