export interface Product {
  id: string;
  sku: string;
  slug: string;
  title: string;
  short_description: string;
  full_description?: string;
  selling_price: number;
  compare_at_price?: number;
  board: string;
  class_number: number;
  class_range?: string;
  category_slug: string;
  category_name: string;
  project_type: 'working_model' | 'still_model' | 'diy_kit' | 'chart' | 'assignment_kit';
  tag: string;
  in_stock: boolean;
  stock_quantity?: number;
  rating?: number;
  reviews_count?: number;
  image_url: string;
  badge?: string;
  materials?: string[];
  dimensions?: string;
  weight_grams?: number;
  difficulty?: 'Easy' | 'Medium' | 'Advanced';
  assembly_required?: boolean;
  safety_warnings?: string;
  scientific_principles?: string[];
  learning_outcomes?: string[];
  viva_questions?: { question: string; answer: string }[];
}

export const CATALOGUE_PRODUCTS: Product[] = [
  {
    id: 'f0000000-0000-0000-0000-000000000001',
    sku: 'PB-SCI-HYD-01',
    slug: 'hydraulic-lift-working-science-model',
    title: "Hydraulic Lift Working Science Model (Pascal's Law Demonstration)",
    short_description: 'Ready-to-demonstrate syringe-based hydraulic jack illustrating fluid pressure, Pascal\'s Law, and mechanical advantage.',
    full_description: 'This working hydraulic lift model visually demonstrates Pascal\'s Law for CBSE and ICSE Physics curricula. Using dual fluid syringes, flexible silicone tubing, and a smooth acrylic scissor-lift mechanism, students can easily operate the lift by applying manual force to elevate a load or toy vehicle. Comes completely assembled and tested with colored liquid reservoirs and an educational pamphlet with viva voce questions.',
    selling_price: 499,
    compare_at_price: 649,
    board: 'CBSE / ICSE',
    class_number: 8,
    class_range: 'Class 8-10',
    category_slug: 'working-science-models',
    category_name: 'Working Science Models',
    project_type: 'working_model',
    tag: 'Working Model',
    in_stock: true,
    stock_quantity: 25,
    rating: 4.8,
    reviews_count: 34,
    badge: 'Exhibition Bestseller',
    image_url: '/images/products/hydraulic-lift.svg',
    materials: ['Medical-grade BPA-free syringes (10ml & 20ml)', 'Food-grade colored water reservoir', 'Precision laser-cut acrylic scissor frame', 'Medical-grade flexible silicone tubing', 'Weighted wooden exhibition base'],
    dimensions: '22 x 14 x 18 cm',
    weight_grams: 380,
    difficulty: 'Easy',
    assembly_required: false,
    safety_warnings: '100% Child-Safe: Non-toxic colored fluid. No sharp edges or electrical hazard.',
    scientific_principles: [
      "Pascal's Law: Pressure applied to an enclosed fluid is transmitted undiminished in all directions.",
      "Mechanical Advantage: Force multiplication through difference in cross-sectional surface areas (A1 vs A2).",
      "Work-Energy Conservation: Work input equals work output (neglecting small fluid friction losses)."
    ],
    learning_outcomes: [
      'Understand how hydraulic vehicle jacks, vehicle brakes, and heavy earthmovers operate.',
      'Calculate theoretical vs practical mechanical advantage.',
      'Confidently answer physics exhibition viva questions with hands-on live demonstration.'
    ],
    viva_questions: [
      {
        question: "State Pascal's Law demonstrated in this working model.",
        answer: "Pascal's Law states that when pressure is applied to a confined liquid, the pressure change is transmitted equally and undiminished to every part of the liquid and the container walls (P = F1/A1 = F2/A2)."
      },
      {
        question: "Why does the larger syringe lift a heavier weight with less manual effort?",
        answer: "Since pressure is constant throughout the connected liquid (P = F/A), a larger piston area (A2) results in a proportionally larger upward force (F2 = P × A2)."
      },
      {
        question: "What real-world machinery uses this exact hydraulic principle?",
        answer: "Automobile hydraulic brakes, hydraulic crane jacks, aircraft landing gear systems, and JCB excavators."
      }
    ]
  },
  {
    id: 'f0000000-0000-0000-0000-000000000002',
    sku: 'PB-SCI-WND-02',
    slug: 'windmill-electricity-generator-working-model',
    title: 'Windmill Electricity Generator Working Model with LED Glow',
    short_description: 'Working wind turbine model converting kinetic rotation into clean electrical energy to illuminate a miniature house LED.',
    full_description: 'Designed specifically for Class 7 to 10 science exhibitions, this working windmill generator converts wind energy into electrical power. Features high-efficiency aerodynamically curved propeller blades mounted on a low-friction DC dynamo motor. When blown with a fan, hairdryer, or natural breeze, the generated current illuminates an LED bulb inside an attached miniature cottage. Includes an educational summary card explaining renewable energy concepts.',
    selling_price: 599,
    compare_at_price: 799,
    board: 'CBSE',
    class_number: 9,
    class_range: 'Class 7-10',
    category_slug: 'working-science-models',
    category_name: 'Working Science Models',
    project_type: 'working_model',
    tag: 'Renewable Energy',
    in_stock: true,
    stock_quantity: 18,
    rating: 4.9,
    reviews_count: 28,
    badge: 'Popular',
    image_url: '/images/products/windmill-generator.svg',
    materials: ['High-efficiency 3-blade ABS propeller', 'Low-RPM sensitive DC dynamo motor', 'Miniature laser-cut cottage with diffused 5mm white LED', 'Solid MDF wooden presentation base'],
    dimensions: '25 x 15 x 30 cm',
    weight_grams: 420,
    difficulty: 'Easy',
    assembly_required: false,
    safety_warnings: 'Child-safe low voltage DC generation (< 3V). No external wall plug needed.',
    scientific_principles: [
      "Electromagnetic Induction: Turning rotor coils within a magnetic stator field generates electromotive force (EMF).",
      "Energy Transformation: Kinetic wind energy → Mechanical shaft rotation → Electrical current → Luminous light energy.",
      "Aerodynamics of Lift: Curved aerofoil blades generate aerodynamic lift to rotate the central spindle."
    ],
    learning_outcomes: [
      'Learn how clean, green renewable energy is generated across wind farms in Tamil Nadu & Gujarat.',
      'Demonstrate the relationship between wind velocity and electrical power output.',
      'Answer viva questions about Faraday’s Law of Electromagnetic Induction.'
    ],
    viva_questions: [
      {
        question: "What energy transformation occurs in this windmill model?",
        answer: "Kinetic energy of air motion is converted into mechanical rotational energy, which the DC dynamo converts into electrical energy, finally illuminating the LED as light energy."
      },
      {
        question: "Why do modern wind turbine blades have curved aerofoil profiles?",
        answer: "Curved blades create a pressure differential between their top and bottom surfaces, producing aerodynamic lift that efficiently rotates the turbine at lower wind speeds."
      }
    ]
  },
  {
    id: 'f0000000-0000-0000-0000-000000000003',
    sku: 'PB-BIO-HRT-03',
    slug: 'human-heart-3d-dissectible-model',
    title: 'Human Heart 3D Anatomical Dissectible Educational Model',
    short_description: 'Detailed 2-part dissectible human heart model displaying atria, ventricles, valves and major systemic blood vessels.',
    full_description: 'An accurate 3D dissectible model of the human heart designed to support CBSE Class 10 Biology (Life Processes) and ICSE Class 9/10 Human Anatomy. The anterior heart wall can be smoothly detached to reveal internal chambers including the left and right ventricles, tricuspid and bicuspid valves, pulmonary artery, and aorta. Hand-painted in medical-grade non-toxic colors with clear English anatomical labelling on an upright stand.',
    selling_price: 699,
    compare_at_price: 899,
    board: 'ICSE / CBSE',
    class_number: 10,
    class_range: 'Class 9-10',
    category_slug: 'still-educational-models',
    category_name: 'Still 3D Educational Models',
    project_type: 'still_model',
    tag: 'Biology & Anatomy',
    in_stock: true,
    stock_quantity: 15,
    rating: 4.7,
    reviews_count: 19,
    badge: 'Curriculum Model',
    image_url: '/images/products/human-heart.svg',
    materials: ['Medical-grade reinforced PVC plastic', 'High-finish magnetic split-section connectors', 'Chrome-plated display rod with weighted ABS pedestal'],
    dimensions: '12 x 12 x 18 cm',
    weight_grams: 450,
    difficulty: 'Easy',
    assembly_required: false,
    safety_warnings: 'Non-toxic hand-painted colors. Magnetic locking prevents loose parts.',
    scientific_principles: [
      "Double Circulation: Separation of oxygenated (systemic) and deoxygenated (pulmonary) blood streams.",
      "Unidirectional Valve Function: Bicuspid (mitral) and tricuspid atrioventricular valves preventing backflow.",
      "Cardiac Musculature: Thicker muscular wall of the left ventricle designed to pump blood to entire body tissues."
    ],
    learning_outcomes: [
      'Master the internal pathway of blood circulation from Vena Cava to Aorta.',
      'Identify all four chambers, septum, and cardiac valves on a tactile 3D object.',
      'Score top marks in Class 10 practical and oral biology viva examinations.'
    ],
    viva_questions: [
      {
        question: "Why is the left ventricular wall significantly thicker than the right?",
        answer: "The left ventricle pumps oxygenated blood against high systemic resistance to all organs of the body, whereas the right ventricle only pumps blood a short distance to the lungs."
      },
      {
        question: "What is double circulation in humans?",
        answer: "Blood passes through the heart twice during each complete circuit: once through the pulmonary circuit for oxygenation, and once through the systemic circuit to deliver oxygen to tissues."
      }
    ]
  },
  {
    id: 'f0000000-0000-0000-0000-000000000004',
    sku: 'PB-AST-SOL-04',
    slug: 'solar-system-3d-revolving-kit',
    title: '3D Motorized Solar System Revolving Model Kit with Sun Projector',
    short_description: 'Motorized planetary orbit model with illuminated Sun projector and 8 proportional orbiting planets on geared arms.',
    full_description: 'Experience the solar system in motion! This engaging DIY educational kit features the 8 planets scaled proportionally on geared orbital arms revolving around a central sun. The sun houses an illuminated dome that projects planetary constellations onto darkened room ceilings. Ideal for Class 3 through 8 astronomy assignments, environmental studies, and science exhibitions.',
    selling_price: 799,
    compare_at_price: 1099,
    board: 'CBSE',
    class_number: 6,
    class_range: 'Class 3-8',
    category_slug: 'diy-science-kits',
    category_name: 'DIY Science Kits',
    project_type: 'diy_kit',
    tag: 'Astronomy & Space',
    in_stock: true,
    stock_quantity: 12,
    rating: 4.9,
    reviews_count: 42,
    badge: 'Parent Favorite',
    image_url: '/images/products/solar-system.svg',
    materials: ['Proportionally detailed 8 planet hemispheres', 'Dual-speed silent motorized gear box', 'Constellation projection optic dome with warm LED', 'Stable base with printed orbital distance chart'],
    dimensions: '34 x 34 x 24 cm',
    weight_grams: 510,
    difficulty: 'Medium',
    assembly_required: true,
    safety_warnings: 'Low-voltage battery operation (2x AA batteries). Safe for students age 7+.',
    scientific_principles: [
      "Heliocentric Solar System: Planets revolve around the sun in elliptical orbits governed by gravitational attraction.",
      "Orbital Velocity Variation: Inner planets revolve faster than outer gas giants (Kepler's Laws of Planetary Motion).",
      "Light and Shadows: How the central star illuminates planetary faces creating day and night cycles."
    ],
    learning_outcomes: [
      'Learn the order, sizes, and relative distances of all 8 planets from the Sun.',
      'Assemble gears and planetary rods to understand mechanical transmission.',
      'Present planetary characteristics clearly during classroom project displays.'
    ],
    viva_questions: [
      {
        question: "Why does Mercury orbit the Sun much faster than Neptune?",
        answer: "By Kepler's Third Law and gravitational physics, planets closer to the Sun experience stronger gravitational pull and must travel faster to maintain stable orbits."
      },
      {
        question: "Which planets are terrestrial vs gas giants?",
        answer: "Mercury, Venus, Earth, and Mars are rocky terrestrial planets; Jupiter, Saturn, Uranus, and Neptune are gas and ice giants."
      }
    ]
  },
  {
    id: 'f0000000-0000-0000-0000-000000000005',
    sku: 'PB-CHM-PER-05',
    slug: 'periodic-table-embossed-laminated-chart',
    title: 'Modern Periodic Table Embossed Wall Chart (CBSE & ICSE Aligned)',
    short_description: 'Extra-large tear-proof embossed chart featuring IUPAC 118 elements with electron configurations and real-world uses.',
    full_description: 'Class 9 to 12 CBSE & ICSE Chemistry essential. This premium 28x40 inch chart features all 118 modern chemical elements with atomic numbers, element symbols, electronegativity, ionization enthalpy, and vivid photographic examples of where each element is used in daily life. Double-sided thermal laminated with metallic rim hanging strips.',
    selling_price: 299,
    compare_at_price: 399,
    board: 'CBSE',
    class_number: 10,
    class_range: 'Class 9-12',
    category_slug: 'educational-charts',
    category_name: 'Educational Charts & Posters',
    project_type: 'chart',
    tag: 'Chemistry Chart',
    in_stock: true,
    stock_quantity: 50,
    rating: 4.8,
    reviews_count: 51,
    badge: 'Must Have',
    image_url: '/images/products/periodic-table.svg',
    materials: ['350 GSM tear-proof non-crease synthetic card', '125-micron double-sided gloss thermal lamination', 'Plastic reinforced hanging rollers with hanging loop'],
    dimensions: '70 x 100 cm (28 x 40 inches)',
    weight_grams: 260,
    difficulty: 'Easy',
    assembly_required: false,
    safety_warnings: 'Tear-resistant, water-proof, non-toxic laminated poster.',
    scientific_principles: [
      "Modern Periodic Law: Properties of elements are a periodic function of their atomic numbers.",
      "Periodic Trends: Predictable variations in atomic radius, electronegativity, and metallic character across groups and periods.",
      "Electronic Configuration: s, p, d, and f block orbital distribution of electrons."
    ],
    learning_outcomes: [
      'Quick reference for writing chemical equations and valencies in Class 10 & 12 board exams.',
      'Understand why elements in the same vertical group share similar chemical behavior.',
      'Connect abstract element symbols to practical real-world materials and applications.'
    ],
    viva_questions: [
      {
        question: "State the Modern Periodic Law.",
        answer: "The physical and chemical properties of the elements are periodic functions of their atomic numbers (number of protons)."
      },
      {
        question: "Why does atomic radius decrease as you move from left to right across a period?",
        answer: "As atomic number increases across a period, effective nuclear charge increases without additional shielding electron shells, pulling valence electrons closer to the nucleus."
      }
    ]
  }
];

export interface Category {
  title: string;
  slug: string;
  tag: string;
  description: string;
  count: string;
  iconName: string;
  image_url: string;
}

export const CATEGORIES: Category[] = [
  {
    title: 'Working Science Models',
    slug: 'working-science-models',
    tag: 'Physics & Mechanics',
    description: 'Hydraulics, wind turbines, electric motors, and water dispensers that actually operate.',
    count: '35+ models',
    iconName: 'Zap',
    image_url: '/images/categories/working-models.svg',
  },
  {
    title: 'Still 3D Educational Models',
    slug: 'still-educational-models',
    tag: 'Biology & Geography',
    description: 'Human anatomy, volcanoes, solar systems, and landforms with clear educational labels.',
    count: '28+ models',
    iconName: 'Layers',
    image_url: '/images/categories/still-models.svg',
  },
  {
    title: 'DIY Science Kits',
    slug: 'diy-science-kits',
    tag: 'Hands-on Learning',
    description: 'All components, wires, pre-cut wood, and step-by-step viva booklets included.',
    count: '42+ kits',
    iconName: 'Wrench',
    image_url: '/images/categories/diy-kits.svg',
  },
  {
    title: 'Educational Charts & Posters',
    slug: 'educational-charts',
    tag: 'CBSE & ICSE Syllabus',
    description: 'Laminated, tear-resistant visual charts for periodic tables, cell biology, and formulas.',
    count: '50+ charts',
    iconName: 'FileText',
    image_url: '/images/categories/charts.svg',
  },
  {
    title: 'School Assignment Craft Kits',
    slug: 'school-assignment-kits',
    tag: 'All Classes',
    description: 'Pre-assembled baseboards, solar panels, and specialized presentation supplies.',
    count: '20+ kits',
    iconName: 'Sparkles',
    image_url: '/images/categories/assignment-kits.svg',
  },
];
