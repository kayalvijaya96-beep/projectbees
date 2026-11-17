import { ValidatedLineItem } from '@/lib/pricing';

export interface LockedCheckoutIntent {
  id: string;
  user_id: string;
  phone: string;
  address_id: string;
  address_snapshot: Record<string, any>;
  items_snapshot: ValidatedLineItem[];
  subtotal: number;
  shipping_amount: number;
  total_amount: number;
  status: 'pending_otp' | 'otp_verified' | 'completed' | 'expired';
  idempotency_key: string;
  expires_at: Date;
  created_at: Date;
}

export interface FinalOrderRecord {
  id: string;
  order_number: string;
  checkout_intent_id: string;
  address_snapshot: Record<string, any>;
  items_snapshot: any[];
  subtotal: number;
  shipping_amount: number;
  total_amount: number;
  payment_method: 'COD';
  payment_status: 'unpaid' | 'paid';
  order_status: 'pending_confirmation';
  idempotency_key: string;
  created_at: string;
}

// Global in-memory stores for checkout & orders in Next.js
export const INTENT_STORE = new Map<string, LockedCheckoutIntent>();
export const ORDER_STORE = new Map<string, FinalOrderRecord>();

