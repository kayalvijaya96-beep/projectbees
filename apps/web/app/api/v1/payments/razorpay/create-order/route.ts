import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { razorpay } from '@/lib/razorpay';
import { INTENT_STORE } from '@/lib/checkout-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { checkoutIntentId } = body;

    if (!checkoutIntentId) {
      return errorResponse('VALIDATION_ERROR', 'checkoutIntentId is required.', 400);
    }

    const intent = INTENT_STORE.get(checkoutIntentId);
    if (!intent) {
      return errorResponse('NOT_FOUND', 'Checkout intent not found.', 404);
    }

    if (new Date() > intent.expires_at) {
      return errorResponse('EXPIRED', 'Checkout intent has expired. Please restart checkout.', 400);
    }

    // Amount in Paise (e.g. ₹499 -> 49900)
    const amountInPaise = Math.round(intent.total_amount * 100);

    const razorpayOrder = await razorpay.createOrder({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${intent.id.substring(0, 10)}`,
      notes: {
        intentId: intent.id,
        phone: intent.phone,
      },
    });

    return successResponse({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: razorpay.publicKey,
      isConfigured: razorpay.isConfigured,
    });
  } catch (err: any) {
    return errorResponse('PAYMENT_ERROR', err.message || 'Razorpay order creation failed', 500);
  }
}
