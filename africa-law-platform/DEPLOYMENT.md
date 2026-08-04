# 🚀 Guide de Déploiement - ConstitApp

Ce guide vous accompagne pas à pas pour déployer ConstitApp en production.

---

## 📋 Prérequis

- Un compte [Supabase](https://supabase.com) (gratuit)
- Un compte [Mistral AI](https://console.mistral.ai) (pour l'assistant IA)
- Node.js v18+ installé localement
- Un compte [Vercel](https://vercel.com) ou [Netlify](https://netlify.com) (hébergement gratuit)

---

## 🗄️ Étape 1 : Configuration Supabase

### 1.1 Créer un projet Supabase

1. Rendez-vous sur [supabase.com](https://supabase.com)
2. Cliquez sur **"New Project"**
3. Remplissez :
   - **Name** : `constitapp`
   - **Database Password** : (génèrez un mot de passe fort)
   - **Region** : Choisissez la plus proche de votre audience (ex: Europe Frankfurt)

### 1.2 Récupérer les identifiants

Une fois le projet créé :

1. Allez dans **Settings** → **API**
2. Copiez :
   - **Project URL** : `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 1.3 Configurer l'authentification

1. Allez dans **Authentication** → **Providers**
2. Activez **Email** (cochez "Enable Email Signup")
3. Optionnel : Activez Google, GitHub, etc.

### 1.4 Créer les tables (SQL Editor)

Allez dans **SQL Editor** et exécutez :

```sql
-- Table des profils utilisateurs
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  quizzes_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des quiz complétés
CREATE TABLE quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  score INTEGER,
  total_questions INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own quiz attempts"
  ON quiz_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz attempts"
  ON quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Trigger pour créer un profil automatiquement
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## 🤖 Étape 2 : Configuration Mistral AI (Edge Function)

### 2.1 Installer Supabase CLI

```bash
npm install -g supabase
```

### 2.2 Se connecter à Supabase

```bash
supabase login
```

Suivez les instructions dans le terminal.

### 2.3 Lier le projet local

```bash
cd africa-law-platform
supabase link --project-ref iltfzevbtamnfwzdvsir
```

*(Remplacez par votre project ref)*

### 2.4 Configurer la variable d'environnement

```bash
supabase secrets set MISTRAL_API_KEY=votre_cle_mistral_ici
```

### 2.5 Déployer l'Edge Function

```bash
supabase functions deploy mistral-proxy
```

### 2.6 Récupérer l'URL de la fonction

Après déploiement, notez l'URL :
```
https://iltfzevbtamnfwzdvsir.supabase.co/functions/v1/mistral-proxy
```

---

## 🌐 Étape 3 : Déploiement Frontend (Vercel)

### 3.1 Pousser le code sur GitHub

```bash
cd /workspace/africa-law-platform
git init
git add .
git commit -m "Initial commit - ConstitApp"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/constitapp.git
git push -u origin main
```

### 3.2 Déployer sur Vercel

1. Rendez-vous sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Add New..."** → **"Project"**
3. Importez votre repository GitHub `constitapp`
4. Configurez :
   - **Framework Preset** : `Other`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

5. Cliquez sur **Deploy**

### 3.3 Variables d'environnement (optionnel)

Si vous voulez personnaliser l'URL Supabase :

Dans Vercel → Settings → Environment Variables :
- `CONSTITAPP_SUPABASE_URL` : `https://iltfzevbtamnfwzdvsir.supabase.co`
- `CONSTITAPP_SUPABASE_KEY` : `sb_publishable_dBXheWPvbgfjp7xp0-tjBA_XeOxHCGV`

---

## ⚙️ Étape 4 : Configuration Finale

### 4.1 Mettre à jour l'URL de l'Edge Function

Dans `/js/supabase-client.js`, modifiez la ligne :

```javascript
const MISTRAL_PROXY_URL = 'https://iltfzevbtamnfwzdvsir.supabase.co/functions/v1/mistral-proxy';
```

### 4.2 Tester en local

```bash
npm run dev
```

Puis ouvrez `http://localhost:3000`

### 4.3 Tester en production

Après déploiement Vercel, testez :
- ✅ Inscription/Connexion
- ✅ Quiz (gain d'XP)
- ✅ Assistant IA (réponses Mistral)
- ✅ Navigation entre écrans
- ✅ Mode sombre/clair

---

## 🔧 Dépannage

### Problème : "Clé API Mistral manquante"

→ Vérifiez que la variable `MISTRAL_API_KEY` est bien configurée :
```bash
supabase secrets list
```

### Problème : Erreur CORS

→ Assurez-vous que l'Edge Function retourne bien les headers CORS (déjà inclus dans `index.ts`)

### Problème : Authentification ne fonctionne pas

→ Vérifiez que :
1. Email Provider est activé dans Supabase
2. Les politiques RLS sont correctement configurées
3. La clé `anon` est utilisée (pas la `service_role`)

---

## 📊 URLs de Référence

| Service | URL |
|---------|-----|
| **Frontend (Production)** | `https://constitapp.vercel.app` |
| **Supabase Dashboard** | `https://app.supabase.com/project/iltfzevbtamnfwzdvsir` |
| **Edge Function** | `https://iltfzevbtamnfwzdvsir.supabase.co/functions/v1/mistral-proxy` |

---

## 💰 Coûts Estimés

| Service | Plan Gratuit | Limites |
|---------|-------------|---------|
| **Supabase** | ✅ Gratuit | 500MB DB, 50k users/mois |
| **Mistral AI** | ~$0.50/mois* | ~1000 requêtes |
| **Vercel** | ✅ Gratuit | 100GB bande passante |
| **Total** | **~$0.50/mois** | |

*Basé sur 10 utilisateurs actifs/jour posant 2 questions chacun.

---

## 🎉 Félicitations !

Votre application ConstitApp est maintenant déployée et accessible mondialement !

Prochaines étapes recommandées :
- [ ] Ajouter un nom de domaine personnalisé
- [ ] Configurer Google Analytics
- [ ] Mettre en place un système de backup Supabase
- [ ] Créer une landing page de présentation

