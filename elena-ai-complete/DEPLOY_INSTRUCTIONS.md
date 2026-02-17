# 🚀 Quick Deployment Guide - Elena AI ke GitHub Pages

Repository: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant
Live URL (setelah deploy): https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/

---

## ⚡ Setup Cepat (5 Langkah)

### 1️⃣ Add GitHub Secret untuk API Key

1. Buka: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/settings/secrets/actions
2. Click **"New repository secret"**
3. Isi form:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: `AIza...` (API key Gemini Anda)
4. Click **"Add secret"**

### 2️⃣ Enable GitHub Pages

1. Buka: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/settings/pages
2. Di bagian **"Build and deployment"**:
   - **Source**: Pilih **GitHub Actions** (bukan "Deploy from a branch")
3. Save (otomatis tersimpan)

### 3️⃣ Upload Files ke Repository

```bash
# Masuk ke folder project Anda
cd elena-ai-cyber-assistant

# Copy files yang sudah saya buat
# (dari folder elena-ai-complete yang saya berikan)

# Add files
git add .github/workflows/deploy.yml
git add public/404.html
git add vite.config.ts
git add index.html

# Commit
git commit -m "Setup GitHub Pages deployment with automated build"

# Push
git push origin main
```

### 4️⃣ Monitor Deployment

1. Buka: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/actions
2. Lihat workflow **"Deploy to GitHub Pages"** yang berjalan
3. Tunggu sampai selesai (biasanya 2-3 menit)
4. Check mark hijau ✅ = sukses!

### 5️⃣ Akses Website Anda

**Live URL**: https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/

---

## 📋 Checklist Sebelum Deploy

Pastikan files ini ada di repository Anda:

- [ ] `.github/workflows/deploy.yml` - Workflow untuk auto-deploy
- [ ] `vite.config.ts` - Sudah configured dengan base: '/elena-ai-cyber-assistant/'
- [ ] `public/404.html` - Fix SPA routing
- [ ] `index.html` - Updated dengan SPA routing script
- [ ] `.env.local.example` - Template untuk local development
- [ ] `README.md` - Documentation

---

## 🔑 GitHub Secret Configuration

**PENTING**: API Key harus ditambahkan sebagai secret!

```
Name: VITE_GEMINI_API_KEY
Value: Your Gemini API Key (starts with AIza...)
```

**Dimana mendapatkan API Key?**
1. Buka: https://makersuite.google.com/app/apikey
2. Click "Get API Key" atau "Create API Key"
3. Copy key tersebut
4. Paste di GitHub Secrets

---

## 🎯 Struktur URL

### Development (Local):
```
http://localhost:5173/
```

### Production (GitHub Pages):
```
https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/
```

**Base Path**: `/elena-ai-cyber-assistant/`

Ini sudah dikonfigurasi di `vite.config.ts`:
```typescript
base: process.env.GITHUB_PAGES === 'true' 
  ? '/elena-ai-cyber-assistant/'
  : '/',
```

---

## 🔄 Re-deploy (Update Website)

Setiap kali Anda push ke branch `main`, website akan otomatis di-rebuild dan di-deploy.

```bash
# Buat changes
# ...edit files...

# Commit dan push
git add .
git commit -m "Update feature XYZ"
git push origin main

# Otomatis deploy! Check di Actions tab
```

---

## 🐛 Troubleshooting

### ❌ "Failed to fetch" atau "API Key not found"

**Problem**: Secret tidak terset dengan benar

**Solution**:
1. Check: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/settings/secrets/actions
2. Pastikan ada secret bernama **EXACTLY**: `VITE_GEMINI_API_KEY`
3. Kalo typo atau beda nama, delete dan buat lagi
4. Re-run workflow di Actions tab

### ❌ "404 Not Found" setelah deploy

**Problem**: Base path salah atau Pages tidak enabled

**Solution**:
1. Check `vite.config.ts` → base harus: `/elena-ai-cyber-assistant/`
2. Check Settings → Pages → Source harus: **GitHub Actions**
3. Tunggu 2-3 menit setelah deployment selesai
4. Try accessing dengan trailing slash: `https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/`

### ❌ "Build failed" di Actions

**Problem**: Dependencies atau build error

**Solution**:
1. Test build locally dulu:
   ```bash
   npm install
   npm run build
   ```
2. Kalo error local, fix dulu sebelum push
3. Check error message di Actions tab → Build logs

### ❌ Website blank atau assets tidak load

**Problem**: Base path issue atau CORS

**Solution**:
1. Open browser DevTools (F12) → Console tab
2. Check error messages
3. Biasanya fix dengan:
   ```bash
   # Clear browser cache
   Ctrl + Shift + R (hard refresh)
   
   # Or access in incognito mode
   ```

### ❌ "Page not updating" setelah push changes

**Problem**: Cache atau workflow tidak running

**Solution**:
1. Check Actions tab → Pastikan workflow running
2. Hard refresh browser: `Ctrl + Shift + R`
3. Clear browser cache
4. Try incognito mode

---

## 📊 Monitoring

### Check Deployment Status:
- **Actions**: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/actions
- **Pages Settings**: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/settings/pages

### Check Website Status:
- **Live URL**: https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/
- **Browser DevTools**: F12 → Console (check for errors)
- **Network Tab**: Check if all assets load correctly

---

## 🎨 Custom Domain (Optional)

Kalo mau pake custom domain (misal: `elena-ai.com`):

### 1. Buy Domain
- Namecheap, Google Domains, dll

### 2. Add DNS Record
```
Type: CNAME
Name: @ or www
Value: suryadiarsyil-ops.github.io
```

### 3. Configure GitHub Pages
1. Settings → Pages → Custom domain
2. Enter: `elena-ai.com` atau `www.elena-ai.com`
3. Enable HTTPS ✅

### 4. Update vite.config.ts
```typescript
base: '/'  // Ganti jadi root path untuk custom domain
```

---

## 📦 Files Yang Perlu Di-commit

Pastikan files ini ada di repository:

```
elena-ai-cyber-assistant/
├── .github/
│   └── workflows/
│       └── deploy.yml          ✅ Workflow file
├── public/
│   └── 404.html                ✅ SPA routing fix
├── src/
│   └── ... (all source files)
├── index.html                  ✅ Updated with SPA script
├── vite.config.ts              ✅ Configured with base path
├── package.json
├── tsconfig.json
└── README.md
```

---

## ✅ Verification After Deploy

Setelah deploy berhasil, check:

1. **URL accessible**: https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/
2. **No console errors**: F12 → Console tab
3. **Chat works**: Test kirim message ke AI
4. **Sessions save**: Create new session, refresh, check masih ada
5. **Settings work**: Open settings panel
6. **Mobile responsive**: Test di mobile browser

---

## 🎉 Deploy Checklist

- [ ] API key added di GitHub Secrets sebagai `VITE_GEMINI_API_KEY`
- [ ] GitHub Pages enabled dengan source: **GitHub Actions**
- [ ] Files di-commit dan di-push ke `main` branch
- [ ] Workflow running di Actions tab
- [ ] Deployment success (green checkmark)
- [ ] Website accessible di URL
- [ ] Chat functionality works
- [ ] No console errors

---

## 💡 Tips

### Development vs Production

**Local Development:**
```bash
# Use .env.local for API key
echo "VITE_GEMINI_API_KEY=your_key" > .env.local
npm run dev
```

**Production (GitHub Pages):**
```bash
# API key dari GitHub Secrets
# Otomatis injected saat build
git push origin main
```

### Multiple Environments

Kalo mau test di staging dulu:

1. Create branch `develop`
2. Setup separate GitHub Pages untuk develop
3. Test di situ dulu sebelum merge ke `main`

---

## 📞 Need Help?

**GitHub Repository**: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant

**Common Links**:
- Actions: `/actions`
- Settings: `/settings`
- Pages Settings: `/settings/pages`
- Secrets: `/settings/secrets/actions`

**Kalo masih error**:
1. Check Actions logs untuk detail error
2. Test build locally dulu
3. Verify all secrets configured correctly
4. Check browser console for client-side errors

---

## 🚀 Quick Commands

```bash
# Setup once
git clone https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant.git
cd elena-ai-cyber-assistant
npm install

# Local development
echo "VITE_GEMINI_API_KEY=your_key" > .env.local
npm run dev

# Deploy (after setup GitHub Secret)
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# Check deployment
# Go to: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/actions
```

---

**🎯 Target URL**: https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/

**Ready to deploy!** 🚀
