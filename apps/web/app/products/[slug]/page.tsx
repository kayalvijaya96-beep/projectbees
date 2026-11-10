import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge, Button } from '@projectbee/ui';
import { BookOpen, Check, ShieldCheck, Truck, Sparkles, MapPin } from 'lucide-react';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const PRODUCTS_MAP: Record<string, any> = {
  'hydraulic-lift-working-science-model': {
    id: 'f0000000-0000-0000-0000-000000000001',
    sku: 'PB-SCI-HYD-01',
    title: "Hydraulic Lift Working Science Model (Pascal's Law Demonstration)",
    short_description: 'Ready-to-demonstrate syringe-based hydraulic jack illustrating fluid pressure and mechanical advantage.',
    full_description: 'This working hydraulic lift model visually demonstrates Pascal\'s Law for CBSE and ICSE Physics curricula. Using dual fluid syringes, flexible tubing, and an acrylic scissor-lift mechanism, students can easily operate the lift by applying manual force to elevate a small toy vehicle or weight. Comes completely assembled and tested with colored liquid reservoirs and a clear instruction pamphlet outlining the scientific formulas and viva voce questions.',
    selling_price: 499,
    compare_at_price: 649,
    board: 'CBSE / ICSE',
    class_name: 'Class 8, 9 & 10',
    subject: 'Physics & Mechanics',
    category: 'Working Science Models',
    project_type: 'Working Model',
    specifications: {
      materials: ['BPA-free medical grade syringes', 'Non-toxic food-color fluid', 'Clear acrylic scissor frame', 'Silicone tubing'],
      dimensions: '22 x 14 x 18 cm',
      weight_grams: 380,
      difficulty: 'Easy',
      assembly_required: false,
      safety_warnings: 'Safe for children; do not ingest colored liquid',
    },
    in_stock: true,
  },
  'windmill-electricity-generator-working-model': {
    id: 'f0000000-0000-0000-0000-000000000002',
    sku: 'PB-SCI-WND-02',
    title: 'Windmill Electricity Generator Working Model with LED Glow',
    short_description: 'Working wind energy converter model that turns kinetic blade rotation into electrical energy to illuminate an LED house.',
    full_description: 'Designed specifically for Class 7 to 10 science exhibitions, this working windmill generator converts wind energy into electrical power. Features high-efficiency aerodynamically curved propeller blades mounted on a low-friction DC dynamo motor. When blown with a standard home fan or hairdryer, the generated power lights up an LED bulb inside an attached miniature cottage. Includes an educational summary card explaining renewable energy concepts.',
    selling_price: 599,
    compare_at_price: 799,
    board: 'CBSE',
    class_name: 'Class 7, 8, 9 & 10',
    subject: 'Physics & Environmental Studies',
    category: 'Working Science Models',
    project_type: 'Working Model',
    specifications: {
      materials: ['High-grade ABS propeller', 'Low-RPM DC generator motor', 'Wooden display base', 'High-luminance 5mm LED', 'Miniature acrylic house'],
      dimensions: '25 x 15 x 30 cm',
      weight_grams: 420,
      difficulty: 'Easy',
      assembly_required: false,
      safety_warnings: 'Keep fingers clear of rotating blades during high-speed fan tests',
    },
    in_stock: true,
  },
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = PRODUCTS_MAP[params.slug] || PRODUCTS_MAP['hydraulic-lift-working-science-model'];

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-amber-600">Projects</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Left: Product Media Gallery */}
        <div className="space-y-4">
          <div className="h-80 sm:h-96 rounded-2xl border border-slate-200 bg-slate-100 flex items-center justify-center relative p-8 shadow-xs">
            <BookOpen className="w-24 h-24 text-slate-300" />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <Badge variant="board">{product.board}</Badge>
              <Badge variant="class">{product.class_name}</Badge>
            </div>
            <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 font-bold text-xs px-2.5 py-1 rounded-md shadow-xs">
              Cash on Delivery (COD)
            </div>
          </div>
          <p className="text-xs text-center text-slate-400">
            Fully tested and pre-assembled for school presentation
          </p>
        </div>

        {/* Right: Product Details & Order Flow */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {product.title}
            </h1>
            <p className="text-xs text-slate-400 font-mono">SKU: {product.sku}</p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-baseline justify-between">
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">₹{product.selling_price}</span>
                {product.compare_at_price && (
                  <span className="text-sm text-slate-400 line-through">₹{product.compare_at_price}</span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Save ₹{product.compare_at_price - product.selling_price}
                </span>
              </div>
              <p className="text-xs text-slate-600">Inclusive of all taxes. Pay in cash upon delivery.</p>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Check className="w-3.5 h-3.5" /> In Stock
              </span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-sm text-slate-700 leading-relaxed">
            {product.short_description}
          </p>

          {/* Bengaluru Delivery Estimator */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-sm shadow-2xs">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Check Cash on Delivery in Bengaluru</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit PIN code (e.g. 560001)"
                defaultValue="560001"
                maxLength={6}
                className="h-10 px-3 rounded-lg border border-slate-300 text-sm flex-1 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="button"
                className="px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg"
              >
                Check
              </button>
            </div>
            <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> COD available in Bengaluru! Estimated delivery: 2-3 school days.
            </p>
          </div>

          {/* CTA: Add to Cart & Checkout */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link href="/checkout" className="flex-1">
              <Button size="lg" className="w-full text-base font-bold shadow-md">
                Order via Cash on Delivery
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Add to Cart
              </Button>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tested for CBSE &amp; ICSE Viva Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Safe, Non-Toxic Materials</span>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum & Specifications Tabs */}
      <section className="pt-6 border-t border-slate-200 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Project Specifications &amp; Curriculum Alignment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Materials & Assembly */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Included Materials
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {product.specifications?.materials?.map((m: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Technical Dimensions & Class Fit */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Technical Details
            </h3>
            <div className="space-y-2.5 text-sm text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Dimensions:</span>
                <span className="font-semibold text-slate-900">{product.specifications?.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Weight:</span>
                <span className="font-semibold text-slate-900">{product.specifications?.weight_grams} grams</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assembly:</span>
                <span className="font-semibold text-slate-900">Pre-Assembled &amp; Tested</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Difficulty Level:</span>
                <span className="font-semibold text-slate-900">{product.specifications?.difficulty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs">
          <h3 className="text-base font-bold text-slate-900">Curriculum Application</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{product.full_description}</p>
        </div>
      </section>
    </div>
  );
}
