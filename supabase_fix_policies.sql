-- ============================================
-- SUPABASE RLS POLICIES FIX
-- ============================================
-- Bu SQL kodini Supabase SQL Editor'da ishga tushiring
-- About va Settings jadvallari uchun INSERT policy qo'shish
-- (upsert operatsiyasi uchun kerak)

-- About jadvali uchun INSERT policy
CREATE POLICY "About can be inserted by authenticated users"
  ON about FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Settings jadvali uchun INSERT policy
CREATE POLICY "Settings can be inserted by authenticated users"
  ON settings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

