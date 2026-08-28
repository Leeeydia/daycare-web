import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    rollupOptions: {
      output: {
        // 초기 로딩 부담을 줄이기 위해 큰 라이브러리를 별도 청크로 분리
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          swiper: ['swiper', 'swiper/react'],
          motion: ['framer-motion'],
          form: ['react-hook-form', 'zod', '@hookform/resolvers/zod'],
        },
      },
    },
  },
  server: {
    port: 5173,
    // 백엔드(Spring Boot) 연동 시 사용 — Phase 2
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
})
