<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center relative">
    <div class="flex flex-col items-center gap-4">
      <!-- Logo icon -->
      <div class="relative w-24 h-24">
        <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <!-- Blue circle -->
          <circle cx="56" cy="48" r="28" fill="#3B82F6" opacity="0.9"/>
          <!-- Red/pink circle -->
          <circle cx="40" cy="48" r="28" fill="#F43F5E" opacity="0.9"/>
          <!-- White blend area -->
          <ellipse cx="48" cy="48" rx="8" ry="26" fill="white" opacity="0.35"/>
          <!-- S path -->
          <path d="M52 38c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4 1.8 4 4-1.8 4-4 4-4-1.8-4-4"
            stroke="white" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        </svg>
      </div>
      <span class="text-4xl font-bold text-primary" style="font-family:'Poppins',serif;">Stylish</span>
    </div>

    <!-- Progress bar at bottom -->
    <div class="absolute bottom-12 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
      <div
        class="h-full bg-primary rounded-full transition-all duration-100"
        :style="{ width: progress + '%' }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const progress = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    progress.value += 2
    if (progress.value >= 100) {
      clearInterval(interval)
      router.push('/onboarding')
    }
  }, 30)
})
</script>
