<template>
  <div class="min-h-screen bg-white px-6 pt-14 pb-8 flex flex-col">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">Create an<br/>account</h1>

    <form @submit.prevent="handleSignup" class="flex flex-col gap-4">
      <AppInput
        v-model="form.email"
        placeholder="Username or Email"
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

      <AppInput
        v-model="form.confirm"
        placeholder="ConfirmPassword"
        type="password"
        :show-password="showConfirm"
        :error="errors.confirm"
        @suffix-click="showConfirm = !showConfirm"
      >
        <template #prefix><Lock class="w-5 h-5" /></template>
        <template #suffix>
          <Eye v-if="!showConfirm" class="w-5 h-5" />
          <EyeOff v-else class="w-5 h-5" />
        </template>
      </AppInput>

      <p class="text-xs text-gray-500">
        By clicking the <span class="text-primary font-semibold">Register</span> button, you agree to the public offer
      </p>

      <AppButton type="submit" variant="primary" block size="lg" :loading="loading">
        Create Account
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
      <span class="text-sm text-gray-500">I Already Have an Account </span>
      <button @click="$router.push('/auth/signin')" class="text-sm font-bold text-primary underline">Login</button>
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
const showConfirm = ref(false)
const loading = ref(false)
const form = reactive({ email: '', password: '', confirm: '' })
const errors = reactive({ email: '', password: '', confirm: '' })

function validate() {
  errors.email = ''; errors.password = ''; errors.confirm = ''
  let valid = true
  if (!form.email) { errors.email = 'Email is required'; valid = false }
  else if (!/\S+@\S+\.\S+/.test(form.email)) { errors.email = 'Invalid email'; valid = false }
  if (!form.password || form.password.length < 6) { errors.password = 'Min. 6 characters'; valid = false }
  if (form.password !== form.confirm) { errors.confirm = 'Passwords do not match'; valid = false }
  return valid
}

async function handleSignup() {
  if (!validate()) return
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  userStore.signup(form)
  loading.value = false
  router.push('/home')
}
</script>
