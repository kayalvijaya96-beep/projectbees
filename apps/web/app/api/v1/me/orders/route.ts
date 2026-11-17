import { successResponse } from '@/lib/api-response';
import { ORDER_STORE } from '@/app/api/v1/checkout/orders/route';

export async function GET() {
  const orders = Array.from(ORDER_STORE.values());
  return successResponse({
    orders,
    total: orders.length,
  });
}

