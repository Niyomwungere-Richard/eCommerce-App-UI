<template>
  <div class="bg-white min-h-screen pb-28">
    <!-- Top bar -->
    <div class="flex items-center justify-between px-4 py-3 sticky top-0 bg-white z-20">
      <button @click="$router.back()" class="p-1"><ArrowLeft class="w-6 h-6 text-gray-700" /></button>
      <button @click="$router.push('/cart')" class="relative p-1">
        <ShoppingCart class="w-6 h-6 text-gray-700" />
        <span v-if="cartStore.totalItems" class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
          {{ cartStore.totalItems }}
        </span>
      </button>
    </div>

    <template v-if="product">
      <!-- Image carousel -->
      <div class="relative mx-4 rounded-3xl overflow-hidden aspect-square bg-gray-100">
        <img :src="product.images[activeImg]" :alt="product.name" class="w-full h-full object-cover" />
        <button
          @click="nextImg"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center"
        >
          <ChevronRight class="w-5 h-5 text-gray-600" />
        </button>
        <!-- Dots -->
        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          <span
            v-for="(_, i) in product.images"
            :key="i"
            class="rounded-full transition-all"
            :class="i === activeImg ? 'w-4 h-2 bg-primary' : 'w-2 h-2 bg-gray-300'"
          />
        </div>
        <!-- Wishlist -->
        <button
          @click="wishlistStore.toggle(product)"
          class="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center"
        >
          <Heart class="w-5 h-5" :class="isWishlisted ? 'fill-primary text-primary' : 'text-gray-400'" />
        </button>
      </div>

      <!-- Size selector -->
      <div class="px-4 pt-4">
        <p class="text-sm font-semibold text-gray-500 mb-2">Size: <span class="text-gray-900">{{ selectedSize }}</span></p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="size in product.sizes"
            :key="size"
            @click="selectedSize = size"
            class="px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all"
            :class="selectedSize === size ? 'border-primary text-primary bg-primary/5' : 'border-gray-200 text-gray-600'"
          >{{ size }}</button>
        </div>
      </div>

      <!-- Product info -->
      <div class="px-4 pt-4">
        <h1 class="text-2xl font-extrabold text-gray-900">{{ product.name }}</h1>
        <p class="text-sm text-gray-500 mt-1">{{ product.subtitle }}</p>

        <div class="flex items-center gap-3 mt-2">
          <RatingStars :rating="product.rating" :reviews="product.reviews" show-count :size="14" />
        </div>

        <div class="flex items-center gap-3 mt-3">
          <span class="text-gray-400 line-through text-sm">₹{{ product.originalPrice?.toLocaleString() }}</span>
          <span class="text-2xl font-extrabold text-gray-900">₹{{ product.price.toLocaleString() }}</span>
          <span class="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{{ product.discount }}% Off</span>
        </div>
      </div>

      <!-- Description -->
      <div class="px-4 pt-3">
        <p class="font-bold text-gray-900 mb-1">Product Details</p>
        <p class="text-sm text-gray-500 leading-relaxed">
          {{ expanded ? product.description : product.description.slice(0, 120) + '...' }}
          <button @click="expanded = !expanded" class="text-primary font-semibold ml-1">
            {{ expanded ? 'Less' : '...More' }}
          </button>
        </p>
      </div>

      <!-- Quick info chips -->
      <div class="flex gap-3 px-4 pt-4 overflow-x-auto scrollbar-hide">
        <div class="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 flex-shrink-0">
          <MapPin class="w-3.5 h-3.5 text-gray-500" /><span class="text-xs text-gray-600 font-medium">Nearest Store</span>
        </div>
        <div class="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 flex-shrink-0">
          <Star class="w-3.5 h-3.5 text-gray-500" /><span class="text-xs text-gray-600 font-medium">VIP</span>
        </div>
        <div class="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 flex-shrink-0">
          <RotateCcw class="w-3.5 h-3.5 text-gray-500" /><span class="text-xs text-gray-600 font-medium">Return policy</span>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex gap-3 px-4 pt-5">
        <AppButton variant="secondary" block size="md" @click="addToCart">
          <ShoppingCart class="w-5 h-5" /> Go to cart
        </AppButton>
        <AppButton variant="green" block size="md" @click="buyNow">
          <Zap class="w-5 h-5" /> Buy Now
        </AppButton>
      </div>

      <!-- Delivery badge -->
      <div class="mx-4 mt-4 bg-pink-50 border border-pink-100 rounded-2xl p-4">
        <p class="text-xs text-gray-500 font-medium">Delivery in</p>
        <p class="text-xl font-extrabold text-gray-900">1 within Hour</p>
      </div>

      <!-- View similar / compare -->
      <div class="flex gap-3 px-4 mt-4">
        <button class="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 rounded-2xl py-3 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors">
          <Eye class="w-4 h-4" /> View Similar
        </button>
        <button class="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 rounded-2xl py-3 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors">
          <GitCompare class="w-4 h-4" /> Add to Compare
        </button>
      </div>

      <!-- Similar products -->
      <div class="mt-5 px-4">
        <div class="flex items-center justify-between mb-3">
          <div>
            <p class="font-bold text-gray-900">Similar To</p>
            <p class="text-xs text-gray-400">{{ similarProducts.length * 20 }}+ Items</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-surface rounded-xl px-3 py-1.5">
              <ArrowUpDown class="w-3 h-3" /> Sort
            </button>
            <button class="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-surface rounded-xl px-3 py-1.5">
              <SlidersHorizontal class="w-3 h-3" /> Filter
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <ProductCard v-for="p in similarProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </template>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft, ShoppingCart, ChevronRight, Heart, MapPin, Star,
  RotateCcw, Zap, Eye, ArrowUpDown, SlidersHorizontal,
} from 'lucide-vue-next'
import products from '@/data/products.json'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import AppButton from '@/components/AppButton.vue'
import RatingStars from '@/components/RatingStars.vue'
import ProductCard from '@/components/ProductCard.vue'
import BottomNav from '@/components/BottomNav.vue'

// lucide doesn't have GitCompare directly, use a simple SVG
const GitCompare = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M6 8v12M18 6v-2M6 12h6M18 12h-3l3-3-3-3"/></svg>` }

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const product = computed(() => products.find(p => p.id === Number(route.params.id)))
const isWishlisted = computed(() => wishlistStore.isWishlisted(Number(route.params.id)))
const similarProducts = computed(() => products.filter(p => p.id !== Number(route.params.id) && p.category === product.value?.category).slice(0, 4))

const activeImg = ref(0)
const selectedSize = ref(product.value?.sizes[0] ?? '')
const expanded = ref(false)

function nextImg() {
  if (product.value) {
    activeImg.value = (activeImg.value + 1) % product.value.images.length
  }
}

function addToCart() {
  if (product.value) {
    cartStore.addItem(product.value, { size: selectedSize.value })
    router.push('/cart')
  }
}

function buyNow() {
  if (product.value) {
    cartStore.addItem(product.value, { size: selectedSize.value })
    router.push('/checkout/address')
  }
}
</script>
