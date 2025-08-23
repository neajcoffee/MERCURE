# 🚀 Vue 3 SaaS Boilerplate

Un boilerplate moderne et scalable pour développer des applications SaaS avec Vue.js 3, utilisant l'Options API.

## 🎯 Fonctionnalités

- ✅ **Vue 3** avec Options API
- ✅ **Vue Router** avec guards d'authentification
- ✅ **Vuex** avec modules modulaires
- ✅ **Services API** centralisés avec fetch
- ✅ **Authentification** complète (login, signup, logout)
- ✅ **Composants UI** réutilisables
- ✅ **Layout responsive** avec sidebar
- ✅ **Gestion d'état** globale et modulaire
- ✅ **Variables d'environnement** configurables
- ✅ **Architecture modulaire** et scalable

## 📁 Structure du projet

```
src/
├── assets/           # Images, icons et styles
│   └── styles/       # Styles CSS globaux
├── components/       # Composants réutilisables
│   ├── base/         # Composants de base (Button, Input...)
│   └── layout/       # Composants de layout (Header, Sidebar...)
├── views/            # Vues principales de l'application
├── router/           # Configuration Vue Router + guards
├── store/            # Vuex store avec modules
│   └── modules/      # Modules Vuex (auth, user...)
├── services/         # Services API centralisés
├── App.vue           # Composant racine
└── main.js           # Point d'entrée
```

## 🚀 Démarrage rapide

### Prérequis

- Node.js 16+ et npm/yarn
- Un serveur backend compatible (optionnel pour le développement)

### Installation

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd vue-saas-boilerplate
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configurer les variables d'environnement**
```bash
# Le fichier .env est déjà configuré avec des valeurs par défaut
# Modifiez selon vos besoins
```

4. **Lancer en mode développement**
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur `http://localhost:3000`

## 🔐 Authentification

Le boilerplate inclut un système d'authentification complet :

- **Login/Signup** avec validation
- **Guards de navigation** automatiques
- **Gestion des tokens** JWT
- **Refresh token** automatique
- **Déconnexion sécurisée**
- **Support des cookies httpOnly** ✅

### Compte de démonstration

- **Email :** `demo@example.com`
- **Mot de passe :** `demo123`

## 🍪 Configuration des Cookies httpOnly

Le frontend est configuré pour recevoir et gérer les cookies httpOnly envoyés par le backend :

### ✅ **Configuration activée :**
- `credentials: 'include'` dans toutes les requêtes fetch
- Support des cookies sécurisés (httpOnly, secure, sameSite)
- Configuration CORS compatible avec les cookies

### 🔧 **Configuration backend requise :**
```javascript
// CORS configuration (Express.js)
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true, // ✅ Essentiel pour les cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Configuration des cookies
app.use(session({
  cookie: {
    httpOnly: true,      // ✅ Sécurisé
    secure: true,        // ✅ HTTPS uniquement
    sameSite: 'strict'   // ✅ Protection CSRF
  }
}))
```

### 📁 **Fichiers de configuration :**
- `src/services/cookie.config.js` : Configuration et documentation
- `src/services/ApiService.js` : Service API avec support des cookies

## 🏗️ Architecture

### Services API

Les appels API sont centralisés dans le dossier `services/` :

- `ApiService.js` : Service de base avec gestion d'erreurs
- `AuthService.js` : Authentification et gestion des tokens
- `UserService.js` : Gestion du profil utilisateur

### Store Vuex

Le store est organisé en modules :

- `auth` : Gestion de l'authentification
- `user` : Gestion du profil et préférences

### Composants

- **Base Components** : Composants UI réutilisables (Button, Input...)
- **Layout Components** : Structure de l'application (Sidebar, Header...)

## 🎨 Composants disponibles

### BaseButton

```vue
<BaseButton variant="primary" size="medium" @click="handleClick">
  Mon bouton
</BaseButton>
```

**Props :**
- `variant` : primary, secondary, outline, ghost, danger
- `size` : small, medium, large
- `loading` : Affiche un spinner
- `disabled` : Désactive le bouton
- `block` : Bouton pleine largeur

### BaseInput

```vue
<BaseInput
  v-model="email"
  type="email"
  placeholder="Votre email"
  :error="errors.email"
  icon="✉️"
/>
```

**Props :**
- `type` : Type de l'input (text, email, password...)
- `placeholder` : Texte indicatif
- `error` : Message d'erreur à afficher
- `helper` : Texte d'aide
- `icon` : Icône à afficher
- `disabled` : Désactive l'input

## 🔧 Configuration

### Variables d'environnement

```env
# Configuration de l'application
VITE_APP_NAME=SaaS Boilerplate
VITE_APP_VERSION=1.0.0

# API Configuration  
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000

# Auth Configuration
VITE_TOKEN_STORAGE_KEY=auth_token
VITE_REFRESH_TOKEN_KEY=refresh_token
```

### Ajout d'une nouvelle route

1. Créer la vue dans `src/views/`
2. Ajouter la route dans `src/router/index.js`
3. Configurer les guards si nécessaire

### Ajout d'un nouveau service API

1. Créer le service dans `src/services/`
2. Étendre `ApiService` pour la gestion d'erreurs
3. Utiliser dans les actions Vuex

## 📱 Responsive Design

Le boilerplate est entièrement responsive avec :

- **Sidebar collapse** sur mobile
- **Navigation adaptive**
- **Grille responsive** pour les statistiques
- **Composants mobile-first**

## 🧪 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Linting
npm run lint
```

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers sont générés dans le dossier `dist/` et peuvent être déployés sur n'importe quel serveur web statique.

### Hébergement recommandé

- **Netlify** : Déploiement automatique avec GitHub
- **Vercel** : Optimisé pour les applications Vue
- **Firebase Hosting** : Intégration simple avec Firebase

## 🔄 Prochaines fonctionnalités

- [ ] Internationalisation (i18n)
- [ ] Tests unitaires avec Vitest
- [ ] PWA (Progressive Web App)
- [ ] Thème sombre/clair
- [ ] Gestion des rôles et permissions
- [ ] Upload de fichiers
- [ ] Notifications push
- [ ] Cache et offline mode

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développement** : Votre nom
- **Design** : Votre équipe design
- **Architecture** : Vue.js Community

---

**Créé avec ❤️ et Vue.js 3**
# MERCURE
