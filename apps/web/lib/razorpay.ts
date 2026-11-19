import crypto from 'crypto';

export interface RazorpayOrderOptions {
  amount: number; // in paise
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: 'order';
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

export class RazorpayClient {
  private keyId: string;
  private keySecret: string;
  private baseUrl = 'https://api.razorpay.com/v1';

  constructor(keyId?: string, keySecret?: string) {
    this.keyId = keyId || process.env.RAZORPAY_KEY_ID || '';
    this.keySecret = keySecret || process.env.RAZORPAY_KEY_SECRET || '';
  }

  get isConfigured(): boolean {
    return Boolean(this.keyId && this.keySecret);
  }

  get publicKey(): string {
    return this.keyId;
  }

  /**
   * Creates an order with Razorpay Orders API
   */
  async createOrder(options: RazorpayOrderOptions): Promise<RazorpayOrderResponse> {
    if (!this.isConfigured) {
      // In dev mode without keys, produce a deterministic mock order
      return {
        id: `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        entity: 'order',
        amount: options.amount,
        amount_paid: 0,
        amount_due: options.amount,
        currency: options.currency || 'INR',
        receipt: options.receipt,
        status: 'created',
        attempts: 0,
        notes: options.notes || {},
        created_at: Math.floor(Date.now() / 1000),
      };
    }

    const authHeader = 'Basic ' + Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64');
    const response = await fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({
        amount: options.amount,
        currency: options.currency || 'INR',
        receipt: options.receipt,
        notes: options.notes,
      }),
    });

    if (!response.ok) {
      const errorJson = await response.json();
      throw new Error(errorJson.error?.description || 'Razorpay order creation failed');
    }

    return response.json();
  }

  /**
   * Verifies Razorpay payment signature
   * signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret)
   */
  verifyPaymentSignature(params: {
    orderId: string;
    paymentId: string;
    signature: string;
  }): boolean {
    if (!this.isConfigured) {
      // Dev mode signature verification
      return params.signature.length > 0;
    }

    const body = `${params.orderId}|${params.paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', this.keySecret)
      .update(body)
      .digest('hex');

    return expectedSignature === params.signature;
  }

  /**
   * Verifies incoming webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string, webhookSecret: string): boolean {
    const expected = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');
    return expected === signature;
  }
}

export const razorpay = new RazorpayClient();
