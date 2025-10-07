import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  publicDir: 'public',
  base: '/',
  server: {
    port: 3000,
    // Solo usar proxy en desarrollo
    ...(mode === 'development' && {
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        },
        '/storage': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        }
      }
    })
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))