<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click')"
    :class="[
      'flex items-center justify-center gap-2 font-semibold transition-all duration-200 select-none',
      variantClasses,
      sizeClasses,
      block ? 'w-full' : '',
      (disabled || loading) ? 'opacity-60 cursor-not-allowed' : 'active:scale-95',
    ]"
  >
    <span v-if="loading" class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  type: { type: String, default: 'button' },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})

defineEmits(['click'])

const variantClasses = computed(() => ({
  primary: 'bg-primary hover:bg-primary-dark text-white rounded-full shadow-sm',
  secondary: 'bg-secondary hover:bg-blue-600 text-white rounded-full shadow-sm',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full',
  ghost: 'text-primary hover:bg-primary/10 rounded-xl',
  green: 'bg-green-500 hover:bg-green-600 text-white rounded-full shadow-sm',
}[props.variant]))

const sizeClasses = computed(() => ({
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}[props.size]))
</script>
