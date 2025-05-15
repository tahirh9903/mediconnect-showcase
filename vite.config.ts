import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mediconnect-showcase/', // 👈 important for GitHub Pages
  plugins: [react()],
})
