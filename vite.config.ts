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
        // '/api': 'http://127.0.0.1:5000',
        '/api': 'http://192.168.108.1:5000',

        '/ttyd': {
          // target: 'http://127.0.0.1:8389',
          target: 'http://192.168.108.1/ttyd/',
          changeOrigin: true,
          ws: true, // 启用 WebSocket 转发
        },
        // '/socket.io': {
        //   target: 'http://192.168.108.1:5001',
        //   changeOrigin: true,
        //   ws: true, // 开启 WebSocket 代理
        // },
      },
    },
  })
