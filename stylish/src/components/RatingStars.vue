<template>
  <div class="flex items-center gap-0.5">
    <template v-for="i in 5" :key="i">
      <svg
        class="flex-shrink-0"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient :id="`star-grad-${uid}-${i}`" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop :offset="`${fillPercent(i)}%`" stop-color="#FBBF24" />
            <stop :offset="`${fillPercent(i)}%`" stop-color="#D1D5DB" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          :fill="`url(#star-grad-${uid}-${i})`"
        />
      </svg>
    </template>
    <span v-if="showCount && reviews !== undefined" class="text-gray-500 ml-1" :style="`font-size:${size + 2}px`">
      {{ formatCount(reviews) }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: undefined },
  showCount: { type: Boolean, default: false },
  size: { type: Number, default: 14 },
})

const uid = Math.random().toString(36).slice(2, 7)

function fillPercent(star) {
  const diff = props.rating - (star - 1)
  if (diff <= 0) return 0
  if (diff >= 1) return 100
  return Math.round(diff * 100)
}

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}
</script>
