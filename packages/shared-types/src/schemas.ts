import { z } from 'zod';

export const BoardCodeSchema = z.enum(['CBSE', 'ICSE']);

export const ClassLevelSchema = z.number().int().min(1).max(12);

export const ProjectTypeSchema = z.enum([
  'working_model',
  'still_model',
  'chart',
  'diy_kit',
  'assignment_material',
]);

// 1. Customer Authentication Schemas
export const EmailOtpRequestSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const EmailOtpVerifySchema = z.object({
  email: z.string().email(),
  token: z.string().min(6, 'Verification code must be at least 6 digits'),
});

// 2. Profile Schemas
export const UpdateProfileSchema = z.object({
  display_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional().nullable(),
  class_level: ClassLevelSchema.optional().nullable(),
  board_id: z.string().uuid().optional().nullable(),
  is_parent_guardian: z.boolean().default(true),
});

// 3. Address Schemas
export const UserAddressSchema = z.object({
  recipient_name: z.string().min(2, 'Recipient name is required').max(100),
  guardian_contact_name: z.string().min(2, 'Parent / Guardian name is required').max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  address_line_1: z.string().min(5, 'House/Flat/Street number is required').max(255),
  address_line_2: z.string().max(255).optional().nullable(),
  landmark: z.string().max(150).optional().nullable(),
  city: z.string().min(2, 'City is required').max(100),
  state: z.string().min(2, 'State is required').max(100).default('Karnataka'),
  postal_code: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit PIN code'),
  delivery_instructions: z.string().max(500).optional().nullable(),
  is_default: z.boolean().default(false),
});

// 4. Cart Schemas
export const AddToCartSchema = z.object({
  product_id: z.string().uuid('Invalid product ID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(10, 'Maximum 10 units per item'),
});

export const UpdateCartItemSchema = z.object({
  quantity: z.number().int().min(1).max(10),
});

// 5. Checkout & WhatsApp OTP Schemas
export const CreateCheckoutIntentSchema = z.object({
  address_id: z.string().uuid('Invalid address ID'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian mobile number'),
  idempotency_key: z.string().uuid('Idempotency key required'),
});

export const RequestWhatsAppOtpSchema = z.object({
  checkout_intent_id: z.string().uuid('Invalid checkout intent ID'),
});

export const VerifyWhatsAppOtpSchema = z.object({
  checkout_intent_id: z.string().uuid('Invalid checkout intent ID'),
  otp_code: z.string().length(6, 'Verification code must be 6 digits'),
});

export const FinalizeOrderSchema = z.object({
  checkout_intent_id: z.string().uuid('Invalid checkout intent ID'),
  idempotency_key: z.string().uuid('Idempotency key required'),
});

// 6. Review Schemas
export const CreateReviewSchema = z.object({
  order_item_id: z.string().uuid('Invalid order item ID'),
  rating: z.number().int().min(1).max(5),
  review_text: z.string().min(10, 'Review must be at least 10 characters').max(1000),
});

export const ModerateReviewSchema = z.object({
  action: z.enum(['approved', 'rejected', 'flagged']),
  reason: z.string().min(3, 'A reason is required for review moderation').max(500),
});

// 7. Admin Schemas
export const CreateProductSchema = z.object({
  sku: z.string().min(3).max(50),
  slug: z.string().min(3).max(150),
  title: z.string().min(3).max(255),
  short_description: z.string().min(10),
  full_description: z.string().min(20),
  specifications: z.record(z.any()).default({}),
  selling_price: z.number().positive('Selling price must be positive'),
  compare_at_price: z.number().positive().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  stock_tracking_enabled: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  board_id: z.string().uuid().optional().nullable(),
  class_id: z.string().uuid().optional().nullable(),
  subject_id: z.string().uuid().optional().nullable(),
  category_id: z.string().uuid(),
  project_type: ProjectTypeSchema.optional().nullable(),
  initial_stock: z.number().int().min(0).default(10),
});

export const AdjustInventorySchema = z.object({
  product_id: z.string().uuid(),
  quantity_delta: z.number().int(),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
});

export const RecordCodCollectionSchema = z.object({
  order_id: z.string().uuid(),
  amount_collected: z.number().positive(),
  reference_note: z.string().max(500).optional().nullable(),
});

export const UpdateOrderStatusSchema = z.object({
  new_status: z.enum([
    'pending_confirmation',
    'confirmed',
    'processing',
    'packed',
    'shipped',
    'out_for_delivery',
    'delivered',
    'cancelled',
    'delivery_failed',
  ]),
  reason: z.string().optional().nullable(),
  tracking_number: z.string().optional().nullable(),
  courier_partner: z.string().optional().nullable(),
});

export const InviteAdminSchema = z.object({
  email: z.string().email(),
  full_name: z.string().min(2).max(100),
  role_id: z.string().uuid(),
});

export const UpdateAdminStatusSchema = z.object({
  status: z.enum(['active', 'suspended', 'deactivated']),
  reason: z.string().min(3),
});

export const CheckPincodeSchema = z.object({
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit PIN code'),
});

