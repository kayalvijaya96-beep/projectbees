import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ProjectBeeLogo } from '@projectbee/ui';
import { ShoppingBag, Search, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ProjectBee — CBSE & ICSE School Projects, Science Models & Educational Kits',
  description:
    'Ready-to-use science working models, 3D anatomical models, curriculum charts, and DIY assignment kits for classes 1-12. Cash on Delivery available.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        {/* Top Notification Announcement Bar */}
        <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
          <span>🚀 Launch Special: Flat ₹50 Delivery in Bengaluru | Free Delivery above ₹499 | </span>
          <span className="text-amber-400 font-semibold">100% Cash on Delivery (COD)</span>
        </div>

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <ProjectBeeLogo size="md" showTagline={false} />
            </Link>

            {/* Prominent Search shortcut on desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <Link
                href="/products"
                className="w-full flex items-center gap-2 h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 text-sm hover:border-amber-400 hover:bg-white transition-colors"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search working models, charts, class 10 projects...</span>
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/products"
                className="md:hidden p-2 text-slate-600 hover:text-amber-600 rounded-lg"
                aria-label="Search Catalogue"
              >
                <Search className="w-5 h-5" />
              </Link>

              <Link
                href="/auth"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-amber-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>

              <Link
                href="/cart"
                className="relative flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-amber-500 text-slate-900 hover:bg-amber-400 rounded-lg shadow-sm transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Application Content */}
        <main className="flex-1">{children}</main>

        {/* Global Accessible Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
              {/* Brand Statement */}
              <div className="space-y-3">
                <ProjectBeeLogo size="md" className="text-white" />
                <p className="text-sm text-slate-400 leading-relaxed">
                  ProjectBee is India&apos;s dedicated educational platform offering curriculum-aligned science working models, charts, and school DIY projects for CBSE &amp; ICSE students.
                </p>
                <p className="text-xs text-amber-400 font-medium">
                  Operated by YugaYatra Retail (OPC) Private Limited
                </p>
              </div>

              {/* Class Shortcuts */}
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
                  Class Projects
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li><Link href="/products?class=6" className="hover:text-amber-400">Class 6 Science Models</Link></li>
                  <li><Link href="/products?class=7" className="hover:text-amber-400">Class 7 DIY Kits</Link></li>
                  <li><Link href="/products?class=8" className="hover:text-amber-400">Class 8 Physics Projects</Link></li>
                  <li><Link href="/products?class=9" className="hover:text-amber-400">Class 9 Biology Models</Link></li>
                  <li><Link href="/products?class=10" className="hover:text-amber-400">Class 10 CBSE Board Exhibitions</Link></li>
                </ul>
              </div>

              {/* Project Categories */}
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
                  Categories
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li><Link href="/products?category=working-science-models" className="hover:text-amber-400">Working Science Models</Link></li>
                  <li><Link href="/products?category=still-educational-models" className="hover:text-amber-400">3D Educational Models</Link></li>
                  <li><Link href="/products?category=diy-science-kits" className="hover:text-amber-400">DIY Science Project Kits</Link></li>
                  <li><Link href="/products?category=educational-charts" className="hover:text-amber-400">Laminated School Charts</Link></li>
                  <li><Link href="/products?category=school-assignment-kits" className="hover:text-amber-400">School Assignment Craft Kits</Link></li>
                </ul>
              </div>

              {/* Customer Care & Policies */}
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
                  Help &amp; Legal
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li><Link href="/about" className="hover:text-amber-400">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-amber-400">Contact Us &amp; FAQs</Link></li>
                  <li><Link href="/shipping" className="hover:text-amber-400">Shipping &amp; COD Policy</Link></li>
                  <li><Link href="/cancellation" className="hover:text-amber-400">Cancellation &amp; Return Policy</Link></li>
                  <li><Link href="/privacy" className="hover:text-amber-400">Child Privacy &amp; DPDP Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-amber-400">Terms &amp; Conditions</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
              <p>© {new Date().getFullYear()} ProjectBee — YugaYatra Retail (OPC) Private Limited. All rights reserved.</p>
              <p>Designed for CBSE &amp; ICSE School Students &amp; Guardians across India.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

