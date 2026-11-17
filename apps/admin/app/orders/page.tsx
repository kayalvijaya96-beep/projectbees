'use client';

import React, { useState } from 'react';
import { Button, Badge } from '@projectbee/ui';
import { ShoppingBag, Truck, CheckCircle2, DollarSign, Clock } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 'PB-202611-00123',
      recipient: 'Aarav Sharma (Class 8)',
      guardian: 'Ananya Sharma',
      phone: '+91 9876543210',
      total: 499,
      status: 'pending_confirmation',
      payment_status: 'unpaid',
      address: '#42, 3rd Cross, Indiranagar, Bengaluru - 560038',
      items: "Hydraulic Lift Working Science Model (Pascal's Law) (x1)",
    },
    {
      id: 'PB-202611-00122',
      recipient: 'Diya Patel (Class 10)',
      guardian: 'Rohan Patel',
      phone: '+91 9845012345',
      total: 1098,
      status: 'confirmed',
      payment_status: 'unpaid',
      address: '#18, 5th Main, MG Road, Bengaluru - 560001',
      items: 'Windmill Electricity Generator (x1), Periodic Table Chart (x1)',
    },
    {
      id: 'PB-202611-00120',
      recipient: 'Siddharth V (Class 9)',
      guardian: 'Vidya V',
      phone: '+91 9880011223',
      total: 699,
      status: 'delivered',
      payment_status: 'paid',
      address: '#89, HSR Layout Sector 2, Bengaluru - 560102',
      items: 'Human Heart 3D Model (x1)',
    },
  ]);

  const transitionOrder = (id: string, nextStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: nextStatus } : o))
    );
  };

  const recordCodCollection = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, payment_status: 'paid' } : o))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-amber-500" /> Order Fulfilment &amp; COD Operations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage stage progression and physical cash collection records.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900 text-sm">{ord.id}</span>
                <Badge variant={ord.status === 'delivered' ? 'success' : 'warning'}>
                  {ord.status.replace('_', ' ')}
                </Badge>
                <Badge variant={ord.payment_status === 'paid' ? 'success' : 'danger'}>
                  COD {ord.payment_status.toUpperCase()}
                </Badge>
              </div>

              <span className="text-base font-extrabold text-slate-900">
                Total Due: ₹{ord.total}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-700">
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Student / Recipient</p>
                <p className="font-bold text-slate-900">{ord.recipient}</p>
                <p className="text-slate-500">Guardian: {ord.guardian}</p>
                <p className="text-slate-500 font-mono">{ord.phone}</p>
              </div>

              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Delivery Address</p>
                <p>{ord.address}</p>
              </div>

              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Project Kit Items</p>
                <p className="font-medium text-slate-800">{ord.items}</p>
              </div>
            </div>

            {/* Transition Controls */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Update Status:</span>
                {ord.status === 'pending_confirmation' && (
                  <button
                    type="button"
                    onClick={() => transitionOrder(ord.id, 'confirmed')}
                    className="px-2.5 py-1 bg-amber-500 text-slate-900 font-semibold rounded hover:bg-amber-400"
                  >
                    Confirm Order
                  </button>
                )}
                {ord.status === 'confirmed' && (
                  <button
                    type="button"
                    onClick={() => transitionOrder(ord.id, 'packed')}
                    className="px-2.5 py-1 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800"
                  >
                    Mark Packed
                  </button>
                )}
                {ord.status === 'packed' && (
                  <button
                    type="button"
                    onClick={() => transitionOrder(ord.id, 'shipped')}
                    className="px-2.5 py-1 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500"
                  >
                    Mark Shipped
                  </button>
                )}
                {ord.status === 'shipped' && (
                  <button
                    type="button"
                    onClick={() => transitionOrder(ord.id, 'delivered')}
                    className="px-2.5 py-1 bg-emerald-600 text-white font-semibold rounded hover:bg-emerald-500"
                  >
                    Mark Delivered
                  </button>
                )}
              </div>

              {ord.payment_status === 'unpaid' && (
                <button
                  type="button"
                  onClick={() => recordCodCollection(ord.id)}
                  className="px-3 py-1 bg-emerald-700 text-white font-bold rounded hover:bg-emerald-600 flex items-center gap-1"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Record ₹{ord.total} COD Cash Received</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

