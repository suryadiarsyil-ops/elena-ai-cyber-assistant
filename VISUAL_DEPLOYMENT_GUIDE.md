# 📸 Visual Step-by-Step Deployment Guide

Repository: `elena-ai-cyber-assistant`
Your Live URL: `https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/`

---

## 🎯 STEP 1: Add GitHub Secret (API Key)

### 1.1 Buka Settings → Secrets
```
URL: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/settings/secrets/actions
```

### 1.2 Click "New repository secret"
```
┌─────────────────────────────────────────────┐
│  Actions secrets                            │
│  ┌──────────────────────────────────────┐  │
│  │  [New repository secret]             │  │ ← CLICK INI
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### 1.3 Fill the form
```
┌──────────────────────────────────────────────┐
│  Name *                                      │
│  ┌────────────────────────────────────────┐ │
│  │ VITE_GEMINI_API_KEY                    │ │ ← EXACTLY ini
│  └────────────────────────────────────────┘ │
│                                              │
│  Secret *                                    │
│  ┌────────────────────────────────────────┐ │
│  │ AIzaSyC...your_actual_key_here         │ │ ← API key Anda
│  └────────────────────────────────────────┘ │
│                                              │
│  [Add secret]                                │ ← CLICK
└──────────────────────────────────────────────┘
```

✅ **Result**: Secret tersimpan dengan nama `VITE_GEMINI_API_KEY`

---

## 🎯 STEP 2: Enable GitHub Pages

### 2.1 Buka Settings → Pages
```
URL: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/settings/pages
```

### 2.2 Configure Source
```
┌──────────────────────────────────────────────┐
│  Build and deployment                        │
│                                              │
│  Source                                      │
│  ┌────────────────────────────────────────┐ │
│  │ [v] GitHub Actions              [▼]   │ │ ← PILIH INI (PENTING!)
│  └────────────────────────────────────────┘ │
│                                              │
│  NOT: Deploy from a branch ❌              │
│       (jangan pilih yang ini)                │
└──────────────────────────────────────────────┘
```

✅ **Result**: Source = "GitHub Actions"

---

## 🎯 STEP 3: Upload Files ke Repository

### 3.1 Files yang perlu di-add/update:

```bash
elena-ai-cyber-assistant/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← NEW FILE (auto-deploy)
├── public/
│   └── 404.html                ← NEW FILE (SPA fix)
├── index.html                  ← UPDATED (SPA script)
├── vite.config.ts              ← UPDATED (base path)
└── ... (rest of files)
```

### 3.2 Git Commands:

```bash
# Di folder project Anda
cd elena-ai-cyber-assistant

# Check status
git status

# Add new files
git add .github/workflows/deploy.yml
git add public/404.html
git add index.html
git add vite.config.ts

# Atau add semua sekaligus
git add .

# Commit
git commit -m "Setup GitHub Pages deployment"

# Push
git push origin main
```

### 3.3 Verify Push Success:
```
┌──────────────────────────────────────────────┐
│  Enumerating objects: 5, done.               │
│  Counting objects: 100% (5/5), done.         │
│  Writing objects: 100% (3/3), 300 bytes      │
│  Total 3 (delta 2), reused 0 (delta 0)       │
│  To github.com:suryadiarsyil-ops/...         │
│     abc123..def456  main -> main             │
└──────────────────────────────────────────────┘
```

✅ **Result**: Files uploaded ke GitHub

---

## 🎯 STEP 4: Monitor Deployment

### 4.1 Buka Actions Tab
```
URL: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/actions
```

### 4.2 Watch the Workflow
```
┌────────────────────────────────────────────────────────┐
│  All workflows                                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │  🟡 Deploy to GitHub Pages                       │ │ ← Running
│  │     #1: Setup GitHub Pages deployment            │ │
│  │     suryadiarsyil-ops                             │ │
│  │     ⏱ Running for 1m 23s                         │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘

Wait 2-3 minutes...

┌────────────────────────────────────────────────────────┐
│  All workflows                                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │  ✅ Deploy to GitHub Pages                       │ │ ← Success!
│  │     #1: Setup GitHub Pages deployment            │ │
│  │     suryadiarsyil-ops                             │ │
│  │     ✓ Completed in 2m 45s                        │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### 4.3 Check Deployment Details
Click pada workflow untuk lihat detail:
```
┌────────────────────────────────────────────────────────┐
│  build                                                 │
│    ✓ Checkout                          5s             │
│    ✓ Setup Node.js                     3s             │
│    ✓ Install dependencies              45s            │
│    ✓ Build with Vite                   62s            │
│    ✓ Setup Pages                        2s             │
│    ✓ Upload artifact                    8s             │
│                                                        │
│  deploy                                                │
│    ✓ Deploy to GitHub Pages            15s            │
└────────────────────────────────────────────────────────┘
```

✅ **Result**: Deployment successful!

---

## 🎯 STEP 5: Access Your Website

### 5.1 Open Browser
```
URL: https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/
```

### 5.2 Expected Result:
```
┌──────────────────────────────────────────────────────┐
│  🛡️ ELENA AI - Cyber Security Assistant             │
│  ═══════════════════════════════════════════════════ │
│                                                       │
│  ███████╗██╗     ███████╗███╗   ██╗ █████╗          │
│  ██╔════╝██║     ██╔════╝████╗  ██║██╔══██╗         │
│  █████╗  ██║     █████╗  ██╔██╗ ██║███████║         │
│  ██╔══╝  ██║     ██╔══╝  ██║╚██╗██║██╔══██║         │
│  ███████╗███████╗███████╗██║ ╚████║██║  ██║         │
│                                                       │
│  > System Ready.                                     │
│  > Protocol ELENA Initialized.                       │
│  > Waiting for instructions...                       │
│                                                       │
│  [Type your message here...]              [Send]     │
└──────────────────────────────────────────────────────┘
```

✅ **Result**: Website LIVE dan functional!

---

## 🔍 Verification Checklist

Test setiap functionality:

```
✅ Website loads
   URL: https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/

✅ No console errors
   F12 → Console tab → No red errors

✅ Can send messages
   Type message → Click Send → AI responds

✅ Sessions save
   Create new session → Refresh page → Session still there

✅ Settings work
   Click ⚙️ icon → Settings modal opens

✅ Mobile responsive
   Resize browser or test on phone

✅ Code copy works
   AI responds with code → Click copy button → Works
```

---

## 📊 Quick Reference

### URLs untuk repository Anda:

```
Repository:
https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant

Live Website:
https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/

Actions (Deployment Status):
https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/actions

Settings → Secrets:
https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/settings/secrets/actions

Settings → Pages:
https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/settings/pages
```

---

## 🚨 Common Issues & Quick Fixes

### Issue 1: ❌ Workflow tidak muncul di Actions
```
Fix: Check file location
.github/workflows/deploy.yml  ✅ Correct
github/workflows/deploy.yml   ❌ Wrong (missing dot)
```

### Issue 2: ❌ Build failed - "API key not found"
```
Fix: Check secret name
Secret name must be EXACTLY:
VITE_GEMINI_API_KEY  ✅ Correct
Vite_Gemini_Api_Key  ❌ Wrong
```

### Issue 3: ❌ 404 Page Not Found
```
Fix: Check base path in vite.config.ts
base: '/elena-ai-cyber-assistant/'  ✅ Correct
base: '/elena-ai/'                  ❌ Wrong
```

### Issue 4: ❌ Website blank
```
Fix: Hard refresh browser
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
Or: Open in incognito mode
```

---

## 🎉 SUCCESS INDICATORS

Kalo semua berjalan lancar, Anda akan lihat:

```
✅ Green checkmark di Actions tab
✅ Website accessible tanpa error
✅ Chat functionality works perfectly  
✅ Sessions persist after refresh
✅ Settings panel functional
✅ Mobile responsive
✅ No console errors
```

---

## 📞 Next Steps After Deployment

1. **Test thoroughly**: Try all features
2. **Share URL**: `https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/`
3. **Monitor usage**: Check Google AI Studio for API usage
4. **Add features**: Develop and push updates
5. **Update docs**: Keep README.md updated

---

## 🔄 Update Workflow

Setiap push ke `main` akan otomatis trigger deployment:

```bash
# Make changes
vim src/App.tsx

# Commit & push
git add .
git commit -m "Add new feature"
git push origin main

# Auto-deploy! Check Actions tab
```

---

**Your Live URL**: https://suryadiarsyil-ops.github.io/elena-ai-cyber-assistant/

**Ready to go live! 🚀**
