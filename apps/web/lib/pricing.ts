export interface LineItemInput {
  product_id: string;
  quantity: number;
}

export interface ValidatedLineItem {
  product_id: string;
  sku: string;
  title: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface PricingCalculationResult {
  subtotal: number;
  shipping_amount: number;
  total_amount: number;
  is_free_shipping: boolean;
  free_shipping_threshold: number;
  items: ValidatedLineItem[];
}

export const FREE_SHIPPING_THRESHOLD = 499.0;
export const STANDARD_SHIPPING_FEE = 50.0;

/**
 * Recalculates line items and shipping server-side.
 * Strictly ignores any client-supplied totals or shipping fees.
 */
export function calculateOrderPricing(
  items: ValidatedLineItem[]
): PricingCalculationResult {
  if (!items || items.length === 0) {
    return {
      subtotal: 0,
      shipping_amount: 0,
      total_amount: 0,
      is_free_shipping: false,
      free_shipping_threshold: FREE_SHIPPING_THRESHOLD,
      items: [],
    };
  }

  const subtotal = items.reduce((sum, item) => {
    const lineTotal = Number((item.unit_price * item.quantity).toFixed(2));
    item.line_total = lineTotal;
    return sum + lineTotal;
  }, 0);

  const roundedSubtotal = Number(subtotal.toFixed(2));
  const isFreeShipping = roundedSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingAmount = isFreeShipping ? 0.0 : STANDARD_SHIPPING_FEE;
  const totalAmount = Number((roundedSubtotal + shippingAmount).toFixed(2));

  return {
    subtotal: roundedSubtotal,
    shipping_amount: shippingAmount,
    total_amount: totalAmount,
    is_free_shipping: isFreeShipping,
    free_shipping_threshold: FREE_SHIPPING_THRESHOLD,
    items,
  };
}

