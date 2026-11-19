'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CATALOGUE_PRODUCTS, CATEGORIES, Product } from '@/lib/products-data';
import { ProductCard } from '@/components/ProductCard';
import { ProjectFinder } from '@/components/ProjectFinder';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  BookOpen,
  ArrowUpDown,
} from 'lucide-react';

interface ProductsClientProps {
  initialParams: {
    q?: string;
    class?: string;
    class_group?: string;
    board?: string;
    category?: string;
    sort?: string;
  };
}

export function ProductsClient({ initialParams }: ProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialParams.q || '');
  const [selectedClass, setSelectedClass] = useState<string>(initialParams.class || 'all');
  const [selectedClassGroup, setSelectedClassGroup] = useState<string>(initialParams.class_group || 'all');
  const [selectedBoard, setSelectedBoard] = useState<string>(initialParams.board || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialParams.category || 'all');
  const [sortBy, setSortBy] = useState<string>(initialParams.sort || 'popular');
  const [maxPrice, setMaxPrice] = useState<number>(1200);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return CATALOGUE_PRODUCTS.filter((product) => {
      // 1. Text Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesDesc = product.short_description.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        const matchesCategory = product.category_name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesSku && !matchesCategory) {
          return false;
        }
      }

      // 2. Class Filter
      if (selectedClass !== 'all') {
        const clsNum = parseInt(selectedClass, 10);
        if (product.class_number !== clsNum) {
          // Check range
          const inRange =
            (clsNum >= 8 && clsNum <= 10 && product.class_range === 'Class 8-10') ||
            (clsNum >= 7 && clsNum <= 10 && product.class_range === 'Class 7-10') ||
            (clsNum >= 9 && clsNum <= 10 && product.class_range === 'Class 9-10') ||
            (clsNum >= 3 && clsNum <= 8 && product.class_range === 'Class 3-8') ||
            (clsNum >= 9 && clsNum <= 12 && product.class_range === 'Class 9-12');
          if (!inRange) return false;
        }
      }

      // 3. Class Group Filter (e.g. 1-4, 5-7, 8-10, 11-12)
      if (selectedClassGroup !== 'all') {
        const [min, max] = selectedClassGroup.split('-').map(Number);
        const matchGroup = product.class_number >= min && product.class_number <= max;
        if (!matchGroup) return false;
      }

      // 4. Board Filter
      if (selectedBoard !== 'all') {
        if (!product.board.toUpperCase().includes(selectedBoard.toUpperCase())) {
          return false;
        }
      }

      // 5. Category Filter
      if (selectedCategory !== 'all') {
        if (product.category_slug !== selectedCategory) {
          return false;
        }
      }

      // 6. Price Range
      if (product.selling_price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.selling_price - b.selling_price;
      }
      if (sortBy === 'price-high') {
        return b.selling_price - a.selling_price;
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      // 'popular' default
      return (b.reviews_count || 0) - (a.reviews_count || 0);
    });
  }, [searchQuery, selectedClass, selectedClassGroup, selectedBoard, selectedCategory, maxPrice, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedClass('all');
    setSelectedClassGroup('all');
    setSelectedBoard('all');
    setSelectedCategory('all');
    setMaxPrice(1200);
    setSortBy('popular');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedClass !== 'all' ||
    selectedClassGroup !== 'all' ||
    selectedBoard !== 'all' ||
    selectedCategory !== 'all' ||
    maxPrice < 1200;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="space-y-2 border-b border-[#E2E8F0] pb-6">
        <div className="flex items-center gap-2 text-xs text-[#68778A]">
          <Link href="/" className="hover:text-[#173B67]">Home</Link>
          <span>/</span>
          <span className="font-semibold text-[#173B67]">School Projects Catalogue</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#173B67] tracking-tight">
              School Science Models &amp; Project Kits
            </h1>
            <p className="text-xs sm:text-sm text-[#68778A] mt-1">
              Curriculum-aligned CBSE &amp; ICSE exhibition models, 3D educational kits, and assignment materials.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#173B67] font-bold text-sm shadow-2xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters &amp; Refine</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#F6C94B]" />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block space-y-6">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h3 className="font-heading font-bold text-sm text-[#173B67] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#F6C94B]" />
                <span>Filter Catalogue</span>
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-[#173B67] hover:text-[#285A91] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Board Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                Curriculum Board
              </label>
              <div className="flex gap-2">
                {['all', 'CBSE', 'ICSE'].map((board) => (
                  <button
                    key={board}
                    type="button"
                    onClick={() => setSelectedBoard(board)}
                    className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      selectedBoard === board
                        ? 'bg-[#173B67] text-white border-[#173B67] shadow-sm'
                        : 'bg-white text-[#263447] border-[#CBD5E1] hover:border-[#173B67]/30 hover:bg-[#F5F8FC]'
                    }`}
                  >
                    {board === 'all' ? 'All' : board}
                  </button>
                ))}
              </div>
            </div>

            {/* Class 1-12 Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                Student Class
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedClass('all')}
                  className={`col-span-4 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    selectedClass === 'all'
                      ? 'bg-[#173B67] text-white border-[#173B67]'
                      : 'bg-[#F5F8FC] text-[#263447] border-[#CBD5E1] hover:bg-white'
                  }`}
                >
                  All Classes (1 to 12)
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedClass(String(c))}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedClass === String(c)
                        ? 'bg-[#F6C94B] text-[#173B67] border-[#E5B734] font-bold shadow-2xs'
                        : 'bg-white text-[#263447] border-[#CBD5E1] hover:border-[#F6C94B] hover:bg-[#FEFCE8]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                Categories
              </label>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#EFF6FF] text-[#1E40AF] font-bold'
                      : 'text-[#263447] hover:bg-[#F5F8FC]'
                  }`}
                >
                  All Project Types
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      selectedCategory === cat.slug
                        ? 'bg-[#EFF6FF] text-[#1E40AF] font-bold'
                        : 'text-[#263447] hover:bg-[#F5F8FC]'
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#68778A]">
                <span>Max Price</span>
                <span className="text-[#173B67] font-extrabold text-sm">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#173B67]"
              />
              <div className="flex justify-between text-[10px] text-[#68778A]">
                <span>₹200</span>
                <span>₹1200</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Search, Sort bar & Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Filter Bar */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input in Grid */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68778A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models by name, topic, or keyword..."
                className="w-full h-10 pl-10 pr-4 text-xs bg-[#F5F8FC] border border-[#CBD5E1] rounded-xl text-[#263447] focus:outline-none focus:border-[#F6C94B] focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#68778A] hover:text-[#173B67]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & Count */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="text-xs text-[#68778A] whitespace-nowrap">
                <strong className="text-[#173B67]">{filteredProducts.length}</strong> items
              </span>

              <div className="flex items-center gap-1.5 text-xs text-[#68778A]">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#173B67] focus:outline-none focus:border-[#F6C94B]"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[#68778A] font-medium">Active Filters:</span>
              {selectedBoard !== 'all' && (
                <span className="bg-[#EFF6FF] text-[#1E40AF] px-2.5 py-1 rounded-lg border border-[#BFDBFE] flex items-center gap-1">
                  Board: {selectedBoard}
                  <button type="button" onClick={() => setSelectedBoard('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedClass !== 'all' && (
                <span className="bg-[#FEFCE8] text-[#854D0E] px-2.5 py-1 rounded-lg border border-[#FEF08A] flex items-center gap-1">
                  Class: {selectedClass}
                  <button type="button" onClick={() => setSelectedClass('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="bg-[#F0FDF4] text-[#166534] px-2.5 py-1 rounded-lg border border-[#BBF7D0] flex items-center gap-1">
                  Category: {CATEGORIES.find((c) => c.slug === selectedCategory)?.title || selectedCategory}
                  <button type="button" onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-[#F5F8FC] text-[#173B67] px-2.5 py-1 rounded-lg border border-[#CBD5E1] flex items-center gap-1">
                  Query: &quot;{searchQuery}&quot;
                  <button type="button" onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-bold text-[#173B67] hover:underline ml-1"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#CBD5E1] p-12 text-center space-y-4 bg-white">
              <BookOpen className="w-12 h-12 text-[#68778A] mx-auto" />
              <h3 className="font-heading font-bold text-lg text-[#173B67]">
                No matching projects found
              </h3>
              <p className="text-xs sm:text-sm text-[#68778A] max-w-sm mx-auto">
                We couldn&apos;t find any products matching your current filters. Try resetting filters or searching a different term.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-xl bg-[#F6C94B] text-[#173B67] font-bold text-xs hover:bg-[#E5B734]"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="font-heading font-bold text-base text-[#173B67]">Filter Catalogue</h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-[#68778A] hover:bg-[#F5F8FC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filters Content */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#68778A] block mb-2">Curriculum Board</label>
                <div className="flex gap-2">
                  {['all', 'CBSE', 'ICSE'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBoard(b)}
                      className={`flex-1 py-2 font-bold rounded-lg border ${
                        selectedBoard === b ? 'bg-[#173B67] text-white' : 'bg-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#68778A] block mb-2">Class (1 to 12)</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedClass(String(c))}
                      className={`py-2 rounded-lg border font-bold ${
                        selectedClass === String(c) ? 'bg-[#F6C94B] text-[#173B67]' : 'bg-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex gap-2">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="flex-1 py-3 border border-[#CBD5E1] rounded-xl font-bold text-[#173B67]"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-[#173B67] text-white rounded-xl font-bold"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
