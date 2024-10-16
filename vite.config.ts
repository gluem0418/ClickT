import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import * as path from 'path';

export default defineConfig({
  base: '/ClickT/', //追加
  plugins: [vue()],
  define: { 'process.env': {} },
  build: {
    outDir: './docs',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
  },
})
