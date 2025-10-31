-- ============================================
-- NAVIGATION MENU ITEMS UCHUN JADVAL
-- ============================================
-- Bu SQL kodini Supabase SQL Editor'da ishga tushiring

-- Navigation items jadvali
CREATE TABLE IF NOT EXISTS navigation_items (
  id BIGSERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  target_blank BOOLEAN DEFAULT false,
  is_external BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
    
-- Trigger for updated_at
CREATE TRIGGER update_navigation_items_updated_at 
  BEFORE UPDATE ON navigation_items
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

-- Barcha userlar navigation items o'qishi mumkin
CREATE POLICY "Navigation items are viewable by everyone"
  ON navigation_items FOR SELECT
  USING (true);

-- Faqat authenticated userlar navigation items yozishi mumkin
CREATE POLICY "Navigation items can be created by authenticated users"
  ON navigation_items FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Faqat authenticated userlar navigation items yangilashi mumkin
CREATE POLICY "Navigation items can be updated by authenticated users"
  ON navigation_items FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Faqat authenticated userlar navigation items o'chirishi mumkin
CREATE POLICY "Navigation items can be deleted by authenticated users"
  ON navigation_items FOR DELETE
  USING (auth.role() = 'authenticated');

-- Initial data (optional - siz o'zingiz qo'shasiz)
-- INSERT INTO navigation_items (label, url, target_blank, is_external, order_index)
-- VALUES ('SSG', 'https://ssgroup-corp.com', true, true, 1),
--        ('Blog', '/blog', false, false, 2);

