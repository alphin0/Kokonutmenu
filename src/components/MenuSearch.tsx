"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isVegOnly: boolean;
  setIsVegOnly: (veg: boolean) => void;
}

export function MenuSearch({ searchQuery, setSearchQuery, isVegOnly, setIsVegOnly }: MenuSearchProps) {
  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-4">
      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-brand-mint transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for dishes..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/20 transition-all duration-300"
        />
      </div>

      {/* Filter Toggles */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsVegOnly(!isVegOnly)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border",
            isVegOnly 
              ? "bg-green-500/10 border-green-500/50 text-green-500" 
              : "bg-white/5 border-transparent text-white/40 hover:bg-white/10"
          )}
        >
          <div className={cn(
            "w-3 h-3 rounded-full border border-current flex items-center justify-center",
            isVegOnly ? "bg-green-500" : "bg-transparent"
          )}>
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
          Veg Only
        </button>
      </div>
    </div>
  );
}
