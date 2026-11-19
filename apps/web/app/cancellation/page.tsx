import React from 'react';
import Link from 'next/link';
import { RotateCcw, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Cancellation & Return Policy — ProjectBee',
  description:
    'Clear cancellation and hassle-free transit replacement guidelines for educational school projects.',
};

export default function CancellationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="space-y-3 border-b border-[#E2E8F0] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#68778A] bg-[#F5F8FC] px-3 py-1 rounded-full border border-[#CBD5E1]">
          Customer Assurance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#173B67] tracking-tight">
          Cancellation &amp; Replacement Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#68778A]">
          Effective Date: November 2026 • ProjectBee (YugaYatra Retail OPC Private Limited)
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#263447] leading-relaxed">
        <section className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-[#173B67] flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-[#F6C94B]" />
            <span>1. Order Cancellation Prior to Dispatch</span>
          </h2>
          <p>
            You may cancel your order free of charge at any time before the status transitions to &quot;Shipped&quot;. Because Cash on Delivery requires no advance payment, cancellation simply cancels the scheduled courier pickup with zero financial penalty.
          </p>
          <p className="text-[#68778A]">
            To cancel, message our support team on WhatsApp at <strong>+91 98765 43210</strong> or email <strong>support@projectbee.in</strong> with your order number.
          </p>
        </section>

        <section className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-[#173B67] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#F6C94B]" />
            <span>2. Transit Damage &amp; Free 48-Hour Replacement</span>
          </h2>
          <p>
            Because school projects are needed for critical exhibition deadlines, if any component, acrylic piece, or electronic motor arrives damaged or inoperative:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#68778A]">
            <li>Take a photo or brief video of the damaged component.</li>
            <li>Send it to our WhatsApp helpline (+91 98765 43210) within 48 hours of doorstep delivery.</li>
            <li>We will dispatch a <strong>free express replacement kit</strong> immediately without requiring you to ship the broken unit back first.</li>
          </ul>
        </section>

        <section className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-[#173B67] flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#F6C94B]" />
            <span>3. Non-Returnable Items</span>
          </h2>
          <p>
            Once used, modified, painted, or assembled for an exhibition, educational craft items and charts cannot be returned unless found defective upon initial unboxing.
          </p>
        </section>
      </div>
    </div>
  );
}
