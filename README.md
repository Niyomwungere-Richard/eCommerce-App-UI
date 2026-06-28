# Stylish — Fashion E-Commerce App

Application mobile e-commerce de mode, construite comme une **Progressive Web App (PWA)** installable sur Android et iOS directement depuis le navigateur.

![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38BDF8?logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-installable-F43F5E)

---

## Aperçu des écrans

| Splash / Onboarding | Authentification | Accueil | Produit |
|---|---|---|---|
| Splash, 3 slides onboarding | Sign In, Sign Up, Mot de passe oublié | Catégories, bannières, deals | Carrousel, tailles, ajout panier |

| Catalogue | Panier | Checkout | Paiement |
|---|---|---|---|
| Grille 2 colonnes, tri, recherche | Quantités, coupons, total | Adresse, récap commande | Multi-méthodes, confirmation animée |

---

## Stack technique

| Technologie | Rôle |
|---|---|
| **Vue 3** + `<script setup>` | Framework UI — Composition API |
| **Vite 8** | Bundler et serveur de développement |
| **Vue Router 4** | Navigation SPA (mode hash) |
| **Pinia** | State management — panier, wishlist, utilisateur |
| **Tailwind CSS 3** | Styles utilitaires mobile-first |
| **vite-plugin-pwa** | Service Worker + manifest PWA |
| **lucide-vue-next** | Bibliothèque d'icônes |
| **Poppins** | Typographie (Google Fonts) |

---

## Fonctionnalités

- 16 écrans complets fidèles aux maquettes
- Authentification avec validation de formulaire (email, mots de passe identiques)
- Onboarding 3 slides avec Skip
- Page d'accueil : catégories, bannières promo, deal du jour avec compte à rebours en temps réel, tendances, nouveautés
- Catalogue avec tri et recherche en temps réel
- Fiche produit : carrousel d'images, sélecteur de taille, ajout au panier / achat immédiat
- Wishlist persistée en Pinia
- Panier : gestion des quantités, coupons, total dynamique
- Checkout multi-étapes : adresse → récap → paiement
- Confirmation de paiement avec modale animée
- PWA installable, fonctionne offline, cache images Unsplash et polices
- Route guard (redirection vers Sign In si non connecté)

---

## Structure du projet

```
stylish/
├── public/
│   ├── icon-192.svg          # Icône PWA
│   ├── icon-512.svg
│   └── apple-touch-icon.svg
├── src/
│   ├── components/           # Composants réutilisables
│   │   ├── StylishLogo.vue
│   │   ├── AppHeader.vue
│   │   ├── BottomNav.vue
│   │   ├── AppButton.vue
│   │   ├── AppInput.vue
│   │   ├── RatingStars.vue
│   │   └── ProductCard.vue
│   ├── data/
│   │   └── products.json     # 16 produits mockés avec images Unsplash
│   ├── router/
│   │   └── index.js          # Routes + garde d'authentification
│   ├── stores/               # Pinia
│   │   ├── user.js
│   │   ├── cart.js
│   │   └── wishlist.js
│   └── views/
│       ├── SplashView.vue
│       ├── OnboardingView.vue
│       ├── GetStartedView.vue
│       ├── HomeView.vue
│       ├── ShopView.vue
│       ├── ProductDetailView.vue
│       ├── WishlistView.vue
│       ├── SearchView.vue
│       ├── SettingsView.vue
│       ├── auth/
│       │   ├── SignInView.vue
│       │   ├── SignUpView.vue
│       │   └── ForgotPasswordView.vue
│       └── checkout/
│           ├── CheckoutProfileView.vue
│           ├── CheckoutAddressView.vue
│           ├── ShoppingBagView.vue
│           └── PaymentView.vue
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/Niyomwungere-Richard/eCommerce-App-UI.git
cd eCommerce-App-UI/stylish

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev
# → http://localhost:5173

# 4. Build de production
npm run build

# 5. Prévisualiser le build
npm run preview
```

---

## Installer l'app sur ton téléphone

1. Déployer le dossier `stylish/dist/` sur un hébergement HTTPS (Netlify, Vercel, GitHub Pages)
2. Ouvrir l'URL sur mobile
3. **Android** — Chrome → menu ⋮ → *Ajouter à l'écran d'accueil*
4. **iPhone** — Safari → bouton Partager → *Sur l'écran d'accueil*

---

## Charte graphique

| Élément | Valeur |
|---|---|
| Couleur primaire | `#F43F5E` (rouge/rose corail) |
| Couleur secondaire | `#3B82F6` (bleu) |
| Fond | `#F5F5F5` |
| Police | Poppins 300 → 900 |
| Viewport de référence | 375 px |

---

## Auteur

**Richard Niyomwungere**
[GitHub](https://github.com/Niyomwungere-Richard)
