# 🚀 Déploiement Rapide - ConstitApp

## Option 1 : Vercel (Recommandé - 2 minutes)

### Étapes :

1. **Pousser sur GitHub**
```bash
cd /workspace/africa-law-platform
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Déployer sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur **"Add New Project"**
   - Importez votre repo GitHub
   - Laissez les paramètres par défaut
   - Cliquez sur **"Deploy"**

3. **C'est tout !** Votre app est en ligne 🎉

URL : `https://constitapp-xxx.vercel.app`

---

## Option 2 : Netlify (3 minutes)

### Méthode A : Drag & Drop (sans Git)

1. Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. Glissez le dossier `/dist` dans la zone
3. C'est déployé !

### Méthode B : Avec Git

1. Poussez sur GitHub (comme ci-dessus)
2. Sur Netlify, cliquez sur **"Add new site"** → **"Import an existing project"**
3. Connectez GitHub et sélectionnez votre repo
4. Laissez les paramètres :
   - Build command : `npm run build`
   - Publish directory : `dist`
5. Cliquez sur **"Deploy site"**

---

## Option 3 : GitHub Pages (Gratuit - 5 minutes)

1. Installez `gh-pages` :
```bash
npm install --save-dev gh-pages
```

2. Ajoutez au `package.json` :
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Déployez :
```bash
npm run deploy
```

4. Activez GitHub Pages dans les settings du repo

URL : `https://VOTRE_USERNAME.github.io/constitapp`

---

## ⚙️ Configuration Supabase (Obligatoire)

### 1. Récupérez vos identifiants Supabase

Dans votre dashboard Supabase :
- **Settings** → **API**
- Copiez :
  - Project URL : `https://xxx.supabase.co`
  - anon/public key : `eyJhbG...`

### 2. Configurez dans l'app (localStorage)

Ouvrez la console navigateur (F12) et collez :

```javascript
localStorage.setItem('constitapp_supabase_url', 'https://VOTRE_PROJET.supabase.co');
localStorage.setItem('constitapp_supabase_key', 'VOTRE_CLE_ANON');
location.reload();
```

### 3. Exécutez le SQL pour les tables

Dans Supabase → **SQL Editor**, collez le script de `DEPLOYMENT.md` (section 1.4)

---

## 🤖 Activer l'IA Mistral (Optionnel)

1. Créez un compte sur [Mistral AI](https://console.mistral.ai)
2. Générez une API Key
3. Installez Supabase CLI :
```bash
npm install -g supabase
supabase login
```

4. Déployez l'Edge Function :
```bash
cd /workspace/africa-law-platform
supabase link --project-ref VOTRE_PROJECT_REF
supabase secrets set MISTRAL_API_KEY=votre_cle_mistral
supabase functions deploy mistral-proxy
```

---

## ✅ Checklist de Validation

Après déploiement, testez :

- [ ] La page s'affiche correctement
- [ ] Le mode sombre/clair fonctionne
- [ ] L'inscription/connexion marche
- [ ] Les quiz sont jouables
- [ ] La navigation entre écrans fonctionne
- [ ] (Optionnel) L'assistant IA répond

---

## 🆘 Problèmes Courants

### "Clé API Mistral manquante"
→ Normal si vous n'avez pas configuré Mistral. L'app utilise des réponses de fallback.

### Erreur d'authentification
→ Vérifiez que :
- Email provider est activé dans Supabase
- Les tables sont créées (voir SQL dans DEPLOYMENT.md)
- La clé anon est correcte

### Page blanche après déploiement
→ Ouvrez la console (F12) et vérifiez les erreurs. Souvent un problème de chemin de fichiers.

---

## 📊 URLs Utiles

| Service | URL |
|---------|-----|
| Vercel Dashboard | https://vercel.com/dashboard |
| Netlify Dashboard | https://app.netlify.com |
| Supabase Dashboard | https://app.supabase.com |
| Mistral Console | https://console.mistral.ai |

---

**Besoin d'aide ?** Consultez `DEPLOYMENT.md` pour le guide complet ou ouvrez une issue GitHub.
