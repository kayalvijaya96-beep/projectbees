import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { createAdminClient } from '@projectbee/supabase-config';
import { CATALOGUE_PRODUCTS } from '@/lib/products-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const hasSupabase = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    );

    if (hasSupabase) {
      try {
        const supabase = createAdminClient();
        const { data, error } = await supabase
          .from('products')
          .select(`
            id,
            sku,
            slug,
            title,
            short_description,
            full_description,
            specifications,
            selling_price,
            compare_at_price,
            status,
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
          .eq('slug', slug)
          .single();

        if (!error && data) {
          const rawItem = data as any;
          const mapping = Array.isArray(rawItem.product_academic_mappings)
            ? rawItem.product_academic_mappings[0]
            : rawItem.product_academic_mappings;
          const primaryMedia = Array.isArray(rawItem.product_media)
            ? rawItem.product_media.find((m: any) => m.is_primary) || rawItem.product_media[0]
            : rawItem.product_media;
          const inv = Array.isArray(rawItem.inventory) ? rawItem.inventory[0] : rawItem.inventory;

          return successResponse({
            product: {
              id: rawItem.id,
              sku: rawItem.sku,
              slug: rawItem.slug,
              title: rawItem.title,
              short_description: rawItem.short_description,
              full_description: rawItem.full_description,
              specifications: rawItem.specifications,
              selling_price: Number(rawItem.selling_price),
              compare_at_price: rawItem.compare_at_price ? Number(rawItem.compare_at_price) : undefined,
              status: rawItem.status,
              rating: rawItem.average_rating || 5.0,
              reviews_count: rawItem.reviews_count || 0,
              in_stock: (inv?.available_quantity || 0) > 0,
              board: mapping?.boards?.code || 'CBSE & ICSE',
              class_number: mapping?.classes?.class_number || 8,
              category_slug: mapping?.categories?.slug || 'working-science-models',
              category_name: mapping?.categories?.name || 'Working Science Models',
              image_url: primaryMedia?.storage_path || '/images/products/hydraulic-lift.png',
            },
            source: 'database',
          });
        }
      } catch (err) {
        console.warn('Database query fallback to seed product:', err);
      }
    }

    const product = CATALOGUE_PRODUCTS.find((p) => p.slug === slug);
    if (!product) {
      return errorResponse('NOT_FOUND', `Product with slug '${slug}' not found.`, 404);
    }

    return successResponse({ product, source: 'catalogue_cache' });
  } catch (error: any) {
    return errorResponse('INTERNAL_ERROR', error.message || 'Failed to fetch product', 500);
  }
}
