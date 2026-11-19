'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATALOGUE_PRODUCTS, CATEGORIES, Product } from '@/lib/products-data';
import { ProductCard } from '@/components/ProductCard';
import { ProjectFinder } from '@/components/ProjectFinder';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Star,
  Zap,
  Award,
  Layers,
  Search,
  Check,
} from 'lucide-react';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const classGroups = [
    {
      range: 'Classes 1–4',
      theme: 'Creative Learning',
      desc: 'Visual charts, craft kits, and fundamental building blocks for young minds.',
      classes: [1, 2, 3, 4],
      bg: 'bg-[#EFF6FF]',
      border: 'border-[#BFDBFE]',
      badgeColor: 'bg-[#1E40AF]',
    },
    {
      range: 'Classes 5–7',
      theme: 'Fun Science Projects',
      desc: 'Hands-on solar system kits, simple circuits, and environmental displays.',
      classes: [5, 6, 7],
      bg: 'bg-[#FEFCE8]',
      border: 'border-[#FEF08A]',
      badgeColor: 'bg-[#854D0E]',
    },
    {
      range: 'Classes 8–10',
      theme: 'Science Exhibition Models',
      desc: 'Working hydraulic lifts, wind generators, and 3D biology anatomical models.',
      classes: [8, 9, 10],
      bg: 'bg-[#F0FDF4]',
      border: 'border-[#BBF7D0]',
      badgeColor: 'bg-[#166534]',
    },
    {
      range: 'Classes 11–12',
      theme: 'Advanced Science Projects',
      desc: 'Curriculum-aligned IUPAC periodic tables, mechanics projects, and viva guides.',
      classes: [11, 12],
      bg: 'bg-[#FAF5FF]',
      border: 'border-[#E9D5FF]',
      badgeColor: 'bg-[#6B21A8]',
    },
  ];

  const faqs = [
    {
      q: 'Are the working science models pre-assembled and ready to present?',
      a: 'Yes! Models in our "Working Science Models" category (such as the Hydraulic Lift and Windmill Generator) arrive fully pre-assembled, thoroughly calibrated, and ready for immediate exhibition presentation. DIY kits include clear step-by-step instructions for guided student assembly.',
    },
    {
      q: 'How does Cash on Delivery (COD) and WhatsApp OTP verification work?',
      a: 'We offer 100% Cash on Delivery across India. At checkout, you enter your delivery address and parent WhatsApp number. A 6-digit confirmation OTP is sent to WhatsApp to confirm your order. You pay in cash at your doorstep once the parcel is safely delivered.',
    },
    {
      q: 'Do the projects come with project documentation and viva questions?',
      a: 'Every ProjectBee working model and kit includes a dedicated viva preparation pamphlet outlining the underlying scientific principles (e.g. Pascal’s Law, Faraday’s Law), formulas, real-world engineering uses, and common viva questions with answers.',
    },
    {
      q: 'Are the materials safe for young school students?',
      a: 'Safety is our highest priority. All models use BPA-free medical-grade plastics, child-safe low-voltage DC motors, non-toxic food-color fluid reservoirs, and pre-sanded smooth edges. There are zero hazardous chemicals or mains AC 220V components.',
    },
    {
      q: 'What is your shipping and delivery timeline?',
      a: 'Orders in Bengaluru launch zones enjoy express 2-business-day delivery. Rest of India deliveries take 4 to 5 business days via reliable courier partners. Delivery is 100% FREE on all orders above ₹499 (flat ₹50 for orders below ₹499).',
    },
    {
      q: 'What if a part gets damaged during transit?',
      a: 'Every parcel is packed with high-density protective foam. If any component arrives damaged or non-functional, message our WhatsApp support (+91 98765 43210) within 48 hours for an instant hassle-free replacement kit.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* SECTION 2: HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F8FC] via-white to-[#F5F8FC] border-b border-[#E2E8F0] pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Subtle Decorative Geometric Shapes */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-[#173B67]/5 to-[#F6C94B]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF08A]/60 text-[#713F12] border border-[#FACC15] text-xs font-bold tracking-wide shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#CA8A04]" />
                <span>India&apos;s Dedicated CBSE &amp; ICSE School Project Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#173B67] tracking-tight leading-[1.15]">
                Make Learning Come Alive with{' '}
                <span className="relative inline-block text-[#173B67]">
                  Project<span className="text-[#F6C94B]">Bee</span>!
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F6C94B]" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#68778A] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover exciting science models, creative DIY kits, and educational projects designed to make every school exhibition special. Tailored specifically for CBSE &amp; ICSE students from Classes 1 to 12.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734] font-bold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="#browse-by-class"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-[#173B67] border border-[#CBD5E1] hover:bg-[#F5F8FC] hover:border-[#173B67]/40 font-bold text-base shadow-2xs transition-all flex items-center justify-center"
                >
                  Browse by Class
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-4 border-t border-[#E2E8F0] grid grid-cols-3 gap-3 text-left">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#173B67]">
                    <Truck className="w-3.5 h-3.5 text-[#F6C94B]" />
                    <span>100% COD</span>
                  </div>
                  <p className="text-[11px] text-[#68778A]">Zero Advance Payment</p>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#173B67]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F6C94B]" />
                    <span>Child-Safe</span>
                  </div>
                  <p className="text-[11px] text-[#68778A]">Tested Materials</p>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#173B67]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F6C94B]" />
                    <span>Viva Guides</span>
                  </div>
                  <p className="text-[11px] text-[#68778A]">Exhibition Q&amp;A Included</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Product Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-card overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                  <span className="text-xs font-bold text-[#173B67] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#F6C94B]" />
                    <span>Exhibition Bestseller</span>
                  </span>
                  <span className="text-[11px] font-semibold bg-[#ECFDF5] text-[#065F46] px-2 py-0.5 rounded-full">
                    Pre-Assembled
                  </span>
                </div>

                <div className="relative aspect-4/3 w-full bg-[#F5F8FC] rounded-2xl overflow-hidden my-4 border border-[#F1F5F9]">
                  <Image
                    src="/images/products/hydraulic-lift.svg"
                    alt="Hydraulic Lift Working Science Model"
                    fill
                    priority
                    className="object-contain p-4"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                      Class 8-10 CBSE/ICSE
                    </span>
                    <span className="text-[#68778A]">Physics &amp; Mechanics</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#173B67]">
                    Hydraulic Lift Working Science Model (Pascal&apos;s Law)
                  </h3>
                  <div className="flex items-baseline justify-between pt-2 border-t border-[#F1F5F9]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-[#173B67]">₹499</span>
                      <span className="text-xs text-[#68778A] line-through">₹649</span>
                    </div>
                    <Link
                      href="/products/hydraulic-lift-working-science-model"
                      className="px-3.5 py-1.5 bg-[#173B67] text-white hover:bg-[#285A91] text-xs font-semibold rounded-xl transition-colors"
                    >
                      View Project Kit →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BROWSE BY CLASS */}
      <section id="browse-by-class" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#68778A] bg-[#F5F8FC] px-3 py-1 rounded-full border border-[#CBD5E1]">
            Curriculum Alignment
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#173B67] tracking-tight">
            Browse Projects by Student Class
          </h2>
          <p className="text-sm text-[#68778A]">
            Every school project is specifically calibrated to NCERT, CBSE, and ICSE syllabus requirements.
          </p>
        </div>

        {/* 4 Grouped Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classGroups.map((group) => (
            <div
              key={group.range}
              className={`rounded-2xl border ${group.border} ${group.bg} p-6 flex flex-col justify-between shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-200`}
            >
              <div className="space-y-3">
                <span className={`inline-block text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full ${group.badgeColor}`}>
                  {group.range}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#173B67]">{group.theme}</h3>
                <p className="text-xs text-[#68778A] leading-relaxed">{group.desc}</p>
              </div>

              <div className="pt-6 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {group.classes.map((c) => (
                    <Link
                      key={c}
                      href={`/products?class=${c}`}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-[#CBD5E1] text-[#173B67] hover:border-[#F6C94B] hover:bg-[#FEF08A]/40 transition-colors shadow-2xs"
                    >
                      Class {c}
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/products?class_group=${group.range.replace('Classes ', '')}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#173B67] hover:text-[#285A91] pt-1"
                >
                  <span>Explore {group.range} Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#68778A]">Explore by Format</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#173B67] tracking-tight">
              Shop by Project Category
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-[#173B67] hover:text-[#285A91] flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-soft hover:shadow-card-hover hover:border-[#173B67]/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category Visual Banner */}
              <div className="relative aspect-16/9 w-full bg-[#F5F8FC] border-b border-[#F1F5F9] overflow-hidden">
                <Image
                  src={cat.image_url}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#173B67] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#E2E8F0]">
                  {cat.tag}
                </span>
                <span className="absolute top-3 right-3 bg-[#173B67] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#173B67] group-hover:text-[#285A91] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#68778A] line-clamp-2 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F1F5F9] text-xs font-bold text-[#173B67] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 5: BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#68778A]">Proven Winners</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#173B67] tracking-tight">
              Best Selling Exhibition Projects
            </h2>
            <p className="text-xs sm:text-sm text-[#68778A] mt-0.5">
              Top-rated models selected by hundreds of CBSE and ICSE students for school science fairs.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-[#173B67] hover:text-[#285A91] flex items-center gap-1"
          >
            <span>See Complete Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATALOGUE_PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 10 (Interactive): PROJECT FINDER TOOL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectFinder />
      </div>

      {/* SECTION 6: WHY CHOOSE PROJECTBEE? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#68778A] bg-[#F5F8FC] px-3 py-1 rounded-full border border-[#CBD5E1]">
            Parent &amp; Student Assurance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#173B67] tracking-tight">
            Why Indian Parents &amp; Schools Trust ProjectBee
          </h2>
          <p className="text-sm text-[#68778A]">
            Designed by educational engineers to remove last-minute assignment stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#173B67] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#285A91]" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#173B67]">Curriculum Aligned</h3>
            <p className="text-xs text-[#68778A] leading-relaxed">
              Every project accurately demonstrates specific CBSE &amp; ICSE science concepts so students understand the theory and answer exhibition viva questions with total confidence.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FEFCE8] text-[#854D0E] flex items-center justify-center">
              <Truck className="w-6 h-6 text-[#CA8A04]" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#173B67]">100% Cash on Delivery</h3>
            <p className="text-xs text-[#68778A] leading-relaxed">
              Zero advance online card payment required. Inspect your package at your doorstep and pay cash only upon safe arrival in Bengaluru and across India.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] text-[#166534] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#173B67]">Child-Safe &amp; Tested Materials</h3>
            <p className="text-xs text-[#68778A] leading-relaxed">
              Built with smooth laser-cut acrylic, BPA-free syringes, non-toxic fluid colors, and low-voltage DC motors tested specifically for school student handling.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW IT WORKS */}
      <section className="bg-white border-y border-[#E2E8F0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#68778A]">Simple 4-Step Journey</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#173B67]">
              How ProjectBee Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="space-y-3 text-center sm:text-left relative">
              <span className="w-10 h-10 rounded-full bg-[#173B67] text-[#F6C94B] font-bold text-base flex items-center justify-center shadow-sm mx-auto sm:mx-0">
                1
              </span>
              <h3 className="font-heading font-bold text-base text-[#173B67]">Explore Projects</h3>
              <p className="text-xs text-[#68778A] leading-relaxed">
                Filter by your student’s grade, CBSE/ICSE board, and science subject to find matching exhibition topics.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 text-center sm:text-left relative">
              <span className="w-10 h-10 rounded-full bg-[#173B67] text-[#F6C94B] font-bold text-base flex items-center justify-center shadow-sm mx-auto sm:mx-0">
                2
              </span>
              <h3 className="font-heading font-bold text-base text-[#173B67]">Choose Your Favourite</h3>
              <p className="text-xs text-[#68778A] leading-relaxed">
                Review complete specifications, included materials, learning outcomes, and viva question previews.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 text-center sm:text-left relative">
              <span className="w-10 h-10 rounded-full bg-[#173B67] text-[#F6C94B] font-bold text-base flex items-center justify-center shadow-sm mx-auto sm:mx-0">
                3
              </span>
              <h3 className="font-heading font-bold text-base text-[#173B67]">Place Your COD Order</h3>
              <p className="text-xs text-[#68778A] leading-relaxed">
                Verify your parent WhatsApp mobile number in seconds with an automated OTP challenge.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-3 text-center sm:text-left relative">
              <span className="w-10 h-10 rounded-full bg-[#F6C94B] text-[#173B67] font-bold text-base flex items-center justify-center shadow-sm mx-auto sm:mx-0">
                4
              </span>
              <h3 className="font-heading font-bold text-base text-[#173B67]">Receive &amp; Start Learning</h3>
              <p className="text-xs text-[#68778A] leading-relaxed">
                Pay cash at your doorstep upon safe parcel arrival and present your project with total confidence!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#68778A] bg-[#F5F8FC] px-3 py-1 rounded-full border border-[#CBD5E1]">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#173B67]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#68778A]">
            Have a question about selection, delivery, or Cash on Delivery? We are here to help.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5F8FC] transition-colors"
              >
                <span className="font-heading font-bold text-sm sm:text-base text-[#173B67]">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#68778A] shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-[#173B67]' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#68778A] leading-relaxed border-t border-[#F1F5F9] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
