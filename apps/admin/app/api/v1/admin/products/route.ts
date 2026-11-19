import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { createAdminClient } from '@projectbee/supabase-config';

const FALLBACK_PRODUCTS = [
  {
    id: 'f0000000-0000-0000-0000-000000000001',
    sku: 'PB-SCI-HYD-01',
    title: "Hydraulic Lift Working Science Model (Pascal's Law Demonstration)",
    selling_price: 499,
    compare_at_price: 649,
    class_number: 8,
    board: 'CBSE',
    category_slug: 'working-science-models',
    status: 'published',
    stock_quantity: 25,
  },
  {
    id: 'f0000000-0000-0000-0000-000000000002',
    sku: 'PB-SCI-WND-02',
    title: 'Windmill Electricity Generator Working Model with LED Glow',
    selling_price: 599,
    compare_at_price: 799,
    class_number: 9,
    board: 'CBSE',
    category_slug: 'working-science-models',
    status: 'published',
    stock_quantity: 18,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();

    const hasSupabase = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    );

    if (hasSupabase) {
      try {
        const supabase = createAdminClient();
        let queryBuilder = supabase.from('products').select(`
          id,
          sku,
          slug,
          title,
          selling_price,
          compare_at_price,
          status,
          inventory (available_quantity)
        `);

        if (search) {
          queryBuilder = queryBuilder.or(`title.ilike.%${search}%,sku.ilike.%${search}%`);
        }

        const { data, error } = await queryBuilder;
        if (!error && data) {
          const items = data.map((d: any) => ({
            id: d.id,
            sku: d.sku,
            title: d.title,
            selling_price: Number(d.selling_price),
            compare_at_price: d.compare_at_price ? Number(d.compare_at_price) : undefined,
            status: d.status,
            stock_quantity: d.inventory?.[0]?.available_quantity ?? 0,
          }));
          return successResponse({ products: items, totalCount: items.length, source: 'database' });
        }
      } catch (dbErr) {
        console.warn('Admin products DB query fallback:', dbErr);
      }
    }

    let items = [...FALLBACK_PRODUCTS];
    if (category && category !== 'all') {
      items = items.filter((p) => p.category_slug === category);
    }
    if (search) {
      items = items.filter((p) => p.title.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search));
    }

    return successResponse({ products: items, totalCount: items.length, source: 'catalogue_cache' });
  } catch (err: any) {
    return errorResponse('INTERNAL_ERROR', err.message || 'Product retrieval failed', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, sku, sellingPrice, compareAtPrice, classNumber, board, categorySlug, shortDescription } = body;

    if (!title || !sku || !sellingPrice) {
      return errorResponse('VALIDATION_ERROR', 'Title, SKU and sellingPrice are required.', 400);
    }

    const hasSupabase = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    if (hasSupabase) {
      const supabase = createAdminClient();
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const { data, error } = await supabase.from('products').insert({
        sku,
        slug,
        title,
        short_description: shortDescription || title,
        full_description: shortDescription || title,
        selling_price: Number(sellingPrice),
        compare_at_price: compareAtPrice ? Number(compareAtPrice) : null,
        status: 'published',
      }).select().single();

      if (error) {
        return errorResponse('DATABASE_ERROR', error.message, 400);
      }

      // Initialize inventory row
      await supabase.from('inventory').insert({
        product_id: data.id,
        available_quantity: 20,
        reserved_quantity: 0,
      });

      return successResponse({ product: data, message: 'Product created successfully' }, 201);
    }

    const newProduct = {
      id: `prod_${Date.now()}`,
      sku: String(sku),
      title: String(title),
      selling_price: Number(sellingPrice),
      compare_at_price: compareAtPrice ? Number(compareAtPrice) : 0,
      class_number: Number(classNumber) || 8,
      board: String(board || 'CBSE'),
      category_slug: String(categorySlug || 'working-science-models'),
      status: 'published',
      stock_quantity: 20,
    };

    FALLBACK_PRODUCTS.unshift(newProduct);
    return successResponse({ product: newProduct, message: 'Product created successfully' }, 201);
  } catch (err: any) {
    return errorResponse('INTERNAL_ERROR', err.message || 'Product creation failed', 500);
  }
}
