import React from 'react';
import Link from 'next/link';
import { ProjectBeeLogo } from '@projectbee/ui';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'About Us — ProjectBee India',
  description:
    'Dedicated Indian educational brand transforming science project learning for CBSE & ICSE students.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Hero Intro */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A230B] text-[#FDE047] border border-[#4A3D12] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-[#F6C94B]" />
          <span>Our Educational Story</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
          Empowering Young Indian Minds Through Hands-On Science
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          ProjectBee was founded with a singular purpose: to replace last-minute school science exhibition stress with deep, joyful, and curriculum-aligned hands-on discovery.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md shadow-soft space-y-4">
          <div className="w-12 h-12 bg-[#17233B] text-[#60A5FA] border border-[#1E3A5F] rounded-2xl flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Excellence in Science</h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            Every working model and chart adheres faithfully to NCERT, CBSE, and ICSE syllabus frameworks. Students don’t just carry a model—they understand how and why it works.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md shadow-soft space-y-4">
          <div className="w-12 h-12 bg-[#2A230B] text-[#F6C94B] border border-[#4A3D12] rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Safety &amp; Reliability</h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            Child safety is uncompromised. Non-toxic acrylic materials, pre-tested low-voltage DC circuits, and rounded smooth edges make our models 100% student-safe.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md shadow-soft space-y-4">
          <div className="w-12 h-12 bg-[#0F291E] text-[#4ADE80] border border-[#14532D] rounded-2xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Parent-Centric Convenience</h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            With 100% Cash on Delivery, WhatsApp order confirmation, and dedicated parent assistance, families in Bengaluru and across India enjoy zero-risk shopping.
          </p>
        </div>
      </div>

      {/* Corporate Identity & Compliance */}
      <div className="p-8 rounded-3xl bg-[#111A2E]/90 border border-[#1E293B] backdrop-blur-md text-white shadow-card space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F6C94B]">
            Official Company Profile
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Operated by YugaYatra Retail (OPC) Private Limited
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            ProjectBee is registered under the Companies Act, 2013 and fully complies with Indian consumer protection standards, electronic commerce rules, and the Digital Personal Data Protection (DPDP) Act, 2023.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1E293B] text-xs">
          <div>
            <span className="text-[#F6C94B] font-bold block mb-1">Headquarters</span>
            <span className="text-[#CBD5E1]">Indiranagar, Bengaluru, Karnataka 560038</span>
          </div>
          <div>
            <span className="text-[#F6C94B] font-bold block mb-1">Customer Support</span>
            <span className="text-[#CBD5E1]">support@projectbee.in • WhatsApp +91 98765 43210</span>
          </div>
          <div>
            <span className="text-[#F6C94B] font-bold block mb-1">Target Curriculum</span>
            <span className="text-[#CBD5E1]">CBSE &amp; ICSE School Syllabus (Classes 1–12)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
