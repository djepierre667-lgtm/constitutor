import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'data',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: false
  },
  preview: {
    port: 4173
  }
})
