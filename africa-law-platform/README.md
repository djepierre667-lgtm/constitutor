# 🇦🇴 ConstitApp — Application d'Éducation Civique pour l'Afrique

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646cff.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Powered%20by-Supabase-3ECF8E.svg)](https://supabase.com/)

**ConstitApp** est une application web mobile-first qui rend les constitutions et droits fondamentaux accessibles aux citoyens africains francophones via une approche gamifiée.

---

## ✨ Fonctionnalités

- 🎮 **Gamification** : XP, streaks, badges et niveaux pour engager les utilisateurs
- 📚 **Bibliothèque Constitutionnelle** : 10 pays africains (Sénégal, Côte d'Ivoire, Cameroun, etc.)
- ❓ **Quiz Interactifs** : Questions avec feedback pédagogique immédiat
- 🤖 **Assistant IA** : Réponses juridiques via Mistral AI (Edge Function Supabase)
- 📰 **Fil d'Actualités** : Dernières nouvelles juridiques catégorisées
- 🌙 **Mode Sombre** : Thème "cyberpunk" inclus
- 📱 **Mobile-First** : Optimisé pour smartphones
- 🔐 **Authentification** : Supabase Auth avec sécurité RLS

---

## 🚀 Démarrage Rapide

### Prérequis

- Node.js v18+ 
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/VOTRE_USERNAME/constitapp.git
cd africa-law-platform

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

---

## 📁 Structure du Projet

```
africa-law-platform/
├── css/
│   └── style.css          # Styles complets (thèmes clair/sombre)
├── js/
│   ├── app.js             # Logique métier principale
│   └── supabase-client.js # Couche de données (Supabase + IA)
├── data/
│   └── constitution/      # Fichiers JSON des constitutions
├── supabase/
│   └── functions/
│       └── mistral-proxy/ # Edge Function pour l'IA
│           └── index.ts
├── index.html             # Point d'entrée unique (SPA)
├── vite.config.js         # Configuration Vite
├── package.json           # Dépendances et scripts
├── DEPLOYMENT.md          # Guide de déploiement complet
└── README.md              # Ce fichier
```

---

## 🛠️ Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement (port 3000) |
| `npm run build` | Build de production dans `/dist` |
| `npm run preview` | Prévisualise le build en local (port 4173) |

---

## 🔧 Configuration

### Supabase

L'application utilise Supabase pour :
- Authentification utilisateurs
- Stockage des profils et scores
- Edge Functions (proxy IA)

**Variables d'environnement** (optionnel, via localStorage) :

```javascript
localStorage.setItem('constitapp_supabase_url', 'https://YOUR_PROJECT.supabase.co');
localStorage.setItem('constitapp_supabase_key', 'YOUR_ANON_KEY');
```

### Mistral AI

Pour activer l'assistant IA :

1. Créez un compte sur [Mistral AI](https://console.mistral.ai)
2. Récupérez votre clé API
3. Configurez-la dans Supabase :

```bash
supabase secrets set MISTRAL_API_KEY=votre_cle_mistral
supabase functions deploy mistral-proxy
```

---

## 🌍 Pays Supportés

- 🇸🇳 Sénégal
- 🇨🇮 Côte d'Ivoire
- 🇨🇲 Cameroun
- 🇲🇱 Mali
- 🇧🇫 Burkina Faso
- 🇹🇬 Togo
- 🇧🇯 Bénin
- 🇳🇪 Niger
- 🇬🇦 Gabon
- 🇨🇬 Congo-Brazzaville

---

## 📊 Architecture Technique

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Supabase   │────▶│  Mistral AI │
│  (Vite SPA) │     │  (Auth + DB) │     │  (Edge Fn)  │
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │
       ▼                    ▼
┌─────────────┐     ┌──────────────┐
│LocalStorage │     │  RLS Policies│
│  (Fallback) │     │  (Sécurité)  │
└─────────────┘     └──────────────┘
```

---

## 🔒 Sécurité

- **Row Level Security (RLS)** activé sur toutes les tables
- **Clé publishable** uniquement (jamais de service_role côté client)
- **Audit des prompts IA** via agent "Gardien de la Loi"
- **Disclaimer juridique** systématique

---

## 📄 License

MIT License - voir [LICENSE](LICENSE) pour plus de détails.

---

## 👥 Contributeurs

- Créé avec ❤️ pour l'éducation civique en Afrique

---

## 📞 Contact & Support

- 📧 Email : support@constitapp.africa (fictif)
- 🐛 Issues : [GitHub Issues](https://github.com/VOTRE_USERNAME/constitapp/issues)
- 📖 Documentation : Voir `DEPLOYMENT.md` pour le déploiement

---

## 🎯 Roadmap

- [ ] Version offline-first avec IndexedDB
- [ ] Traductions anglais/portugais
- [ ] Dashboard admin pour gestion de contenu
- [ ] Tests automatisés (Jest + Cypress)
- [ ] Modèle freemium avec abonnement premium

---

**⚠️ Disclaimer** : Cette application fournit des informations à titre éducatif uniquement. Elle ne constitue pas un conseil juridique professionnel. Consultez toujours un avocat qualifié pour des questions juridiques spécifiques.
