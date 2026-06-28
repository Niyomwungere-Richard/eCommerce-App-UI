<template>
  <div class="min-h-screen bg-white px-6 pt-14 pb-8 flex flex-col">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">Welcome<br/>Back!</h1>

    <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
      <AppInput
        v-model="form.email"
        placeholder="Username or Email"
        type="email"
        :error="errors.email"
      >
        <template #prefix><User class="w-5 h-5" /></template>
      </AppInput>

      <AppInput
        v-model="form.password"
        placeholder="Password"
        type="password"
        :show-password="showPwd"
        :error="errors.password"
        @suffix-click="showPwd = !showPwd"
      >
        <template #prefix><Lock class="w-5 h-5" /></template>
        <template #suffix>
          <Eye v-if="!showPwd" class="w-5 h-5" />
          <EyeOff v-else class="w-5 h-5" />
        </template>
      </AppInput>

      <div class="flex justify-end -mt-2">
        <button type="button" @click="$router.push('/auth/forgot-password')" class="text-sm font-semibold text-primary">
          Forgot Password?
        </button>
      </div>

      <AppButton type="submit" variant="primary" block size="lg" :loading="loading" class="mt-2">
        Login
      </AppButton>
    </form>

    <div class="flex items-center gap-3 my-6">
      <div class="flex-1 h-px bg-gray-200" />
      <span class="text-xs text-gray-400 font-medium">- OR Continue with -</span>
      <div class="flex-1 h-px bg-gray-200" />
    </div>

    <div class="flex items-center justify-center gap-4">
      <SocialButton label="G" color="text-red-500 border-red-200" />
      <SocialButton label="A" color="text-gray-900 border-gray-300" />
      <SocialButton label="f" color="text-blue-600 border-blue-200" />
    </div>

    <div class="mt-auto pt-8 text-center">
      <span class="text-sm text-gray-500">Create An Account </span>
      <button @click="$router.push('/auth/signup')" class="text-sm font-bold text-primary underline">Sign Up</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock, Eye, EyeOff } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'

const SocialButton = {
  props: ['label', 'color'],
  template: `<button class="w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-lg" :class="color">{{ label }}</button>`,
}

const router = useRouter()
const userStore = useUserStore()
const showPwd = ref(false)
const loading = ref(false)
const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })

function validate() {
  errors.email = ''
  errors.password = ''
  let valid = true
  if (!form.email) { errors.email = 'Email is required'; valid = false }
  else if (!/\S+@\S+\.\S+/.test(form.email)) { errors.email = 'Invalid email format'; valid = false }
  if (!form.password) { errors.password = 'Password is required'; valid = false }
  return valid
}

async function handleLogin() {
  if (!validate()) return
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  userStore.login(form)
  loading.value = false
  router.push('/home')
}
</script>
