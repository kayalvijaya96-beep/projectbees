import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { razorpay } from '@/lib/razorpay';
import { ORDER_STORE } from '@/lib/checkout-store';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature') || '';
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';

    if (webhookSecret && !razorpay.verifyWebhookSignature(rawBody, signature, webhookSecret)) {
      return errorResponse('INVALID_SIGNATURE', 'Razorpay webhook signature verification failed', 400);
    }

    const event = JSON.parse(rawBody);

    // Handle payment captured event
    if (event.event === 'payment.captured') {
      const paymentEntity = event.payload.payment.entity;
      const orderId = paymentEntity.order_id;

      // Update matching order in store
      for (const order of ORDER_STORE.values()) {
        if (order.checkout_intent_id === paymentEntity.notes?.intentId) {
          order.payment_status = 'paid';
          break;
        }
      }
    }

    return successResponse({ received: true });
  } catch (err: any) {
    return errorResponse('WEBHOOK_ERROR', err.message || 'Webhook processing failed', 400);
  }
}
