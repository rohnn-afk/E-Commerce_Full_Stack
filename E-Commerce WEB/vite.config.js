import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["react-toastify","react-router-dom","axios"],
    },
  },
  plugins: [react()],
  server:{port:5173}
})
