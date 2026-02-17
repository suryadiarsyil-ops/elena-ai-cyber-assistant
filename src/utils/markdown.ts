import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked for code highlighting
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: false,
  mangle: false
});

// Custom renderer for code blocks
const renderer = new marked.Renderer();

renderer.code = (code: string, language: string | undefined) => {
  const lang = language || 'plaintext';
  const escapedCode = escapeHtml(code);
  
  return `
    <div class="code-block-wrapper">
      <div class="code-block-header">
        <span class="code-language">${lang}</span>
        <button class="copy-code-btn" onclick="copyCodeToClipboard(this)" data-code="${escapeHtml(code)}">
          <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy
        </button>
      </div>
      <pre class="language-${lang}"><code>${escapedCode}</code></pre>
    </div>
  `;
};

renderer.codespan = (code: string) => {
  return `<code class="inline-code">${escapeHtml(code)}</code>`;
};

renderer.link = (href: string, title: string | null, text: string) => {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="markdown-link" title="${title || ''}">${text}</a>`;
};

renderer.list = (body: string, ordered: boolean) => {
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag} class="markdown-list">${body}</${tag}>`;
};

renderer.listitem = (text: string) => {
  return `<li class="markdown-list-item">${text}</li>`;
};

renderer.heading = (text: string, level: number) => {
  return `<h${level} class="markdown-heading markdown-h${level}">${text}</h${level}>`;
};

renderer.blockquote = (quote: string) => {
  return `<blockquote class="markdown-blockquote">${quote}</blockquote>`;
};

renderer.table = (header: string, body: string) => {
  return `
    <div class="markdown-table-wrapper">
      <table class="markdown-table">
        <thead>${header}</thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
};

marked.use({ renderer });

export function parseMarkdown(content: string): string {
  try {
    const html = marked.parse(content) as string;
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'code', 'pre',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li',
        'blockquote',
        'a', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'div', 'span', 'button', 'svg', 'rect', 'path'
      ],
      ALLOWED_ATTR: [
        'href', 'target', 'rel', 'title', 'class', 'id',
        'src', 'alt', 'width', 'height',
        'onclick', 'data-code',
        'viewBox', 'fill', 'stroke', 'stroke-width', 'd', 'x', 'y', 'rx', 'ry'
      ]
    });
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return escapeHtml(content);
  }
}

export function extractCodeBlocks(content: string): Array<{ language: string; code: string }> {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks: Array<{ language: string; code: string }> = [];
  
  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    blocks.push({
      language: match[1] || 'plaintext',
      code: match[2].trim()
    });
  }
  
  return blocks;
}

export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function highlightCode(code: string, language: string): string {
  // Basic syntax highlighting for common languages
  // In production, use a library like highlight.js or prism.js
  
  const keywords: { [key: string]: string[] } = {
    javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export'],
    python: ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 'for', 'while', 'try', 'except'],
    bash: ['echo', 'cd', 'ls', 'pwd', 'mkdir', 'rm', 'cp', 'mv', 'grep', 'sed', 'awk', 'cat'],
    sql: ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP']
  };
  
  let highlighted = escapeHtml(code);
  
  const langKeywords = keywords[language.toLowerCase()] || [];
  langKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
  });
  
  return highlighted;
}

// Helper function to copy code (will be called from rendered HTML)
if (typeof window !== 'undefined') {
  (window as any).copyCodeToClipboard = function(button: HTMLButtonElement) {
    const code = button.getAttribute('data-code');
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = `
          <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied!
        `;
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      });
    }
  };
}
