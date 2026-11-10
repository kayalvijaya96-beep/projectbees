# ProjectBee — Customer Website Product Requirements Document

**Version:** 1.0  
**Product:** ProjectBee  
**Company:** YugaYatra Retail (OPC) Private Limited  
**Market:** India; launch focus can begin in Bengaluru, with pan-India delivery planned  
**Audience:** School students and their parents/guardians  
**Boards:** CBSE and ICSE  
**Language:** English  
**V1 payment:** Cash on Delivery (COD) only

## 1. Product vision
ProjectBee is a simple, mobile-first online catalogue and ordering platform for ready-to-use school projects, science models, charts, educational kits and curriculum-related school materials. It helps students and parents find suitable items by class, board, subject and project type, and order them without navigating a complicated shopping experience.

## 2. Product principles
- Very simple, clean and tap-friendly interface.
- Mobile-first and responsive.
- Guest users can discover products without creating an account.
- Ask for sign-in only when the user tries to access an account-only feature.
- Keep the catalogue relevant to the student's class and board.
- Let users search outside their default class when they explicitly want to.
- Collect the minimum personal data necessary.
- Protect children's data and involve parents/guardians where legally required.
- COD only in V1; no online payment gateway in this release.

## 3. User roles
### Guest
- Browse public pages, categories and product previews.
- Search and filter the public catalogue.
- View only fields deliberately approved for public display.
- Be prompted to sign in when attempting a restricted action.

### Customer
- Sign in using email OTP; no username/password flow is required.
- View full product information where access requires authentication.
- Maintain a basic profile and delivery addresses.
- Add products to cart and place COD orders.
- View their own order history and status.
- Submit eligible product reviews after qualifying delivery.

## 4. Customer authentication
- Email OTP is the customer sign-in method.
- OTPs must expire, be single-use and have resend/attempt limits.
- Do not reveal whether an email is registered through authentication responses.
- Session validation and protected data access must be enforced by the backend.
- Guest browsing must remain available.

## 5. Progressive onboarding
Do not use one long mandatory form. Use short, sequential cards that work well on mobile.

### First profile card
- Name: required for the agreed initial profile flow.
- Class: required to personalize the default catalogue.
- Gender: optional; do not use it to restrict products or services.

Capture CBSE/ICSE board where needed for relevant recommendations. Additional profile questions may be offered later in separate cards and must be skippable unless a specific operational/legal need is established. Do not require a complete profile to browse the site.

Profile completion percentage may be displayed as an informational feature. It must not block core functionality.

## 6. Academic classification
- Support CBSE and ICSE.
- Support classes 1 through 12.
- Catalogue products by board, class, subject, category and project type as applicable.
- Seed a maintainable taxonomy rather than hard-coding categories into frontend components.
- Default recommendations should prioritize the user's selected class and board.
- Explicit searches must be able to return other classes when relevant.

## 7. Catalogue and product discovery
### Homepage
- ProjectBee branding and simple navigation.
- Prominent search bar.
- Clear category tiles.
- Class/board discovery shortcuts.
- Curated and popular product sections.
- Minimal clutter and concise product cards.

### Search
Search should support:
- Product title and description.
- Keywords, tags and synonyms.
- Subject, class, board and category.
- Common spelling variations where practical.
- Filters for class, board, subject, category, project type, availability and price.
- Sorting and pagination.
- Useful empty states and suggestions.

Use Supabase-backed search. Evaluate PostgreSQL full-text search, trigram matching and indexed structured filters. Do not expose draft or archived products in public search.

### Guest product preview
Guests may see an approved subset such as title, thumbnail, class, board, category and a short description. Full details, ordering or other restricted fields can require sign-in. Enforce this on the server; hiding fields in the UI alone is not security.

### Product detail
Support product images, title, description, class/board suitability, subject/category, included items, dimensions/specifications where applicable, price, availability, delivery information, ratings/reviews and approved social media links. Use external social links or safe provider embeds rather than uploading large duplicate videos. Do not allow arbitrary iframe or script URLs.

## 8. Cart and checkout
- Customer must be authenticated to place an order.
- Recalculate product prices, discounts if any, shipping and totals on the server.
- Validate current product status and inventory at checkout.
- Collect recipient/guardian contact details and delivery address.
- Guardian/contact name is required in the agreed checkout flow.
- COD is the only payment method in V1.
- No card, UPI or payment gateway collection in V1.
- WhatsApp OTP verification is planned for the checkout phone number before COD order confirmation.
- OTP verifies control of the WhatsApp number only; it does not establish age, identity, parent relationship or legal consent.
- Order creation must be idempotent and inventory-safe.
- Show order confirmation and a clear order reference.

## 9. Orders
Customer features:
- View own orders.
- View order items and order status.
- See delivery/contact details relevant to the order.
- Receive appropriate order updates.

Order states must be controlled by a backend state machine. Suggested states include pending confirmation, confirmed, processing, packed, shipped, out for delivery, delivered, cancelled and delivery failed. Final transitions must be defined in the order operations policy.

COD orders remain unpaid until collection is recorded by an authorized operator.

## 10. Ratings and reviews
- Ratings and reviews are available for eligible customers.
- Only qualifying delivered purchases can be marked verified-purchase.
- Eligibility must be calculated on the server.
- Prevent duplicate reviews according to the approved policy.
- Include moderation and reporting controls.
- Never trust a client-supplied verified-purchase flag.

## 11. Public information pages
Provide:
- Home
- About Us
- Mission
- Vision
- Contact Us
- FAQ
- Privacy Policy
- Terms and Conditions
- Shipping and Delivery Policy
- Cancellation and Return Policy
- Sitemap

Policies must be reviewed for applicable Indian legal requirements before launch.

## 12. Child privacy and data protection
ProjectBee may be used by children. Apply privacy by design:
- Collect only data necessary for defined purposes.
- Avoid collecting full date of birth, school name, precise location or child photos unless necessary and reviewed.
- Clearly explain data use in age-appropriate language.
- Do not use children's personal data for unrelated advertising or profiling.
- Restrict staff access to customer information by role and operational need.
- Define retention, deletion, correction and access request processes.
- Obtain legally required verifiable parental/guardian consent through a separately reviewed process.
- A guardian name and WhatsApp OTP alone must not be represented as proof of guardian identity or consent.
- Obtain qualified legal review of applicable Indian data protection and e-commerce requirements before launch.

## 13. UX and accessibility
- Mobile-first responsive design.
- Large, clear tap targets.
- Simple labels and short forms.
- Consistent navigation and back behaviour.
- Visible loading, success, empty and error states.
- Keyboard accessibility, focus indicators and adequate color contrast.
- Optimize image sizes and page performance for slower networks.

## 14. Analytics and privacy
Use privacy-conscious operational analytics. Avoid sending names, email addresses, phone numbers, delivery addresses, OTPs or detailed child profile information to analytics tools. Define event purposes and retention.

## 15. V1 exclusions
- Engineering project marketplace.
- State-board-specific catalogue at launch.
- Multilingual UI.
- Online payment gateway.
- Native mobile application.
- Unmoderated public reviews.
- Advanced recommendation/advertising profiling.
- Arbitrary video hosting.

## 16. Acceptance criteria
V1 is acceptable when:
1. Guests can browse and search without login.
2. Restricted data is not returned to guests.
3. Customers can sign in using email OTP.
4. Progressive onboarding works and optional fields can be skipped.
5. Search and class/board filters work correctly.
6. Customers can manage their own addresses and cart.
7. COD checkout validates price, stock and WhatsApp phone verification.
8. Duplicate checkout requests do not create duplicate orders.
9. Customers can view only their own orders.
10. Eligible delivered purchases can be reviewed.
11. Privacy, security, operational and legal launch gates are completed.
