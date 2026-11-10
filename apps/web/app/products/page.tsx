import Link from 'next/link';
import { Badge, Button } from '@projectbee/ui';
import { BookOpen, Filter, Search } from 'lucide-react';

interface ProductsPageProps {
  searchParams: {
    q?: string;
    class?: string;
    board?: string;
    category?: string;
  };
}

// Sample mock catalogue items matching database seed
const ALL_PRODUCTS = [
  {
    id: 'f0000000-0000-0000-0000-000000000001',
    sku: 'PB-SCI-HYD-01',
    slug: 'hydraulic-lift-working-science-model',
    title: "Hydraulic Lift Working Science Model (Pascal's Law Demonstration)",
    short_description: 'Ready-to-demonstrate syringe-based hydraulic jack illustrating fluid pressure and mechanical advantage.',
    selling_price: 499,
    compare_at_price: 649,
    board: 'CBSE',
    class_number: 8,
    category_slug: 'working-science-models',
    category_name: 'Working Science Models',
    project_type: 'working_model',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000002',
    sku: 'PB-SCI-WND-02',
    slug: 'windmill-electricity-generator-working-model',
    title: 'Windmill Electricity Generator Working Model with LED Glow',
    short_description: 'Working wind energy converter model that turns kinetic blade rotation into electrical energy to illuminate an LED house.',
    selling_price: 599,
    compare_at_price: 799,
    board: 'CBSE',
    class_number: 9,
    category_slug: 'working-science-models',
    category_name: 'Working Science Models',
    project_type: 'working_model',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000003',
    sku: 'PB-BIO-HRT-03',
    slug: 'human-heart-3d-dissectible-model',
    title: 'Human Heart 3D Anatomical Dissectible Educational Model',
    short_description: 'Detailed 2-part dissectible human heart model displaying atria, ventricles, valves and major blood vessels.',
    selling_price: 699,
    compare_at_price: 899,
    board: 'ICSE',
    class_number: 10,
    category_slug: 'still-educational-models',
    category_name: 'Still 3D Educational Models',
    project_type: 'still_model',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000004',
    sku: 'PB-AST-SOL-04',
    slug: 'solar-system-3d-revolving-kit',
    title: '3D Motorized Solar System Revolving Model Kit',
    short_description: 'Motorized planetary orbit model with illuminated Sun projector and 8 orbiting planets.',
    selling_price: 799,
    compare_at_price: 1099,
    board: 'CBSE',
    class_number: 6,
    category_slug: 'diy-science-kits',
    category_name: 'DIY Science Kits',
    project_type: 'diy_kit',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000005',
    sku: 'PB-CHM-PER-05',
    slug: 'periodic-table-embossed-laminated-chart',
    title: 'Modern Periodic Table Embossed Wall Chart (CBSE & ICSE Aligned)',
    short_description: 'Extra-large tear-proof embossed chart featuring IUPAC 118 elements with electron configurations and real-world applications.',
    selling_price: 299,
    compare_at_price: 399,
    board: 'CBSE',
    class_number: 10,
    category_slug: 'educational-charts',
    category_name: 'Educational Charts & Posters',
    project_type: 'chart',
  },
];

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = searchParams.q?.toLowerCase() || '';
  const selectedClass = searchParams.class ? parseInt(searchParams.class, 10) : null;
  const selectedBoard = searchParams.board?.toUpperCase() || null;
  const selectedCategory = searchParams.category || null;

  // Filter products
  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    if (query && !p.title.toLowerCase().includes(query) && !p.short_description.toLowerCase().includes(query)) {
      return false;
    }
    if (selectedClass && p.class_number !== selectedClass) {
      return false;
    }
    if (selectedBoard && p.board !== selectedBoard) {
      return false;
    }
    if (selectedCategory && p.category_slug !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search & Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            School Projects &amp; Educational Kits
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing {filteredProducts.length} results
            {selectedClass ? ` for Class ${selectedClass}` : ''}
            {selectedBoard ? ` (${selectedBoard})` : ''}
          </p>
        </div>

        <form action="/products" method="GET" className="relative flex items-center max-w-sm w-full">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search projects, subjects, kits..."
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filters Sidebar */}
        <aside className="space-y-6 lg:block">
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-amber-500" /> Filters
              </span>
              {(query || selectedClass || selectedBoard || selectedCategory) && (
                <Link href="/products" className="text-xs text-amber-600 hover:underline">
                  Clear All
                </Link>
              )}
            </div>

            {/* Board Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Board</h4>
              <div className="flex flex-wrap gap-2">
                {['CBSE', 'ICSE'].map((b) => (
                  <Link
                    key={b}
                    href={`/products?board=${b}${selectedClass ? `&class=${selectedClass}` : ''}`}
                    className={`px-3 py-1 text-xs font-semibold rounded-md border ${
                      selectedBoard === b
                        ? 'bg-amber-500 text-slate-900 border-amber-500'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {b}
                  </Link>
                ))}
              </div>
            </div>

            {/* Class Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Class (1–12)</h4>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                  <Link
                    key={c}
                    href={`/products?class=${c}${selectedBoard ? `&board=${selectedBoard}` : ''}`}
                    className={`py-1 text-center text-xs font-medium rounded-md border ${
                      selectedClass === c
                        ? 'bg-amber-500 text-slate-900 border-amber-500 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Category</h4>
              <ul className="space-y-1 text-xs text-slate-600">
                {[
                  { slug: 'working-science-models', name: 'Working Science Models' },
                  { slug: 'still-educational-models', name: 'Still 3D Models' },
                  { slug: 'diy-science-kits', name: 'DIY Science Kits' },
                  { slug: 'educational-charts', name: 'Educational Charts' },
                  { slug: 'school-assignment-kits', name: 'School Assignment Kits' },
                ].map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className={`block py-1 hover:text-amber-600 ${
                        selectedCategory === cat.slug ? 'font-bold text-amber-600' : ''
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center space-y-3 bg-white">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No projects found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                We couldn&apos;t find any project matching your specific filters. Try selecting a different class or board.
              </p>
              <Link href="/products" className="inline-block pt-2">
                <Button variant="outline" size="sm">
                  View All Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="h-44 bg-slate-100 flex items-center justify-center relative p-4 border-b border-slate-100">
                    <BookOpen className="w-10 h-10 text-slate-300" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-2 py-0.5 rounded shadow-2xs border border-slate-200">
                      Class {p.class_number}
                    </span>
                    <span className="absolute top-3 right-3 bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                      COD
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="board">{p.board}</Badge>
                        <span className="text-[11px] text-slate-500">{p.category_name}</span>
                      </div>
                      <Link
                        href={`/products/${p.slug}`}
                        className="font-bold text-slate-900 text-sm hover:text-amber-600 line-clamp-2 leading-snug"
                      >
                        {p.title}
                      </Link>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {p.short_description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-extrabold text-slate-900">₹{p.selling_price}</span>
                        {p.compare_at_price && (
                          <span className="text-xs text-slate-400 line-through ml-1.5">₹{p.compare_at_price}</span>
                        )}
                      </div>
                      <Link
                        href={`/products/${p.slug}`}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg text-xs font-semibold transition-colors shadow-2xs"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
