<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background image -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1400&fit=crop&auto=format');"
    />
    <!-- Dark overlay gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

    <!-- Content at bottom -->
    <div class="absolute inset-x-0 bottom-0 px-6 pb-14">
      <h1 class="text-white text-4xl font-extrabold leading-tight mb-3">
        You want Authentic, here you go!
      </h1>
      <p class="text-white/80 text-sm mb-8">Find it here, buy it now!</p>
      <AppButton variant="primary" block size="lg" @click="$router.push('/auth/signin')">
        Get Started
      </AppButton>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
</script>
