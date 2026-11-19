import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { razorpay } from '@/lib/razorpay';
import { INTENT_STORE, ORDER_STORE, FinalOrderRecord } from '@/lib/checkout-store';
import { notificationService } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      checkoutIntentId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    if (!checkoutIntentId || !razorpayOrderId || !razorpayPaymentId) {
      return errorResponse('VALIDATION_ERROR', 'Missing required payment parameters.', 400);
    }

    const intent = INTENT_STORE.get(checkoutIntentId);
    if (!intent) {
      return errorResponse('NOT_FOUND', 'Checkout intent not found.', 404);
    }

    // Server-side HMAC SHA256 Signature Verification
    const isValidSignature = razorpay.verifyPaymentSignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature || '',
    });

    if (!isValidSignature) {
      return errorResponse('PAYMENT_VERIFICATION_FAILED', 'Invalid Razorpay payment signature.', 400);
    }

    // Order number generation
    const orderNumber = `PB-${new Date().toISOString().slice(0, 7).replace('-', '')}-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderId = `ord_rzp_${Date.now()}`;

    const newOrder: FinalOrderRecord = {
      id: orderId,
      order_number: orderNumber,
      checkout_intent_id: intent.id,
      address_snapshot: intent.address_snapshot,
      items_snapshot: intent.items_snapshot,
      subtotal: intent.subtotal,
      shipping_amount: intent.shipping_amount,
      total_amount: intent.total_amount,
      payment_method: 'RAZORPAY' as any,
      payment_status: 'paid',
      order_status: 'confirmed' as any,
      idempotency_key: intent.idempotency_key,
      created_at: new Date().toISOString(),
    };

    ORDER_STORE.set(orderId, newOrder);
    intent.status = 'completed';

    // Dispatch email notification
    await notificationService.notifyOrderEvent({
      email: intent.address_snapshot?.email || 'customer@example.com',
      type: 'payment_confirmed',
      title: 'Payment Successful & Order Confirmed',
      message: `Your payment of ₹${intent.total_amount} via Razorpay was successful. Your educational science project kit is being packed!`,
      metadata: {
        orderNumber,
        totalAmount: intent.total_amount,
        paymentId: razorpayPaymentId,
      },
    });

    return successResponse({
      order: newOrder,
      status: 'paid',
      message: 'Razorpay payment verified and order created successfully.',
    });
  } catch (err: any) {
    return errorResponse('PAYMENT_ERROR', err.message || 'Signature verification failed', 500);
  }
}
