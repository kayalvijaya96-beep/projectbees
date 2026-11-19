import type {
  AdminStatus,
  BoardCode,
  ClassLevel,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ProductStatus,
  ProjectType,
  ReviewStatus,
  StockMovementType,
} from './enums';

export interface Board {
  id: string;
  code: BoardCode;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface ClassEntity {
  id: string;
  class_number: ClassLevel;
  display_name: string;
  created_at: string;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  display_name: string;
  gender: string | null;
  class_level: ClassLevel | null;
  board_id: string | null;
  profile_completion: number;
  is_parent_guardian: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserAddress {
  id: string;
  user_id: string;
  recipient_name: string;
  guardian_contact_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string | null;
  landmark: string | null;
  city: string;
  state: string;
  postal_code: string;
  delivery_instructions: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductSpecifications {
  materials?: string[];
  dimensions?: string;
  weight_grams?: number;
  difficulty?: 'Easy' | 'Medium' | 'Advanced';
  assembly_required?: boolean;
  batteries_included?: boolean;
  curriculum_topics?: string[];
  safety_warnings?: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  specifications: ProductSpecifications;
  selling_price: number;
  compare_at_price: number | null;
  status: ProductStatus;
  stock_tracking_enabled: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductAcademicMapping {
  id: string;
  product_id: string;
  board_id: string | null;
  class_id: string | null;
  subject_id: string | null;
  category_id: string;
  project_type: ProjectType | null;
}

export interface ProductMedia {
  id: string;
  product_id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface Inventory {
  product_id: string;
  available_quantity: number;
  reserved_quantity: number;
  low_stock_threshold: number;
  updated_at: string;
}

export interface StockMovement {
  id: string;
  product_id: string;
  movement_type: StockMovementType;
  quantity_delta: number;
  reason: string;
  actor_id: string | null;
  reference_type: string | null;
  reference_id: string | null;
  created_at: string;
}

export interface Cart {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CartItemWithProduct extends CartItem {
  product: Product & {
    media?: ProductMedia[];
    inventory?: Inventory;
  };
}

export interface CheckoutIntentItemSnapshot {
  product_id: string;
  title: string;
  sku: string;
  selling_price: number;
  quantity: number;
  line_total: number;
}

export interface CheckoutIntent {
  id: string;
  user_id: string;
  phone: string;
  delivery_address_id: string;
  address_snapshot: Partial<UserAddress>;
  items_snapshot: CheckoutIntentItemSnapshot[];
  subtotal: number;
  shipping_amount: number;
  total_amount: number;
  status: 'pending_otp' | 'otp_verified' | 'completed' | 'expired';
  idempotency_key: string;
  expires_at: string;
  created_at: string;
}

export interface OtpChallenge {
  id: string;
  checkout_intent_id: string;
  phone: string;
  otp_hash: string;
  provider: string;
  attempt_count: number;
  expires_at: string;
  verified_at: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  checkout_intent_id: string | null;
  address_snapshot: Partial<UserAddress>;
  guardian_contact_name: string;
  phone_snapshot: string;
  subtotal: number;
  shipping_amount: number;
  total_amount: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  tracking_number: string | null;
  courier_partner: string | null;
  idempotency_key: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  sku_snapshot: string;
  title_snapshot: string;
  unit_price_snapshot: number;
  quantity: number;
  line_total: number;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  old_status: OrderStatus | null;
  new_status: OrderStatus;
  reason: string | null;
  actor_id: string | null;
  created_at: string;
}

export interface CodCollectionRecord {
  id: string;
  order_id: string;
  amount_collected: number;
  collected_by: string;
  collected_at: string;
  reference_note: string | null;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  order_item_id: string;
  rating: number;
  review_text: string;
  status: ReviewStatus;
  is_verified_purchase: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminAccount {
  user_id: string;
  email: string;
  full_name: string;
  is_super_admin: boolean;
  status: AdminStatus;
  created_at: string;
  deactivated_at: string | null;
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Permission {
  id: string;
  permission_key: string;
  description: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  actor_role: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  request_id: string | null;
  safe_metadata: Record<string, unknown>;
  created_at: string;
}

export interface ServiceablePincode {
  pincode: string;
  city: string;
  state: string;
  is_cod_available: boolean;
  estimated_delivery_days: number;
}

export interface SystemSetting {
  key: string;
  value: unknown;
  description: string | null;
  updated_by: string | null;
  updated_at: string;
}

export interface ContentPage {
  id: string;
  slug: string;
  title: string;
  content_markdown: string;
  is_published: boolean;
  updated_by: string | null;
  updated_at: string;
}


export interface Wishlist {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface WishlistItem {
  id: string;
  wishlist_id: string;
  product_id: string;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed_amount';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount: number | null;
  valid_from: string;
  valid_to: string;
  usage_limit: number | null;
  usage_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CouponRedemption {
  id: string;
  coupon_id: string;
  user_id: string;
  order_id: string;
  discount_applied: number;
  redeemed_at: string;
}

export interface PaymentRecord {
  id: string;
  order_id: string;
  user_id: string;
  payment_gateway: 'COD' | 'RAZORPAY';
  gateway_order_id: string | null;
  gateway_payment_id: string | null;
  gateway_signature: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  raw_response: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CustomerNotification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  metadata: Record<string, unknown>;
  is_read: boolean;
  sent_email: boolean;
  created_at: string;
}
