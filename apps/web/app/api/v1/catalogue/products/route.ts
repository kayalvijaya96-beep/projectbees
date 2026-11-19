import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { createAdminClient } from '@projectbee/supabase-config';
import { CATALOGUE_PRODUCTS } from '@/lib/products-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const classParam = searchParams.get('class');
    const boardParam = searchParams.get('board')?.toUpperCase();
    const categoryParam = searchParams.get('category');
    const sortParam = searchParams.get('sort') || 'popular';
    const minPrice = searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined;
    const maxPrice = searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined;

    const hasSupabase = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    );

    if (hasSupabase) {
      try {
        const supabase = createAdminClient();
        let queryBuilder = supabase
          .from('products')
          .select(`
            id,
            sku,
            slug,
            title,
            short_description,
            full_description,
            selling_price,
            compare_at_price,
            status,
            is_featured,
            average_rating,
            reviews_count,
            inventory (available_quantity),
            product_academic_mappings (
              boards (code),
              classes (class_number),
              categories (slug, name)
            ),
            product_media (storage_path, alt_text, is_primary)
          `)
          .eq('status', 'published');

        if (query) {
          queryBuilder = queryBuilder.or(`title.ilike.%${query}%,short_description.ilike.%${query}%,sku.ilike.%${query}%`);
        }

        if (minPrice !== undefined) {
          queryBuilder = queryBuilder.gte('selling_price', minPrice);
        }
        if (maxPrice !== undefined) {
          queryBuilder = queryBuilder.lte('selling_price', maxPrice);
        }

        const { data, error } = await queryBuilder;

        if (!error && data && data.length > 0) {
          let results = (data as any[]).map((item: any) => {
            const mapping = Array.isArray(item.product_academic_mappings)
              ? item.product_academic_mappings[0]
              : item.product_academic_mappings;
            const primaryMedia = Array.isArray(item.product_media)
              ? item.product_media.find((m: any) => m.is_primary) || item.product_media[0]
              : item.product_media;
            const inv = Array.isArray(item.inventory) ? item.inventory[0] : item.inventory;

            return {
              id: item.id,
              sku: item.sku,
              slug: item.slug,
              title: item.title,
              short_description: item.short_description,
              full_description: item.full_description,
              selling_price: Number(item.selling_price),
              compare_at_price: item.compare_at_price ? Number(item.compare_at_price) : undefined,
              status: item.status,
              rating: item.average_rating || 5.0,
              reviews_count: item.reviews_count || 0,
              in_stock: (inv?.available_quantity || 0) > 0,
              board: mapping?.boards?.code || 'CBSE & ICSE',
              class_number: mapping?.classes?.class_number || 8,
              category_slug: mapping?.categories?.slug || 'working-science-models',
              category_name: mapping?.categories?.name || 'Working Science Models',
              image_url: primaryMedia?.storage_path || '/images/products/hydraulic-lift.png',
            };
          });

          if (classParam && classParam !== 'all') {
            const cls = parseInt(classParam, 10);
            results = results.filter((p) => p.class_number === cls);
          }
          if (boardParam && boardParam !== 'ALL') {
            results = results.filter((p) => p.board.includes(boardParam));
          }
          if (categoryParam && categoryParam !== 'all') {
            results = results.filter((p) => p.category_slug === categoryParam);
          }

          return successResponse({ products: results, count: results.length, source: 'database' });
        }
      } catch (dbErr) {
        console.warn('Database query fallback to seed catalogue:', dbErr);
      }
    }

    let products = [...CATALOGUE_PRODUCTS];

    if (query) {
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.short_description.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query)
      );
    }

    if (classParam && classParam !== 'all') {
      const classNum = parseInt(classParam, 10);
      if (!isNaN(classNum)) {
        products = products.filter((p) => p.class_number === classNum);
      }
    }

    if (boardParam && boardParam !== 'ALL') {
      products = products.filter((p) => p.board.toUpperCase().includes(boardParam));
    }

    if (categoryParam && categoryParam !== 'all') {
      products = products.filter((p) => p.category_slug === categoryParam);
    }

    if (minPrice !== undefined) {
      products = products.filter((p) => p.selling_price >= minPrice);
    }

    if (maxPrice !== undefined) {
      products = products.filter((p) => p.selling_price <= maxPrice);
    }

    if (sortParam === 'price-low') {
      products.sort((a, b) => a.selling_price - b.selling_price);
    } else if (sortParam === 'price-high') {
      products.sort((a, b) => b.selling_price - a.selling_price);
    } else if (sortParam === 'rating') {
      products.sort((a, b) => (b.rating ?? 5) - (a.rating ?? 5));
    } else {
      products.sort((a, b) => (b.reviews_count ?? 0) - (a.reviews_count ?? 0));
    }

    return successResponse({ products, count: products.length, source: 'catalogue_cache' });
  } catch (error: any) {
    return errorResponse('INTERNAL_ERROR', error.message || 'Failed to fetch catalogue', 500);
  }
}
