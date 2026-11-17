import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 mb-2">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Child Privacy by Design</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Child Privacy &amp; Data Protection Policy
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Effective Date: November 2026 | In compliance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Commitment to Child Privacy</h2>
          <p>
            ProjectBee, operated by <strong>YugaYatra Retail (OPC) Private Limited</strong>, provides educational materials, science working models, and school kits to students across India. Because our services are intended for school-age students and their families, we implement strict <strong>privacy by design</strong> to safeguard personal information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Principle of Data Minimization</h2>
          <p>
            We strictly limit data collection to what is necessary to personalize academic recommendations and deliver educational kits:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Data We Collect:</strong> Account email (for passwordless OTP sign-in), student first name/nickname, student academic class (1–12), affiliated board (CBSE or ICSE), parent/guardian contact name, delivery address, and parent WhatsApp mobile number for Cash on Delivery (COD) confirmation.</li>
            <li><strong>Data We NEVER Collect:</strong> Full date of birth, student photographs, student Aadhaar or national identity numbers, school name or student roll numbers, or precise GPS real-time location.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Verifiable Parental / Guardian Involvement</h2>
          <p>
            In accordance with India&apos;s Digital Personal Data Protection Act (DPDP) 2023, orders for minors must be authorized by a parent or legal guardian.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>When placing a Cash on Delivery order, the platform requires the name of the parent/guardian.</li>
            <li>A single-use OTP challenge is issued to the guardian&apos;s WhatsApp number. This OTP verifies possession of the registered contact channel.</li>
            <li>The parent/guardian must check a mandatory declaration confirming adulthood and purchase authorization before order placement.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. No Tracking, Profiling, or Advertising to Children</h2>
          <p>
            ProjectBee does not engage in targeted behavioral advertising, cross-app tracking, or profiling of students. No customer or student personal information is sold, rented, or shared with third-party advertisers. Analytics tools operate without capturing names, emails, phone numbers, or delivery addresses.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Parental Rights: Access, Correction &amp; Erasure</h2>
          <p>
            Parents and legal guardians have the right to inspect, update, or request the immediate deletion of their student&apos;s account and profile data at any time. To exercise these rights, email our Data Privacy Officer at <a href="mailto:privacy@projectbee.in" className="text-amber-600 underline">privacy@projectbee.in</a>. Requests are resolved within 7 business days.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">6. Data Retention</h2>
          <p>
            Order records (such as invoices and COD collection logs) are preserved in an encrypted database only for statutory tax, accounting, and consumer protection requirements. Temporary checkout verification challenges (OTPs) expire within 10 minutes and are purged automatically.
          </p>
        </section>
      </div>
    </div>
  );
}

