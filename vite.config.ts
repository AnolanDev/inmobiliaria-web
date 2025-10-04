import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  publicDir: 'public',
  base: './',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://app.tierrasonada.com',
        changeOrigin: true,
        secure: false,
      },
      '/storage': {
        target: 'https://app.tierrasonada.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})