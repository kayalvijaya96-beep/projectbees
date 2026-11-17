'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@projectbee/ui';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
  const [items, setItems] = useState([
    {
      id: 'cart-item-1',
      product_id: 'f0000000-0000-0000-0000-000000000001',
      title: "Hydraulic Lift Working Science Model (Pascal's Law Demonstration)",
      sku: 'PB-SCI-HYD-01',
      price: 499,
      quantity: 1,
      board: 'CBSE / ICSE',
      class: 'Class 8-10',
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as typeof items
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Free delivery above ₹499, flat ₹50 otherwise
  const shippingAmount = subtotal >= 499 || subtotal === 0 ? 0 : 50;
  const totalAmount = subtotal + shippingAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <ShoppingBag className="w-7 h-7 text-amber-500" /> Your Project Cart
        </h1>
        <p className="text-sm text-slate-500 mt-1">Review your selected school materials before Cash on Delivery confirmation</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center space-y-4 bg-white">
          <ShoppingBag className="w-14 h-14 text-slate-300 mx-auto" />
          <h2 className="text-lg font-bold text-slate-800">Your cart is currently empty</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Explore ready-to-use science projects, charts, and educational kits built for CBSE &amp; ICSE students.
          </p>
          <Link href="/products" className="inline-block pt-2">
            <Button>Explore Catalogue</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {item.board}
                    </span>
                    <span className="text-xs text-slate-500">{item.class}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">SKU: {item.sku}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                  {/* Quantity Controller */}
                  <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-semibold text-slate-900 bg-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-slate-900">
                      ₹{item.price * item.quantity}
                    </span>
                    <p className="text-[11px] text-slate-500">₹{item.price} each</p>
                  </div>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & COD Checkout Button */}
          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-6 h-fit">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items):</span>
                <span className="font-semibold text-slate-900">₹{subtotal}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Delivery Charges:</span>
                {shippingAmount === 0 ? (
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                    FREE (Orders &gt; ₹499)
                  </span>
                ) : (
                  <span className="font-semibold text-slate-900">₹{shippingAmount}</span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span>Payment Mode:</span>
                <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-xs">
                  Cash on Delivery
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Total Due on Delivery:</span>
                <span className="text-2xl font-extrabold text-slate-900">₹{totalAmount}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full">
              <Button size="lg" className="w-full font-bold flex items-center justify-center gap-2">
                <span>Proceed to COD Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <div className="space-y-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pan-India delivery with Bengaluru launch priority</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>WhatsApp OTP required before COD dispatch</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

