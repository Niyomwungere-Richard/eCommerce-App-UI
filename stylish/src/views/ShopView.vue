<template>
  <div class="bg-surface min-h-screen pb-24">
    <AppHeader show-logo show-avatar />

    <!-- Search bar -->
    <div class="px-4 pt-3 pb-2">
      <div class="flex items-center bg-white rounded-2xl px-4 py-3 gap-3 shadow-sm">
        <Search class="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input v-model="query" placeholder="Search any Product..." class="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent" />
        <Mic class="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
    </div>

    <!-- Count + controls -->
    <div class="flex items-center justify-between px-4 py-3">
      <span class="font-bold text-gray-900">{{ filtered.length.toLocaleString() }}+ Items</span>
      <div class="flex items-center gap-2">
        <button @click="toggleSort" class="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-white rounded-xl px-3 py-1.5 shadow-sm">
          <ArrowUpDown class="w-3 h-3" /> Sort
        </button>
        <button class="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-white rounded-xl px-3 py-1.5 shadow-sm">
          <SlidersHorizontal class="w-3 h-3" /> Filter
        </button>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-2 gap-3 px-4">
      <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Mic, ArrowUpDown, SlidersHorizontal } from 'lucide-vue-next'
import products from '@/data/products.json'
import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'
import ProductCard from '@/components/ProductCard.vue'

const query = ref('')
const sortAsc = ref(false)

const filtered = computed(() => {
  let list = [...products]
  if (query.value) {
    const q = query.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q))
  }
  list.sort((a, b) => sortAsc.value ? a.price - b.price : b.price - a.price)
  return list
})

function toggleSort() { sortAsc.value = !sortAsc.value }
</script>
