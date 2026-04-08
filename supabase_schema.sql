-- Supabase Setup Script for Kokonut QR Menu
-- Please run this entire script in your Supabase SQL Editor to set up the backend.

-- 1. Create Categories Table
CREATE TABLE public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    order_index INTEGER DEFAULT 0
);

-- 2. Create Menu Items Table
CREATE TABLE public.menu_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    category_id UUID REFERENCES public.categories(id),
    image_url TEXT,
    is_veg BOOLEAN DEFAULT true,
    is_in_stock BOOLEAN DEFAULT true,
    is_recommended BOOLEAN DEFAULT false,
    is_popular BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0
);

-- 3. Enable Realtime triggers
ALTER PUBLICATION supabase_realtime ADD TABLE menu_items;
ALTER PUBLICATION supabase_realtime ADD TABLE categories;

-- 4. Set up Row Level Security (RLS) for Development (Allowing all ops for now since Auth is mock)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on menu_items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Allow anon insert on menu_items" ON public.menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update on menu_items" ON public.menu_items FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete on menu_items" ON public.menu_items FOR DELETE USING (true);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow anon insert on categories" ON public.categories FOR INSERT WITH CHECK (true);

-- 5. Create Storage Bucket for Menu Images
INSERT INTO storage.buckets (id, name, public) VALUES ('menu-images', 'menu-images', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'menu-images');
CREATE POLICY "Anon upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'menu-images');
CREATE POLICY "Anon update access" ON storage.objects FOR UPDATE USING (bucket_id = 'menu-images');
CREATE POLICY "Anon delete access" ON storage.objects FOR DELETE USING (bucket_id = 'menu-images');
