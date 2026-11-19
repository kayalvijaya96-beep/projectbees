'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shippingFee,
    totalAmount,
    freeShippingThreshold,
    isFreeShipping,
  } = useCart();

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="border-b border-[#E2E8F0] pb-4 space-y-1">
        <div className="flex items-center gap-2 text-xs text-[#68778A]">
          <Link href="/" className="hover:text-[#173B67]">Home</Link>
          <span>/</span>
          <span className="font-semibold text-[#173B67]">Shopping Cart</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#173B67] tracking-tight flex items-center gap-2.5">
          <ShoppingBag className="w-7 h-7 text-[#F6C94B]" />
          <span>Your Project Cart</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#68778A]">
          Review your school project kits before doorstep Cash on Delivery confirmation.
        </p>
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="rounded-3xl border border-dashed border-[#CBD5E1] p-12 sm:p-16 text-center space-y-5 bg-white shadow-soft max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-[#F5F8FC] rounded-full flex items-center justify-center mx-auto text-[#68778A]">
            <ShoppingBag className="w-10 h-10 text-[#68778A]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold font-heading text-[#173B67]">
              Your project cart is currently empty
            </h2>
            <p className="text-xs sm:text-sm text-[#68778A] max-w-md mx-auto">
              Explore working science models, 3D anatomical charts, and DIY exhibition kits tailored for CBSE &amp; ICSE students.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F6C94B] text-[#173B67] font-bold text-sm shadow-sm hover:bg-[#E5B734] transition-all"
          >
            <span>Explore Projects Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Cart Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Progress Indicator */}
            <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[#173B67]">
                  <Truck className="w-4 h-4 text-[#F6C94B]" />
                  <span>
                    {isFreeShipping
                      ? '🎉 You unlocked FREE Delivery across India!'
                      : `Add ₹${amountNeededForFreeShipping} more to unlock FREE Delivery!`}
                  </span>
                </span>
                <span className="text-[#68778A]">Threshold: ₹{freeShippingThreshold}</span>
              </div>
              <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#16A34A] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>

            {/* List of Cart Items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-[#E2E8F0] bg-white shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-[#F5F8FC] rounded-xl border border-[#E2E8F0] overflow-hidden shrink-0">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                        {item.class_name}
                      </span>
                      <span className="text-xs text-[#68778A]">{item.board}</span>
                    </div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-heading font-bold text-sm sm:text-base text-[#173B67] hover:text-[#285A91] line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-[#68778A] font-mono">SKU: {item.sku}</p>
                  </div>
                </div>

                {/* Quantity Controls, Price, and Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-[#F1F5F9]">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#CBD5E1] rounded-xl bg-[#F5F8FC]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 text-sm font-bold text-[#173B67] hover:bg-white rounded-l-xl cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3.5 py-1 text-xs font-bold text-[#173B67] bg-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 text-sm font-bold text-[#173B67] hover:bg-white rounded-r-xl cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <span className="text-base sm:text-lg font-extrabold text-[#173B67]">
                      ₹{item.price * item.quantity}
                    </span>
                    <p className="text-[11px] text-[#68778A]">₹{item.price} each</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-[#68778A] hover:text-[#DC2626] rounded-lg transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Clear Cart / Continue Shopping Row */}
            <div className="flex items-center justify-between pt-2 text-xs">
              <Link
                href="/products"
                className="font-bold text-[#173B67] hover:underline flex items-center gap-1"
              >
                ← Continue Shopping
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="text-[#68778A] hover:text-[#DC2626] font-medium cursor-pointer"
              >
                Empty Cart
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & COD Checkout Box */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] bg-white shadow-card space-y-6">
            <h2 className="text-lg font-extrabold font-heading text-[#173B67] border-b border-[#F1F5F9] pb-3">
              Order Summary
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#263447]">
              <div className="flex justify-between">
                <span className="text-[#68778A]">Items Subtotal:</span>
                <span className="font-bold text-[#173B67]">₹{subtotal}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#68778A]">Delivery Charges:</span>
                {isFreeShipping ? (
                  <span className="font-bold text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded text-xs">
                    FREE
                  </span>
                ) : (
                  <span className="font-bold text-[#173B67]">₹{shippingFee}</span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#68778A]">Payment Mode:</span>
                <span className="font-bold text-[#854D0E] bg-[#FEF08A] px-2 py-0.5 rounded text-xs">
                  Cash on Delivery
                </span>
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex justify-between items-baseline">
                <span className="font-extrabold text-[#173B67] text-sm sm:text-base">
                  Total Due on Delivery:
                </span>
                <span className="text-2xl font-extrabold font-heading text-[#173B67]">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full">
              <button
                type="button"
                className="w-full py-4 px-6 rounded-xl bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734] font-extrabold text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to COD Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            {/* Reassurance */}
            <div className="space-y-2 pt-3 border-t border-[#F1F5F9] text-xs text-[#68778A]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Zero card payment required — pay cash upon arrival</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#173B67] shrink-0" />
                <span>Protected by WhatsApp OTP phone verification</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
