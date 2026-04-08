"use client";

import { Category } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CategoryBarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export function CategoryBar({ categories, activeCategory, onCategoryChange }: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToCategory = (id: string) => {
    onCategoryChange(id);
    const element = document.getElementById(`category-${id}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[73px] z-40 bg-brand-dark px-4 py-3 border-b border-white/5">
      <div 
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto no-scrollbar max-w-md mx-auto"
      >
        <button
          onClick={() => {
            onCategoryChange('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
            activeCategory === 'all'
              ? "bg-brand-mint text-brand-dark shadow-lg shadow-brand-mint/20"
              : "bg-white/5 text-white/60 hover:bg-white/10"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
              activeCategory === category.id
                ? "bg-brand-mint text-brand-dark shadow-lg shadow-brand-mint/20"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
