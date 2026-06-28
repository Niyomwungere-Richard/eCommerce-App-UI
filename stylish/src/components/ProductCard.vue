<template>
  <div
    @click="$router.push(`/product/${product.id}`)"
    class="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
  >
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <button
        @click.stop="wishlistStore.toggle(product)"
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
      >
        <Heart
          class="w-4 h-4 transition-colors"
          :class="wishlisted ? 'fill-primary text-primary' : 'text-gray-400'"
        />
      </button>
      <div v-if="product.discount" class="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
        {{ product.discount }}% off
      </div>
    </div>
    <div class="p-3">
      <h3 class="font-bold text-gray-900 text-sm truncate">{{ product.name }}</h3>
      <p class="text-xs text-gray-400 truncate mt-0.5">{{ product.subtitle }}</p>
      <div class="mt-1.5">
        <span class="font-bold text-gray-900 text-sm">₹{{ product.price.toLocaleString() }}</span>
        <span v-if="product.originalPrice" class="text-gray-400 text-xs line-through ml-1.5">₹{{ product.originalPrice.toLocaleString() }}</span>
      </div>
      <div class="flex items-center gap-1 mt-1">
        <RatingStars :rating="product.rating" :size="11" />
        <span class="text-gray-400 text-xs">{{ formatReviews(product.reviews) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Heart } from 'lucide-vue-next'
import { useWishlistStore } from '@/stores/wishlist'
import RatingStars from './RatingStars.vue'

const props = defineProps({
  product: { type: Object, required: true },
})

const wishlistStore = useWishlistStore()
const wishlisted = computed(() => wishlistStore.isWishlisted(props.product.id))

function formatReviews(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}
</script>
