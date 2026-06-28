<template>
  <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 z-40">
    <div class="flex items-center justify-around py-2 px-2">
      <button
        v-for="item in navItems"
        :key="item.name"
        @click="navigate(item.route)"
        class="flex flex-col items-center gap-0.5 min-w-0 flex-1 py-1"
        :class="isActive(item.route) ? 'text-primary' : 'text-gray-400'"
      >
        <div class="relative">
          <component :is="item.icon" class="w-5 h-5" />
          <span
            v-if="item.badge && item.badge > 0"
            class="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none"
          >{{ item.badge > 9 ? '9+' : item.badge }}</span>
        </div>
        <span class="text-[10px] font-medium truncate">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Home, Heart, ShoppingCart, Search, Settings } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const navItems = computed(() => [
  { name: 'home', label: 'Home', icon: Home, route: '/home', badge: 0 },
  { name: 'wishlist', label: 'Wishlist', icon: Heart, route: '/wishlist', badge: wishlistStore.count },
  { name: 'cart', label: 'Cart', icon: ShoppingCart, route: '/cart', badge: cartStore.totalItems },
  { name: 'search', label: 'Search', icon: Search, route: '/search', badge: 0 },
  { name: 'settings', label: 'Setting', icon: Settings, route: '/settings', badge: 0 },
])

function isActive(navRoute) {
  return route.path === navRoute || (navRoute === '/cart' && route.path.startsWith('/checkout'))
}

function navigate(navRoute) {
  router.push(navRoute)
}
</script>
