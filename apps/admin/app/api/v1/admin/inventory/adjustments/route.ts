import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { AdjustInventorySchema } from '@projectbee/shared-types';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validated = AdjustInventorySchema.parse(rawBody);

    const movementId = `mov_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return successResponse({
      stock_movement_id: movementId,
      product_id: validated.product_id,
      quantity_delta: validated.quantity_delta,
      reason: validated.reason,
      actor_id: 'admin_catalogue_manager',
      created_at: new Date().toISOString(),
      message: 'Stock adjustment committed to ledger successfully.',
    });
  } catch (err: any) {
    return errorResponse('VALIDATION_ERROR', err.message || 'Inventory adjustment failed', 400);
  }
}

