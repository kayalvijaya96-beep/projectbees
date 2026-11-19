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
      <nav className="flex items-center gap-2 text-xs text-[#68778A]">
        <Link href="/" className="hover:text-[#173B67]">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#173B67]">Projects Catalogue</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category_slug}`} className="hover:text-[#173B67]">
          {product.category_name}
        </Link>
        <span>/</span>
        <span className="font-semibold text-[#173B67] line-clamp-1">{product.title}</span>
      </nav>

      {/* Main Product Showcase (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Product Visuals */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 w-full bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-card overflow-hidden">
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
                <span className="bg-[#173B67] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
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
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-xs transition-all z-10 cursor-pointer ${
                isFavorited
                  ? 'bg-[#FEF2F2] text-[#DC2626] shadow-sm'
                  : 'bg-white/90 text-[#68778A] hover:text-[#DC2626] shadow-2xs'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Value Assurance Badges below Image */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <Truck className="w-4 h-4 text-[#F6C94B] mx-auto" />
              <p className="text-[11px] font-bold text-[#173B67]">100% COD</p>
              <p className="text-[10px] text-[#68778A]">Pay at Doorstep</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <ShieldCheck className="w-4 h-4 text-[#F6C94B] mx-auto" />
              <p className="text-[11px] font-bold text-[#173B67]">Child-Safe</p>
              <p className="text-[10px] text-[#68778A]">Non-Toxic Parts</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <FileText className="w-4 h-4 text-[#F6C94B] mx-auto" />
              <p className="text-[11px] font-bold text-[#173B67]">Viva Pamphlet</p>
              <p className="text-[10px] text-[#68778A]">Theory &amp; Answers</p>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Product Details & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            {/* Class & Board Pills */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="bg-[#EFF6FF] text-[#1E40AF] font-bold text-xs px-3 py-1 rounded-full border border-[#BFDBFE]">
                {product.class_range || `Class ${product.class_number}`}
              </span>
              <span className="bg-[#FEFCE8] text-[#854D0E] font-semibold text-xs px-3 py-1 rounded-full border border-[#FEF08A]">
                {product.board} Aligned
              </span>
              <span className="text-[#68778A] text-xs font-mono">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#173B67] tracking-tight leading-snug">
              {product.title}
            </h1>

            {/* Ratings & Status */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center text-[#F6C94B] gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-[#263447] text-sm">{product.rating}</span>
                <span className="text-[#68778A]">({product.reviews_count} student ratings)</span>
              </div>
              <span>•</span>
              <span className="text-[#16A34A] font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock &amp; Ready to Ship
              </span>
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#68778A] leading-relaxed pt-1">
              {product.short_description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-soft space-y-4">
            <div className="flex items-baseline justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-[#68778A] uppercase font-bold tracking-wider">Total Price</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-extrabold font-heading text-[#173B67]">
                    ₹{product.selling_price}
                  </span>
                  {product.compare_at_price && (
                    <span className="text-sm sm:text-base text-[#68778A] line-through">
                      ₹{product.compare_at_price}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-[#DC2626] bg-[#FEF2F2] px-2 py-0.5 rounded-md">
                      Save ₹{product.compare_at_price! - product.selling_price} ({discountPercent}%)
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs font-bold text-[#854D0E] bg-[#FEF08A] px-2.5 py-1 rounded-lg">
                100% Cash on Delivery
              </span>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold uppercase tracking-wider text-[#68778A]">
                  Quantity:
                </label>
                <div className="flex items-center border border-[#CBD5E1] rounded-xl bg-[#F5F8FC]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-base font-bold text-[#173B67] hover:bg-white rounded-l-xl cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-extrabold text-[#173B67] bg-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-3.5 py-1.5 text-base font-bold text-[#173B67] hover:bg-white rounded-r-xl cursor-pointer"
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
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[#173B67] text-white hover:bg-[#285A91] shadow-sm transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Buy Now (COD)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Pincode Serviceability Checker */}
            <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                Check Delivery &amp; COD in Your Area
              </label>
              <form onSubmit={checkPincode} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68778A]" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit PIN Code"
                    className="w-full h-10 pl-10 pr-3 text-xs bg-[#F5F8FC] border border-[#CBD5E1] rounded-xl text-[#263447] focus:outline-none focus:border-[#F6C94B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#173B67] text-white text-xs font-bold rounded-xl hover:bg-[#285A91] cursor-pointer"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-xs font-semibold text-[#16A34A] bg-[#ECFDF5] p-2.5 rounded-lg border border-[#A7F3D0]">
                  {pincodeStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Structured Educational Tabs Section */}
      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-soft space-y-6">
        {/* Navigation Tabs Header */}
        <div className="flex border-b border-[#E2E8F0] gap-2 overflow-x-auto pb-1 text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-2.5 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#173B67] text-white shadow-2xs'
                : 'text-[#68778A] hover:bg-[#F5F8FC] hover:text-[#173B67]'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('principles')}
            className={`py-2.5 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'principles'
                ? 'bg-[#173B67] text-white shadow-2xs'
                : 'text-[#68778A] hover:bg-[#F5F8FC] hover:text-[#173B67]'
            }`}
          >
            Scientific Principles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('viva')}
            className={`py-2.5 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'viva'
                ? 'bg-[#173B67] text-white shadow-2xs'
                : 'text-[#68778A] hover:bg-[#F5F8FC] hover:text-[#173B67]'
            }`}
          >
            Viva Questions &amp; Answers
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`py-2.5 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'specs'
                ? 'bg-[#173B67] text-white shadow-2xs'
                : 'text-[#68778A] hover:bg-[#F5F8FC] hover:text-[#173B67]'
            }`}
          >
            Materials &amp; Specs
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 text-[#263447]">
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-lg text-[#173B67]">Product Overview</h3>
              <p className="text-sm text-[#68778A] leading-relaxed">
                {product.full_description || product.short_description}
              </p>
            </div>

            {product.learning_outcomes && (
              <div className="p-5 rounded-2xl bg-[#F5F8FC] border border-[#E2E8F0] space-y-3">
                <h4 className="font-heading font-bold text-sm text-[#173B67] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F6C94B]" />
                  <span>Key Learning Outcomes</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#263447]">
                  {product.learning_outcomes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
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
          <div className="space-y-4 text-[#263447]">
            <h3 className="font-heading font-bold text-lg text-[#173B67]">
              Curriculum Scientific Principles
            </h3>
            {product.scientific_principles ? (
              <div className="space-y-3">
                {product.scientific_principles.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] space-y-1"
                  >
                    <p className="font-semibold text-xs text-[#173B67]">Principle #{idx + 1}</p>
                    <p className="text-sm text-[#263447]">{principle}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#68778A]">Standard syllabus curriculum alignment.</p>
            )}
          </div>
        )}

        {/* Tab 3: Viva Questions & Answers */}
        {activeTab === 'viva' && (
          <div className="space-y-4 text-[#263447]">
            <h3 className="font-heading font-bold text-lg text-[#173B67]">
              Exhibition Viva Voce Questions &amp; Answers
            </h3>
            <p className="text-xs text-[#68778A]">
              Teachers and judges frequently ask these questions during school science fairs:
            </p>

            {product.viva_questions ? (
              <div className="space-y-3 pt-2">
                {product.viva_questions.map((viva, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-2xs space-y-2"
                  >
                    <p className="text-sm font-bold text-[#173B67]">
                      Q{idx + 1}: {viva.question}
                    </p>
                    <p className="text-xs sm:text-sm text-[#263447] bg-[#F5F8FC] p-3 rounded-lg border border-[#F1F5F9]">
                      <strong>Answer:</strong> {viva.answer}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#68778A]">Viva pamphlet included inside package.</p>
            )}
          </div>
        )}

        {/* Tab 4: Materials & Specs */}
        {activeTab === 'specs' && (
          <div className="space-y-6 text-[#263447]">
            <h3 className="font-heading font-bold text-lg text-[#173B67]">
              Materials &amp; Technical Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#68778A]">
                  Physical Dimensions
                </span>
                <p className="text-sm font-semibold text-[#173B67]">{product.dimensions || '22 x 14 x 18 cm'}</p>
                <p className="text-xs text-[#68778A]">Weight: {product.weight_grams || 380}g</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#68778A]">
                  Assembly &amp; Difficulty
                </span>
                <p className="text-sm font-semibold text-[#173B67]">
                  {product.assembly_required ? 'DIY Guided Assembly' : 'Pre-Assembled & Ready'}
                </p>
                <p className="text-xs text-[#68778A]">Difficulty level: {product.difficulty || 'Easy'}</p>
              </div>
            </div>

            {product.materials && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#68778A]">
                  Included Components &amp; Materials:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#263447]">
                  {product.materials.map((mat, i) => (
                    <li key={i} className="flex items-center gap-2 p-2 bg-[#F5F8FC] rounded-lg">
                      <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.safety_warnings && (
              <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E]">
                <strong>Child Safety Note:</strong> {product.safety_warnings}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related Products Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#173B67]">
            Related Exhibition Projects
          </h2>
          <Link href="/products" className="text-xs font-bold text-[#173B67] hover:underline">
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
