'use client';

import React, { useState } from 'react';
import { Button, Badge, Input } from '@projectbee/ui';
import { Package, Plus, Search, ExternalLink, Check, Eye } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 'f0000000-0000-0000-0000-000000000001',
      sku: 'PB-SCI-HYD-01',
      title: "Hydraulic Lift Working Science Model (Pascal's Law)",
      selling_price: 499,
      status: 'published',
      stock: 25,
      board: 'CBSE / ICSE',
      class: 'Class 8-10',
    },
    {
      id: 'f0000000-0000-0000-0000-000000000002',
      sku: 'PB-SCI-WND-02',
      title: 'Windmill Electricity Generator Working Model with LED Glow',
      selling_price: 599,
      status: 'published',
      stock: 18,
      board: 'CBSE',
      class: 'Class 7-10',
    },
    {
      id: 'f0000000-0000-0000-0000-000000000003',
      sku: 'PB-BIO-HRT-03',
      title: 'Human Heart 3D Anatomical Dissectible Educational Model',
      selling_price: 699,
      status: 'published',
      stock: 3,
      board: 'ICSE',
      class: 'Class 9-10',
    },
  ]);

  const togglePublish = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'published' ? 'draft' : 'published' }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-amber-500" /> Catalogue Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage school science models, prices, taxonomy, and publication status.
          </p>
        </div>

        <Button className="flex items-center gap-1.5 text-xs font-bold">
          <Plus className="w-4 h-4" /> Add New Project Kit
        </Button>
      </div>

      {/* Catalogue Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by SKU or title..."
              className="h-9 pl-9 pr-3 text-xs w-full rounded-md border border-slate-200 bg-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {products.length} products
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-4">Board &amp; Class</th>
                <th className="py-3 px-4">Selling Price</th>
                <th className="py-3 px-4">Available Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{p.title}</p>
                    <p className="font-mono text-slate-400 text-[10px]">{p.sku}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      <Badge variant="board">{p.board}</Badge>
                      <span className="text-slate-600">{p.class}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    ₹{p.selling_price}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`font-semibold ${p.stock <= 5 ? 'text-red-600' : 'text-slate-700'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={p.status === 'published' ? 'success' : 'outline'}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => togglePublish(p.id)}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded border border-slate-200 hover:bg-slate-100 text-slate-700"
                    >
                      {p.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-900 text-white rounded hover:bg-slate-800"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
