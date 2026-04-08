"use client";

import { useState, useEffect } from "react";
import { MenuItem, Category } from "./data";
import { createClient } from "@/utils/supabase/client";

export function useMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      const { data: catData } = await supabase.from('categories').select('*').order('order_index');
      const { data: menuData } = await supabase.from('menu_items').select('*').order('order_index');
      
      if (isMounted) {
        if (catData) setCategories(catData);
        if (menuData) setMenu(menuData);
        setIsLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const updateMenu = (newMenu: MenuItem[]) => {
    // This is kept for compatibility with existing UI optimistic updates 
    // where we don't want to refetch the entire DB.
    setMenu(newMenu);
  };

  const addCategory = async (name: string) => {
    const { data, error } = await supabase.from('categories').insert([{ name, order_index: categories.length }]).select().single();
    if (error) {
      console.error("Error adding category:", error);
      alert("Error adding category: " + error.message);
    }
    if (data) {
      setCategories([...categories, data]);
      return data.id;
    }
    return null;
  };

  const toggleItemStatus = async (id: string, field: keyof MenuItem) => {
    const item = menu.find(i => i.id === id);
    if (!item) return;
    const newValue = !item[field];
    
    // optimistic update
    setMenu(menu.map(i => i.id === id ? { ...i, [field]: newValue } : i));
    
    await supabase.from('menu_items').update({ [field]: newValue }).eq('id', id);
  };

  const addItem = async (item: Partial<MenuItem>, imageFile?: File | null) => {
    let image_url = item.image_url;
    
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const { data: uploadData, error } = await supabase.storage.from('menu-images').upload(fileName, imageFile);
      
      if (uploadData && !error) {
        const { data: publicUrlData } = supabase.storage.from('menu-images').getPublicUrl(fileName);
        image_url = publicUrlData.publicUrl;
      } else {
        console.error("Error uploading image:", error);
      }
    }

    const newItem = { ...item, image_url };
    delete newItem.id; // Let supabase generate UUID

    const { data, error } = await supabase.from('menu_items').insert([newItem]).select().single();
    if (error) {
      console.error("Supabase Insert Error:", error);
      alert("Database error: " + error.message);
    }
    if (data) {
      setMenu([...menu, data]);
    }
  };

  const updateItem = async (id: string, updates: Partial<MenuItem>, imageFile?: File | null) => {
    let image_url = updates.image_url;
    
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const { data: uploadData, error } = await supabase.storage.from('menu-images').upload(fileName, imageFile);
      
      if (uploadData && !error) {
        const { data: publicUrlData } = supabase.storage.from('menu-images').getPublicUrl(fileName);
        image_url = publicUrlData.publicUrl;
      }
    }

    const cleanUpdates = { ...updates, image_url };
    delete cleanUpdates.id;

    const { data, error } = await supabase.from('menu_items').update(cleanUpdates).eq('id', id).select().single();
    if (error) {
      console.error("Supabase Update Error:", error);
      alert("Database error: " + error.message);
    }
    if (data) {
      setMenu(menu.map(i => i.id === id ? data : i));
    }
  };

  const deleteItem = async (id: string) => {
    setMenu(menu.filter(i => i.id !== id));
    await supabase.from('menu_items').delete().eq('id', id);
  };

  return { menu, categories, isLoading, toggleItemStatus, addItem, updateItem, deleteItem, addCategory, updateMenu };
}
