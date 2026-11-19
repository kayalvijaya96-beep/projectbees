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
      <div className="border-b border-[#1E293B] pb-4 space-y-1">
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <Link href="/cart" className="hover:text-[#F6C94B]">Cart</Link>
          <span>/</span>
          <span className="font-semibold text-white">Cash on Delivery Checkout</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
          Doorstep Cash on Delivery Checkout
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Safe, verified order placement with zero advance card payment required.
        </p>
      </div>

      {/* Progress Stepper Bar */}
      <div className="flex items-center justify-between max-w-md mx-auto text-xs font-semibold">
        <div className={`flex items-center gap-1.5 ${step === 'address' ? 'text-[#F6C94B] font-bold' : 'text-[#94A3B8]'}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step === 'address' ? 'bg-[#F6C94B] text-[#173B67] font-bold' : 'bg-[#111A2E] text-[#94A3B8] border border-[#1E293B]'}`}>
            1
          </span>
          <span>Delivery Details</span>
        </div>

        <div className={`h-0.5 flex-1 mx-3 ${step !== 'address' ? 'bg-[#F6C94B]' : 'bg-[#1E293B]'}`} />

        <div className={`flex items-center gap-1.5 ${step === 'otp' ? 'text-[#F6C94B] font-bold' : 'text-[#94A3B8]'}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step === 'otp' ? 'bg-[#F6C94B] text-[#173B67] font-bold' : 'bg-[#111A2E] text-[#94A3B8] border border-[#1E293B]'}`}>
            2
          </span>
          <span>WhatsApp OTP</span>
        </div>

        <div className={`h-0.5 flex-1 mx-3 ${step === 'confirmed' ? 'bg-[#4ADE80]' : 'bg-[#1E293B]'}`} />

        <div className={`flex items-center gap-1.5 ${step === 'confirmed' ? 'text-[#4ADE80] font-bold' : 'text-[#94A3B8]'}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step === 'confirmed' ? 'bg-[#16A34A] text-white' : 'bg-[#111A2E] text-[#94A3B8] border border-[#1E293B]'}`}>
            3
          </span>
          <span>Confirmed</span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-[#2A1515] border border-[#7F1D1D] text-[#FCA5A5] text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Address & Guardian Form */}
      {step === 'address' && (
        <form
          onSubmit={handleProceedToOtp}
          className="p-6 sm:p-8 rounded-3xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md shadow-soft space-y-6"
        >
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <h2 className="text-base sm:text-lg font-extrabold font-heading text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#F6C94B]" />
              <span>Doorstep Delivery Address</span>
            </h2>
            <span className="text-xs font-bold text-[#F6C94B] bg-[#17233B] border border-[#1E3A5F] px-2.5 py-1 rounded-lg">
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
          <div className="p-4 rounded-2xl bg-[#2A230B] border border-[#4A3D12] space-y-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={guardianConfirmed}
                onChange={(e) => setGuardianConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#F6C94B] rounded border-[#1E293B] focus:ring-[#F6C94B]"
                required
              />
              <span className="text-xs sm:text-sm text-[#FDE047] leading-relaxed">
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
          className="p-6 sm:p-8 rounded-3xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md shadow-soft space-y-6 max-w-lg mx-auto"
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#0F291E] text-[#4ADE80] border border-[#14532D] rounded-full flex items-center justify-center mx-auto shadow-2xs">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-extrabold font-heading text-white">
              WhatsApp OTP Verification
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              We have sent a 6-digit confirmation code to parent WhatsApp number{' '}
              <strong className="text-[#F6C94B]">+91 {phone}</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] text-center">
              Enter 6-Digit Code
            </label>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              maxLength={6}
              className="w-full text-center tracking-widest text-2xl font-mono h-14 rounded-2xl border border-[#1E293B] bg-[#0E1626] text-white focus:border-[#F6C94B] focus:outline-none"
              autoFocus
              required
            />
            <p className="text-[11px] text-center text-[#94A3B8]">
              * Note: For local preview testing, enter any 6 digits (e.g. 123456)
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl bg-[#173B67] text-white hover:bg-[#285A91] border border-[#285A91] font-extrabold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Confirming Order...' : `Confirm Cash on Delivery Order (₹${totalAmount})`}</span>
            </button>

            <button
              type="button"
              onClick={() => setStep('address')}
              className="w-full text-xs text-[#94A3B8] hover:text-[#F6C94B] font-medium py-1 cursor-pointer"
            >
              ← Change Mobile Number or Delivery Address
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Order Confirmed */}
      {step === 'confirmed' && (
        <div className="p-8 sm:p-12 rounded-3xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md shadow-soft space-y-6 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-[#0F291E] text-[#4ADE80] border border-[#14532D] rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold font-heading text-white tracking-tight">
              Order Placed Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Thank you for ordering with ProjectBee. Your curriculum project kit is being packed for delivery.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E1626] border border-[#1E293B] text-left space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-[#1E293B] pb-2">
              <span className="text-[#94A3B8]">Order Reference:</span>
              <span className="font-mono font-bold text-[#F6C94B]">{orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#1E293B] pb-2">
              <span className="text-[#94A3B8]">Payment Mode:</span>
              <span className="font-semibold text-[#F6C94B] bg-[#2A230B] border border-[#4A3D12] px-2 py-0.5 rounded">
                Cash on Delivery (Unpaid)
              </span>
            </div>
            <div className="flex justify-between border-b border-[#1E293B] pb-2">
              <span className="text-[#94A3B8]">Total Due on Doorstep Arrival:</span>
              <span className="font-extrabold text-[#F6C94B] text-base">₹{totalAmount}.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Recipient:</span>
              <span className="font-semibold text-white">{recipientName}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 py-3 px-4 rounded-xl border border-[#1E293B] bg-[#111A2E] text-white font-bold text-xs hover:bg-[#17233B] transition-colors"
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
