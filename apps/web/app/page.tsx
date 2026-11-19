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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#111A2E]/60 via-[#0E1626]/40 to-transparent border-b border-[#1E293B]/70 pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Subtle Decorative Geometric Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-[#173B67]/25 to-[#F6C94B]/15 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6C94B]/15 text-[#F6C94B] border border-[#F6C94B]/30 text-xs font-bold tracking-wide shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#F6C94B]" />
                <span>India&apos;s Dedicated CBSE &amp; ICSE School Project Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
                Make Learning Come Alive with{' '}
                <span className="relative inline-block text-white">
                  Project<span className="text-[#F6C94B]">Bee</span>!
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F6C94B]" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover exciting science models, creative DIY kits, and educational projects designed to make every school exhibition special. Tailored specifically for CBSE &amp; ICSE students from Classes 1 to 12.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734] font-bold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="#browse-by-class"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#111A2E] text-white border border-[#334155] hover:bg-[#1E293B] hover:border-[#F6C94B]/40 font-bold text-base shadow-2xs transition-all flex items-center justify-center cursor-pointer"
                >
                  Browse by Class
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-4 border-t border-[#1E293B] grid grid-cols-3 gap-3 text-left">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Truck className="w-3.5 h-3.5 text-[#F6C94B]" />
                    <span>100% COD</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">Zero Advance Payment</p>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F6C94B]" />
                    <span>Child-Safe</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">Tested Materials</p>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F6C94B]" />
                    <span>Viva Guides</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">Exhibition Q&amp;A Included</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Product Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md p-6 shadow-card overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                  <span className="text-xs font-bold text-[#F6C94B] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#F6C94B]" />
                    <span>Exhibition Bestseller</span>
                  </span>
                  <span className="text-[11px] font-semibold bg-[#064E3B]/40 text-[#34D399] border border-[#059669]/30 px-2 py-0.5 rounded-full">
                    Pre-Assembled
                  </span>
                </div>

                <div className="relative aspect-4/3 w-full bg-[#0E1626] rounded-2xl overflow-hidden my-4 border border-[#1E293B]">
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
                    <span className="font-semibold text-[#93C5FD] bg-[#17233B] px-2 py-0.5 rounded border border-[#285A91]/50">
                      Class 8-10 CBSE/ICSE
                    </span>
                    <span className="text-[#94A3B8]">Physics &amp; Mechanics</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Hydraulic Lift Working Science Model (Pascal&apos;s Law)
                  </h3>
                  <div className="flex items-baseline justify-between pt-2 border-t border-[#1E293B]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-[#F6C94B]">₹499</span>
                      <span className="text-xs text-[#64748B] line-through">₹649</span>
                    </div>
                    <Link
                      href="/products/hydraulic-lift-working-science-model"
                      className="px-3.5 py-1.5 bg-[#173B67] text-white hover:bg-[#285A91] text-xs font-semibold rounded-xl border border-[#285A91] transition-colors"
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
          <span className="text-xs font-bold uppercase tracking-wider text-[#F6C94B] bg-[#111A2E] px-3.5 py-1 rounded-full border border-[#1E293B]">
            Curriculum Alignment
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
            Browse Projects by Student Class
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Every school project is specifically calibrated to NCERT, CBSE, and ICSE syllabus requirements.
          </p>
        </div>

        {/* 4 Grouped Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classGroups.map((group) => (
            <div
              key={group.range}
              className="rounded-2xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md p-6 flex flex-col justify-between shadow-soft hover:shadow-card hover:-translate-y-1 hover:border-[#F6C94B]/40 transition-all duration-200"
            >
              <div className="space-y-3">
                <span className={`inline-block text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full ${group.badgeColor}`}>
                  {group.range}
                </span>
                <h3 className="font-heading font-bold text-lg text-white">{group.theme}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{group.desc}</p>
              </div>

              <div className="pt-6 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {group.classes.map((c) => (
                    <Link
                      key={c}
                      href={`/products?class=${c}`}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#0E1626] border border-[#1E293B] text-white hover:border-[#F6C94B] hover:text-[#F6C94B] hover:bg-[#17233B] transition-colors shadow-2xs"
                    >
                      Class {c}
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/products?class_group=${group.range.replace('Classes ', '')}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#F6C94B] hover:text-[#E5B734] pt-1"
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1E293B] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Explore by Format</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              Shop by Project Category
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-[#F6C94B] hover:text-[#E5B734] flex items-center gap-1"
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
              className="group relative rounded-2xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md overflow-hidden shadow-soft hover:shadow-card-hover hover:border-[#F6C94B]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category Visual Banner */}
              <div className="relative aspect-16/9 w-full bg-[#0E1626] border-b border-[#1E293B] overflow-hidden">
                <Image
                  src={cat.image_url}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#111A2E]/90 backdrop-blur-xs text-[#F6C94B] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1E293B]">
                  {cat.tag}
                </span>
                <span className="absolute top-3 right-3 bg-[#173B67] text-[#F1F5F9] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#285A91]">
                  {cat.count}
                </span>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-[#F6C94B] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] line-clamp-2 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#1E293B] text-xs font-bold text-[#F6C94B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1E293B] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Proven Winners</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              Best Selling Exhibition Projects
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
              Top-rated models selected by hundreds of CBSE and ICSE students for school science fairs.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-[#F6C94B] hover:text-[#E5B734] flex items-center gap-1"
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
          <span className="text-xs font-bold uppercase tracking-wider text-[#F6C94B] bg-[#111A2E] px-3 py-1 rounded-full border border-[#1E293B]">
            Parent &amp; Student Assurance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
            Why Indian Parents &amp; Schools Trust ProjectBee
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Designed by educational engineers to remove last-minute assignment stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#17233B] text-[#60A5FA] flex items-center justify-center border border-[#1E3A5F]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-white">Curriculum Aligned</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Every project accurately demonstrates specific CBSE &amp; ICSE science concepts so students understand the theory and answer exhibition viva questions with total confidence.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#2A230B] text-[#F6C94B] flex items-center justify-center border border-[#4A3D12]">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-white">100% Cash on Delivery</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Zero advance online card payment required. Inspect your package at your doorstep and pay cash only upon safe arrival in Bengaluru and across India.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#0F291E] text-[#4ADE80] flex items-center justify-center border border-[#14532D]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-white">Child-Safe &amp; Tested Materials</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Built with smooth laser-cut acrylic, BPA-free syringes, non-toxic fluid colors, and low-voltage DC motors tested specifically for school student handling.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW IT WORKS */}
      <section className="bg-[#0E1626]/80 backdrop-blur-md border-y border-[#1E293B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Simple 4-Step Journey</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              How ProjectBee Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="space-y-3 text-center sm:text-left relative">
              <span className="w-10 h-10 rounded-full bg-[#173B67] text-[#F6C94B] border border-[#285A91] font-bold text-base flex items-center justify-center shadow-sm mx-auto sm:mx-0">
                1
              </span>
              <h3 className="font-heading font-bold text-base text-white">Explore Projects</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Filter by your student’s grade, CBSE/ICSE board, and science subject to find matching exhibition topics.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 text-center sm:text-left relative">
              <span className="w-10 h-10 rounded-full bg-[#173B67] text-[#F6C94B] border border-[#285A91] font-bold text-base flex items-center justify-center shadow-sm mx-auto sm:mx-0">
                2
              </span>
              <h3 className="font-heading font-bold text-base text-white">Choose Your Favourite</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Review complete specifications, included materials, learning outcomes, and viva question previews.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 text-center sm:text-left relative">
              <span className="w-10 h-10 rounded-full bg-[#173B67] text-[#F6C94B] border border-[#285A91] font-bold text-base flex items-center justify-center shadow-sm mx-auto sm:mx-0">
                3
              </span>
              <h3 className="font-heading font-bold text-base text-white">Place Your COD Order</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Verify your parent WhatsApp mobile number in seconds with an automated OTP challenge.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-3 text-center sm:text-left relative">
              <span className="w-10 h-10 rounded-full bg-[#F6C94B] text-[#173B67] font-bold text-base flex items-center justify-center shadow-sm mx-auto sm:mx-0">
                4
              </span>
              <h3 className="font-heading font-bold text-base text-white">Receive &amp; Start Learning</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Pay cash at your doorstep upon safe parcel arrival and present your project with total confidence!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F6C94B] bg-[#111A2E] px-3 py-1 rounded-full border border-[#1E293B]">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Have a question about selection, delivery, or Cash on Delivery? We are here to help.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md overflow-hidden shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#17233B]/50 transition-colors"
              >
                <span className="font-heading font-bold text-sm sm:text-base text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#94A3B8] shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-[#F6C94B]' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E293B] pt-3">
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
