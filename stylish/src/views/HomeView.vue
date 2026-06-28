<template>
  <div class="bg-surface min-h-screen pb-24">
    <!-- Header -->
    <AppHeader show-menu show-logo show-avatar />

    <!-- Search bar -->
    <div class="px-4 pt-3 pb-2">
      <div class="flex items-center bg-white rounded-2xl px-4 py-3 gap-3 shadow-sm">
        <Search class="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          v-model="searchQuery"
          placeholder="Search any Product..."
          class="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent"
          @keydown.enter="goSearch"
        />
        <Mic class="w-5 h-5 text-gray-400 flex-shrink-0 cursor-pointer hover:text-primary" />
      </div>
    </div>

    <!-- All Featured row -->
    <div class="flex items-center justify-between px-4 py-2">
      <span class="font-bold text-gray-900">All Featured</span>
      <div class="flex items-center gap-2">
        <button class="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-white rounded-xl px-3 py-1.5 shadow-sm">
          <ArrowUpDown class="w-3 h-3" /> Sort
        </button>
        <button @click="$router.push('/shop')" class="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-white rounded-xl px-3 py-1.5 shadow-sm">
          <SlidersHorizontal class="w-3 h-3" /> Filter
        </button>
      </div>
    </div>

    <!-- Categories carousel -->
    <div class="flex gap-4 px-4 py-3 overflow-x-auto scrollbar-hide">
      <div
        v-for="cat in categories"
        :key="cat.label"
        @click="$router.push('/shop')"
        class="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer"
      >
        <div class="w-16 h-16 rounded-full overflow-hidden bg-white shadow-sm border-2 border-white hover:border-primary transition-colors">
          <img :src="cat.image" :alt="cat.label" class="w-full h-full object-cover" />
        </div>
        <span class="text-xs font-medium text-gray-600">{{ cat.label }}</span>
      </div>
    </div>

    <!-- Promo banner carousel -->
    <div class="mx-4 rounded-3xl overflow-hidden mb-4 relative">
      <div class="bg-gradient-to-r from-primary to-pink-400 p-5 relative overflow-hidden min-h-36 flex flex-col justify-center">
        <div class="absolute right-0 top-0 bottom-0 w-36 rounded-l-full overflow-hidden opacity-90">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop&auto=format" class="w-full h-full object-cover" alt="promo" />
        </div>
        <p class="text-white text-2xl font-extrabold leading-tight z-10 relative">50-40% OFF</p>
        <p class="text-white/90 text-xs font-medium z-10 relative mt-1">Now in (product)<br/>All colours</p>
        <button @click="$router.push('/shop')" class="mt-3 z-10 relative bg-white text-primary text-xs font-bold px-4 py-2 rounded-full w-fit flex items-center gap-1">
          Shop Now <ChevronRight class="w-3 h-3" />
        </button>
      </div>
      <!-- Dots -->
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        <span class="w-4 h-1.5 bg-white rounded-full" />
        <span class="w-1.5 h-1.5 bg-white/50 rounded-full" />
        <span class="w-1.5 h-1.5 bg-white/50 rounded-full" />
      </div>
    </div>

    <!-- Deal of the Day -->
    <SectionHeader title="Deal of the Day" link="/shop">
      <template #subtitle>
        <div class="flex items-center gap-1 text-xs text-gray-500">
          <Clock class="w-3 h-3" />
          <span>{{ countdown }}</span>
        </div>
      </template>
    </SectionHeader>
    <div class="flex gap-3 px-4 py-2 overflow-x-auto scrollbar-hide">
      <ProductCard
        v-for="p in dealProducts"
        :key="p.id"
        :product="p"
        class="w-44 flex-shrink-0"
      />
    </div>

    <!-- Special Offers banner -->
    <div class="mx-4 my-4 bg-amber-50 rounded-3xl p-4 flex items-center gap-4">
      <div class="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
        <Tag class="w-8 h-8 text-amber-500" />
      </div>
      <div>
        <p class="font-bold text-gray-900 text-sm">Special Offers 🔥</p>
        <p class="text-xs text-gray-500 mt-0.5">We make sure you get the offer you need at best prices</p>
      </div>
    </div>

    <!-- Flat and Heels -->
    <div class="mx-4 mb-4 rounded-3xl overflow-hidden relative">
      <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&h=200&fit=crop&auto=format" class="w-full h-36 object-cover" alt="heels" />
      <div class="absolute inset-0 bg-black/30 flex flex-col justify-center pl-6">
        <p class="text-white font-extrabold text-xl">Flat and Heels</p>
        <p class="text-white/80 text-xs mb-3">Stand a chance to get rewarded</p>
        <button @click="$router.push('/shop')" class="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full w-fit flex items-center gap-1">
          Visit now <ChevronRight class="w-3 h-3" />
        </button>
      </div>
    </div>

    <!-- Trending Products -->
    <SectionHeader title="Trending Products" link="/shop">
      <template #subtitle>
        <span class="text-xs text-gray-400">Last Date 29/02/22</span>
      </template>
    </SectionHeader>
    <div class="flex gap-3 px-4 py-2 overflow-x-auto scrollbar-hide">
      <ProductCard
        v-for="p in trendingProducts"
        :key="p.id"
        :product="p"
        class="w-44 flex-shrink-0"
      />
    </div>

    <!-- Hot Summer Sale -->
    <div class="mx-4 my-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl p-5 text-center">
      <p class="text-white font-extrabold text-2xl">🔥 Hot Summer Sale</p>
      <p class="text-white/90 text-sm mt-1">SPECIAL OFFERS</p>
    </div>

    <!-- New Arrivals -->
    <SectionHeader title="New Arrivals" link="/shop">
      <template #subtitle>
        <span class="text-xs text-gray-500">Summer '25 Collections</span>
      </template>
    </SectionHeader>
    <div class="grid grid-cols-2 gap-3 px-4 py-2">
      <ProductCard
        v-for="p in newArrivals"
        :key="p.id"
        :product="p"
      />
    </div>

    <!-- Sponsored -->
    <div class="px-4 mt-4 mb-2">
      <div class="flex items-center justify-between mb-3">
        <span class="font-bold text-gray-900">Sponsored</span>
      </div>
      <div
        @click="$router.push('/product/12')"
        class="relative rounded-3xl overflow-hidden cursor-pointer"
      >
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&h=250&fit=crop&auto=format" class="w-full h-44 object-cover" alt="sponsored" />
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p class="text-white font-bold">Up to 50% OFF</p>
          <p class="text-white/80 text-xs">up to 50% Off</p>
        </div>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Mic, ArrowUpDown, SlidersHorizontal, ChevronRight, Clock, Tag } from 'lucide-vue-next'
import products from '@/data/products.json'
import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'
import ProductCard from '@/components/ProductCard.vue'

const SectionHeader = {
  props: ['title', 'link'],
  emits: [],
  setup(props) {
    const router = useRouter()
    return { router, props }
  },
  template: `
    <div class="flex items-start justify-between px-4 pt-3 pb-1">
      <div>
        <p class="font-bold text-gray-900">{{ title }}</p>
        <slot name="subtitle" />
      </div>
      <button @click="router.push(link)" class="text-xs font-bold text-primary flex items-center gap-0.5">
        View all <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  `,
}

const router = useRouter()
const searchQuery = ref('')
const countdown = ref('22h 55m 20s')

const categories = [
  { label: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&auto=format' },
  { label: 'Fashion', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&h=200&fit=crop&auto=format' },
  { label: 'Kids', image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=200&h=200&fit=crop&auto=format' },
  { label: 'Mens', image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=200&h=200&fit=crop&auto=format' },
  { label: 'Womens', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&h=200&fit=crop&auto=format' },
]

const dealProducts = computed(() => products.filter(p => p.dealOfDay).slice(0, 5))
const trendingProducts = computed(() => products.filter(p => p.trending).slice(0, 5))
const newArrivals = computed(() => products.filter(p => p.newArrival).slice(0, 4))

let timer
onMounted(() => {
  let secs = 22 * 3600 + 55 * 60 + 20
  timer = setInterval(() => {
    secs--
    if (secs < 0) secs = 86400
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    const s = secs % 60
    countdown.value = `${h}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`
  }, 1000)
})
onUnmounted(() => clearInterval(timer))

function goSearch() {
  router.push({ path: '/search', query: { q: searchQuery.value } })
}
</script>
