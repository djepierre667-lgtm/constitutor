import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  // NOTE: publicDir pointait vers 'data' (les PDF de constitutions), ce qui empêchait
  // js/app.js et js/supabase-client.js d'être copiés dans le build (dist/).
  // Les PDF ne sont pas servis par l'app (ils sont uploadés vers Supabase Storage),
  // donc on revient au comportement standard de Vite : dossier 'public/' à la racine.
  publicDir: 'public',
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
