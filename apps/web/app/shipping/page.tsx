import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Cash on Delivery (COD) Policy — ProjectBee',
  description:
    'Comprehensive delivery and Cash on Delivery policy for ProjectBee school project orders.',
};

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="space-y-3 border-b border-[#1E293B] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F6C94B] bg-[#111A2E] px-3 py-1 rounded-full border border-[#1E293B]">
          Delivery Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
          Shipping &amp; Cash on Delivery (COD) Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Effective Date: November 2026 • ProjectBee (YugaYatra Retail OPC Private Limited)
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
        {/* Section 1: Overview */}
        <section className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#F6C94B]" />
            <span>1. 100% Cash on Delivery Availability</span>
          </h2>
          <p>
            ProjectBee operates exclusively on a <strong className="text-white">Cash on Delivery (COD)</strong> payment model in V1. We believe students and parents should inspect the safe arrival of their educational kits before handing over cash payment at their doorstep.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#94A3B8]">
            <li>Zero advance payment or card details required.</li>
            <li>Parent or legal guardian consent confirmed via automated WhatsApp OTP prior to warehouse dispatch.</li>
            <li>Exact cash amount as printed on the doorstep invoice is collected by the authorized courier personnel.</li>
          </ul>
        </section>

        {/* Section 2: Delivery Timelines & Charges */}
        <section className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#F6C94B]" />
            <span>2. Shipping Charges and Delivery Timelines</span>
          </h2>
          <div className="overflow-x-auto pt-1">
            <table className="w-full text-left text-xs border border-[#1E293B] rounded-xl overflow-hidden">
              <thead className="bg-[#0E1626] text-[#F6C94B] font-bold">
                <tr>
                  <th className="p-3 border-b border-[#1E293B]">Region</th>
                  <th className="p-3 border-b border-[#1E293B]">Delivery Timeline</th>
                  <th className="p-3 border-b border-[#1E293B]">Shipping Fee (Orders &lt; ₹499)</th>
                  <th className="p-3 border-b border-[#1E293B]">Shipping Fee (Orders ≥ ₹499)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                <tr>
                  <td className="p-3 font-semibold text-white">Bengaluru Launch Zone (PIN 560xxx)</td>
                  <td className="p-3 text-[#94A3B8]">2 Business Days</td>
                  <td className="p-3 font-bold text-white">₹50 Flat</td>
                  <td className="p-3 font-bold text-[#4ADE80] bg-[#0F291E]">FREE</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Pan-India Tier 1 &amp; Tier 2 Cities</td>
                  <td className="p-3 text-[#94A3B8]">4 to 5 Business Days</td>
                  <td className="p-3 font-bold text-white">₹50 Flat</td>
                  <td className="p-3 font-bold text-[#4ADE80] bg-[#0F291E]">FREE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Safe Packaging */}
        <section className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#F6C94B]" />
            <span>3. Protective Packaging for School Projects</span>
          </h2>
          <p>
            Working scientific models contain acrylic scissors, motors, and fluid reservoirs. Every kit is packed in a multi-layered corrugated exterior with custom high-density EPE foam cushions to ensure zero damage during transportation.
          </p>
        </section>
      </div>
    </div>
  );
}
