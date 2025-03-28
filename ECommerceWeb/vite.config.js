import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-toastify', 'react-router-dom'], // Ensure it's included
  },
  server: { port: 5173 },
})