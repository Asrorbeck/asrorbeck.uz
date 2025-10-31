# GitHub Pages Deployment - Qisqa Qo'llanma

## Qadamlarni bajaring:

### 1. GitHub Secrets qo'shish

1. GitHub repository'ga o'ting
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** tugmasini bosing
4. Quyidagi 2 ta secret qo'shing:

**Secret 1:**
- Name: `REACT_APP_SUPABASE_URL`
- Value: Supabase project URL (masalan: `https://bqizqxcvioeypuljlrni.supabase.co`)

**Secret 2:**
- Name: `REACT_APP_SUPABASE_ANON_KEY`
- Value: Supabase anon public key

### 2. GitHub Pages ni sozlash

1. Repository **Settings** → **Pages** ga o'ting
2. **Source** qismida **GitHub Actions** ni tanlang
3. **Save** tugmasini bosing

### 3. Deploy qilish

`main` branch'ga push qilganda avtomatik deploy bo'ladi!

**Yoki manual deploy:**
- **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**

---

## Eslatmalar:

- `.env` fayl GitHub'ga commit qilinmaydi (xavfsizlik uchun)
- Environment variables faqat GitHub Secrets'da saqlanadi
- Local development uchun `.env` faylidan foydalaning
- Build jarayonida GitHub Secrets'dan env variables olinadi

---

Batafsil ma'lumot: `DEPLOYMENT.md` faylini ko'ring.

