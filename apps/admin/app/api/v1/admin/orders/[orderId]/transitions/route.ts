import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { UpdateOrderStatusSchema, OrderStatus } from '@projectbee/shared-types';

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending_confirmation: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['packed', 'cancelled'],
  packed: ['shipped', 'cancelled'],
  shipped: ['out_for_delivery', 'delivery_failed'],
  out_for_delivery: ['delivered', 'delivery_failed'],
  delivered: [],
  cancelled: [],
  delivery_failed: ['shipped', 'cancelled'],
};

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const rawBody = await request.json();
    const validated = UpdateOrderStatusSchema.parse(rawBody);

    // Current mock status: pending_confirmation
    const currentStatus: OrderStatus = 'pending_confirmation';
    const allowed = ALLOWED_TRANSITIONS[currentStatus] || [];

    if (!allowed.includes(validated.new_status as OrderStatus)) {
      return errorResponse(
        'INVALID_STATE_TRANSITION',
        `Cannot transition order from '${currentStatus}' to '${validated.new_status}'. Allowed next states: ${allowed.join(', ')}`,
        400
      );
    }

    return successResponse({
      order_id: params.orderId,
      old_status: currentStatus,
      new_status: validated.new_status,
      reason: validated.reason || 'Operational status update',
      updated_at: new Date().toISOString(),
      updated_by: 'admin_operational_actor',
    });
  } catch (err: any) {
    return errorResponse('VALIDATION_ERROR', err.message || 'Status transition failed', 400);
  }
}

