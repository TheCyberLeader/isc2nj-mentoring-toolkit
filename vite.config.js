import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

export default defineConfig({
  base: '/isc2nj-mentoring-toolkit/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-404',
      closeBundle() {
        copyFileSync(
          resolve('dist/index.html'),
          resolve('dist/404.html')
        );
      },
    },
  ],
})
