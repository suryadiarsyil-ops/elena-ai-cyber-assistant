export const ASCII_BANNER = `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ███████╗██╗     ███████╗███╗   ██╗ █████╗                  ║
║   ██╔════╝██║     ██╔════╝████╗  ██║██╔══██╗                 ║
║   █████╗  ██║     █████╗  ██╔██╗ ██║███████║                 ║
║   ██╔══╝  ██║     ██╔══╝  ██║╚██╗██║██╔══██║                 ║
║   ███████╗███████╗███████╗██║ ╚████║██║  ██║                 ║
║   ╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝                 ║
║                                                               ║
║           ELITE CYBER SECURITY AI ASSISTANT                   ║
║           Master Artificial Recognition Intelligence          ║
║                                                               ║
║   Version: 7.0.0-PRO | Protocol: ACTIVE_HACKER               ║
║   Classification: TOP SECRET // EYES ONLY                     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`;

export const SYSTEM_PROMPT = `You are ELENA (Elite Neural Execution & Logic Analyzer), an advanced cyber security AI assistant with deep expertise in:

**Core Competencies:**
- Penetration Testing & Ethical Hacking
- Vulnerability Assessment & Exploitation
- Network Security & Reconnaissance
- Malware Analysis & Reverse Engineering
- Security Operations & Incident Response
- OSINT (Open Source Intelligence)
- Cryptography & Cryptanalysis
- Web Application Security
- Cloud Security Architecture

**Communication Style:**
- Provide precise, actionable insights with technical depth
- Use professional yet direct tone
- Include command examples and code snippets when relevant
- Explain both the "what" and the "why"
- Always emphasize ethical usage and legal boundaries

**Security Tools Expertise:**
- Nmap, Metasploit, Burp Suite, Wireshark
- John the Ripper, Hashcat, Hydra
- SQLMap, Nikto, OWASP ZAP
- Aircrack-ng, Kismet, Reaver
- Ghidra, IDA Pro, Radare2
- Python, Bash, PowerShell scripting

**Response Guidelines:**
1. Always consider legal and ethical implications
2. Provide step-by-step instructions when appropriate
3. Include safety warnings for dangerous operations
4. Suggest defensive measures alongside offensive techniques
5. Reference industry standards (OWASP, NIST, MITRE ATT&CK)

You operate within a secure terminal interface. Format responses with:
- Clear headers for sections
- Code blocks with syntax highlighting
- Bullet points for lists
- Warnings in UPPERCASE when critical

Remember: With great power comes great responsibility. All knowledge shared is for educational purposes and authorized security testing only.`;

export const WELCOME_MESSAGES = [
  "Neural core initialized. All systems nominal.",
  "Quantum encryption online. Secure channel established.",
  "ELENA protocol activated. Ready for deployment.",
  "Cyber defense matrix loaded. Standing by for commands.",
  "Elite mode engaged. Authorization granted."
];

export const TOOLS_DATABASE: Array<{
  id: string;
  name: string;
  description: string;
  category: string;
  command?: string;
}> = [
  {
    id: 'nmap',
    name: 'Nmap Scanner',
    description: 'Network reconnaissance and port scanning',
    category: 'reconnaissance',
    command: 'nmap -sV -sC -oN output.txt <target>'
  },
  {
    id: 'cve-lookup',
    name: 'CVE Database',
    description: 'Search Common Vulnerabilities and Exposures',
    category: 'analysis'
  },
  {
    id: 'hash-identifier',
    name: 'Hash Identifier',
    description: 'Identify hash types for cracking',
    category: 'analysis'
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode or decode Base64 strings',
    category: 'utility'
  },
  {
    id: 'whois',
    name: 'WHOIS Lookup',
    description: 'Domain registration information',
    category: 'reconnaissance'
  },
  {
    id: 'subnet-calc',
    name: 'Subnet Calculator',
    description: 'Calculate IP ranges and subnets',
    category: 'utility'
  }
];

export const QUICK_COMMANDS = [
  { label: 'Port Scan', command: '/scan <target>' },
  { label: 'CVE Lookup', command: '/cve <CVE-ID>' },
  { label: 'Hash Crack', command: '/hash <hash>' },
  { label: 'Encode', command: '/encode <text>' },
  { label: 'WHOIS', command: '/whois <domain>' }
];

export const MODELS = [
  { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash (Fast)', speed: 'fastest' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Balanced)', speed: 'balanced' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Fast)', speed: 'fast' }
];

export const ERROR_MESSAGES = {
  NO_API_KEY: '!! CRITICAL ERROR: GEMINI_API_KEY not found. Please configure your API key in .env.local',
  NETWORK_ERROR: '!! CONNECTION FAILED: Unable to reach AI neural core. Check network connection.',
  RATE_LIMIT: '!! RATE LIMIT EXCEEDED: Too many requests. Please wait before trying again.',
  INVALID_INPUT: '!! INVALID INPUT: Command not recognized. Type /help for available commands.',
  TIMEOUT: '!! REQUEST TIMEOUT: Neural core took too long to respond. Try again.'
};
