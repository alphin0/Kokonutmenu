"use client";

import { useState } from "react";
import { MenuItem, MOCK_CATEGORIES } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { useMenu } from "@/lib/store";
import { Plus, Edit2, Eye, EyeOff, Star, Trash, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { menu, categories, isLoading, toggleItemStatus, deleteItem, addItem, updateItem, updateMenu, addCategory } = useMenu();
  
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({ 
    name: '', description: '', price: 0, category_id: categories.length > 0 ? categories[0].id : '', 
    image_url: '', 
    is_veg: true, is_recommended: false 
  });
  
  const [newCatName, setNewCatName] = useState("");
  const [isAddingCat, setIsAddingCat] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-card-bg p-8 rounded-3xl shadow-2xl border border-white/5 box-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-brand-mint mb-2">Kokonut Admin</h1>
            <p className="text-white/40 text-sm">Enter password to manage menu</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-mint"
            />
            <button className="w-full bg-brand-mint text-brand-dark font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">Menu Management</h1>
            <p className="text-white/40 text-sm">Manage items, stock, and visibility</p>
          </div>
          <button 
            onClick={() => {
              setEditingId(null);
              setIsAddingItem(!isAddingItem);
              setNewItem({ 
                name: '', description: '', price: 0, category_id: categories[0]?.id || '', 
                image_url: '', 
                is_veg: true, is_recommended: false 
              });
            }}
            className="bg-brand-mint text-brand-dark px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm"
          >
            <Plus size={18} /> <span className="hidden sm:inline">{isAddingItem && !editingId ? "Cancel" : "Add Item"}</span>
          </button>
        </div>

        {(isAddingItem || editingId) && (
          <div className="bg-card-bg/40 border border-brand-mint/50 p-6 rounded-3xl mb-8 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-brand-mint font-black">{editingId ? "Edit Item" : "Add New Item"}</h2>
              <button onClick={() => { setIsAddingItem(false); setEditingId(null); }} className="text-white/40 hover:text-white">Cancel</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Item Name" value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-mint"
              />
              <input 
                type="number" placeholder="Price" value={newItem.price || ''}
                onChange={e => setNewItem({...newItem, price: Number(e.target.value)})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-mint"
              />
              <textarea 
                placeholder="Description (Optional)" value={newItem.description}
                onChange={e => setNewItem({...newItem, description: e.target.value})}
                className="col-span-1 md:col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-mint min-h-[100px]"
              />
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-white/40 text-sm">{imageFile ? imageFile.name : (newItem.image_url ? 'Has image attached' : 'Upload Image (Optional)')}</span>
                <label className="bg-brand-mint/20 text-brand-mint px-3 py-1 rounded text-xs font-bold cursor-pointer hover:bg-brand-mint/30">
                  BROWSE
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => e.target.files && setImageFile(e.target.files[0])}
                    className="hidden" 
                  />
                </label>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex flex-col gap-2">
                {isAddingCat ? (
                  <div className="flex items-center gap-2">
                    <input type="text" value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="New Category Name" className="flex-1 bg-brand-dark px-2 py-1 text-sm text-white border border-white/10 rounded focus:outline-none focus:border-brand-mint"/>
                    <button onClick={async () => {
                      if(newCatName.trim()) {
                        const id = await addCategory(newCatName.trim());
                        if (id) setNewItem({...newItem, category_id: id});
                        setNewCatName("");
                        setIsAddingCat(false);
                      }
                    }} className="text-brand-mint text-sm font-bold">Add</button>
                    <button onClick={() => setIsAddingCat(false)} className="text-red-400 text-sm font-bold">Cancel</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <select 
                      value={newItem.category_id}
                      onChange={e => setNewItem({...newItem, category_id: e.target.value})}
                      className="flex-1 bg-transparent text-white focus:outline-none"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id} className="bg-brand-dark">{c.name}</option>
                      ))}
                    </select>
                    <button onClick={() => setIsAddingCat(true)} className="text-[10px] bg-brand-mint/20 text-brand-mint px-2 py-1 rounded font-bold uppercase tracking-wider">New</button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <label className="text-white text-sm">Type:</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={newItem.is_veg} onChange={() => setNewItem({...newItem, is_veg: true})} name="type" />
                    <span className="text-green-500 text-sm font-bold">Veg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={!newItem.is_veg} onChange={() => setNewItem({...newItem, is_veg: false})} name="type" />
                    <span className="text-red-500 text-sm font-bold">Non-Veg</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                 <input type="checkbox" id="recommend" checked={newItem.is_recommended} onChange={e => setNewItem({...newItem, is_recommended: e.target.checked})} className="w-4 h-4 accent-brand-mint" />
                 <label htmlFor="recommend" className="text-brand-mint font-bold text-sm tracking-wide">Chef's Pick / Recommended</label>
              </div>
            </div>
            <button 
              onClick={async () => {
                if (!newItem.name || !newItem.price) return;
                
                if (editingId) {
                   await updateItem(editingId, newItem, imageFile);
                } else {
                  const item: Partial<MenuItem> = {
                    name: newItem.name || '',
                    description: newItem.description || '',
                    price: newItem.price || 0,
                    category_id: newItem.category_id || categories[0]?.id || '',
                    image_url: newItem.image_url || '',
                    is_veg: newItem.is_veg ?? true,
                    is_in_stock: true,
                    is_recommended: newItem.is_recommended ?? false,
                    is_popular: false,
                    order_index: menu.length,
                  };
                  await addItem(item, imageFile);
                }
                
                setIsAddingItem(false);
                setEditingId(null);
                setImageFile(null);
              }}
              className="w-full bg-brand-mint text-brand-dark py-3 rounded-xl font-black hover:scale-[1.01] transition-transform shadow-[0_0_20px_rgba(116,198,157,0.3)] flex justify-center items-center gap-2"
            >
              {editingId ? "Update Item" : "Save Item"} 
              {isLoading && <span className="animate-pulse">...</span>}
            </button>
          </div>
        )}

        <div className="grid gap-4">
          {menu.map((item) => (
            <div key={item.id} className="bg-card-bg/40 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
              <div className="relative w-16 h-16 flex-shrink-0 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                {item.image_url && typeof item.image_url === 'string' && item.image_url.trim() !== '' ? (
                  <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                ) : (
                  <Package className="w-6 h-6 text-white/10" />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-white text-sm">{item.name}</h3>
                <p className="text-brand-mint font-black text-xs">₹{item.price}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Stock Toggle */}
                <button 
                  onClick={() => toggleItemStatus(item.id, 'is_in_stock')}
                  className={cn(
                    "p-2 rounded-lg transition-colors border",
                    item.is_in_stock ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-red-500/10 border-red-500/20 text-red-500"
                  )}
                  title={item.is_in_stock ? "In Stock" : "Out of Stock"}
                >
                  {item.is_in_stock ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>

                {/* Recommended Toggle */}
                <button 
                  onClick={() => toggleItemStatus(item.id, 'is_recommended')}
                  className={cn(
                    "p-2 rounded-lg transition-colors border",
                    item.is_recommended ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-500" : "bg-white/5 border-white/10 text-white/20"
                  )}
                  title="Recommended"
                >
                  <Star size={16} fill={item.is_recommended ? "currentColor" : "none"} />
                </button>

                {/* Actions */}
                <button 
                  onClick={() => { setIsAddingItem(false); setEditingId(item.id); setNewItem(item); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this item?")) {
                      deleteItem(item.id);
                    }
                  }}
                  className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500 hover:text-white"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
