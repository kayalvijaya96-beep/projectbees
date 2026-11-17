import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { OtpService } from '@/lib/otp-service';
import { INTENT_STORE } from '@/app/api/v1/checkout/intents/route';
import { VerifyWhatsAppOtpSchema } from '@projectbee/shared-types';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validated = VerifyWhatsAppOtpSchema.parse(rawBody);

    const intent = INTENT_STORE.get(validated.checkout_intent_id);
    if (!intent) {
      return errorResponse('NOT_FOUND', 'Checkout intent not found.', 404);
    }

    const verificationResult = await OtpService.verifyChallenge(
      intent.id,
      validated.otp_code
    );

    if (!verificationResult.success) {
      return errorResponse('OTP_INVALID', verificationResult.error || 'Invalid OTP code.', 400);
    }

    // Update status of intent to otp_verified
    intent.status = 'otp_verified';

    return successResponse({
      checkout_intent_id: intent.id,
      status: 'otp_verified',
      verified_at: new Date().toISOString(),
      message: 'WhatsApp number successfully verified for Cash on Delivery.',
    });
  } catch (err: any) {
    return errorResponse('VALIDATION_ERROR', err.message || 'OTP verification failed', 400);
  }
}

