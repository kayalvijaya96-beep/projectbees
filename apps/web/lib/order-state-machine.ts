import type { OrderStatus } from '@projectbee/shared-types';

export const ALLOWED_ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending_confirmation: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['packed', 'cancelled'],
  packed: ['shipped', 'cancelled'],
  shipped: ['out_for_delivery', 'delivery_failed'],
  out_for_delivery: ['delivered', 'delivery_failed'],
  delivered: [], // Terminal successful state
  cancelled: [], // Terminal cancelled state
  delivery_failed: ['shipped', 'cancelled'], // Allow re-attempt dispatch or final cancellation
};

export function canTransitionOrder(
  currentStatus: OrderStatus,
  targetStatus: OrderStatus
): boolean {
  if (currentStatus === targetStatus) {
    return true;
  }
  const allowed = ALLOWED_ORDER_TRANSITIONS[currentStatus];
  return allowed ? allowed.includes(targetStatus) : false;
}

export function validateOrderTransition(
  currentStatus: OrderStatus,
  targetStatus: OrderStatus
): { valid: boolean; error?: string } {
  if (!canTransitionOrder(currentStatus, targetStatus)) {
    return {
      valid: false,
      error: `INVALID_STATE_TRANSITION: Cannot transition order from '${currentStatus}' to '${targetStatus}'.`,
    };
  }
  return { valid: true };
}

