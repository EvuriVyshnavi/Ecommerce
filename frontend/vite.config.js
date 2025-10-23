import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Port fixed at 5173
    port: 5173,
    proxy: {
      // 1. Proxy API requests
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },

      // 2. Proxy image requests to backend
      '/images': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    }
  }
})
