import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';

const SEED_PRODUCTS = [
  {
    id: 'f0000000-0000-0000-0000-000000000001',
    sku: 'PB-SCI-HYD-01',
    slug: 'hydraulic-lift-working-science-model',
    title: "Hydraulic Lift Working Science Model (Pascal's Law Demonstration)",
    short_description: 'Ready-to-demonstrate syringe-based hydraulic jack illustrating fluid pressure and mechanical advantage.',
    selling_price: 499.0,
    compare_at_price: 649.0,
    status: 'published',
    board: 'CBSE',
    class_number: 8,
    category_slug: 'working-science-models',
    project_type: 'working_model',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000002',
    sku: 'PB-SCI-WND-02',
    slug: 'windmill-electricity-generator-working-model',
    title: 'Windmill Electricity Generator Working Model with LED Glow',
    short_description: 'Working wind energy converter model that turns kinetic blade rotation into electrical energy to illuminate an LED house.',
    selling_price: 599.0,
    compare_at_price: 799.0,
    status: 'published',
    board: 'CBSE',
    class_number: 9,
    category_slug: 'working-science-models',
    project_type: 'working_model',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000003',
    sku: 'PB-BIO-HRT-03',
    slug: 'human-heart-3d-dissectible-model',
    title: 'Human Heart 3D Anatomical Dissectible Educational Model',
    short_description: 'Detailed 2-part dissectible human heart model displaying atria, ventricles, valves and major blood vessels.',
    selling_price: 699.0,
    compare_at_price: 899.0,
    status: 'published',
    board: 'ICSE',
    class_number: 10,
    category_slug: 'still-educational-models',
    project_type: 'still_model',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000004',
    sku: 'PB-AST-SOL-04',
    slug: 'solar-system-3d-revolving-kit',
    title: '3D Motorized Solar System Revolving Model Kit',
    short_description: 'Motorized planetary orbit model with illuminated Sun projector and 8 orbiting planets.',
    selling_price: 799.0,
    compare_at_price: 1099.0,
    status: 'published',
    board: 'CBSE',
    class_number: 6,
    category_slug: 'diy-science-kits',
    project_type: 'diy_kit',
  },
  {
    id: 'f0000000-0000-0000-0000-000000000005',
    sku: 'PB-CHM-PER-05',
    slug: 'periodic-table-embossed-laminated-chart',
    title: 'Modern Periodic Table Embossed Wall Chart (CBSE & ICSE Aligned)',
    short_description: 'Extra-large tear-proof embossed chart featuring IUPAC 118 elements with electron configurations and real-world applications.',
    selling_price: 299.0,
    compare_at_price: 399.0,
    status: 'published',
    board: 'CBSE',
    class_number: 10,
    category_slug: 'educational-charts',
    project_type: 'chart',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const classParam = searchParams.get('class');
    const boardParam = searchParams.get('board')?.toUpperCase();
    const categoryParam = searchParams.get('category');

    let products = SEED_PRODUCTS.filter((p) => p.status === 'published');

    if (query) {
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.short_description.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query)
      );
    }

    if (classParam) {
      const classNum = parseInt(classParam, 10);
      if (!isNaN(classNum)) {
        products = products.filter((p) => p.class_number === classNum);
      }
    }

    if (boardParam) {
      products = products.filter((p) => p.board === boardParam);
    }

    if (categoryParam) {
      products = products.filter((p) => p.category_slug === categoryParam);
    }

    return successResponse({
      products,
      total: products.length,
    });
  } catch (err: any) {
    return errorResponse('INTERNAL_ERROR', err.message || 'Failed to retrieve catalogue products', 500);
  }
}

