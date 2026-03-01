import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const basePath = process.env.BASE_PATH || ''

export default defineConfig({
  root: 'src',
  base: basePath,
  build: {
    outDir: '../dist',
  },
  plugins: [tailwindcss()],
})
