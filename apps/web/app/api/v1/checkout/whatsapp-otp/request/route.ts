import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { OtpService } from '@/lib/otp-service';
import { INTENT_STORE } from '@/app/api/v1/checkout/intents/route';
import { RequestWhatsAppOtpSchema } from '@projectbee/shared-types';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validated = RequestWhatsAppOtpSchema.parse(rawBody);

    const intent = INTENT_STORE.get(validated.checkout_intent_id);
    if (!intent) {
      return errorResponse('NOT_FOUND', 'Checkout intent not found.', 404);
    }

    if (intent.status === 'completed') {
      return errorResponse('CONFLICT', 'This checkout intent has already been converted into an order.', 409);
    }

    const challenge = await OtpService.createChallenge(intent.id, intent.phone);

    return successResponse({
      checkout_intent_id: intent.id,
      phone_masked: `+91 ******${intent.phone.slice(-4)}`,
      expires_at: challenge.expires_at,
      dev_mock_otp: challenge.dev_code,
    });
  } catch (err: any) {
    return errorResponse('VALIDATION_ERROR', err.message || 'Failed to dispatch WhatsApp OTP', 400);
  }
}

