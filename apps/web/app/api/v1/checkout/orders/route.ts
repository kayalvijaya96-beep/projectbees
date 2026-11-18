import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { INTENT_STORE, ORDER_STORE, FinalOrderRecord } from '@/lib/checkout-store';
import { FinalizeOrderSchema } from '@projectbee/shared-types';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validated = FinalizeOrderSchema.parse(rawBody);

    // 1. Idempotency Check: if this idempotency key was already processed, return existing order
    for (const ord of ORDER_STORE.values()) {
      if (ord.idempotency_key === validated.idempotency_key) {
        return successResponse({
          order: ord,
          status: 'existing',
          message: 'Order already created with this idempotency key.',
        });
      }
    }

    // 2. Fetch and validate intent
    const intent = INTENT_STORE.get(validated.checkout_intent_id);
    if (!intent) {
      return errorResponse('NOT_FOUND', 'Checkout intent not found.', 404);
    }

    if (intent.status !== 'otp_verified') {
      return errorResponse(
        'VALIDATION_ERROR',
        'WhatsApp OTP verification must be completed before order placement.',
        400
      );
    }

    if (new Date() > intent.expires_at) {
      return errorResponse(
        'OTP_EXPIRED',
        'Checkout intent has expired. Please re-initiate checkout.',
        400
      );
    }

    // 3. Generate Order Number
    const orderNumber = `PB-${new Date().toISOString().slice(0, 7).replace('-', '')}-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newOrder: FinalOrderRecord = {
      id: orderId,
      order_number: orderNumber,
      checkout_intent_id: intent.id,
      address_snapshot: intent.address_snapshot,
      items_snapshot: intent.items_snapshot,
      subtotal: intent.subtotal,
      shipping_amount: intent.shipping_amount,
      total_amount: intent.total_amount,
      payment_method: 'COD',
      payment_status: 'unpaid',
      order_status: 'pending_confirmation',
      idempotency_key: validated.idempotency_key,
      created_at: new Date().toISOString(),
    };

    ORDER_STORE.set(orderId, newOrder);
    intent.status = 'completed';

    return successResponse(
      {
        order: newOrder,
        status: 'created',
        message: 'Cash on Delivery order confirmed successfully.',
      },
      201
    );
  } catch (err: any) {
    return errorResponse('VALIDATION_ERROR', err.message || 'Order creation failed', 400);
  }
}

