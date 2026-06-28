<template>
  <div class="bg-surface min-h-screen pb-24">
    <AppHeader show-logo show-avatar />

    <div class="px-4 pt-3 pb-4">
      <div class="flex items-center bg-white rounded-2xl px-4 py-3 gap-3 shadow-sm">
        <Search class="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          ref="inputRef"
          v-model="query"
          placeholder="Search any Product..."
          class="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent"
        />
        <button v-if="query" @click="query = ''" class="text-gray-400 hover:text-gray-600">
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Recent searches -->
    <div v-if="!query && recentSearches.length" class="px-4 mb-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-bold text-gray-700">Recent Searches</span>
        <button @click="recentSearches = []" class="text-xs text-primary">Clear all</button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="s in recentSearches"
          :key="s"
          @click="query = s"
          class="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-600 font-medium"
        >{{ s }}</button>
      </div>
    </div>

    <!-- Results -->
    <div v-if="query" class="px-4">
      <p class="text-sm text-gray-500 mb-3 font-medium">
        {{ results.length }} results for "<span class="font-bold text-gray-800">{{ query }}</span>"
      </p>
      <div v-if="results.length" class="grid grid-cols-2 gap-3">
        <ProductCard v-for="p in results" :key="p.id" :product="p" />
      </div>
      <div v-else class="flex flex-col items-center py-16 gap-3">
        <Search class="w-12 h-12 text-gray-200" />
        <p class="text-gray-400 font-medium">No products found</p>
      </div>
    </div>

    <!-- Popular categories -->
    <div v-if="!query" class="px-4">
      <p class="text-sm font-bold text-gray-700 mb-3">Popular Categories</p>
      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="cat in popularCategories"
          :key="cat.label"
          @click="query = cat.label"
          class="relative rounded-2xl overflow-hidden h-24 flex items-end p-3 text-left"
        >
          <img :src="cat.image" :alt="cat.label" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40" />
          <span class="relative text-white font-bold text-sm z-10">{{ cat.label }}</span>
        </button>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Search, X } from 'lucide-vue-next'
import products from '@/data/products.json'
import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const inputRef = ref(null)
const query = ref(route.query.q || '')
const recentSearches = ref(['Sneakers', 'Dresses', 'Watches', 'Jackets'])

const results = computed(() => {
  if (!query.value) return []
  const q = query.value.toLowerCase()
  return products.filter(p => p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
})

const popularCategories = [
  { label: 'Fashion', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=200&fit=crop' },
  { label: 'Mens', image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300&h=200&fit=crop' },
  { label: 'Womens', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=200&fit=crop' },
  { label: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop' },
]

onMounted(() => inputRef.value?.focus())
</script>
