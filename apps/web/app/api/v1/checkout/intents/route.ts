import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { calculateOrderPricing, ValidatedLineItem } from '@/lib/pricing';
import { CreateCheckoutIntentSchema } from '@projectbee/shared-types';
import { INTENT_STORE, LockedCheckoutIntent } from '@/lib/checkout-store';

const CATALOGUE_PRICES: Record<string, { title: string; sku: string; price: number }> = {
  'f0000000-0000-0000-0000-000000000001': {
    title: "Hydraulic Lift Working Science Model (Pascal's Law Demonstration)",
    sku: 'PB-SCI-HYD-01',
    price: 499.0,
  },
  'f0000000-0000-0000-0000-000000000002': {
    title: 'Windmill Electricity Generator Working Model with LED Glow',
    sku: 'PB-SCI-WND-02',
    price: 599.0,
  },
};

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validated = CreateCheckoutIntentSchema.parse({
      address_id: rawBody.address_id,
      phone: rawBody.phone,
      idempotency_key: rawBody.idempotency_key,
    });

    // Check if an intent with this idempotency key already exists
    for (const intent of INTENT_STORE.values()) {
      if (intent.idempotency_key === validated.idempotency_key) {
        return successResponse({ checkout_intent: intent });
      }
    }

    // Default sample line item if not provided
    const rawItems: { product_id: string; quantity: number }[] = rawBody.items || [
      { product_id: 'f0000000-0000-0000-0000-000000000001', quantity: 1 },
    ];

    const validatedItems: ValidatedLineItem[] = [];
    for (const item of rawItems) {
      const prod = CATALOGUE_PRICES[item.product_id];
      if (prod) {
        validatedItems.push({
          product_id: item.product_id,
          sku: prod.sku,
          title: prod.title,
          unit_price: prod.price,
          quantity: item.quantity,
          line_total: prod.price * item.quantity,
        });
      }
    }

    const pricing = calculateOrderPricing(validatedItems);
    const intentId = `intent_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15-minute checkout intent lock

    const intentRecord: LockedCheckoutIntent = {
      id: intentId,
      user_id: 'usr_guest_or_authenticated',
      phone: validated.phone,
      address_id: validated.address_id,
      address_snapshot: rawBody.address_snapshot || {
        recipient_name: 'Aarav Sharma',
        guardian_contact_name: 'Ananya Sharma',
        phone: validated.phone,
        address_line_1: '#42, 3rd Cross, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        postal_code: '560038',
      },
      items_snapshot: validatedItems,
      subtotal: pricing.subtotal,
      shipping_amount: pricing.shipping_amount,
      total_amount: pricing.total_amount,
      status: 'pending_otp',
      idempotency_key: validated.idempotency_key,
      expires_at: expiresAt,
      created_at: new Date(),
    };

    INTENT_STORE.set(intentId, intentRecord);

    return successResponse({
      checkout_intent_id: intentId,
      status: intentRecord.status,
      phone: intentRecord.phone,
      total_amount: intentRecord.total_amount,
      expires_at: expiresAt.toISOString(),
    }, 201);
  } catch (err: any) {
    return errorResponse('VALIDATION_ERROR', err.message || 'Invalid intent creation payload', 400);
  }
}
