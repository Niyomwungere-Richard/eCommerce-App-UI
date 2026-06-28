<template>
  <div class="bg-white min-h-screen pb-44">
    <AppHeader title="Checkout" show-back />

    <div class="px-4 pt-5">
      <!-- Order summary -->
      <div class="bg-surface rounded-3xl p-4 mb-5">
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex justify-between text-gray-500">
            <span>Order</span>
            <span>₹ {{ cartStore.totalAmount.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between text-gray-500">
            <span>Shipping</span>
            <span>₹ {{ cartStore.shipping }}</span>
          </div>
          <div class="h-px bg-gray-200 my-1" />
          <div class="flex justify-between font-bold text-gray-900 text-base">
            <span>Total</span>
            <span>₹ {{ cartStore.grandTotal.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <!-- Payment methods -->
      <p class="font-bold text-gray-900 mb-3">Payment</p>
      <div class="flex flex-col gap-3">
        <button
          v-for="method in paymentMethods"
          :key="method.id"
          @click="selectedMethod = method.id"
          class="flex items-center gap-4 p-4 rounded-2xl border-2 transition-all"
          :class="selectedMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-100 bg-surface'"
        >
          <div class="w-14 h-9 bg-white rounded-xl border border-gray-100 flex items-center justify-center shadow-sm flex-shrink-0">
            <span class="font-extrabold text-xs" :class="method.color">{{ method.logo }}</span>
          </div>
          <span class="text-sm text-gray-500 font-medium tracking-widest">{{ method.masked }}</span>
          <div v-if="selectedMethod === method.id" class="ml-auto">
            <div class="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check class="w-3 h-3 text-white" />
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Continue button -->
    <div class="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-4 z-50">
      <AppButton variant="primary" block size="lg" :loading="processing" @click="processPayment">
        Continue
      </AppButton>
    </div>

    <!-- Success modal -->
    <Transition name="modal">
      <div v-if="success" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
        <div class="bg-white rounded-3xl p-8 flex flex-col items-center gap-4 shadow-2xl w-full max-w-xs">
          <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center relative">
            <div class="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <Check class="w-9 h-9 text-white stroke-[3]" />
            </div>
            <!-- Confetti dots -->
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-primary/40 rounded-full animate-bounce" />
            <span class="absolute top-1 -left-2 w-2 h-2 bg-pink-300 rounded-full animate-bounce delay-75" />
            <span class="absolute -bottom-1 right-2 w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-150" />
          </div>
          <p class="font-bold text-gray-900 text-lg text-center">Payment done successfully.</p>
          <AppButton variant="primary" block @click="goHome">Back to Home</AppButton>
        </div>
      </div>
    </Transition>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Check } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import AppHeader from '@/components/AppHeader.vue'
import AppButton from '@/components/AppButton.vue'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()
const cartStore = useCartStore()
const selectedMethod = ref('visa')
const processing = ref(false)
const success = ref(false)

const paymentMethods = [
  { id: 'visa', logo: 'VISA', masked: '**********2109', color: 'text-blue-700' },
  { id: 'paypal', logo: 'PayPal', masked: '**********2109', color: 'text-blue-500' },
  { id: 'amex', logo: 'AMEX', masked: '**********2109', color: 'text-red-500' },
  { id: 'apple', logo: '🍎', masked: '**********2109', color: 'text-gray-900' },
]

async function processPayment() {
  processing.value = true
  await new Promise(r => setTimeout(r, 1500))
  processing.value = false
  success.value = true
}

function goHome() {
  cartStore.clearCart()
  success.value = false
  router.push('/home')
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
