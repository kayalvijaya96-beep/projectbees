import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Child Data Privacy & DPDP Act Policy — ProjectBee',
  description:
    'Compliance with Digital Personal Data Protection (DPDP) Act 2023 for child and guardian data safety.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="space-y-3 border-b border-[#1E293B] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F6C94B] bg-[#111A2E] px-3 py-1 rounded-full border border-[#1E293B]">
          DPDP Act 2023 Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
          Child Data Privacy &amp; Protection Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Effective Date: November 2026 • YugaYatra Retail (OPC) Private Limited
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
        <section className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#F6C94B]" />
            <span>1. Strict Child Data Minimisation (DPDP Section 9)</span>
          </h2>
          <p>
            ProjectBee is an educational platform serving school children. To protect minors under the Digital Personal Data Protection (DPDP) Act 2023, we implement strict data minimisation:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#94A3B8]">
            <li><strong className="text-white">No Date of Birth (DOB) collected:</strong> We only ask for academic grade level (e.g. &quot;Class 8&quot;).</li>
            <li><strong className="text-white">No School Name or Student Roll Numbers:</strong> We never collect student institutional details.</li>
            <li><strong className="text-white">No Student Photographs or Biometric Data:</strong> No student images are ever captured or stored.</li>
            <li><strong className="text-white">No Behavioral Tracking of Children:</strong> Zero advertising tracking or behavioral profiling on minors.</li>
          </ul>
        </section>

        <section className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#F6C94B]" />
            <span>2. Verifiable Parental / Guardian Consent</span>
          </h2>
          <p>
            All purchases must be authorized by an adult parent or legal guardian. During checkout:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#94A3B8]">
            <li>The parent confirms legal guardian status via a mandatory consent acknowledgement.</li>
            <li>An OTP challenge is dispatched to the parent&apos;s WhatsApp mobile number to verify physical control before placing a COD order.</li>
          </ul>
        </section>

        <section className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-3">
          <h2 className="font-heading font-bold text-base text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#F6C94B]" />
            <span>3. Data Storage &amp; Encryption</span>
          </h2>
          <p>
            All delivery address snapshots are encrypted at rest using AES-256 and transmitted over TLS 1.3. We do not sell, rent, or share personal information with third-party advertising brokers under any circumstance.
          </p>
        </section>
      </div>
    </div>
  );
}
