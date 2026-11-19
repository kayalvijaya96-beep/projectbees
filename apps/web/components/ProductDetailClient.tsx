'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CATALOGUE_PRODUCTS, Product } from '@/lib/products-data';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Heart,
  ShoppingBag,
  Star,
  MapPin,
  Check,
  FileText,
  HelpCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

interface ProductDetailClientProps {
  slug: string;
}

export function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const product = CATALOGUE_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [pincode, setPincode] = useState('560038');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'how-it-works' | 'principles' | 'viva' | 'specs'>('overview');

  const isFavorited = isInWishlist(product.id);

  const discountPercent = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.selling_price) / product.compare_at_price) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeStatus('Please enter a valid 6-digit PIN code.');
      return;
    }
    if (pincode.startsWith('560')) {
      setPincodeStatus('✅ Serviceable: Express 2-Day Delivery in Bengaluru with Cash on Delivery.');
    } else {
      setPincodeStatus('✅ Serviceable: Standard 4-5 Day Pan-India Delivery with Cash on Delivery.');
    }
  };

  // Related products
  const relatedProducts = CATALOGUE_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#94A3B8]">
        <Link href="/" className="hover:text-[#F6C94B]">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#F6C94B]">Projects Catalogue</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category_slug}`} className="hover:text-[#F6C94B]">
          {product.category_name}
        </Link>
        <span>/</span>
        <span className="font-semibold text-white line-clamp-1">{product.title}</span>
      </nav>

      {/* Main Product Showcase (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Product Visuals */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 w-full bg-[#111A2E]/80 backdrop-blur-md rounded-3xl border border-[#1E293B] p-6 shadow-card overflow-hidden">
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              priority
              className="object-contain p-6"
            />

            {/* Badges on Gallery */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="bg-[#173B67] text-[#F6C94B] text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-[#285A91]">
                  {product.badge}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-[#DC2626] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Wishlist Toggle Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-xs transition-all z-10 cursor-pointer border ${
                isFavorited
                  ? 'bg-[#2A1515] text-[#EF4444] border-[#7F1D1D] shadow-sm'
                  : 'bg-[#0E1626]/80 text-[#94A3B8] hover:text-[#EF4444] border-[#1E293B] shadow-2xs'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Value Assurance Badges below Image */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-[#111A2E]/80 border border-[#1E293B] rounded-xl text-center space-y-1">
              <Truck className="w-4 h-4 text-[#F6C94B] mx-auto" />
              <p className="text-[11px] font-bold text-white">100% COD</p>
              <p className="text-[10px] text-[#94A3B8]">Pay at Doorstep</p>
            </div>
            <div className="p-3 bg-[#111A2E]/80 border border-[#1E293B] rounded-xl text-center space-y-1">
              <ShieldCheck className="w-4 h-4 text-[#F6C94B] mx-auto" />
              <p className="text-[11px] font-bold text-white">Child-Safe</p>
              <p className="text-[10px] text-[#94A3B8]">Non-Toxic Parts</p>
            </div>
            <div className="p-3 bg-[#111A2E]/80 border border-[#1E293B] rounded-xl text-center space-y-1">
              <FileText className="w-4 h-4 text-[#F6C94B] mx-auto" />
              <p className="text-[11px] font-bold text-white">Viva Pamphlet</p>
              <p className="text-[10px] text-[#94A3B8]">Theory &amp; Answers</p>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Product Details & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            {/* Class & Board Pills */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="bg-[#17233B] text-[#93C5FD] font-bold text-xs px-3 py-1 rounded-full border border-[#1E3A5F]">
                {product.class_range || `Class ${product.class_number}`}
              </span>
              <span className="bg-[#2A230B] text-[#FDE047] font-semibold text-xs px-3 py-1 rounded-full border border-[#4A3D12]">
                {product.board} Aligned
              </span>
              <span className="text-[#94A3B8] text-xs font-mono">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight leading-snug">
              {product.title}
            </h1>

            {/* Ratings & Status */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center text-[#F6C94B] gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-white text-sm">{product.rating}</span>
                <span className="text-[#94A3B8]">({product.reviews_count} student ratings)</span>
              </div>
              <span className="text-[#64748B]">•</span>
              <span className="text-[#4ADE80] font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock &amp; Ready to Ship
              </span>
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#94A3B8] leading-relaxed pt-1">
              {product.short_description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-4">
            <div className="flex items-baseline justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">Total Price</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-extrabold font-heading text-[#F6C94B]">
                    ₹{product.selling_price}
                  </span>
                  {product.compare_at_price && (
                    <span className="text-sm sm:text-base text-[#64748B] line-through">
                      ₹{product.compare_at_price}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-[#EF4444] bg-[#2A1515] px-2 py-0.5 rounded-md border border-[#7F1D1D]">
                      Save ₹{product.compare_at_price! - product.selling_price} ({discountPercent}%)
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs font-bold text-[#F6C94B] bg-[#2A230B] border border-[#4A3D12] px-2.5 py-1 rounded-lg">
                100% Cash on Delivery
              </span>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2 border-t border-[#1E293B]">
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Quantity:
                </label>
                <div className="flex items-center border border-[#1E293B] rounded-xl bg-[#0E1626]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-base font-bold text-white hover:bg-[#17233B] rounded-l-xl cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-extrabold text-white bg-[#111A2E]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-3.5 py-1.5 text-base font-bold text-white hover:bg-[#17233B] rounded-r-xl cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    added
                      ? 'bg-[#16A34A] text-white'
                      : 'bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>

                <Link
                  href="/cart"
                  onClick={() => addItem(product, quantity)}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[#173B67] text-white hover:bg-[#285A91] border border-[#285A91] shadow-sm transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Buy Now (COD)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Pincode Serviceability Checker */}
            <div className="pt-3 border-t border-[#1E293B] space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Check Delivery &amp; COD in Your Area
              </label>
              <form onSubmit={checkPincode} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit PIN Code"
                    className="w-full h-10 pl-10 pr-3 text-xs bg-[#0E1626] border border-[#1E293B] rounded-xl text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F6C94B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#173B67] text-[#F6C94B] border border-[#285A91] text-xs font-bold rounded-xl hover:bg-[#285A91] cursor-pointer"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-xs font-semibold text-[#4ADE80] bg-[#0F291E] p-2.5 rounded-lg border border-[#14532D]">
                  {pincodeStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Structured Educational Tabs Section */}
      <div className="rounded-3xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md p-6 sm:p-8 shadow-soft space-y-6">
        {/* Navigation Tabs Header */}
        <div className="flex border-b border-[#1E293B] gap-2 overflow-x-auto pb-1 text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-2.5 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#F6C94B] text-[#173B67] shadow-2xs font-extrabold'
                : 'text-[#94A3B8] hover:bg-[#17233B] hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('principles')}
            className={`py-2.5 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'principles'
                ? 'bg-[#F6C94B] text-[#173B67] shadow-2xs font-extrabold'
                : 'text-[#94A3B8] hover:bg-[#17233B] hover:text-white'
            }`}
          >
            Scientific Principles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('viva')}
            className={`py-2.5 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'viva'
                ? 'bg-[#F6C94B] text-[#173B67] shadow-2xs font-extrabold'
                : 'text-[#94A3B8] hover:bg-[#17233B] hover:text-white'
            }`}
          >
            Viva Questions &amp; Answers
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`py-2.5 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'specs'
                ? 'bg-[#F6C94B] text-[#173B67] shadow-2xs font-extrabold'
                : 'text-[#94A3B8] hover:bg-[#17233B] hover:text-white'
            }`}
          >
            Materials &amp; Specs
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 text-[#F1F5F9]">
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-lg text-white">Product Overview</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {product.full_description || product.short_description}
              </p>
            </div>

            {product.learning_outcomes && (
              <div className="p-5 rounded-2xl bg-[#0E1626] border border-[#1E293B] space-y-3">
                <h4 className="font-heading font-bold text-sm text-[#F6C94B] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Key Learning Outcomes</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#CBD5E1]">
                  {product.learning_outcomes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Scientific Principles */}
        {activeTab === 'principles' && (
          <div className="space-y-4 text-[#F1F5F9]">
            <h3 className="font-heading font-bold text-lg text-white">
              Curriculum Scientific Principles
            </h3>
            {product.scientific_principles ? (
              <div className="space-y-3">
                {product.scientific_principles.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0E1626] border border-[#1E293B] space-y-1"
                  >
                    <p className="font-semibold text-xs text-[#F6C94B]">Principle #{idx + 1}</p>
                    <p className="text-sm text-[#CBD5E1]">{principle}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#94A3B8]">Standard syllabus curriculum alignment.</p>
            )}
          </div>
        )}

        {/* Tab 3: Viva Questions & Answers */}
        {activeTab === 'viva' && (
          <div className="space-y-4 text-[#F1F5F9]">
            <h3 className="font-heading font-bold text-lg text-white">
              Exhibition Viva Voce Questions &amp; Answers
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Teachers and judges frequently ask these questions during school science fairs:
            </p>

            {product.viva_questions ? (
              <div className="space-y-3 pt-2">
                {product.viva_questions.map((viva, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[#1E293B] bg-[#0E1626] shadow-2xs space-y-2"
                  >
                    <p className="text-sm font-bold text-white">
                      Q{idx + 1}: {viva.question}
                    </p>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] bg-[#111A2E] p-3 rounded-lg border border-[#1E293B]">
                      <strong className="text-[#F6C94B]">Answer:</strong> {viva.answer}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#94A3B8]">Viva pamphlet included inside package.</p>
            )}
          </div>
        )}

        {/* Tab 4: Materials & Specs */}
        {activeTab === 'specs' && (
          <div className="space-y-6 text-[#F1F5F9]">
            <h3 className="font-heading font-bold text-lg text-white">
              Materials &amp; Technical Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0E1626] border border-[#1E293B] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Physical Dimensions
                </span>
                <p className="text-sm font-semibold text-white">{product.dimensions || '22 x 14 x 18 cm'}</p>
                <p className="text-xs text-[#94A3B8]">Weight: {product.weight_grams || 380}g</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E1626] border border-[#1E293B] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Assembly &amp; Difficulty
                </span>
                <p className="text-sm font-semibold text-white">
                  {product.assembly_required ? 'DIY Guided Assembly' : 'Pre-Assembled & Ready'}
                </p>
                <p className="text-xs text-[#94A3B8]">Difficulty level: {product.difficulty || 'Easy'}</p>
              </div>
            </div>

            {product.materials && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Included Components &amp; Materials:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#CBD5E1]">
                  {product.materials.map((mat, i) => (
                    <li key={i} className="flex items-center gap-2 p-2 bg-[#0E1626] rounded-lg border border-[#1E293B]">
                      <Check className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.safety_warnings && (
              <div className="p-4 rounded-xl bg-[#2A230B] border border-[#4A3D12] text-xs text-[#FDE047]">
                <strong>Child Safety Note:</strong> {product.safety_warnings}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related Products Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            Related Exhibition Projects
          </h2>
          <Link href="/products" className="text-xs font-bold text-[#F6C94B] hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </div>
    </div>
  );
}
