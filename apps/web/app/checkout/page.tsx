'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { Button, Input } from '@projectbee/ui';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  ShoppingBag,
  ArrowRight,
  Phone,
  Check,
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, shippingFee, totalAmount, clearCart } = useCart();

  const [step, setStep] = useState<'address' | 'otp' | 'confirmed'>('address');
  const [phone, setPhone] = useState('9876543210');
  const [guardianName, setGuardianName] = useState('Ananya Sharma');
  const [recipientName, setRecipientName] = useState('Aarav Sharma (Class 8)');
  const [addressLine, setAddressLine] = useState('#42, 3rd Cross, Indiranagar');
  const [pincode, setPincode] = useState('560038');
  const [guardianConfirmed, setGuardianConfirmed] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleProceedToOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guardianConfirmed) {
      setError('Parent or legal guardian consent is required before placing a Cash on Delivery order.');
      return;
    }
    if (phone.length !== 10) {
      setError('Please provide a valid 10-digit Indian mobile number.');
      return;
    }
    if (pincode.length !== 6) {
      setError('Please provide a valid 6-digit Indian PIN code.');
      return;
    }

    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtpAndPlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit WhatsApp OTP verification code.');
      return;
    }
    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const generatedOrderNo = 'PB-202611-' + Math.floor(10000 + Math.random() * 90000);
      setOrderNumber(generatedOrderNo);
      setStep('confirmed');
      clearCart();
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#E2E8F0] pb-4 space-y-1">
        <div className="flex items-center gap-2 text-xs text-[#68778A]">
          <Link href="/cart" className="hover:text-[#173B67]">Cart</Link>
          <span>/</span>
          <span className="font-semibold text-[#173B67]">Cash on Delivery Checkout</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#173B67] tracking-tight">
          Doorstep Cash on Delivery Checkout
        </h1>
        <p className="text-xs sm:text-sm text-[#68778A]">
          Safe, verified order placement with zero advance card payment required.
        </p>
      </div>

      {/* Progress Stepper Bar */}
      <div className="flex items-center justify-between max-w-md mx-auto text-xs font-semibold">
        <div className={`flex items-center gap-1.5 ${step === 'address' ? 'text-[#173B67] font-bold' : 'text-[#68778A]'}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step === 'address' ? 'bg-[#173B67] text-white' : 'bg-[#E2E8F0] text-[#68778A]'}`}>
            1
          </span>
          <span>Delivery Details</span>
        </div>

        <div className={`h-0.5 flex-1 mx-3 ${step !== 'address' ? 'bg-[#173B67]' : 'bg-[#E2E8F0]'}`} />

        <div className={`flex items-center gap-1.5 ${step === 'otp' ? 'text-[#173B67] font-bold' : 'text-[#68778A]'}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step === 'otp' ? 'bg-[#173B67] text-white' : 'bg-[#E2E8F0] text-[#68778A]'}`}>
            2
          </span>
          <span>WhatsApp OTP</span>
        </div>

        <div className={`h-0.5 flex-1 mx-3 ${step === 'confirmed' ? 'bg-[#16A34A]' : 'bg-[#E2E8F0]'}`} />

        <div className={`flex items-center gap-1.5 ${step === 'confirmed' ? 'text-[#16A34A] font-bold' : 'text-[#68778A]'}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step === 'confirmed' ? 'bg-[#16A34A] text-white' : 'bg-[#E2E8F0] text-[#68778A]'}`}>
            3
          </span>
          <span>Confirmed</span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Address & Guardian Form */}
      {step === 'address' && (
        <form
          onSubmit={handleProceedToOtp}
          className="p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] bg-white shadow-soft space-y-6"
        >
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <h2 className="text-base sm:text-lg font-extrabold font-heading text-[#173B67] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#F6C94B]" />
              <span>Doorstep Delivery Address</span>
            </h2>
            <span className="text-xs font-bold text-[#173B67] bg-[#EFF6FF] px-2.5 py-1 rounded-lg">
              Bengaluru &amp; Pan-India COD
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Student / Recipient Full Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Aarav Sharma (Class 8)"
              required
            />
            <Input
              label="Parent / Guardian Contact Name"
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
              placeholder="e.g. Ananya Sharma"
              required
              helperText="Required for child data protection and delivery coordination"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Parent / Guardian WhatsApp Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="10-digit Indian mobile number"
              maxLength={10}
              required
              helperText="A 6-digit WhatsApp OTP verification challenge will be sent to this number"
            />
            <Input
              label="PIN Code"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 560038"
              maxLength={6}
              required
              helperText="Express 2-day delivery in Bengaluru 560xxx pin codes"
            />
          </div>

          <Input
            label="House / Flat No., Apartment Name, Street Address"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            placeholder="e.g. #42, 3rd Cross, Indiranagar"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input label="City" defaultValue="Bengaluru" readOnly disabled />
            <Input label="State" defaultValue="Karnataka" readOnly disabled />
          </div>

          {/* Child Protection & Parental Consent Checkbox */}
          <div className="p-4 rounded-2xl bg-[#FEFCE8] border border-[#FEF08A] space-y-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={guardianConfirmed}
                onChange={(e) => setGuardianConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#173B67] rounded border-[#CBD5E1] focus:ring-[#F6C94B]"
                required
              />
              <span className="text-xs sm:text-sm text-[#713F12] leading-relaxed">
                <strong>Parent / Guardian Confirmation:</strong> I confirm that I am the parent, guardian, or an adult authorized to place this school project order. I approve the collection of this mobile number for Cash on Delivery dispatch verification.
              </span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734] font-extrabold text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Processing...' : 'Verify WhatsApp Mobile & Continue →'}</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: WhatsApp OTP Verification */}
      {step === 'otp' && (
        <form
          onSubmit={handleVerifyOtpAndPlaceOrder}
          className="p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] bg-white shadow-soft space-y-6 max-w-lg mx-auto"
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#ECFDF5] text-[#16A34A] rounded-full flex items-center justify-center mx-auto shadow-2xs">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-extrabold font-heading text-[#173B67]">
              WhatsApp OTP Verification
            </h2>
            <p className="text-xs sm:text-sm text-[#68778A] leading-relaxed">
              We have sent a 6-digit confirmation code to parent WhatsApp number{' '}
              <strong className="text-[#173B67]">+91 {phone}</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A] text-center">
              Enter 6-Digit Code
            </label>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              maxLength={6}
              className="w-full text-center tracking-widest text-2xl font-mono h-14 rounded-2xl border border-[#CBD5E1] bg-[#F5F8FC] focus:border-[#F6C94B] focus:bg-white focus:outline-none"
              autoFocus
              required
            />
            <p className="text-[11px] text-center text-[#68778A]">
              * Note: For local preview testing, enter any 6 digits (e.g. 123456)
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl bg-[#173B67] text-white hover:bg-[#285A91] font-extrabold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Confirming Order...' : `Confirm Cash on Delivery Order (₹${totalAmount})`}</span>
            </button>

            <button
              type="button"
              onClick={() => setStep('address')}
              className="w-full text-xs text-[#68778A] hover:text-[#173B67] font-medium py-1 cursor-pointer"
            >
              ← Change Mobile Number or Delivery Address
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Order Confirmed */}
      {step === 'confirmed' && (
        <div className="p-8 sm:p-12 rounded-3xl border border-[#E2E8F0] bg-white shadow-soft space-y-6 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-[#ECFDF5] text-[#16A34A] rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold font-heading text-[#173B67] tracking-tight">
              Order Placed Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-[#68778A]">
              Thank you for ordering with ProjectBee. Your curriculum project kit is being packed for delivery.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F5F8FC] border border-[#E2E8F0] text-left space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
              <span className="text-[#68778A]">Order Reference:</span>
              <span className="font-mono font-bold text-[#173B67]">{orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
              <span className="text-[#68778A]">Payment Mode:</span>
              <span className="font-semibold text-[#854D0E] bg-[#FEF08A] px-2 py-0.5 rounded">
                Cash on Delivery (Unpaid)
              </span>
            </div>
            <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
              <span className="text-[#68778A]">Total Due on Doorstep Arrival:</span>
              <span className="font-extrabold text-[#173B67] text-base">₹{totalAmount}.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#68778A]">Recipient:</span>
              <span className="font-semibold text-[#173B67]">{recipientName}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 py-3 px-4 rounded-xl border border-[#CBD5E1] text-[#173B67] font-bold text-xs hover:bg-[#F5F8FC] transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/products"
              className="flex-1 py-3 px-4 rounded-xl bg-[#F6C94B] text-[#173B67] font-bold text-xs hover:bg-[#E5B734] transition-colors"
            >
              Browse More Projects
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
