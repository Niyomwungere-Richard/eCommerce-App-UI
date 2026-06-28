<template>
  <div class="relative">
    <div v-if="$slots.prefix" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      <slot name="prefix" />
    </div>
    <input
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      :class="[
        'w-full bg-surface rounded-2xl text-gray-800 placeholder-gray-400 text-sm font-medium outline-none transition-all',
        'focus:ring-2 focus:ring-primary/30',
        $slots.prefix ? 'pl-11 pr-4 py-4' : 'px-4 py-4',
        $slots.suffix ? 'pr-12' : '',
        error ? 'ring-2 ring-red-400' : '',
      ]"
    />
    <button
      v-if="$slots.suffix"
      type="button"
      @click="$emit('suffix-click')"
      class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      <slot name="suffix" />
    </button>
    <p v-if="error" class="mt-1 text-xs text-red-500 pl-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  showPassword: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: '' },
})

defineEmits(['update:modelValue', 'blur', 'suffix-click'])

const inputType = computed(() => {
  if (props.type === 'password') return props.showPassword ? 'text' : 'password'
  return props.type
})
</script>
