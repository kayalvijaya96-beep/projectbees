'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectBeeLogo } from '@projectbee/ui';
import { useCart } from '@/lib/cart-context';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Phone,
  Truck,
  ShieldCheck,
  Heart,
  Compass,
} from 'lucide-react';

export function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const classGroups = [
    { name: 'Classes 1–4', label: 'Creative Learning', range: '1-4', href: '/products?class_group=1-4' },
    { name: 'Classes 5–7', label: 'Fun Science Projects', range: '5-7', href: '/products?class_group=5-7' },
    { name: 'Classes 8–10', label: 'Science Exhibition Models', range: '8-10', href: '/products?class_group=8-10' },
    { name: 'Classes 11–12', label: 'Advanced Science Projects', range: '11-12', href: '/products?class_group=11-12' },
  ];

  const categories = [
    { name: 'Working Science Models', href: '/products?category=working-science-models' },
    { name: 'Still 3D Educational Models', href: '/products?category=still-educational-models' },
    { name: 'DIY Science Kits', href: '/products?category=diy-science-kits' },
    { name: 'Educational Charts & Posters', href: '/products?category=educational-charts' },
    { name: 'School Assignment Craft Kits', href: '/products?category=school-assignment-kits' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#173B67] text-white text-xs py-2 px-4 border-b border-[#285A91]/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#F6C94B] text-[#173B67] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              Launch Special
            </span>
            <span className="text-slate-200">
              Flat ₹50 Delivery in Bengaluru | Free Delivery above ₹499
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <span className="flex items-center gap-1 text-[#F6C94B] font-semibold">
              <Truck className="w-3.5 h-3.5" /> 100% Cash on Delivery
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <a
              href="https://wa.me/919876543210?text=Hello%20ProjectBee%2C%20I%20need%20help%20choosing%20a%20school%20project"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1 text-slate-200 hover:text-[#F6C94B] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#F6C94B]" /> WhatsApp Support: +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 bg-[#0B111E]/90 backdrop-blur-md border-b transition-all duration-200 ${
          isScrolled ? 'shadow-md border-[#1E293B] bg-[#0B111E]/95' : 'border-[#1E293B]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <ProjectBeeLogo size="md" showTagline={true} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#CBD5E1]">
              <Link href="/" className="hover:text-[#F6C94B] hover:font-semibold transition-colors">
                Home
              </Link>
              <Link href="/products" className="hover:text-[#F6C94B] hover:font-semibold transition-colors">
                Shop All Projects
              </Link>

              {/* Browse by Class Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setClassDropdownOpen(true)}
                onMouseLeave={() => setClassDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-[#F6C94B] hover:font-semibold transition-colors py-2 cursor-pointer text-[#CBD5E1]"
                  onClick={() => setClassDropdownOpen(!classDropdownOpen)}
                >
                  <span>Browse by Class</span>
                  <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                </button>

                {classDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 bg-[#111A2E] rounded-2xl shadow-card-hover border border-[#1E293B] p-3 py-2 space-y-1">
                    {classGroups.map((group) => (
                      <Link
                        key={group.name}
                        href={group.href}
                        onClick={() => setClassDropdownOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-[#17233B] transition-colors group"
                      >
                        <div className="font-semibold text-[#F6C94B] text-sm group-hover:text-white">
                          {group.name}
                        </div>
                        <div className="text-xs text-[#94A3B8]">{group.label}</div>
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-[#1E293B] text-center">
                      <Link
                        href="/products"
                        onClick={() => setClassDropdownOpen(false)}
                        className="text-xs font-semibold text-[#F6C94B] hover:text-white"
                      >
                        View All Classes 1 to 12 →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoryDropdownOpen(true)}
                onMouseLeave={() => setCategoryDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-[#F6C94B] hover:font-semibold transition-colors py-2 cursor-pointer text-[#CBD5E1]"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                >
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                </button>

                {categoryDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-[#111A2E] rounded-2xl shadow-card-hover border border-[#1E293B] p-3 py-2 space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-[#17233B] transition-colors group"
                      >
                        <div className="font-semibold text-white text-sm group-hover:text-[#F6C94B]">
                          {cat.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about" className="hover:text-[#F6C94B] hover:font-semibold transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-[#F6C94B] hover:font-semibold transition-colors">
                Contact Us
              </Link>
            </nav>

            {/* Search Input Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-xs xl:max-w-sm mx-2">
              <form action="/products" method="GET" className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="text"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search working models, charts..."
                  className="w-full h-10 pl-10 pr-4 text-xs bg-[#111A2E] border border-[#1E293B] rounded-xl text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none focus:border-[#F6C94B] focus:bg-[#17233B] focus:ring-2 focus:ring-[#F6C94B]/20 transition-all"
                />
              </form>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Project Finder Pill */}
              <Link
                href="/products#project-finder"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#F6C94B]/15 text-[#F6C94B] border border-[#F6C94B]/30 rounded-xl hover:bg-[#F6C94B]/25 transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Project Finder</span>
              </Link>

              {/* Sign In */}
              <Link
                href="/auth"
                className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-[#17233B] rounded-xl transition-colors"
              >
                <User className="w-4 h-4 text-[#94A3B8]" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>

              {/* Shopping Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734] font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#173B67]" />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-bold bg-[#173B67] text-white rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#CBD5E1] hover:bg-[#17233B] rounded-xl transition-colors"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1E293B] bg-[#0E1626] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in fade-in duration-200">
            {/* Search form in Mobile */}
            <form action="/products" method="GET" className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                name="q"
                placeholder="Search projects, topics, classes..."
                className="w-full h-11 pl-10 pr-4 text-sm bg-[#111A2E] border border-[#1E293B] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#F6C94B]"
              />
            </form>

            <nav className="flex flex-col space-y-1 text-sm font-medium text-[#CBD5E1]">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl hover:bg-[#17233B] hover:text-[#F6C94B]"
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl hover:bg-[#17233B] hover:text-[#F6C94B]"
              >
                Shop All Projects
              </Link>

              {/* Classes Sub-links */}
              <div className="pt-2 pb-1 px-3 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Browse by Class
              </div>
              <div className="grid grid-cols-2 gap-1 px-2">
                {classGroups.map((group) => (
                  <Link
                    key={group.name}
                    href={group.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-xs rounded-lg bg-[#111A2E] text-[#F6C94B] font-medium"
                  >
                    {group.name}
                  </Link>
                ))}
              </div>

              {/* Categories Sub-links */}
              <div className="pt-3 pb-1 px-3 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Categories
              </div>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs text-[#CBD5E1] hover:text-[#F6C94B] hover:bg-[#17233B] rounded-lg"
                >
                  • {cat.name}
                </Link>
              ))}

              <div className="pt-2 border-t border-[#1E293B] space-y-1">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#17233B]"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#17233B]"
                >
                  Contact &amp; FAQs
                </Link>
                <Link
                  href="/shipping"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#17233B]"
                >
                  Shipping &amp; COD Policy
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
