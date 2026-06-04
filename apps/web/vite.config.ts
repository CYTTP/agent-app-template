import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@shared/main/api',
        replacement: resolve(__dirname, '../../packages/shared/src/api.ts'),
      },
      {
        find: '@shared/main/types',
        replacement: resolve(__dirname, '../../packages/shared/src/types.ts'),
      },
      {
        find: '@shared/main',
        replacement: resolve(__dirname, '../../packages/shared/src/index.ts'),
      },
    ],
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
