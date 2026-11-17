'use client';

import React, { useState } from 'react';
import { Button, Input, Badge } from '@projectbee/ui';
import { Boxes, PlusCircle, MinusCircle, History } from 'lucide-react';

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState([
    {
      id: 'f0000000-0000-0000-0000-000000000001',
      title: "Hydraulic Lift Working Science Model (Pascal's Law)",
      sku: 'PB-SCI-HYD-01',
      available: 25,
      threshold: 5,
    },
    {
      id: 'f0000000-0000-0000-0000-000000000002',
      title: 'Windmill Electricity Generator Working Model with LED Glow',
      sku: 'PB-SCI-WND-02',
      available: 18,
      threshold: 5,
    },
    {
      id: 'f0000000-0000-0000-0000-000000000003',
      title: 'Human Heart 3D Anatomical Dissectible Educational Model',
      sku: 'PB-BIO-HRT-03',
      available: 3,
      threshold: 5,
    },
  ]);

  const [ledger, setLedger] = useState([
    {
      id: 'sm-1',
      sku: 'PB-SCI-HYD-01',
      delta: -1,
      type: 'order_placed',
      reason: 'COD Order PB-202611-00123',
      actor: 'System / Customer Checkout',
      time: '15 mins ago',
    },
    {
      id: 'sm-2',
      sku: 'PB-BIO-HRT-03',
      delta: 10,
      type: 'manual_adjustment',
      reason: 'Received supplier shipment batch #BLR-401',
      actor: 'Admin (Catalogue Manager)',
      time: '2 hours ago',
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [delta, setDelta] = useState(5);
  const [reason, setReason] = useState('');

  const handleAdjustStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !reason) return;

    setInventory((prev) =>
      prev.map((item) =>
        item.id === selectedProduct
          ? { ...item, available: item.available + delta }
          : item
      )
    );

    const targetProduct = inventory.find((i) => i.id === selectedProduct);

    setLedger((prev) => [
      {
        id: `sm-${Date.now()}`,
        sku: targetProduct?.sku || 'UNKNOWN',
        delta: delta,
        type: 'manual_adjustment',
        reason: reason,
        actor: 'Admin (Logged In)',
        time: 'Just now',
      },
      ...prev,
    ]);

    setSelectedProduct(null);
    setReason('');
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Boxes className="w-6 h-6 text-amber-500" /> Stock &amp; Inventory Management
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Atomic inventory levels, low-stock thresholds, and auditable movement ledger.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Inventory Level Table */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Current Stock Levels</h2>

          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Project Model</th>
                  <th className="py-3 px-4">Available</th>
                  <th className="py-3 px-4">Threshold</th>
                  <th className="py-3 px-4 text-right">Adjust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="font-mono text-slate-400 text-[10px]">{item.sku}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-extrabold ${item.available <= item.threshold ? 'text-red-600' : 'text-slate-900'}`}>
                        {item.available} units
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-medium">
                      {item.threshold} units
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(item.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-amber-500 text-slate-900 rounded hover:bg-amber-400"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Adjustment Form Modal / Inline Box */}
          {selectedProduct && (
            <form onSubmit={handleAdjustStock} className="p-5 rounded-xl border border-amber-300 bg-amber-50/50 space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">
                Manual Stock Adjustment for {inventory.find((i) => i.id === selectedProduct)?.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quantity Delta (+/-)</label>
                  <input
                    type="number"
                    value={delta}
                    onChange={(e) => setDelta(parseInt(e.target.value, 10))}
                    className="h-10 w-full px-3 rounded-lg border border-slate-300 bg-white font-mono text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mandatory Audit Reason</label>
                  <input
                    type="text"
                    placeholder="e.g. Received new stock shipment batch..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="h-10 w-full px-3 rounded-lg border border-slate-300 bg-white text-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" size="sm" className="font-bold">
                  Commit Adjustment
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProduct(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Auditable Stock Movement Ledger */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <History className="w-4 h-4 text-amber-500" /> Stock Movement Ledger
          </h2>

          <div className="space-y-2.5">
            {ledger.map((l) => (
              <div key={l.id} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-slate-900">{l.sku}</span>
                  <span className={`font-mono font-extrabold ${l.delta > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                    {l.delta > 0 ? `+${l.delta}` : l.delta} units
                  </span>
                </div>
                <p className="text-slate-700 font-medium">{l.reason}</p>
                <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                  <span>{l.actor}</span>
                  <span>{l.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

