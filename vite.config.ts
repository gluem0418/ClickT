import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ClickT/', //追加
  plugins: [vue()],
  define: { 'process.env': {} },
  build: {
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
