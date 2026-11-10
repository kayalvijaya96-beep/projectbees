-- ProjectBee Seed Data: seed.sql
-- Description: Academic Taxonomy (CBSE, ICSE, Classes 1-12), Subjects, Categories, Permissions, Roles, Bengaluru PIN Codes & Initial Curated Products

-- 1. Boards
INSERT INTO boards (id, code, name, is_active) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'CBSE', 'Central Board of Secondary Education', TRUE),
  ('a0000000-0000-0000-0000-000000000002', 'ICSE', 'Indian Certificate of Secondary Education', TRUE)
ON CONFLICT (code) DO NOTHING;

-- 2. Classes (1 through 12)
INSERT INTO classes (id, class_number, display_name) VALUES
  ('b0000000-0000-0000-0000-000000000001', 1, 'Class 1'),
  ('b0000000-0000-0000-0000-000000000002', 2, 'Class 2'),
  ('b0000000-0000-0000-0000-000000000003', 3, 'Class 3'),
  ('b0000000-0000-0000-0000-000000000004', 4, 'Class 4'),
  ('b0000000-0000-0000-0000-000000000005', 5, 'Class 5'),
  ('b0000000-0000-0000-0000-000000000006', 6, 'Class 6'),
  ('b0000000-0000-0000-0000-000000000007', 7, 'Class 7'),
  ('b0000000-0000-0000-0000-000000000008', 8, 'Class 8'),
  ('b0000000-0000-0000-0000-000000000009', 9, 'Class 9'),
  ('b0000000-0000-0000-0000-000000000010', 10, 'Class 10'),
  ('b0000000-0000-0000-0000-000000000011', 11, 'Class 11'),
  ('b0000000-0000-0000-0000-000000000012', 12, 'Class 12')
ON CONFLICT (class_number) DO NOTHING;

-- 3. Subjects
INSERT INTO subjects (id, name, slug, is_active) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'General Science', 'general-science', TRUE),
  ('c0000000-0000-0000-0000-000000000002', 'Physics', 'physics', TRUE),
  ('c0000000-0000-0000-0000-000000000003', 'Chemistry', 'chemistry', TRUE),
  ('c0000000-0000-0000-0000-000000000004', 'Biology', 'biology', TRUE),
  ('c0000000-0000-0000-0000-000000000005', 'Mathematics', 'mathematics', TRUE),
  ('c0000000-0000-0000-0000-000000000006', 'Social Science & Geography', 'social-science', TRUE),
  ('c0000000-0000-0000-0000-000000000007', 'Environmental Studies (EVS)', 'evs', TRUE),
  ('c0000000-0000-0000-0000-000000000008', 'Robotics & Computer Science', 'robotics-cs', TRUE)
ON CONFLICT (slug) DO NOTHING;

-- 4. Categories
INSERT INTO categories (id, parent_id, name, slug, description, sort_order, is_active) VALUES
  ('d0000000-0000-0000-0000-000000000001', NULL, 'Working Science Models', 'working-science-models', 'Operational physics, mechanics and electrical demonstration projects', 1, TRUE),
  ('d0000000-0000-0000-0000-000000000002', NULL, 'Still 3D Educational Models', 'still-educational-models', 'Durable non-operating visual display models for biology, geography & astronomy', 2, TRUE),
  ('d0000000-0000-0000-0000-000000000003', NULL, 'DIY Science Kits', 'diy-science-kits', 'Complete hands-on materials with step-by-step assembly guides for students', 3, TRUE),
  ('d0000000-0000-0000-0000-000000000004', NULL, 'Educational Charts & Posters', 'educational-charts', 'High-quality laminated and embossed charts aligned to CBSE & ICSE syllabus', 4, TRUE),
  ('d0000000-0000-0000-0000-000000000005', NULL, 'School Assignment & Craft Kits', 'school-assignment-kits', 'Pre-cut cardboards, foam sheets, solar panels, and specialized supplies', 5, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- 5. Permissions Catalogue
INSERT INTO permissions (permission_key, description) VALUES
  ('dashboard.view', 'View operational dashboard and sales metrics'),
  ('products.view', 'View catalogue products'),
  ('products.create', 'Create new product listings'),
  ('products.edit', 'Modify existing product specifications, descriptions and pricing'),
  ('products.publish', 'Publish or unpublish products from customer storefront'),
  ('products.archive', 'Archive products to prevent ordering'),
  ('categories.view', 'View academic categories and taxonomy'),
  ('categories.manage', 'Create or edit taxonomy and categories'),
  ('media.manage', 'Upload, reorder or delete product media and images'),
  ('pricing.view', 'View dynamic product pricing and margins'),
  ('pricing.edit', 'Update product selling and compare-at prices'),
  ('inventory.view', 'View stock levels and inventory thresholds'),
  ('inventory.adjust', 'Make manual stock adjustments with audit reason'),
  ('orders.view', 'View customer order details'),
  ('orders.update', 'Transition order fulfilment status'),
  ('orders.cancel', 'Cancel orders with operational justification'),
  ('orders.record_cod', 'Record physical cash collection on delivery'),
  ('reviews.view', 'View customer ratings and product reviews'),
  ('reviews.moderate', 'Approve, reject or flag customer reviews'),
  ('content.view', 'View public CMS policy and informational pages'),
  ('content.edit', 'Edit public page content and announcements'),
  ('content.publish', 'Publish content page updates'),
  ('customers.support_view', 'View customer profile data for support resolution'),
  ('reports.view', 'View operational and sales reports'),
  ('reports.export', 'Export customer and order reports')
ON CONFLICT (permission_key) DO NOTHING;

-- 6. Default Roles
INSERT INTO roles (id, name, description) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'Catalogue Manager', 'Full control over products, taxonomy, media, and pricing'),
  ('e0000000-0000-0000-0000-000000000002', 'Order Fulfilment Executive', 'Manage order progression, tracking numbers, and COD cash collection'),
  ('e0000000-0000-0000-0000-000000000003', 'Customer Support Representative', 'View customer orders and moderate submitted reviews')
ON CONFLICT (name) DO NOTHING;

-- 7. Serviceable Bengaluru PIN Codes (Priority Launch Area)
INSERT INTO serviceable_pincodes (pincode, city, state, is_cod_available, estimated_delivery_days) VALUES
  ('560001', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560002', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560003', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560004', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560008', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560011', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560025', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560034', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560038', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560041', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560068', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560076', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560095', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560100', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560102', 'Bengaluru', 'Karnataka', TRUE, 2),
  ('560103', 'Bengaluru', 'Karnataka', TRUE, 2)
ON CONFLICT (pincode) DO NOTHING;

-- 8. Curated Educational Products for Launch
INSERT INTO products (
  id, sku, slug, title, short_description, full_description,
  specifications, selling_price, compare_at_price, status, stock_tracking_enabled, is_featured
) VALUES
  (
    'f0000000-0000-0000-0000-000000000001',
    'PB-SCI-HYD-01',
    'hydraulic-lift-working-science-model',
    'Hydraulic Lift Working Science Model (Pascal''s Law Demonstration)',
    'Ready-to-demonstrate syringe-based hydraulic jack illustrating fluid pressure and mechanical advantage.',
    'This working hydraulic lift model visually demonstrates Pascal''s Law for CBSE and ICSE Physics curricula. Using dual fluid syringes, flexible tubing, and an acrylic scissor-lift mechanism, students can easily operate the lift by applying manual force to elevate a small toy vehicle or weight. Comes completely assembled and tested with colored liquid reservoirs and a clear instruction pamphlet outlining the scientific formulas and viva voce questions.',
    '{"materials": ["BPA-free medical grade syringes", "Non-toxic food-color fluid", "Clear acrylic scissor frame", "Silicone tubing"], "dimensions": "22 x 14 x 18 cm", "weight_grams": 380, "difficulty": "Easy", "assembly_required": false, "safety_warnings": "Safe for children; do not ingest colored liquid"}',
    499.00,
    649.00,
    'published',
    TRUE,
    TRUE
  ),
  (
    'f0000000-0000-0000-0000-000000000002',
    'PB-SCI-WND-02',
    'windmill-electricity-generator-working-model',
    'Windmill Electricity Generator Working Model with LED Glow',
    'Working wind energy converter model that turns kinetic blade rotation into electrical energy to illuminate an LED house.',
    'Designed specifically for Class 7 to 10 science exhibitions, this working windmill generator converts wind energy into electrical power. Features high-efficiency aerodynamically curved propeller blades mounted on a low-friction DC dynamo motor. When blown with a standard home fan or hairdryer, the generated power lights up an LED bulb inside an attached miniature cottage. Includes an educational summary card explaining renewable energy concepts.',
    '{"materials": ["High-grade ABS propeller", "Low-RPM DC generator motor", "Wooden display base", "High-luminance 5mm LED", "Miniature acrylic house"], "dimensions": "25 x 15 x 30 cm", "weight_grams": 420, "difficulty": "Easy", "assembly_required": false, "safety_warnings": "Keep fingers clear of rotating blades during high-speed fan tests"}',
    599.00,
    799.00,
    'published',
    TRUE,
    TRUE
  ),
  (
    'f0000000-0000-0000-0000-000000000003',
    'PB-BIO-HRT-03',
    'human-heart-3d-dissectible-model',
    'Human Heart 3D Anatomical Dissectible Educational Model',
    'Detailed 2-part dissectible human heart model displaying atria, ventricles, valves and major blood vessels.',
    'An accurate 3D dissectible model of the human heart designed to support CBSE Class 10 Biology (Life Processes) and ICSE Class 9/10 Human Anatomy. The anterior heart wall can be detached to reveal internal structures including the left and right ventricles, tricuspid and bicuspid valves, pulmonary artery, and aorta. Hand-painted in medical-grade non-toxic colors with clear English anatomical labelling on an upright stand.',
    '{"materials": ["Reinforced medical PVC", "Chrome-plated metal stand", "Plastic weighted base"], "dimensions": "12 x 12 x 18 cm", "weight_grams": 450, "difficulty": "Easy", "assembly_required": false, "safety_warnings": "Choking hazard: contains small magnetic latches; not for children under 4"}',
    699.00,
    899.00,
    'published',
    TRUE,
    TRUE
  ),
  (
    'f0000000-0000-0000-0000-000000000004',
    'PB-AST-SOL-04',
    'solar-system-3d-revolving-kit',
    '3D Motorized Solar System Revolving Model Kit',
    'Motorized planetary orbit model with illuminated Sun projector and 8 orbiting planets.',
    'Experience the solar system in motion! This engaging DIY educational kit features the 8 planets scaled proportionally on geared orbital arms revolving around a central sun. The sun houses a battery-powered light bulb that projects planetary constellations onto darkened room ceilings. Ideal for Class 3 through 8 astronomy assignments, environmental studies, and science fairs.',
    '{"materials": ["Non-toxic durable plastic planets", "Dual-speed gear mechanism", "LED bulb with optic dome"], "dimensions": "34 x 34 x 24 cm", "weight_grams": 510, "difficulty": "Medium", "batteries_included": false, "safety_warnings": "Requires 2x AA batteries (not included)"}',
    799.00,
    1099.00,
    'published',
    TRUE,
    TRUE
  ),
  (
    'f0000000-0000-0000-0000-000000000005',
    'PB-CHM-PER-05',
    'periodic-table-embossed-laminated-chart',
    'Modern Periodic Table Embossed Wall Chart (CBSE & ICSE Aligned)',
    'Extra-large tear-proof embossed chart featuring IUPAC 118 elements with electron configurations and real-world applications.',
    'Class 9 to 12 CBSE & ICSE Chemistry essential. This premium 28x40 inch chart features all 118 modern chemical elements with atomic numbers, element symbols, electronegativity, ionization enthalpy, and vivid photographic examples of where each element is used in daily life. Double-sided thermal laminated with metallic rim hanging strips.',
    '{"materials": ["350 GSM tear-proof synthetic card", "125-micron thermal gloss lamination", "Plastic hanging rollers"], "dimensions": "70 x 100 cm (28 x 40 inches)", "weight_grams": 260, "difficulty": "Easy", "assembly_required": false}',
    299.00,
    399.00,
    'published',
    TRUE,
    FALSE
  )
ON CONFLICT (sku) DO NOTHING;

-- Initial Inventory for Seed Products
INSERT INTO inventory (product_id, available_quantity, reserved_quantity, low_stock_threshold) VALUES
  ('f0000000-0000-0000-0000-000000000001', 25, 0, 5),
  ('f0000000-0000-0000-0000-000000000002', 18, 0, 5),
  ('f0000000-0000-0000-0000-000000000003', 15, 0, 3),
  ('f0000000-0000-0000-0000-000000000004', 12, 0, 3),
  ('f0000000-0000-0000-0000-000000000005', 50, 0, 10)
ON CONFLICT (product_id) DO NOTHING;

-- Initial Academic Mappings
INSERT INTO product_academic_mappings (product_id, board_id, class_id, subject_id, category_id, project_type) VALUES
  ('f0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000001', 'working_model'),
  ('f0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000009', 'c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000001', 'working_model'),
  ('f0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000002', 'still_model'),
  ('f0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000003', 'diy_kit'),
  ('f0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000004', 'chart')
ON CONFLICT DO NOTHING;
