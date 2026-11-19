import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';

const COUPONS_CATALOGUE = [
  {
    code: 'BEEFIRST',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 400,
    maxDiscount: 100,
    description: '10% off on your first science exhibition project',
  },
  {
    code: 'EXHIBITION50',
    discountType: 'fixed_amount',
    discountValue: 50,
    minOrderAmount: 500,
    maxDiscount: 50,
    description: 'Flat ₹50 off on orders above ₹500',
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, orderAmount } = body;

    if (!code || typeof orderAmount !== 'number') {
      return errorResponse('VALIDATION_ERROR', 'Coupon code and orderAmount are required.', 400);
    }

    const coupon = COUPONS_CATALOGUE.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return errorResponse('INVALID_COUPON', 'Invalid or expired coupon code.', 400);
    }

    if (orderAmount < coupon.minOrderAmount) {
      return errorResponse(
        'MIN_ORDER_NOT_MET',
        `This coupon requires a minimum cart value of ₹${coupon.minOrderAmount}.`,
        400
      );
    }

    let discountApplied = 0;
    if (coupon.discountType === 'percentage') {
      discountApplied = Math.round((orderAmount * coupon.discountValue) / 100);
      if (coupon.maxDiscount) {
        discountApplied = Math.min(coupon.maxDiscount, discountApplied);
      }
    } else {
      discountApplied = coupon.discountValue;
    }

    return successResponse({
      code: coupon.code,
      discountApplied,
      finalAmount: Math.max(0, orderAmount - discountApplied),
      description: coupon.description,
    });
  } catch (err: any) {
    return errorResponse('INTERNAL_ERROR', err.message || 'Coupon verification failed', 500);
  }
}
