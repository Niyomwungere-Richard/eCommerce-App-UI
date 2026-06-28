<template>
  <div class="flex items-center gap-2">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Blue ring (right) -->
      <circle cx="28" cy="24" r="14" fill="#3B82F6" opacity="0.9" />
      <!-- Red/pink ring (left) -->
      <circle cx="20" cy="24" r="14" fill="#F43F5E" opacity="0.9" />
      <!-- White center overlap -->
      <path
        d="M24 13.07A14 14 0 0 1 24 34.93A14 14 0 0 1 24 13.07Z"
        fill="white"
        opacity="0.4"
      />
      <!-- S letter shape -->
      <path
        d="M26 19c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2 .9 2 2-.9 2-2 2-2-.9-2-2"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        fill="none"
      />
    </svg>
    <span
      :class="[
        'font-bold tracking-wide',
        textColorClass,
        sizeClass,
      ]"
      style="font-family: 'Poppins', serif;"
    >Stylish</span>
  </div>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 40 },
  textColorClass: { type: String, default: 'text-primary' },
  sizeClass: { type: String, default: 'text-2xl' },
})
</script>
