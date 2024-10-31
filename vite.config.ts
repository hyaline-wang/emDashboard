import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': 'http://192.168.108.1:5000',

      // '/api': {
      //   target: 'http://192.168.108.1:5000', // 你的 API 服务器地址
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''), // 替换为更符合 Vite 的语法
      // },
    },
  },
})
