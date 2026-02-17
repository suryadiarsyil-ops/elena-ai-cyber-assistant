# 🚀 Deployment Guide for ELENA AI

This guide covers multiple deployment options for ELENA AI Cyber Assistant.

## 📋 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [GitHub Pages](#github-pages)
- [Docker Deployment](#docker-deployment)
- [VPS Deployment](#vps-deployment)
- [Environment Variables](#environment-variables)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [x] Build completes without errors: `npm run build`
- [x] All environment variables are set
- [x] API keys are valid and have sufficient quota
- [x] Remove any debug console.logs
- [x] Test production build locally: `npm run preview`
- [x] Update README with deployment URL

---

## 🟢 Vercel Deployment

### Method 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub
4. Select your repository
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variables:
   - `VITE_GEMINI_API_KEY`: Your Gemini API key
7. Click "Deploy"

### Vercel Configuration File

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🔵 Netlify Deployment

### Method 1: Using Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login to Netlify
netlify login

# Initialize
netlify init

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Method 2: Using Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Connect to GitHub
4. Select repository
5. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
6. Add Environment Variables:
   - `VITE_GEMINI_API_KEY`: Your Gemini API key
7. Click "Deploy site"

### Netlify Configuration File

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

## 🟣 GitHub Pages

### Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        env:
          VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

**Steps:**

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Add secret `VITE_GEMINI_API_KEY` in repository secrets
4. Push to main branch
5. Wait for workflow to complete

**Update vite.config.ts for GitHub Pages:**

```typescript
export default defineConfig({
  base: '/elena-ai-cyber-assistant/', // your repo name
  // ... rest of config
});
```

---

## 🐳 Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  elena-ai:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY}
    restart: unless-stopped
```

### Commands

```bash
# Build image
docker build -t elena-ai .

# Run container
docker run -d -p 3000:80 -e VITE_GEMINI_API_KEY=your_key elena-ai

# Using docker-compose
docker-compose up -d
```

---

## 🖥️ VPS Deployment (Ubuntu)

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

### 2. Deploy Application

```bash
# Clone repository
git clone https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant.git
cd elena-ai-cyber-assistant

# Install dependencies
npm install

# Create environment file
nano .env.local
# Add: VITE_GEMINI_API_KEY=your_key

# Build
npm run build

# Serve with PM2
pm2 serve dist 3000 --name elena-ai --spa

# Save PM2 configuration
pm2 save
pm2 startup
```

### 3. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/elena-ai
```

Add configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/elena-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 🔐 Environment Variables

### Required Variables

```env
# Google Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Optional Variables

```env
# API Base URL (if using custom proxy)
VITE_API_BASE_URL=https://api.example.com

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=false

# App Configuration
VITE_APP_VERSION=7.0.0
VITE_APP_NAME="ELENA AI"
```

### Security Best Practices

1. **Never commit .env files**
   ```bash
   # Already in .gitignore
   .env
   .env.local
   .env.production
   ```

2. **Use deployment platform secrets**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - GitHub: Settings → Secrets and variables → Actions

3. **Rotate keys regularly**
   - Set calendar reminder to rotate API keys
   - Monitor API usage for anomalies

4. **Use different keys per environment**
   - Development: `.env.local`
   - Production: Deployment platform secrets
   - Testing: `.env.test`

---

## 🔍 Post-Deployment Verification

### Health Checks

```bash
# Check if site is accessible
curl -I https://your-domain.com

# Check API connection
# Open browser console and verify no errors
```

### Performance Testing

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --url=https://your-domain.com
```

### Monitoring

Set up monitoring with:

- **Uptime**: UptimeRobot, Pingdom
- **Analytics**: Google Analytics, Plausible
- **Errors**: Sentry, LogRocket
- **Performance**: Vercel Analytics, Cloudflare Analytics

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check Node version
node -v  # Should be 18+

# Check for TypeScript errors
npm run build
```

### API Key Not Working

```bash
# Verify key in build output
echo $VITE_GEMINI_API_KEY

# Check key has correct format
# Should start with: AIza...

# Test key with curl
curl -H "Content-Type: application/json" \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
     "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_KEY"
```

### 404 on Refresh

Update server config to handle SPA routing:

**Nginx:**
```nginx
try_files $uri $uri/ /index.html;
```

**Vercel:** Add `vercel.json` with rewrites

**Netlify:** Add `_redirects` file:
```
/*    /index.html   200
```

---

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment Guide](https://react.dev/learn/start-a-new-react-project#deploying-to-production)
- [Google Gemini API Docs](https://ai.google.dev/docs)

---

**Need help?** Open an issue on GitHub or check our [Troubleshooting Guide](README.md#troubleshooting).
