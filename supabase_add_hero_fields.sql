-- ============================================
-- HERO QISMI UCHUN YANGI USTUNLAR QO'SHISH
-- ============================================
-- Bu SQL kodini Supabase SQL Editor'da ishga tushiring
-- Settings jadvaliga Hero qismi uchun yangi ustunlar qo'shadi

-- Job title/role uchun ustun
ALTER TABLE settings 
ADD COLUMN IF NOT EXISTS job_title TEXT DEFAULT 'Software Engineer';

-- Social media links uchun ustunlar
ALTER TABLE settings 
ADD COLUMN IF NOT EXISTS youtube_url TEXT DEFAULT 'https://www.youtube.com/@asrorbektursunpulatov9833';

ALTER TABLE settings 
ADD COLUMN IF NOT EXISTS github_url TEXT DEFAULT 'https://github.com/Asrorbeck';

ALTER TABLE settings 
ADD COLUMN IF NOT EXISTS linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/asrorbek-tursunpulatov/';

ALTER TABLE settings 
ADD COLUMN IF NOT EXISTS telegram_url TEXT DEFAULT 'https://t.me/Asrorbek_10';

-- Mavjud ma'lumotlarni yangilash (agar mavjud bo'lsa)
UPDATE settings 
SET 
  job_title = COALESCE(job_title, 'Software Engineer'),
  youtube_url = COALESCE(youtube_url, 'https://www.youtube.com/@asrorbektursunpulatov9833'),
  github_url = COALESCE(github_url, 'https://github.com/Asrorbeck'),
  linkedin_url = COALESCE(linkedin_url, 'https://www.linkedin.com/in/asrorbek-tursunpulatov/'),
  telegram_url = COALESCE(telegram_url, 'https://t.me/Asrorbek_10')
WHERE id = 1;

