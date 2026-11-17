import Link from 'next/link';
import { Search, Sparkles, ShieldCheck, Truck, BookOpen, CheckCircle2 } from 'lucide-react';
import { Badge } from '@projectbee/ui';

export default function HomePage() {
  const categories = [
    {
      title: 'Working Science Models',
      slug: 'working-science-models',
      tag: 'Physics & Mechanics',
      description: 'Hydraulics, wind turbines, electric motors, and water dispensers that actually operate.',
      count: '35+ models',
    },
    {
      title: 'Still 3D Educational Models',
      slug: 'still-educational-models',
      tag: 'Biology & Geography',
      description: 'Human anatomy, volcanoes, solar systems, and landforms with clear educational labels.',
      count: '28+ models',
    },
    {
      title: 'DIY Science Kits',
      slug: 'diy-science-kits',
      tag: 'Hands-on Learning',
      description: 'All components, wires, pre-cut wood, and step-by-step viva booklets included.',
      count: '42+ kits',
    },
    {
      title: 'Educational Charts & Posters',
      slug: 'educational-charts',
      tag: 'CBSE & ICSE Syllabus',
      description: 'Laminated, tear-resistant visual charts for periodic tables, cell biology, and formulas.',
      count: '50+ charts',
    },
    {
      title: 'School Assignment Craft Kits',
      slug: 'school-assignment-kits',
      tag: 'All Classes',
      description: 'Pre-assembled baseboards, solar panels, and specialized presentation supplies.',
      count: '20+ kits',
    },
  ];

  const featuredProducts = [
    {
      id: 'f0000000-0000-0000-0000-000000000001',
      title: "Hydraulic Lift Working Science Model (Pascal's Law)",
      slug: 'hydraulic-lift-working-science-model',
      selling_price: 499,
      compare_at_price: 649,
      board: 'CBSE / ICSE',
      class: 'Class 8-10',
      tag: 'Working Model',
    },
    {
      id: 'f0000000-0000-0000-0000-000000000002',
      title: 'Windmill Electricity Generator Working Model with LED Glow',
      slug: 'windmill-electricity-generator-working-model',
      selling_price: 599,
      compare_at_price: 799,
      board: 'CBSE',
      class: 'Class 7-10',
      tag: 'Renewable Energy',
    },
    {
      id: 'f0000000-0000-0000-0000-000000000003',
      title: 'Human Heart 3D Anatomical Dissectible Educational Model',
      slug: 'human-heart-3d-dissectible-model',
      selling_price: 699,
      compare_at_price: 899,
      board: 'ICSE / CBSE',
      class: 'Class 9-10',
      tag: 'Biology',
    },
    {
      id: 'f0000000-0000-0000-0000-000000000004',
      title: '3D Motorized Solar System Revolving Model Kit',
      slug: 'solar-system-3d-revolving-kit',
      selling_price: 799,
      compare_at_price: 1099,
      board: 'CBSE',
      class: 'Class 3-8',
      tag: 'Astronomy Kit',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50/80 via-white to-slate-50 border-b border-amber-100/60 pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Ready-to-Use CBSE &amp; ICSE School Science Projects</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            School projects made <span className="text-amber-500">stress-free</span> for students &amp; parents.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Find working science models, 3D anatomical charts, and educational assignment kits tailored specifically to your student&apos;s class and curriculum.
          </p>

          {/* Quick Search Input */}
          <div className="max-w-xl mx-auto pt-2">
            <form action="/products" method="GET" className="relative flex items-center shadow-lg rounded-xl">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="q"
                placeholder="Search by topic, e.g. 'Hydraulic Lift', 'Digestive System', 'Class 9'..."
                className="w-full h-13 pl-12 pr-28 rounded-xl border border-slate-300 bg-white text-base text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg text-sm transition-colors shadow-sm"
              >
                Search
              </button>
            </form>
          </div>

          {/* Class Quick Selection Pills (Classes 1 to 12) */}
          <div className="pt-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Browse by Student Class:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-3xl mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
                <Link
                  key={cls}
                  href={`/products?class=${cls}`}
                  className="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-900 transition-all shadow-2xs"
                >
                  Class {cls}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Category Tiles */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Explore by Project Type</h2>
              <p className="text-sm text-slate-500">Complete curriculum kits built to CBSE &amp; ICSE guidelines</p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-amber-600 hover:text-amber-700">
              View all products →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {cat.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{cat.count}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{cat.description}</p>
                </div>
                <div className="pt-4 text-xs font-semibold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Browse category <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Curriculum Models */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Popular School Exhibition Projects</h2>
              <p className="text-sm text-slate-500">Tested, ready-to-present models with explanation viva notes</p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-amber-600 hover:text-amber-700">
              See complete catalogue →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Visual Preview Placeholder */}
                <div className="h-44 bg-slate-100 flex items-center justify-center relative p-4 border-b border-slate-100">
                  <BookOpen className="w-12 h-12 text-slate-300" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-2 py-0.5 rounded shadow-2xs border border-slate-200">
                    {prod.class}
                  </span>
                  <span className="absolute top-3 right-3 bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    COD
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="board">{prod.board}</Badge>
                      <span className="text-[11px] text-slate-500 font-medium">{prod.tag}</span>
                    </div>
                    <Link
                      href={`/products/${prod.slug}`}
                      className="font-bold text-slate-900 text-sm hover:text-amber-600 line-clamp-2 leading-snug"
                    >
                      {prod.title}
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-extrabold text-slate-900">₹{prod.selling_price}</span>
                      {prod.compare_at_price && (
                        <span className="text-xs text-slate-400 line-through ml-1.5">₹{prod.compare_at_price}</span>
                      )}
                    </div>
                    <Link
                      href={`/products/${prod.slug}`}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      View Kit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Value Proposition & Parent Assurance */}
        <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 sm:p-12 shadow-md">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why Indian Parents &amp; Students Trust ProjectBee
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <ShieldCheck className="w-8 h-8 text-amber-400" />
                <h3 className="font-bold text-base text-white">Curriculum Aligned</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every model and chart matches standard CBSE &amp; ICSE science concepts so students score top practical &amp; exhibition marks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <Truck className="w-8 h-8 text-amber-400" />
                <h3 className="font-bold text-base text-white">100% Cash on Delivery</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Zero advance online payment needed. Pay in cash directly at your doorstep once your project kit arrives safely.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-amber-400" />
                <h3 className="font-bold text-base text-white">Child-Safe Materials</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Non-toxic acrylics, pre-sanded smooth edges, and safe DC components tested specifically for school student handling.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

