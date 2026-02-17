# 🛡️ ELENA AI - Cyber Security Assistant

<div align="center">

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ███████╗██╗     ███████╗███╗   ██╗ █████╗                   ║
║   ██╔════╝██║     ██╔════╝████╗  ██║██╔══██╗                  ║
║   █████╗  ██║     █████╗  ██╔██╗ ██║███████║                  ║
║   ██╔══╝  ██║     ██╔══╝  ██║╚██╗██║██╔══██║                  ║
║   ███████╗███████╗███████╗██║ ╚████║██║  ██║                  ║
║   ╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝                  ║
║                                                               ║
║           ELITE CYBER SECURITY AI ASSISTANT                   ║
║           Elite Neural Execution & Logic Analyzer             ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

**Version 7.0.0-PRO** | Built with React 19 + Vite + Google Gemini AI

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Development](#-development) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Deployment](#-deployment)
- [Security Considerations](#-security-considerations)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

**ELENA** (Elite Neural Execution & Logic Analyzer) is an advanced AI-powered cyber security assistant designed for security professionals, penetration testers, and ethical hackers. Built with cutting-edge technology, ELENA provides intelligent assistance for:

- 🎯 Penetration Testing & Vulnerability Assessment
- 🔐 Security Operations & Incident Response
- 🕵️ OSINT & Reconnaissance
- 🛠️ Malware Analysis & Reverse Engineering
- 📊 Security Audit & Compliance
- 💻 Secure Coding & Code Review

---

## ✨ Features

### 🤖 AI-Powered Intelligence
- **Streaming Responses**: Real-time AI responses with streaming support
- **Context Awareness**: Maintains conversation context across sessions
- **Multi-Model Support**: Switch between different Gemini models
- **Customizable Temperature**: Adjust response creativity (0.0 - 2.0)

### 💬 Advanced Chat Interface
- **Markdown Support**: Rich text formatting with code highlighting
- **Code Blocks**: Syntax-highlighted code with one-click copy
- **Session Management**: Create, switch, and manage multiple chat sessions
- **Persistent Storage**: Auto-save conversations to localStorage
- **Export/Import**: Save and load chat sessions as JSON

### 🎨 Stunning UI/UX
- **Cyberpunk Aesthetic**: Terminal-inspired design with glowing effects
- **Responsive Design**: Seamless experience on desktop and mobile
- **Scanline Effect**: Authentic CRT monitor simulation
- **Smooth Animations**: Polished micro-interactions and transitions
- **Dark Theme**: Eye-friendly interface for extended use

### ⚡ Performance Optimized
- **Code Splitting**: Optimized bundle size with vendor chunks
- **Lazy Loading**: Components loaded on demand
- **Efficient Rendering**: React 19 with proper memoization
- **Fast Development**: Vite HMR for instant updates

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with Compiler optimizations
- **TypeScript 5.8** - Type-safe development
- **Vite 6** - Next-generation frontend tooling
- **Tailwind CSS 3.4** - Utility-first styling

### AI/ML
- **Google Gemini AI** - Advanced language model
  - Gemini 2.0 Flash (Fastest)
  - Gemini 1.5 Pro (Balanced)
  - Gemini 1.5 Flash (Fast)

### Libraries
- **Marked** - Markdown parsing and rendering
- **DOMPurify** - XSS protection for HTML sanitization
- **JetBrains Mono** - Premium monospace font

---

## 🚀 Installation

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **yarn** / **pnpm**)
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant.git
cd elena-ai-cyber-assistant

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.local.example .env.local

# 4. Add your Gemini API key to .env.local
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local

# 5. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini API Key (Required)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### AI Model Settings

You can customize AI behavior in the Settings panel (⚙️ icon):

- **Model Selection**: Choose between Gemini 2.0 Flash, 1.5 Pro, or 1.5 Flash
- **Temperature**: Adjust response creativity (0.0 = precise, 2.0 = creative)
- **System Prompt**: Modify the AI's personality and expertise (edit in `src/constants/index.ts`)

---

## 📖 Usage

### Basic Usage

1. **Start a Conversation**: Type your security question or command
2. **Use Markdown**: Format your messages with markdown syntax
3. **Copy Code**: Click the copy button on code blocks
4. **Create Sessions**: Start new conversations with the "+ New Sequence" button
5. **Export Chats**: Save your conversations as JSON files

### Example Queries

```
🔍 Reconnaissance
"Explain the nmap -sV -sC scan options"
"What is OSINT and how to perform passive reconnaissance?"

🛡️ Security Analysis
"Analyze this Python code for security vulnerabilities: [code]"
"What are common SQL injection attack vectors?"

🔐 Penetration Testing
"How to perform a basic web application penetration test?"
"Explain the OWASP Top 10 vulnerabilities"

💻 Tool Usage
"Generate a Metasploit payload for Windows reverse shell"
"Create a Burp Suite Intruder attack configuration"
```

### Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Ctrl/Cmd + K` - Focus input (coming soon)

---

## 📁 Project Structure

```
elena-ai-cyber-assistant/
├── src/
│   ├── components/          # React components
│   │   ├── MessageBubble.tsx
│   │   ├── Sidebar.tsx
│   │   └── Settings.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useChatManagement.ts
│   ├── services/            # API services
│   │   ├── geminiService.ts
│   │   └── storageService.ts
│   ├── types/               # TypeScript interfaces
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   └── markdown.ts
│   ├── constants/           # Constants and configs
│   │   └── index.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts        # Vite types
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind config
├── postcss.config.js        # PostCSS config
└── README.md                # This file
```

---

## 🔧 Development

### Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Adding New Features

#### 1. Create a New Component

```typescript
// src/components/YourComponent.tsx
import React from 'react';

interface YourComponentProps {
  // props interface
}

export const YourComponent: React.FC<YourComponentProps> = (props) => {
  return (
    <div>
      {/* component JSX */}
    </div>
  );
};
```

#### 2. Add New Service

```typescript
// src/services/yourService.ts
class YourService {
  // service methods
}

export const yourService = new YourService();
```

#### 3. Custom Hook

```typescript
// src/hooks/useYourHook.ts
import { useState, useEffect } from 'react';

export function useYourHook() {
  const [state, setState] = useState();
  
  // hook logic
  
  return { state, setState };
}
```

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Environment Variables

Remember to set `VITE_GEMINI_API_KEY` in your deployment platform's environment variables.

---

## 🔒 Security Considerations

### API Key Security
- ✅ Never commit `.env.local` to version control
- ✅ Use environment variables for sensitive data
- ✅ Rotate API keys regularly
- ✅ Monitor API usage and set spending limits

### Data Privacy
- 💾 Chat data stored locally in browser (localStorage)
- 🔐 No server-side storage of conversations
- 🚫 No analytics or tracking by default
- ✅ Export feature for data portability

### Content Security
- 🛡️ DOMPurify sanitizes all HTML content
- 🔒 XSS protection enabled
- ✅ Input validation on all user inputs
- 🚫 No eval() or unsafe code execution

### Ethical Usage
⚠️ **IMPORTANT**: ELENA is designed for:
- ✅ Authorized penetration testing
- ✅ Educational purposes
- ✅ Security research
- ✅ Legal security assessments

❌ **NOT for**:
- ❌ Unauthorized system access
- ❌ Illegal activities
- ❌ Malicious attacks
- ❌ Privacy violations

---

## 🐛 Troubleshooting

### Common Issues

#### API Key Not Working
```bash
# Check if key is properly set
echo $VITE_GEMINI_API_KEY

# Restart dev server after changing .env.local
npm run dev
```

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Styling Issues
```bash
# Rebuild Tailwind CSS
npm run build
```

### Getting Help

- 📖 [Documentation](https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/wiki)
- 🐛 [Report Bug](https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/issues)
- 💡 [Request Feature](https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/issues)

---

## 🗺️ Roadmap

### Phase 1: Core Enhancement ✅ (Current)
- [x] Chat persistence
- [x] Session management
- [x] Markdown support
- [x] Code highlighting
- [x] Settings panel

### Phase 2: Tools Integration 🚧 (Next)
- [ ] Port scanner UI
- [ ] CVE lookup integration
- [ ] Hash identifier
- [ ] Base64 encoder/decoder
- [ ] WHOIS lookup
- [ ] Subnet calculator

### Phase 3: Advanced AI 📋 (Planned)
- [ ] RAG (Retrieval Augmented Generation)
- [ ] File upload and analysis
- [ ] Image processing
- [ ] Custom system prompts
- [ ] Prompt templates

### Phase 4: Collaboration 🔮 (Future)
- [ ] Team sharing
- [ ] Multi-user sessions
- [ ] Backend API
- [ ] Cloud sync
- [ ] Mobile app

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👏 Acknowledgments

- **Google Gemini AI** - Powering the intelligence
- **React Team** - Amazing framework
- **Vite Team** - Lightning-fast build tool
- **Tailwind CSS** - Beautiful styling
- **Open Source Community** - Inspiration and support

---

## 📞 Contact

**Project Maintainer**: [ `suryadi` ]
- GitHub: [@suryadiarsyil-ops](https://github.com/suryadiarsyil-ops)
- Email: 

---

<div align="center">

**Made with ❤️ by the ELENA Development Team**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/issues) • [Request Feature](https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant/issues)

</div>
