"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { CategoryBar } from "@/components/CategoryBar";
import { MenuSearch } from "@/components/MenuSearch";
import { MenuItemCard } from "@/components/MenuItemCard";
import { MenuItem } from "@/lib/data";
import { useMenu } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Package, Loader2 } from "lucide-react";

export default function MenuPage() {
  const { menu, categories, isLoading } = useMenu();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [isVegOnly, setIsVegOnly] = useState(false);

  const filteredItems = useMemo(() => {
    return menu.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesVeg = isVegOnly ? item.is_veg : true;
      
      return matchesSearch && matchesVeg;
    }).sort((a, b) => {
      // Move out of stock to bottom
      if (a.is_in_stock === b.is_in_stock) return a.order_index - b.order_index;
      return a.is_in_stock ? -1 : 1;
    });
  }, [menu, searchQuery, isVegOnly]);

  const recommendedItems = useMemo(() => {
    return menu.filter(item => item.is_recommended && item.is_in_stock).slice(0, 3);
  }, [menu]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-mint animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-dark pb-20">
      <Navbar />
      
      <CategoryBar 
        categories={categories} 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <MenuSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isVegOnly={isVegOnly}
        setIsVegOnly={setIsVegOnly}
      />

      <div className="max-w-md mx-auto px-4 space-y-8">
        
        {/* Recommended Section */}
        {!searchQuery && !isVegOnly && recommendedItems.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-brand-mint">
              <Sparkles className="w-4 h-4 fill-brand-mint" />
              <h2 className="text-sm font-black uppercase tracking-[0.2em]">Chef's Picks</h2>
            </div>
            <div className="flex items-stretch gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-8 pt-4 snap-x">
              {recommendedItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="min-w-[280px] snap-center flex"
                  initial={{ opacity: 0.7, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ margin: "-50px" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-full flex-grow">
                    <MenuItemCard item={item} />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Categories Section */}
        <div className="space-y-12">
          {categories.map(category => {
            const categoryItems = filteredItems.filter(item => item.category_id === category.id);
            if (categoryItems.length === 0) return null;
            
            return (
              <section key={category.id} id={`category-${category.id}`} className="space-y-4 scroll-mt-24">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">
                    {category.name}
                  </h2>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    {categoryItems.length} Items
                  </span>
                </div>

                <div className="grid gap-4">
                  <AnimatePresence mode="popLayout">
                    {categoryItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            );
          })}

          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center space-y-3"
            >
              <Package className="w-12 h-12 text-white/10 mx-auto" strokeWidth={1} />
              <p className="text-white/30 text-sm font-medium tracking-wide">
                No items found matching your filters
              </p>
            </motion.div>
          )}
        </div>

        {/* Combo Highlighting Example */}
        {activeCategory === '4' && (
           <div className="bg-brand-mint/10 border border-brand-mint/20 p-4 rounded-2xl">
              <p className="text-brand-mint text-[10px] font-black uppercase tracking-widest mb-1">Limited Offer</p>
              <h4 className="text-white font-bold text-lg leading-tight">Bundle & Save</h4>
              <p className="text-white/60 text-xs mt-1">Order any combo and get 15% off on your next visit!</p>
           </div>
        )}
      </div>
    </main>
  );
}
