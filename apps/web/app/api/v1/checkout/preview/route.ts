import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { calculateOrderPricing, ValidatedLineItem } from '@/lib/pricing';

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
    const body = await request.json();
    const rawItems: { product_id: string; quantity: number }[] = body.items || [];

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return errorResponse('VALIDATION_ERROR', 'At least one line item is required.', 400);
    }

    const validatedItems: ValidatedLineItem[] = [];

    for (const item of rawItems) {
      const product = CATALOGUE_PRICES[item.product_id];
      if (!product) {
        return errorResponse('NOT_FOUND', `Product ID '${item.product_id}' not found in catalogue.`, 404);
      }
      if (item.quantity < 1 || item.quantity > 10) {
        return errorResponse('VALIDATION_ERROR', 'Quantity must be between 1 and 10 units.', 400);
      }
      validatedItems.push({
        product_id: item.product_id,
        sku: product.sku,
        title: product.title,
        unit_price: product.price,
        quantity: item.quantity,
        line_total: product.price * item.quantity,
      });
    }

    const calculation = calculateOrderPricing(validatedItems);

    return successResponse({
      pricing: calculation,
      payment_method: 'COD',
      currency: 'INR',
    });
  } catch (err: any) {
    return errorResponse('VALIDATION_ERROR', err.message || 'Invalid checkout preview payload', 400);
  }
}

