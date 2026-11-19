import React from 'react';
import Link from 'next/link';
import { ProjectBeeLogo } from '@projectbee/ui';
import { Phone, Mail, MapPin, Truck, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#173B67] text-slate-300 pt-16 pb-10 border-t border-[#285A91]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#285A91]/40">
          {/* Brand & Mission (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <ProjectBeeLogo size="lg" className="text-white" showTagline={true} />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              ProjectBee is India&apos;s trusted educational platform offering curriculum-aligned science working models, 3D anatomical charts, and school DIY projects for CBSE &amp; ICSE students.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <p className="font-semibold text-[#F6C94B]">
                Operated by YugaYatra Retail (OPC) Private Limited
              </p>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#F6C94B] shrink-0" />
                <span>Indiranagar, Bengaluru, Karnataka 560038</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-[#F6C94B] shrink-0" />
                <span>support@projectbee.in</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-[#F6C94B] shrink-0" />
                <span>+91 98765 43210 (WhatsApp Mon–Sat 9AM–7PM)</span>
              </div>
            </div>
          </div>

          {/* Class Shortcuts */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 font-heading border-b border-[#285A91] pb-2 inline-block">
              Projects by Class
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/products?class=6" className="hover:text-[#F6C94B] transition-colors">
                  Class 6 Science Models
                </Link>
              </li>
              <li>
                <Link href="/products?class=7" className="hover:text-[#F6C94B] transition-colors">
                  Class 7 DIY Kits
                </Link>
              </li>
              <li>
                <Link href="/products?class=8" className="hover:text-[#F6C94B] transition-colors">
                  Class 8 Physics Projects
                </Link>
              </li>
              <li>
                <Link href="/products?class=9" className="hover:text-[#F6C94B] transition-colors">
                  Class 9 Biology Models
                </Link>
              </li>
              <li>
                <Link href="/products?class=10" className="hover:text-[#F6C94B] transition-colors">
                  Class 10 CBSE Exhibitions
                </Link>
              </li>
              <li>
                <Link href="/products?class=11" className="hover:text-[#F6C94B] transition-colors">
                  Class 11 Chemistry Charts
                </Link>
              </li>
              <li>
                <Link href="/products?class=12" className="hover:text-[#F6C94B] transition-colors">
                  Class 12 Advanced Models
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 font-heading border-b border-[#285A91] pb-2 inline-block">
              Categories
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/products?category=working-science-models" className="hover:text-[#F6C94B] transition-colors">
                  Working Science Models
                </Link>
              </li>
              <li>
                <Link href="/products?category=still-educational-models" className="hover:text-[#F6C94B] transition-colors">
                  3D Educational Models
                </Link>
              </li>
              <li>
                <Link href="/products?category=diy-science-kits" className="hover:text-[#F6C94B] transition-colors">
                  DIY Science Project Kits
                </Link>
              </li>
              <li>
                <Link href="/products?category=educational-charts" className="hover:text-[#F6C94B] transition-colors">
                  Laminated School Charts
                </Link>
              </li>
              <li>
                <Link href="/products?category=school-assignment-kits" className="hover:text-[#F6C94B] transition-colors">
                  School Assignment Craft Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 font-heading border-b border-[#285A91] pb-2 inline-block">
              Help &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-[#F6C94B] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F6C94B] transition-colors">
                  Contact Us &amp; FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#F6C94B] transition-colors">
                  Shipping &amp; COD Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-[#F6C94B] transition-colors">
                  Cancellation &amp; Return Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#F6C94B] transition-colors">
                  Child Privacy &amp; DPDP Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F6C94B] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Trust & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4 text-center md:text-left">
          <p>© {new Date().getFullYear()} ProjectBee — YugaYatra Retail (OPC) Private Limited. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#F6C94B]" /> 100% Cash on Delivery
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F6C94B]" /> DPDP Act 2023 Compliant
            </span>
            <span>•</span>
            <span>Made with precision for Indian CBSE &amp; ICSE students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
