"use client";

import { motion } from "framer-motion";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-md px-4 h-16 flex items-center border-b border-white/10">
      <div className="max-w-md mx-auto w-full flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-black text-brand-mint tracking-tighter">
            Kokonut
          </span>
        </motion.div>
        
        <div className="flex items-center gap-3">
        </div>
      </div>
    </header>
  );
}
