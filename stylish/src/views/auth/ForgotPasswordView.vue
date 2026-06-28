<template>
  <div class="min-h-screen bg-white px-6 pt-14 pb-8 flex flex-col">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">Forgot<br/>password?</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <AppInput
        v-model="email"
        placeholder="Enter your email address"
        type="email"
        :error="error"
      >
        <template #prefix><Mail class="w-5 h-5" /></template>
      </AppInput>

      <p class="text-xs text-gray-500">
        <span class="text-primary font-bold">* </span>We will send you a message to set or reset your new password
      </p>

      <AppButton type="submit" variant="primary" block size="lg" :loading="loading" class="mt-4">
        Submit
      </AppButton>
    </form>

    <div v-if="sent" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-center">
      <p class="text-green-700 font-semibold text-sm">Email sent! Check your inbox.</p>
    </div>

    <button @click="$router.back()" class="mt-8 text-sm text-gray-400 hover:text-primary text-center">
      ← Back to Sign In
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Mail } from 'lucide-vue-next'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'

const email = ref('')
const error = ref('')
const loading = ref(false)
const sent = ref(false)

async function handleSubmit() {
  error.value = ''
  if (!email.value) { error.value = 'Email is required'; return }
  if (!/\S+@\S+\.\S+/.test(email.value)) { error.value = 'Invalid email format'; return }
  loading.value = true
  await new Promise(r => setTimeout(r, 1000))
  loading.value = false
  sent.value = true
}
</script>
