import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(
  _request: NextRequest,
  { params }: { params: { pincode: string } }
) {
  const pincode = params.pincode?.trim();

  if (!pincode || !/^\d{6}$/.test(pincode)) {
    return errorResponse('VALIDATION_ERROR', 'A valid 6-digit Indian PIN code is required.', 400);
  }

  // Bengaluru Launch check (560xxx series)
  const isBengaluru = pincode.startsWith('560');

  if (isBengaluru) {
    return successResponse({
      pincode,
      city: 'Bengaluru',
      state: 'Karnataka',
      is_serviceable: true,
      is_cod_available: true,
      estimated_delivery_days: 2,
    });
  }

  // Pan-India check: COD supported in Tier 1 cities with 4-5 days delivery
  return successResponse({
    pincode,
    city: 'Rest of India',
    state: 'India',
    is_serviceable: true,
    is_cod_available: true,
    estimated_delivery_days: 5,
  });
}

