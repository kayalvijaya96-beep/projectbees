'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { Badge, Button } from '@projectbee/ui';
import { Heart, ShoppingBag, Check, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const discountPercent = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.selling_price) / product.compare_at_price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative rounded-2xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md overflow-hidden shadow-soft hover:shadow-card-hover hover:border-[#F6C94B]/50 transition-all duration-300 flex flex-col h-full">
      {/* Product Image Container */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-4/3 w-full bg-[#0E1626] overflow-hidden border-b border-[#1E293B]">
        <Image
          src={product.image_url}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-[#173B67] text-[#F6C94B] border border-[#285A91] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wide">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-all z-10 cursor-pointer ${
            isFavorited
              ? 'bg-[#FEF2F2] text-[#DC2626] shadow-sm'
              : 'bg-[#111A2E]/80 text-[#94A3B8] hover:text-[#DC2626] hover:bg-[#1E293B] shadow-2xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button overlay on desktop */}
        {onQuickView && (
          <div className="absolute inset-0 bg-[#0B111E]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="px-3.5 py-1.5 bg-[#F6C94B] text-[#173B67] text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 hover:bg-[#E5B734] transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        )}
      </Link>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Class & Board Tags */}
          <div className="flex items-center justify-between text-xs gap-1 flex-wrap">
            <span className="bg-[#17233B] text-[#93C5FD] font-semibold text-[11px] px-2 py-0.5 rounded-md border border-[#285A91]/50">
              {product.class_range || `Class ${product.class_number}`}
            </span>
            <span className="text-[#94A3B8] text-[11px] font-medium bg-[#0E1626] px-1.5 py-0.5 rounded border border-[#1E293B]">
              {product.board}
            </span>
          </div>

          {/* Product Title */}
          <Link
            href={`/products/${product.slug}`}
            className="block font-heading font-bold text-sm sm:text-base text-white hover:text-[#F6C94B] line-clamp-2 leading-snug pt-1 transition-colors"
          >
            {product.title}
          </Link>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1.5 pt-0.5">
              <div className="flex items-center text-[#F6C94B]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold text-white ml-1">{product.rating}</span>
              </div>
              {product.reviews_count && (
                <span className="text-[11px] text-[#94A3B8]">({product.reviews_count} reviews)</span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & CTA Controls */}
        <div className="pt-3 border-t border-[#1E293B] space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-[#F6C94B]">
                ₹{product.selling_price}
              </span>
              {product.compare_at_price && (
                <span className="text-xs text-[#64748B] line-through">
                  ₹{product.compare_at_price}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-[#34D399] bg-[#064E3B]/40 px-2 py-0.5 rounded-md border border-[#059669]/30">
              100% COD
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/products/${product.slug}`}
              className="w-full text-center py-2 px-2 text-xs font-semibold text-white border border-[#334155] rounded-xl hover:bg-[#1E293B] hover:border-[#F6C94B]/40 transition-colors"
            >
              View Details
            </Link>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-2 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                added
                  ? 'bg-[#16A34A] text-white shadow-sm'
                  : 'bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734] shadow-sm'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
