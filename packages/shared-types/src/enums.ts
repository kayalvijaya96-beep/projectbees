export type BoardCode = 'CBSE' | 'ICSE';

export type ClassLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ProjectType = 'working_model' | 'still_model' | 'chart' | 'diy_kit' | 'assignment_material';

export type ProductStatus = 'draft' | 'published' | 'archived';

export type OrderStatus =
  | 'pending_confirmation'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'delivery_failed';

export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'failed';

export type PaymentMethod = 'COD';

export type StockMovementType =
  | 'initial_stock'
  | 'manual_adjustment'
  | 'order_placed'
  | 'order_cancelled'
  | 'return_restock'
  | 'damaged_scrap';

export type AdminStatus = 'active' | 'suspended' | 'deactivated';

export type ReviewStatus = 'pending_review' | 'approved' | 'rejected' | 'flagged';

export type GenderOption = 'male' | 'female' | 'other' | 'prefer_not_to_say';
