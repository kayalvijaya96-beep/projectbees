import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { CATALOGUE_PRODUCTS } from '@/lib/products-data';

const WISHLIST_STORE = new Map<string, Set<string>>();

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('pb_user_session')?.value || 'guest_user';
    const productIds = WISHLIST_STORE.get(sessionId) || new Set();

    const items = Array.from(productIds)
      .map((id) => CATALOGUE_PRODUCTS.find((p) => p.id === id))
      .filter(Boolean);

    return successResponse({ wishlist: items, count: items.length });
  } catch (err: any) {
    return errorResponse('INTERNAL_ERROR', err.message || 'Failed to fetch wishlist', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return errorResponse('VALIDATION_ERROR', 'productId is required.', 400);
    }

    const sessionId = request.cookies.get('pb_user_session')?.value || 'guest_user';
    let productIds = WISHLIST_STORE.get(sessionId);
    if (!productIds) {
      productIds = new Set();
      WISHLIST_STORE.set(sessionId, productIds);
    }

    if (productIds.has(productId)) {
      productIds.delete(productId);
      return successResponse({ isFavorited: false, message: 'Removed from wishlist' });
    } else {
      productIds.add(productId);
      return successResponse({ isFavorited: true, message: 'Added to wishlist' });
    }
  } catch (err: any) {
    return errorResponse('INTERNAL_ERROR', err.message || 'Failed to toggle wishlist item', 500);
  }
}
