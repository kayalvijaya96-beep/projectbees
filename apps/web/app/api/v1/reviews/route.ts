import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ORDER_STORE } from '@/lib/checkout-store';

export interface CustomerReview {
  id: string;
  productId: string;
  orderNumber: string;
  userName: string;
  rating: number;
  reviewText: string;
  verifiedPurchase: boolean;
  status: 'pending_review' | 'approved' | 'rejected';
  createdAt: string;
}

export const REVIEWS_STORE: CustomerReview[] = [
  {
    id: 'rev_1',
    productId: 'f0000000-0000-0000-0000-000000000001',
    orderNumber: 'PB-202611-10245',
    userName: 'Kavita Sundaram (Parent of Class 8)',
    rating: 5,
    reviewText: 'My son won 1st prize in his inter-school science fair with this hydraulic jack! The acrylic parts were robust and child-safe.',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-11-12T10:00:00Z',
  },
  {
    id: 'rev_2',
    productId: 'f0000000-0000-0000-0000-000000000002',
    orderNumber: 'PB-202611-10492',
    userName: 'Rajesh Nair (Class 9 Teacher)',
    rating: 5,
    reviewText: 'Clear viva question pamphlet included. Students understood renewable wind kinetic energy thoroughly.',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-11-14T14:30:00Z',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    let approvedReviews = REVIEWS_STORE.filter((r) => r.status === 'approved');
    if (productId) {
      approvedReviews = approvedReviews.filter((r) => r.productId === productId);
    }

    const averageRating =
      approvedReviews.length > 0
        ? Number((approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1))
        : 5.0;

    return successResponse({
      reviews: approvedReviews,
      totalCount: approvedReviews.length,
      averageRating,
    });
  } catch (err: any) {
    return errorResponse('INTERNAL_ERROR', err.message || 'Failed to fetch reviews', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, orderNumber, userName, rating, reviewText } = body;

    if (!productId || !orderNumber || !userName || !rating || !reviewText) {
      return errorResponse('VALIDATION_ERROR', 'All review fields are required.', 400);
    }

    if (rating < 1 || rating > 5) {
      return errorResponse('VALIDATION_ERROR', 'Rating must be an integer between 1 and 5.', 400);
    }

    // Verify verified purchase from orders
    let isVerifiedPurchase = false;
    for (const order of ORDER_STORE.values()) {
      if (order.order_number === orderNumber) {
        const hasItem = order.items_snapshot.some((item) => item.product_id === productId);
        if (hasItem) {
          isVerifiedPurchase = true;
          break;
        }
      }
    }

    const newReview: CustomerReview = {
      id: `rev_${Date.now()}`,
      productId,
      orderNumber,
      userName,
      rating: Math.round(rating),
      reviewText,
      verifiedPurchase: isVerifiedPurchase,
      status: 'pending_review',
      createdAt: new Date().toISOString(),
    };

    REVIEWS_STORE.push(newReview);

    return successResponse(
      {
        message: 'Review submitted successfully. It will be visible upon moderation approval.',
        reviewId: newReview.id,
      },
      201
    );
  } catch (err: any) {
    return errorResponse('INTERNAL_ERROR', err.message || 'Failed to submit review', 500);
  }
}
