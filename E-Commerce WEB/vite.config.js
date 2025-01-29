import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["react-router-dom"],
    },
  },
  plugins: [react()],
  server:{port:5173}
})
