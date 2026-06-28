<template>
  <div class="bg-surface min-h-screen pb-24">
    <AppHeader show-logo show-avatar />

    <div class="px-4 pt-4">
      <h2 class="text-xl font-bold text-gray-900 mb-4">My Wishlist <span class="text-primary">({{ wishlistStore.count }})</span></h2>

      <div v-if="wishlistStore.items.length === 0" class="flex flex-col items-center justify-center py-20 gap-4">
        <Heart class="w-16 h-16 text-gray-200" />
        <p class="text-gray-400 font-medium">Your wishlist is empty</p>
        <AppButton variant="primary" @click="$router.push('/shop')">Browse Products</AppButton>
      </div>

      <div v-else class="grid grid-cols-2 gap-3">
        <ProductCard v-for="p in wishlistStore.items" :key="p.id" :product="p" />
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { Heart } from 'lucide-vue-next'
import { useWishlistStore } from '@/stores/wishlist'
import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'
import ProductCard from '@/components/ProductCard.vue'
import AppButton from '@/components/AppButton.vue'

const wishlistStore = useWishlistStore()
</script>
