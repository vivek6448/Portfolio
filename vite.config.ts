import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react')) {
            return 'vendor'
          }
          if (id.includes('framer-motion')) {
            return 'framer'
          }
          if (id.includes('react-icons')) {
            return 'icons'
          }
          if (id.includes('emailjs')) {
            return 'emailjs'
          }
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
  },
})
