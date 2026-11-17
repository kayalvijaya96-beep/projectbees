import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { RecordCodCollectionSchema } from '@projectbee/shared-types';

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const rawBody = await request.json();
    const validated = RecordCodCollectionSchema.parse({
      order_id: params.orderId,
      amount_collected: rawBody.amount_collected,
      reference_note: rawBody.reference_note,
    });

    return successResponse({
      order_id: validated.order_id,
      amount_collected: validated.amount_collected,
      currency: 'INR',
      payment_status: 'paid',
      collected_by: 'admin_delivery_officer',
      collected_at: new Date().toISOString(),
      reference_note: validated.reference_note || 'Doorstep COD cash verified',
    });
  } catch (err: any) {
    return errorResponse('VALIDATION_ERROR', err.message || 'COD recording failed', 400);
  }
}

