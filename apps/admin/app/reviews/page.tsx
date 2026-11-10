'use client';

import React, { useState } from 'react';
import { Button, Badge } from '@projectbee/ui';
import { MessageSquare, Star, CheckCircle, XCircle, Flag, ShieldCheck } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      product: "Hydraulic Lift Working Science Model (Pascal's Law)",
      customer: 'Pooja Hegde (Parent of Class 8 student)',
      rating: 5,
      text: 'Exceeded our expectations! Arrived fully assembled and tested. My son used it for his CBSE Class 8 physics demonstration and scored full marks in his viva.',
      status: 'pending_review',
      is_verified_purchase: true,
      delivered_order_id: 'PB-202611-00118',
      date: 'Yesterday',
    },
    {
      id: 'rev-2',
      product: 'Windmill Electricity Generator Working Model',
      customer: 'Suresh Kumar',
      rating: 4,
      text: 'The LED bulb glows bright when blown with a fan. Very good demonstration kit for renewable energy.',
      status: 'pending_review',
      is_verified_purchase: true,
      delivered_order_id: 'PB-202611-00115',
      date: '2 days ago',
    },
  ]);

  const moderate = (id: string, newStatus: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-500" /> Review Moderation
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Approve or reject customer reviews. Verified-purchase eligibility is derived strictly from delivered orders.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{rev.product}</span>
                  <Badge variant={rev.status === 'approved' ? 'success' : rev.status === 'rejected' ? 'danger' : 'warning'}>
                    {rev.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span>By {rev.customer}</span>
                  <span>•</span>
                  <span>{rev.date}</span>
                  {rev.is_verified_purchase && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Delivered Purchase ({rev.delivered_order_id})
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-slate-800 text-sm leading-relaxed">&ldquo;{rev.text}&rdquo;</p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-400 text-[11px]">Audit: Reason will be recorded in moderation logs</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => moderate(rev.id, 'approved')}
                  className="px-3 py-1 bg-emerald-600 text-white rounded font-semibold hover:bg-emerald-500 flex items-center gap-1"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Approve
                </button>
                <button
                  type="button"
                  onClick={() => moderate(rev.id, 'rejected')}
                  className="px-3 py-1 bg-red-600 text-white rounded font-semibold hover:bg-red-500 flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" /> Reject
                </button>
                <button
                  type="button"
                  onClick={() => moderate(rev.id, 'flagged')}
                  className="px-3 py-1 border border-slate-300 text-slate-700 rounded font-semibold hover:bg-slate-100 flex items-center gap-1"
                >
                  <Flag className="w-3.5 h-3.5" /> Flag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
