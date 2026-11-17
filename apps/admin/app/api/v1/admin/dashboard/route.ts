import { successResponse } from '@/lib/api-response';

export async function GET() {
  return successResponse({
    metrics: {
      active_orders_count: 14,
      pending_confirmation_count: 5,
      low_stock_count: 3,
      pending_reviews_count: 2,
      mtd_cod_collected_inr: 42850.0,
      currency: 'INR',
    },
    alerts: [
      { id: 'alt-1', type: 'low_stock', product: 'Human Heart 3D Model', stock_remaining: 3 },
      { id: 'alt-2', type: 'low_stock', product: '3D Motorized Solar System', stock_remaining: 3 },
    ],
  });
}

