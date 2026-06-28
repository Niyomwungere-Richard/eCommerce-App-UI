# Stylish — Fashion E-Commerce App

Une application mobile e-commerce de mode construite comme une Progressive Web App (PWA), installable sur Android et iOS directement depuis le navigateur.

---

## Aperçu

**Stylish** est une SPA (Single Page Application) mobile-first qui couvre l'intégralité du parcours utilisateur d'une boutique de mode en ligne : splash, onboarding, authentification, catalogue, fiche produit, panier et paiement.

## Stack technique

| Technologie | Rôle |
|---|---|
| Vue 3 + `<script setup>` | Framework UI (Composition API) |
| Vite 8 | Bundler et serveur de développement |
| Vue Router 4 | Navigation SPA (mode hash) |
| Pinia | State management (panier, wishlist, utilisateur) |
| Tailwind CSS 3 | Styles utilitaires mobile-first |
| vite-plugin-pwa | Service Worker + manifest PWA |
| lucide-vue-next | Icônes |
| Poppins (Google Fonts) | Typographie |

## Fonctionnalités

- **16 écrans complets** fidèles aux maquettes
- **Authentification** — Sign In, Sign Up, Mot de passe oublié (avec validation de formulaire)
- **Onboarding** — Carrousel 3 slides avec Skip
- **Page d'accueil** — Catégories, bannières promo, deal du jour avec compte à rebours, tendances, nouveautés
- **Catalogue** — Grille produits avec tri et recherche
- **Fiche produit** — Carrousel d'images, sélecteur de taille, ajout au panier / achat immédiat
- **Wishlist** — Persistée en store Pinia
- **Panier** — Gestion des quantités, coupons, total calculé dynamiquement
- **Checkout** — Adresse de livraison, liste des articles, paiement multi-méthodes
- **Confirmation de paiement** — Modale animée avec redirection
- **PWA** — Installable, fonctionne offline, cache images et polices

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── StylishLogo.vue
│   ├── AppHeader.vue
│   ├── BottomNav.vue
│   ├── AppButton.vue
│   ├── AppInput.vue
│   ├── RatingStars.vue
│   └── ProductCard.vue
├── data/
│   └── products.json    # 16 produits mockés
├── router/
│   └── index.js         # Routes + garde d'authentification
├── stores/              # Pinia
│   ├── user.js
│   ├── cart.js
│   └── wishlist.js
└── views/
    ├── SplashView.vue
    ├── OnboardingView.vue
    ├── GetStartedView.vue
    ├── HomeView.vue
    ├── ShopView.vue
    ├── ProductDetailView.vue
    ├── WishlistView.vue
    ├── SearchView.vue
    ├── SettingsView.vue
    ├── auth/
    │   ├── SignInView.vue
    │   ├── SignUpView.vue
    │   └── ForgotPasswordView.vue
    └── checkout/
        ├── CheckoutProfileView.vue
        ├── CheckoutAddressView.vue
        ├── ShoppingBagView.vue
        └── PaymentView.vue
```

## Installation et démarrage

```bash
# Cloner le dépôt
git clone https://github.com/ton-pseudo/stylish-app.git
cd stylish-app/stylish

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
# → http://localhost:5173

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## Installer l'app sur mobile

1. `npm run build` puis déployer le dossier `dist/` sur un hébergement HTTPS (Netlify, Vercel, etc.)
2. Ouvrir l'URL sur le téléphone
3. **Android** — Chrome → menu ⋮ → *Ajouter à l'écran d'accueil*
4. **iPhone** — Safari → bouton Partager → *Sur l'écran d'accueil*

## Charte graphique

| Élément | Valeur |
|---|---|
| Couleur primaire | `#F43F5E` (rouge/rose) |
| Couleur secondaire | `#3B82F6` (bleu) |
| Fond | `#F5F5F5` |
| Police | Poppins (300 → 900) |
| Viewport de référence | 375 px |

## Auteur

Richard — [@ton-pseudo-github](https://github.com/ton-pseudo)
