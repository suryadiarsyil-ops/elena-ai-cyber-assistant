# ⚡ ELENA AI - Quick Start Guide

Get ELENA AI running in 5 minutes!

## 🚀 Super Fast Setup

```bash
# 1️⃣ Install dependencies
npm install

# 2️⃣ Setup API key
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local

# 3️⃣ Start development
npm run dev
```

**🎉 Done!** Open http://localhost:5173

---

## 📝 Get Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create new key or use existing
4. Copy the key (starts with `AIza...`)

---

## 💡 First Time Using?

### Try These Commands:

```
🔍 "Explain how to perform a port scan with nmap"
🛡️ "What are the OWASP Top 10 vulnerabilities?"
💻 "Generate a Python script for subdomain enumeration"
🔐 "How does SQL injection work?"
⚡ "Create a reverse shell payload for Linux"
```

---

## 🎨 Features Overview

| Feature | Description |
|---------|-------------|
| 💬 **Chat** | AI-powered security assistant |
| 📝 **Markdown** | Rich text with code highlighting |
| 💾 **Sessions** | Save and manage conversations |
| ⚙️ **Settings** | Customize AI model and temperature |
| 📱 **Responsive** | Works on desktop and mobile |

---

## ⌨️ Keyboard Shortcuts

- `Enter` → Send message
- `Shift + Enter` → New line
- `Ctrl/Cmd + K` → Focus input (coming soon)

---

## 🛠️ Common Commands

### Start Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🐛 Troubleshooting

### ❌ "API Key Not Found"
**Fix:** Make sure `.env.local` exists with your API key

```bash
echo "VITE_GEMINI_API_KEY=your_key" > .env.local
npm run dev  # Restart server
```

### ❌ Build Errors
**Fix:** Clear and reinstall dependencies

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### ❌ Port Already in Use
**Fix:** Use different port

```bash
npm run dev -- --port 5174
```

---

## 📚 Next Steps

- 📖 Read [README.md](README.md) for detailed documentation
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options
- 🤝 See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- 🔍 Browse [CHANGELOG.md](CHANGELOG.md) for updates

---

## 💬 Need Help?

- 📧 Email: support@elena-ai.dev
- 🐛 Issues: [GitHub Issues](https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/discussions)

---

## ⚠️ Important

**ELENA is for authorized security testing only!**

✅ Educational purposes
✅ Authorized penetration testing
✅ Security research
❌ Unauthorized access
❌ Illegal activities

---

**Happy Hacking! 🎯**
