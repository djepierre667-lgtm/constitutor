# Correctifs à appliquer sur ton repo local

Ce zip contient UNIQUEMENT les fichiers modifiés. Remplace-les dans ton clone local
de `africa-law-platform/` en gardant la même arborescence, puis supprime l'ancien
dossier `js/` à la racine (son contenu a été déplacé dans `public/js/`).

## Fichiers inclus
- `vite.config.js` — publicDir corrigé (`data` → `public`), ce qui permettait à
  js/app.js et js/supabase-client.js de ne jamais être inclus dans le build.
- `index.html` — chemins des <script> passés en absolu (`/js/...`).
- `public/js/app.js` et `public/js/supabase-client.js` — déplacés depuis `js/`,
  + correction de `dbGetCountries()` (table `countries` → `pays`, la vraie table
  active dans Supabase) et de `dbGetConstitutions()` (table `constitutions` →
  nouvelle table `constitution_articles`, créée côté Supabase pour matcher le
  format {art, txt} attendu par l'app).

## Étapes exactes

```bash
# Depuis la racine de ton clone local du repo
cd africa-law-platform

# 1. Supprime l'ancien dossier js/ (remplacé par public/js/)
rm -rf js

# 2. Copie les fichiers de ce zip par-dessus (écrase vite.config.js et index.html,
#    crée public/js/app.js et public/js/supabase-client.js)
#    -> fais-le manuellement dans ton éditeur, ou :
#    cp -r /chemin/vers/patch/* .

# 3. Vérifie que le build fonctionne
npm install
npm run build

# 4. Vérifie que ces fichiers existent bien dans dist/
ls dist/js/app.js dist/js/supabase-client.js

# 5. Commit et push
git add .
git commit -m "fix: build Vite (publicDir), table pays au lieu de countries, nouvelle table constitution_articles"
git push
```

Une fois poussé, le déploiement Vercel se déclenche automatiquement (repo déjà lié).
Préviens-moi, je vérifie immédiatement en live.

## Table Supabase créée : constitution_articles

Elle est vide pour l'instant (comme tout le reste de la base). Pour que la
Bibliothèque affiche du vrai contenu (au lieu du fallback codé en dur sur 3 pays),
il faudra y insérer des lignes {country_code, article_title, article_text,
sort_order} — un prochain chantier, pas bloquant pour que l'app fonctionne.
