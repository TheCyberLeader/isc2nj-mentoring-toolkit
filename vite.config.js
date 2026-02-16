import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/isc2nj-mentoring-toolkit/',
  plugins: [react(), tailwindcss()],
})
