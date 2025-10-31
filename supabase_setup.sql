-- ============================================
-- SUPABASE DATABASE SETUP SQL
-- ============================================
-- Bu fayldagi barcha SQL kodlarni Supabase SQL Editor'da
-- ketma-ket ishga tushiring yoki to'liq faylni copy-paste qiling
--
-- Eslatma: Bu birinchi marta setup qilish uchun SQL kodlari
-- Agar jadvallar allaqachon mavjud bo'lsa, xatolik ko'rsatishi mumkin
-- Lekin xavfsiz - faqat yangi jadvallar va policies yaratadi

-- ============================================
-- 1. BLOG POSTS JADVALI
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  author TEXT NOT NULL DEFAULT 'Asrorbek Tursunpulatov',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- 2. SETTINGS JADVALI
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT NOT NULL DEFAULT 'Asrorbek''s Blog',
  hero_body_text TEXT NOT NULL DEFAULT 'Exploring life''s wonders, one story at a time.',
  author_name TEXT NOT NULL DEFAULT 'Asrorbek Tursunpulatov',
  job_title TEXT DEFAULT 'Software Engineer',
  email TEXT,
  youtube_url TEXT DEFAULT 'https://www.youtube.com/@asrorbektursunpulatov9833',
  github_url TEXT DEFAULT 'https://github.com/Asrorbeck',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/asrorbek-tursunpulatov/',
  telegram_url TEXT DEFAULT 'https://t.me/Asrorbek_10',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT settings_single_row CHECK (id = 1)
);

-- ============================================
-- 3. ABOUT JADVALI
-- ============================================
CREATE TABLE IF NOT EXISTS about (
  id INTEGER PRIMARY KEY DEFAULT 1,
  content TEXT NOT NULL DEFAULT '<p>Men haqimda ma''lumotlar...</p>',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT about_single_row CHECK (id = 1)
);

-- ============================================
-- 4. UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- 5. TRIGGERS
-- ============================================
-- Blog posts uchun trigger
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Settings uchun trigger
CREATE TRIGGER update_settings_updated_at 
  BEFORE UPDATE ON settings
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- About uchun trigger
CREATE TRIGGER update_about_updated_at 
  BEFORE UPDATE ON about
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Blog Posts uchun RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Barcha userlar blog postlarni o'qishi mumkin
CREATE POLICY "Blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (true);

-- Faqat authenticated userlar blog post yozishi mumkin
CREATE POLICY "Blog posts can be created by authenticated users"
  ON blog_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Faqat authenticated userlar blog post yangilashi mumkin
CREATE POLICY "Blog posts can be updated by authenticated users"
  ON blog_posts FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Faqat authenticated userlar blog post o'chirishi mumkin
CREATE POLICY "Blog posts can be deleted by authenticated users"
  ON blog_posts FOR DELETE
  USING (auth.role() = 'authenticated');

-- Settings uchun RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Barcha userlar settingsni o'qishi mumkin
CREATE POLICY "Settings are viewable by everyone"
  ON settings FOR SELECT
  USING (true);

-- Faqat authenticated userlar settingsni yangilashi mumkin
CREATE POLICY "Settings can be updated by authenticated users"
  ON settings FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Faqat authenticated userlar settings yozishi mumkin (upsert uchun)
CREATE POLICY "Settings can be inserted by authenticated users"
  ON settings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- About uchun RLS
ALTER TABLE about ENABLE ROW LEVEL SECURITY;

-- Barcha userlar about contentni o'qishi mumkin
CREATE POLICY "About is viewable by everyone"
  ON about FOR SELECT
  USING (true);

-- Faqat authenticated userlar about contentni yangilashi mumkin
CREATE POLICY "About can be updated by authenticated users"
  ON about FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Faqat authenticated userlar about content yozishi mumkin (upsert uchun)
CREATE POLICY "About can be inserted by authenticated users"
  ON about FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 7. INITIAL DATA
-- ============================================

-- Settings initial data
INSERT INTO settings (id, site_name, hero_body_text, author_name, job_title, email, youtube_url, github_url, linkedin_url, telegram_url)
VALUES (
  1, 
  'Asrorbek''s Blog', 
  'Exploring life''s wonders, one story at a time.', 
  'Asrorbek Tursunpulatov', 
  'Software Engineer',
  'asrorbek@example.com',
  'https://www.youtube.com/@asrorbektursunpulatov9833',
  'https://github.com/Asrorbeck',
  'https://www.linkedin.com/in/asrorbek-tursunpulatov/',
  'https://t.me/Asrorbek_10'
)
ON CONFLICT (id) DO NOTHING;

-- About initial data
INSERT INTO about (id, content)
VALUES (1, '<p>Men haqimda ma''lumotlar...</p>')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TUGASH
-- ============================================
-- SQL kodlar muvaffaqiyatli ishga tushirildi!
-- Endi Supabase Dashboard'da Authentication > Users bo'limida
-- admin user yarating va login qilishni boshlang.

