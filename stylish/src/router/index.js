import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  { path: '/', redirect: '/splash' },
  { path: '/splash', name: 'Splash', component: () => import('@/views/SplashView.vue') },
  { path: '/onboarding', name: 'Onboarding', component: () => import('@/views/OnboardingView.vue') },
  { path: '/get-started', name: 'GetStarted', component: () => import('@/views/GetStartedView.vue') },
  { path: '/auth/signin', name: 'SignIn', component: () => import('@/views/auth/SignInView.vue') },
  { path: '/auth/signup', name: 'SignUp', component: () => import('@/views/auth/SignUpView.vue') },
  { path: '/auth/forgot-password', name: 'ForgotPassword', component: () => import('@/views/auth/ForgotPasswordView.vue') },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/ShopView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetailView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('@/views/WishlistView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/SearchView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/checkout/ShoppingBagView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout/profile',
    name: 'CheckoutProfile',
    component: () => import('@/views/checkout/CheckoutProfileView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout/address',
    name: 'CheckoutAddress',
    component: () => import('@/views/checkout/CheckoutAddressView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout/payment',
    name: 'Payment',
    component: () => import('@/views/checkout/PaymentView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return { name: 'SignIn' }
  }
})

export default router
