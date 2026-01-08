import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separa React y dependencias de React
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }

          // Separa React Router
          if (id.includes('node_modules/react-router-dom')) {
            return 'router-vendor'
          }

          // Separa otras librerías grandes que uses (ajústalo según tu package.json)
          if (id.includes('node_modules/axios')) {
            return 'axios-vendor'
          }

          // Si usas UI libraries como Headless UI, Heroicons, etc.
          if (id.includes('node_modules/@headlessui') || id.includes('node_modules/@heroicons')) {
            return 'ui-vendor'
          }
        }
      }
    }
  },
  publicDir: 'public'
})
