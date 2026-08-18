import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    process.env.ANALYZE && visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true, open: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react-icons')) {
            return 'icons'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer'
          }
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three') ||
            id.includes('node_modules/postprocessing') ||
            id.includes('node_modules/n8ao') ||
            id.includes('node_modules/troika') ||
            id.includes('node_modules/camera-controls') ||
            id.includes('node_modules/maath') ||
            id.includes('node_modules/meshline') ||
            id.includes('node_modules/zustand') ||
            id.includes('node_modules/its-fine') ||
            id.includes('node_modules/stats-gl') ||
            id.includes('node_modules/@monogrid')
          ) {
            return 'three'
          }
          if (id.includes('node_modules/@emailjs')) {
            return 'emailjs'
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'vendor'
          }
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
  },
})
