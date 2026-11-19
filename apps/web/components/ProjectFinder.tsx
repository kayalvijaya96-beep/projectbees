'use client';

import React, { useState } from 'react';
import { CATALOGUE_PRODUCTS, Product } from '@/lib/products-data';
import { ProductCard } from './ProductCard';
import { Compass, Filter, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export function ProjectFinder() {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBoard, setSelectedBoard] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(1000);

  // Filter products strictly based on user selection
  const filteredProducts = CATALOGUE_PRODUCTS.filter((product) => {
    if (selectedClass !== 'all') {
      const cls = parseInt(selectedClass, 10);
      if (product.class_number !== cls) {
        // Also check if class is within class_range
        if (cls >= 8 && cls <= 10 && product.class_range === 'Class 8-10') {
          // match
        } else if (cls >= 7 && cls <= 10 && product.class_range === 'Class 7-10') {
          // match
        } else if (cls >= 9 && cls <= 10 && product.class_range === 'Class 9-10') {
          // match
        } else if (cls >= 3 && cls <= 8 && product.class_range === 'Class 3-8') {
          // match
        } else if (cls >= 9 && cls <= 12 && product.class_range === 'Class 9-12') {
          // match
        } else {
          return false;
        }
      }
    }

    if (selectedCategory !== 'all' && product.category_slug !== selectedCategory) {
      return false;
    }

    if (selectedBoard !== 'all') {
      if (!product.board.includes(selectedBoard)) {
        return false;
      }
    }

    if (product.selling_price > maxBudget) {
      return false;
    }

    return true;
  });

  const handleReset = () => {
    setSelectedClass('all');
    setSelectedCategory('all');
    setSelectedBoard('all');
    setMaxBudget(1000);
  };

  return (
    <section id="project-finder" className="rounded-3xl bg-gradient-to-br from-[#173B67] to-[#285A91] text-white p-6 sm:p-10 shadow-card">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6C94B]/20 text-[#F6C94B] border border-[#F6C94B]/30 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-white">
            Find the Perfect School Project in Seconds
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
            Answer a few quick questions to discover curriculum-tailored science models, exhibition kits, and charts that match your student’s grade and syllabus.
          </p>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 text-[#263447] shadow-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Class Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                1. Student Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#F5F8FC] text-sm font-semibold text-[#173B67] focus:outline-none focus:border-[#F6C94B]"
              >
                <option value="all">All Classes (1 to 12)</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                  <option key={c} value={c}>
                    Class {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Board Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                2. Curriculum Board
              </label>
              <select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#F5F8FC] text-sm font-semibold text-[#173B67] focus:outline-none focus:border-[#F6C94B]"
              >
                <option value="all">All Boards (CBSE &amp; ICSE)</option>
                <option value="CBSE">CBSE Board</option>
                <option value="ICSE">ICSE Board</option>
              </select>
            </div>

            {/* Category Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                3. Project Type
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#F5F8FC] text-sm font-semibold text-[#173B67] focus:outline-none focus:border-[#F6C94B]"
              >
                <option value="all">All Project Types</option>
                <option value="working-science-models">Working Science Models</option>
                <option value="still-educational-models">Still 3D Educational Models</option>
                <option value="diy-science-kits">DIY Science Kits</option>
                <option value="educational-charts">Educational Charts</option>
                <option value="school-assignment-kits">School Assignment Kits</option>
              </select>
            </div>

            {/* Budget Range Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#68778A]">
                <span>4. Max Budget</span>
                <span className="text-[#173B67] font-extrabold text-sm">₹{maxBudget}</span>
              </div>
              <input
                type="range"
                min="250"
                max="1000"
                step="50"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#F6C94B] mt-3"
              />
              <div className="flex justify-between text-[10px] text-[#68778A]">
                <span>₹250</span>
                <span>₹1000</span>
              </div>
            </div>
          </div>

          {/* Filter Status & Reset */}
          <div className="pt-2 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-[#68778A]">
              Showing <strong className="text-[#173B67]">{filteredProducts.length}</strong> matching school projects from catalogue
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-[#173B67] hover:text-[#285A91] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div>
          {filteredProducts.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white space-y-3 border border-white/10">
              <p className="text-base font-semibold">No exact matches for this criteria</p>
              <p className="text-xs text-slate-300">
                Try raising your budget or selecting &quot;All Project Types&quot; to see available options.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-[#F6C94B] text-[#173B67] rounded-xl text-xs font-bold hover:bg-[#E5B734]"
              >
                Reset All Criteria
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
