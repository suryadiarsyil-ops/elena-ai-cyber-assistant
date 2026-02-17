# 🚀 GitHub Pages Deployment Setup Guide

## 📋 Prerequisites

1. GitHub repository untuk Elena AI
2. Google Gemini API key
3. GitHub account dengan Pages enabled

---

## ✅ Method 1: Automatic Deployment (Recommended)

Menggunakan GitHub Actions untuk auto-build dan deploy setiap push ke main branch.

### Step 1: Update vite.config.ts

Tambahkan `base` property untuk GitHub Pages:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/elena-ai-cyber-assistant/', // 👈 Ganti dengan nama repo Anda
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // ... rest of config
});
```

**⚠️ PENTING**: Ganti `/elena-ai-cyber-assistant/` dengan nama repository Anda!

### Step 2: Add GitHub Secret

1. Go to repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `VITE_GEMINI_API_KEY`
4. Value: Your Gemini API key (starts with `AIza...`)
5. Click **"Add secret"**

### Step 3: Enable GitHub Pages

1. Go to repository → **Settings** → **Pages**
2. Under **"Build and deployment"**:
   - Source: **GitHub Actions** (bukan "Deploy from a branch")
3. Save

### Step 4: Push Workflow File

Workflow file sudah ada di `.github/workflows/deploy.yml`

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

### Step 5: Monitor Deployment

1. Go to **Actions** tab in your repository
2. Watch the workflow run
3. When complete, your site will be at: `https://yourusername.github.io/elena-ai-cyber-assistant/`

---

## 🎯 Method 2: Manual Deployment

Jika Anda prefer manual deployment:

### Step 1: Build Locally

```bash
# Update vite.config.ts dengan base path (lihat Method 1 Step 1)

# Build project
npm run build
```

### Step 2: Push dist/ to gh-pages Branch

```bash
# Install gh-pages package
npm install -D gh-pages

# Add script to package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}

# Deploy
npm run deploy
```

### Step 3: Configure GitHub Pages

1. Go to repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **(root)**
4. Save

---

## 🔧 Troubleshooting

### Issue 1: "Failed to load module"

**Problem**: Assets not loading because of incorrect base path

**Solution**: Check `base` in vite.config.ts matches your repo name

```typescript
// If repo is: github.com/user/elena-ai
base: '/elena-ai/'  // ✅ Correct

// NOT
base: '/elena-ai-cyber-assistant/'  // ❌ Wrong if repo name is different
```

### Issue 2: "API Key not found"

**Problem**: Environment variable not set in GitHub Actions

**Solution**: 
1. Check secret name exactly matches: `VITE_GEMINI_API_KEY`
2. Verify secret is added in repository settings
3. Re-run workflow after adding secret

### Issue 3: "404 Page Not Found" on refresh

**Problem**: GitHub Pages doesn't handle SPA routing

**Solution**: Add 404.html redirect

Create `public/404.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Elena AI</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

And update `index.html`:

```html
<!-- Add this script in index.html <head> -->
<script type="text/javascript">
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

### Issue 4: Workflow fails with "Build failed"

**Problem**: Dependencies or build errors

**Solution**:
1. Test build locally: `npm run build`
2. Check all dependencies are in package.json
3. Ensure no console errors in terminal
4. Check Node version matches (18+)

### Issue 5: "Page not found" after deployment

**Problem**: Pages not enabled or wrong configuration

**Solution**:
1. Settings → Pages → Source should be "GitHub Actions"
2. Wait 2-3 minutes after workflow completes
3. Check Actions tab for successful deployment
4. Try accessing with `/` at the end: `https://user.github.io/repo/`

---

## 📊 Workflow Explained

### What the Workflow Does:

```yaml
1. Checkout code
2. Setup Node.js 18
3. Install dependencies (npm ci)
4. Build project with Vite (npm run build)
   - Uses VITE_GEMINI_API_KEY from secrets
5. Upload dist/ folder as artifact
6. Deploy to GitHub Pages
```

### Environment Variables:

```yaml
env:
  VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}
```

This injects your API key during build time (safe, not exposed in code).

---

## 🎨 Custom Domain (Optional)

### If you want custom domain like `elena-ai.com`:

1. Buy domain from registrar (Namecheap, Google Domains, etc.)

2. Add CNAME record in your DNS:
   ```
   Type: CNAME
   Name: @ (or www)
   Value: yourusername.github.io
   ```

3. In repository → Settings → Pages:
   - Custom domain: `elena-ai.com`
   - Enforce HTTPS: ✅

4. Update `vite.config.ts`:
   ```typescript
   base: '/'  // Remove /repo-name/ for custom domain
   ```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Site loads at `https://username.github.io/repo-name/`
- [ ] No console errors in browser DevTools
- [ ] Chat interface works
- [ ] Can send messages to AI
- [ ] Sessions save and load
- [ ] Settings panel works
- [ ] Mobile responsive
- [ ] All assets load (images, fonts, CSS)

---

## 🔐 Security Notes

### ✅ Safe:
- API key stored in GitHub Secrets (encrypted)
- API key injected at build time
- Not exposed in client-side code

### ⚠️ Important:
- Don't commit `.env.local` to git
- Don't hardcode API key in source code
- Rotate API key if exposed
- Monitor API usage in Google Console

---

## 📞 Need Help?

**Common Resources:**
- [GitHub Pages Docs](https://docs.github.com/pages)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

**Troubleshooting:**
- Check Actions tab for detailed logs
- Read error messages carefully
- Test build locally first
- Verify all secrets are set

---

## 🚀 Quick Deploy Commands

```bash
# Method 1: GitHub Actions (Automatic)
git add .github/workflows/deploy.yml vite.config.ts
git commit -m "Setup GitHub Pages deployment"
git push origin main

# Method 2: Manual (using gh-pages)
npm install -D gh-pages
npm run deploy

# Rebuild and redeploy
npm run build
git add dist -f  # Only if using manual method
git commit -m "Rebuild for deployment"
git push origin main
```

---

**🎉 Selamat! Elena AI sekarang bisa di-deploy ke GitHub Pages!**

**Live URL**: `https://yourusername.github.io/repo-name/`
