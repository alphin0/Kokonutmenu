"use client";

import { MenuItem } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative flex gap-4 p-3 rounded-2xl bg-card-bg/50 border border-white/5 shadow-xl transition-all duration-300 h-full",
        !item.is_in_stock && "opacity-50 grayscale"
      )}
    >
      {/* Image Section - Only render if image_url exists */}
      {item.image_url && (
        <div className="relative w-28 h-28 flex-shrink-0">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover rounded-xl"
          />
          {!item.is_in_stock && (
            <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-red-500/80 px-2 py-0.5 rounded">
                Out of Stock
              </span>
            </div>
          )}
          
          {/* Diet Indicator (Over Image) */}
          <div className="absolute top-2 left-2 flex gap-1">
            <div className={cn(
              "w-3 h-3 rounded-full border border-white/40 shadow-sm flex items-center justify-center",
              item.is_veg ? "bg-green-500" : "bg-red-500"
            )}>
               <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="flex flex-col justify-between flex-grow py-1">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {!item.image_url && (
                <div className={cn(
                  "w-3 h-3 rounded-full border border-white/40 shadow-sm flex items-center justify-center flex-shrink-0",
                  item.is_veg ? "bg-green-500" : "bg-red-500"
                )}>
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              )}
              <h3 className="font-bold text-white text-base leading-tight">
                {item.name}
              </h3>
            </div>
            {item.is_recommended && (
              <span className="text-[8px] font-bold text-brand-dark bg-brand-mint px-1.5 py-0.5 rounded-full uppercase tracking-tighter ml-2 flex-shrink-0 mt-1">
                Best
              </span>
            )}
          </div>
          <p className="text-xs text-white/50 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="font-black text-brand-mint text-lg">
            ₹{item.price}
          </span>
          <button 
            disabled={!item.is_in_stock}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              item.is_in_stock 
                ? "bg-brand-mint text-brand-dark hover:scale-110 active:scale-95 shadow-lg shadow-brand-mint/20" 
                : "bg-white/5 text-white/20 cursor-not-allowed"
            )}
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
