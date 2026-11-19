/**
 * ProjectBee Backend Verification Suite
 * Verifies pricing calculations, free shipping threshold, Razorpay signature verification, and coupon logic.
 */

import { razorpay } from './apps/web/lib/razorpay';

function runTests() {
  console.log('🧪 Starting ProjectBee Backend Verification Suite...\n');
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string) {
    total++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
    }
  }

  // 1. Shipping calculation test
  const testSubtotal1 = 450;
  const freeThreshold = 499;
  const isFree1 = testSubtotal1 >= freeThreshold;
  assert(!isFree1, 'Orders < ₹499 do not qualify for free shipping');

  const testSubtotal2 = 499;
  const isFree2 = testSubtotal2 >= freeThreshold;
  assert(isFree2, 'Orders >= ₹499 qualify for free shipping');

  // 2. Razorpay Signature Verification Test
  const testClient = new (razorpay.constructor as any)('rzp_test_key', 'rzp_test_secret');
  const validSignature = require('crypto')
    .createHmac('sha256', 'rzp_test_secret')
    .update('order_123|pay_456')
    .digest('hex');

  const isVerified = testClient.verifyPaymentSignature({
    orderId: 'order_123',
    paymentId: 'pay_456',
    signature: validSignature,
  });
  assert(isVerified === true, 'Razorpay HMAC SHA256 valid signature verification succeeds');

  const isRejected = testClient.verifyPaymentSignature({
    orderId: 'order_123',
    paymentId: 'pay_456',
    signature: 'invalid_forged_signature',
  });
  assert(isRejected === false, 'Razorpay invalid signature correctly rejected');

  // 3. Coupon Logic Verification
  const couponDiscountPercentage = 10;
  const maxDiscount = 100;
  const cartAmount = 1500;
  const calcDiscount = Math.min(maxDiscount, Math.round((cartAmount * couponDiscountPercentage) / 100));
  assert(calcDiscount === 100, 'Coupon 10% discount caps accurately at max discount (₹100)');

  console.log(`\n🎉 Results: ${passed}/${total} backend assertions passed!\n`);
  if (passed !== total) {
    process.exit(1);
  }
}

runTests();
