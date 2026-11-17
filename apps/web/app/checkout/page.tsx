'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@projectbee/ui';
import { ShieldCheck, Truck, CheckCircle2, MessageSquare, PhoneCall, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const [step, setStep] = useState<'address' | 'otp' | 'confirmed'>('address');
  const [phone, setPhone] = useState('9876543210');
  const [guardianName, setGuardianName] = useState('Ananya Sharma');
  const [recipientName, setRecipientName] = useState('Aarav Sharma (Class 8)');
  const [addressLine, setAddressLine] = useState('#42, 3rd Cross, Indiranagar');
  const [pincode, setPincode] = useState('560038');
  const [guardianConfirmed, setGuardianConfirmed] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleProceedToOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guardianConfirmed) {
      setError('Parent or legal guardian consent is required before placing a Cash on Delivery order.');
      return;
    }
    setError(null);
    setOtpSent(true);
    setStep('otp');
  };

  const handleVerifyOtpAndPlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit WhatsApp OTP code.');
      return;
    }
    setError(null);

    // Mock successful atomic order placement
    const generatedOrderNo = 'PB-202611-' + Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(generatedOrderNo);
    setStep('confirmed');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Cash on Delivery Checkout
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Pay in cash upon doorstep arrival. Free Bengaluru delivery for orders above ₹499.
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="flex items-center justify-between max-w-md mx-auto text-xs font-semibold text-slate-500">
        <div className={`flex items-center gap-1.5 ${step === 'address' ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
          <span className="w-6 h-6 rounded-full border flex items-center justify-center">1</span>
          <span>Delivery Details</span>
        </div>
        <div className="h-0.5 w-12 bg-slate-200" />
        <div className={`flex items-center gap-1.5 ${step === 'otp' ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
          <span className="w-6 h-6 rounded-full border flex items-center justify-center">2</span>
          <span>WhatsApp Verification</span>
        </div>
        <div className="h-0.5 w-12 bg-slate-200" />
        <div className={`flex items-center gap-1.5 ${step === 'confirmed' ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
          <span className="w-6 h-6 rounded-full border flex items-center justify-center">3</span>
          <span>Order Confirmed</span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Address & Guardian Form */}
      {step === 'address' && (
        <form onSubmit={handleProceedToOtp} className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-500" /> Bengaluru Delivery Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Student / Recipient Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Aarav Sharma (Class 8)"
              required
            />
            <Input
              label="Parent / Legal Guardian Name"
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
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit Indian mobile number"
              maxLength={10}
              required
              helperText="A 6-digit WhatsApp OTP verification challenge will be sent to this number"
            />
            <Input
              label="PIN Code"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="e.g. 560038"
              maxLength={6}
              required
              helperText="COD currently available in all Bengaluru 560xxx pin codes"
            />
          </div>

          <Input
            label="Flat / House No. / Apartment & Street Address"
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
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={guardianConfirmed}
                onChange={(e) => setGuardianConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                required
              />
              <span className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                <strong>Parent / Guardian Confirmation:</strong> I confirm that I am the parent, guardian, or adult authorized to place this school project order. I approve the collection of this mobile number for Cash on Delivery dispatch verification.
              </span>
            </label>
          </div>

          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full text-base font-bold">
              Verify WhatsApp Number &amp; Continue →
            </Button>
          </div>
        </form>
      )}

      {/* STEP 2: WhatsApp OTP Verification */}
      {step === 'otp' && (
        <form onSubmit={handleVerifyOtpAndPlaceOrder} className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-6 max-w-lg mx-auto">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">WhatsApp OTP Verification</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We have sent a 6-digit confirmation code to parent number <strong>+91 {phone}</strong> on WhatsApp.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 text-center">
              Enter 6-Digit Code
            </label>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              maxLength={6}
              className="w-full text-center tracking-widest text-2xl font-mono h-14 rounded-xl border border-slate-300 bg-slate-50 focus:border-amber-500 focus:bg-white focus:outline-none"
              autoFocus
              required
            />
            <p className="text-xs text-center text-slate-400">
              * Local Dev Note: Enter any 6-digit code (e.g. 123456)
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button type="submit" size="lg" className="w-full font-bold">
              Confirm Cash on Delivery Order (₹499)
            </Button>

            <button
              type="button"
              onClick={() => setStep('address')}
              className="w-full text-xs text-slate-500 hover:text-slate-800 font-medium py-1"
            >
              ← Change Mobile Number or Delivery Address
            </button>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">Notice on Privacy &amp; Consent:</p>
            <p>
              WhatsApp verification confirms control of this phone number. Cash of ₹499 is collected directly at delivery.
            </p>
          </div>
        </form>
      )}

      {/* STEP 3: Order Confirmed */}
      {step === 'confirmed' && (
        <div className="p-8 sm:p-12 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-6 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Order Placed Successfully!
            </h2>
            <p className="text-sm text-slate-600">
              Thank you for ordering with ProjectBee. Your curriculum project kit is being packed for delivery.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2 text-sm">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Order Reference:</span>
              <span className="font-mono font-bold text-slate-900">{orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Payment Method:</span>
              <span className="font-semibold text-amber-700">Cash on Delivery (Unpaid)</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Total Due on Arrival:</span>
              <span className="font-extrabold text-slate-900">₹499.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Recipient:</span>
              <span className="font-medium text-slate-800">{recipientName}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
            <Link href="/products" className="flex-1">
              <Button className="w-full">
                Browse More Kits
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

