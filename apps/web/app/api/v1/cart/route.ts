import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { CATALOGUE_PRODUCTS } from '@/lib/products-data';

interface CartItemPayload {
  productId: string;
  quantity: number;
}

// In-memory guest / demo cart store with cookie session ID
const CART_STORE = new Map<string, { items: CartItemPayload[]; updatedAt: Date }>();

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('pb_cart_session')?.value || 'guest_default';
    const cart = CART_STORE.get(sessionId) || { items: [], updatedAt: new Date() };

    let subtotal = 0;
    const validatedItems = cart.items
      .map((item) => {
        const product = CATALOGUE_PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return null;
        const lineTotal = product.selling_price * item.quantity;
        subtotal += lineTotal;
        return {
          productId: product.id,
          title: product.title,
          sku: product.sku,
          price: product.selling_price,
          quantity: item.quantity,
          lineTotal,
          imageUrl: product.image_url,
          inStock: true,
        };
      })
      .filter(Boolean);

    const freeShippingThreshold = 499;
    const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
    const shippingFee = isFreeShipping ? 0 : 50;
    const totalAmount = subtotal + shippingFee;

    return successResponse({
      items: validatedItems,
      subtotal,
      shippingFee,
      freeShippingThreshold,
      isFreeShipping,
      totalAmount,
    });
  } catch (err: any) {
    return errorResponse('INTERNAL_ERROR', err.message || 'Cart fetch error', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || typeof quantity !== 'number' || quantity < 1) {
      return errorResponse('VALIDATION_ERROR', 'Valid productId and positive quantity required.', 400);
    }

    const product = CATALOGUE_PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return errorResponse('NOT_FOUND', 'Product does not exist.', 404);
    }

    const sessionId = request.cookies.get('pb_cart_session')?.value || 'guest_default';
    const cart = CART_STORE.get(sessionId) || { items: [], updatedAt: new Date() };

    const existingIndex = cart.items.findIndex((item) => item.productId === productId);
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity = Math.min(10, cart.items[existingIndex].quantity + quantity);
    } else {
      cart.items.push({ productId, quantity: Math.min(10, quantity) });
    }

    cart.updatedAt = new Date();
    CART_STORE.set(sessionId, cart);

    return successResponse({ message: 'Item added to cart', cartCount: cart.items.length }, 201);
  } catch (err: any) {
    return errorResponse('INTERNAL_ERROR', err.message || 'Failed to update cart', 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const sessionId = request.cookies.get('pb_cart_session')?.value || 'guest_default';

    if (!productId) {
      CART_STORE.delete(sessionId);
      return successResponse({ message: 'Cart cleared' });
    }

    const cart = CART_STORE.get(sessionId);
    if (cart) {
      cart.items = cart.items.filter((item) => item.productId !== productId);
      CART_STORE.set(sessionId, cart);
    }

    return successResponse({ message: 'Item removed from cart' });
  } catch (err: any) {
    return errorResponse('INTERNAL_ERROR', err.message || 'Failed to remove from cart', 500);
  }
}
