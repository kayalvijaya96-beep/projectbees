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
      <div className="space-y-3 border-b border-[#E2E8F0] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#68778A] bg-[#F5F8FC] px-3 py-1 rounded-full border border-[#CBD5E1]">
          Delivery Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#173B67] tracking-tight">
          Shipping &amp; Cash on Delivery (COD) Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#68778A]">
          Effective Date: November 2026 • ProjectBee (YugaYatra Retail OPC Private Limited)
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#263447] leading-relaxed">
        {/* Section 1: Overview */}
        <section className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-[#173B67] flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#F6C94B]" />
            <span>1. 100% Cash on Delivery Availability</span>
          </h2>
          <p>
            ProjectBee operates exclusively on a <strong>Cash on Delivery (COD)</strong> payment model in V1. We believe students and parents should inspect the safe arrival of their educational kits before handing over cash payment at their doorstep.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#68778A]">
            <li>Zero advance payment or card details required.</li>
            <li>Parent or legal guardian consent confirmed via automated WhatsApp OTP prior to warehouse dispatch.</li>
            <li>Exact cash amount as printed on the doorstep invoice is collected by the authorized courier personnel.</li>
          </ul>
        </section>

        {/* Section 2: Delivery Timelines & Charges */}
        <section className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-[#173B67] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#F6C94B]" />
            <span>2. Shipping Charges and Delivery Timelines</span>
          </h2>
          <div className="overflow-x-auto pt-1">
            <table className="w-full text-left text-xs border border-[#E2E8F0] rounded-xl overflow-hidden">
              <thead className="bg-[#F5F8FC] text-[#173B67] font-bold">
                <tr>
                  <th className="p-3 border-b border-[#E2E8F0]">Region</th>
                  <th className="p-3 border-b border-[#E2E8F0]">Delivery Timeline</th>
                  <th className="p-3 border-b border-[#E2E8F0]">Shipping Fee (Orders &lt; ₹499)</th>
                  <th className="p-3 border-b border-[#E2E8F0]">Shipping Fee (Orders ≥ ₹499)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr>
                  <td className="p-3 font-semibold text-[#173B67]">Bengaluru Launch Zone (PIN 560xxx)</td>
                  <td className="p-3">2 Business Days</td>
                  <td className="p-3 font-bold text-[#173B67]">₹50 Flat</td>
                  <td className="p-3 font-bold text-[#16A34A] bg-[#ECFDF5]">FREE</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#173B67]">Pan-India Tier 1 &amp; Tier 2 Cities</td>
                  <td className="p-3">4 to 5 Business Days</td>
                  <td className="p-3 font-bold text-[#173B67]">₹50 Flat</td>
                  <td className="p-3 font-bold text-[#16A34A] bg-[#ECFDF5]">FREE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Safe Packaging */}
        <section className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-[#173B67] flex items-center gap-2">
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
