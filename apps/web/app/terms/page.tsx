import React from 'react';
import Link from 'next/link';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions — ProjectBee',
  description:
    'Legal terms and conditions governing the purchase and delivery of educational science projects.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="space-y-3 border-b border-[#1E293B] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F6C94B] bg-[#111A2E] px-3 py-1 rounded-full border border-[#1E293B]">
          Legal Framework
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
          Terms &amp; Conditions of Service
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Effective Date: November 2026 • YugaYatra Retail (OPC) Private Limited
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
        <section className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-white">1. Introduction &amp; Acceptance</h2>
          <p>
            Welcome to ProjectBee, operated by <strong className="text-white">YugaYatra Retail (OPC) Private Limited</strong>. By browsing, creating an account, or placing a Cash on Delivery order on projectbee.in, you agree to comply with and be bound by these Terms and Conditions.
          </p>
        </section>

        <section className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-white">2. Educational Use &amp; Safe Operation</h2>
          <p>
            All products, science kits, and charts sold on ProjectBee are intended solely for academic demonstration, school exhibitions, and curriculum learning. Adult supervision is recommended during the assembly of DIY kits for students under 12 years of age.
          </p>
        </section>

        <section className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-white">3. Cash on Delivery Commitment</h2>
          <p>
            Placing a Cash on Delivery order constitutes a binding agreement to accept the parcel and provide exact cash payment upon doorstep arrival by the authorized courier partner.
          </p>
        </section>

        <section className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-white">4. Governing Law &amp; Jurisdiction</h2>
          <p>
            These terms are governed by the laws of India. Any legal dispute or proceeding arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent courts in <strong className="text-white">Bengaluru, Karnataka</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
