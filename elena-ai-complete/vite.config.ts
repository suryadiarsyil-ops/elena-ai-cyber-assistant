import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages deployment base path
  // Repository: https://github.com/suryadiarsyil-ops/elena-ai-cyber-assistant
  base: process.env.GITHUB_PAGES === 'true' 
    ? '/elena-ai-cyber-assistant/'  // ✅ Configured for your repo
    : '/',
  
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  server: {
    port: 5173,
    host: true
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ai-vendor': ['@google/generative-ai'],
          'markdown-vendor': ['marked', 'dompurify']
        }
      }
    }
  }
});
