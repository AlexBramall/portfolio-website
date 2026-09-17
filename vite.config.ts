import { copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function spaFallbackForGitHubPages(): Plugin {
  return {
    name: 'spa-fallback-github-pages',
    closeBundle() {
      const indexPath = path.resolve('dist/index.html');
      const notFoundPath = path.resolve('dist/404.html');
      if (existsSync(indexPath)) {
        copyFileSync(indexPath, notFoundPath);
      }
    },
  };
}

export default defineConfig({
  base: '/portfolio-website/',
  plugins: [react(), spaFallbackForGitHubPages()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
