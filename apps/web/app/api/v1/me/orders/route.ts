import { successResponse } from '@/lib/api-response';
import { ORDER_STORE } from '@/lib/checkout-store';

export async function GET() {
  const orders = Array.from(ORDER_STORE.values());
  return successResponse({
    orders,
    total: orders.length,
  });
}

