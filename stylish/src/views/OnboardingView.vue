<template>
  <div class="min-h-screen bg-white flex flex-col relative overflow-hidden">
    <!-- Status bar fake -->
    <div class="flex items-center justify-between px-6 pt-4 pb-2">
      <span class="text-sm font-semibold text-gray-800">9:41</span>
      <div class="flex items-center gap-1">
        <Signal class="w-4 h-4 text-gray-800" />
        <Wifi class="w-4 h-4 text-gray-800" />
        <Battery class="w-5 h-5 text-gray-800" />
      </div>
    </div>

    <!-- Top nav -->
    <div class="flex items-center justify-between px-6 py-2">
      <span class="text-sm font-semibold text-gray-600">{{ current + 1 }}/3</span>
      <button @click="skip" class="text-sm font-semibold text-gray-500 hover:text-primary">Skip</button>
    </div>

    <!-- Slides -->
    <div class="flex-1 flex flex-col items-center justify-center px-8 pb-4">
      <transition name="fade" mode="out-in">
        <div :key="current" class="flex flex-col items-center text-center w-full">
          <!-- Illustration placeholder -->
          <div class="w-64 h-64 mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-inner">
            <img
              :src="slides[current].image"
              :alt="slides[current].title"
              class="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <h2 class="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{{ slides[current].title }}</h2>
          <p class="text-gray-500 text-sm leading-relaxed max-w-xs">{{ slides[current].description }}</p>
        </div>
      </transition>
    </div>

    <!-- Bottom nav -->
    <div class="px-6 pb-8">
      <!-- Dots -->
      <div class="flex items-center justify-center gap-2 mb-6">
        <button
          v-for="(_, i) in slides"
          :key="i"
          @click="current = i"
          class="rounded-full transition-all duration-300"
          :class="i === current ? 'w-6 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-gray-200'"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          @click="prev"
          :disabled="current === 0"
          class="text-sm font-semibold text-gray-400 disabled:opacity-30 hover:text-gray-600 transition-colors"
        >Prev</button>
        <button
          @click="next"
          class="text-sm font-bold text-primary hover:text-primary-dark transition-colors"
        >{{ current === 2 ? 'Get Started' : 'Next' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Signal, Wifi, Battery } from 'lucide-vue-next'

const router = useRouter()
const current = ref(0)

const slides = [
  {
    title: 'Choose Products',
    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop&auto=format',
  },
  {
    title: 'Make Payment',
    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=600&fit=crop&auto=format',
  },
  {
    title: 'Get Your Order',
    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&auto=format',
  },
]

function prev() {
  if (current.value > 0) current.value--
}

function next() {
  if (current.value < 2) {
    current.value++
  } else {
    router.push('/get-started')
  }
}

function skip() {
  router.push('/get-started')
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
