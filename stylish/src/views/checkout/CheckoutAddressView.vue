<template>
  <div class="bg-surface min-h-screen pb-24">
    <AppHeader title="Checkout" show-back />

    <div class="px-4 pt-4">
      <!-- Delivery address -->
      <div class="bg-white rounded-3xl p-4 mb-4 shadow-sm">
        <div class="flex items-center gap-2 mb-3">
          <MapPin class="w-4 h-4 text-primary" />
          <span class="text-sm font-bold text-gray-900">Delivery Address</span>
        </div>
        <div class="flex items-start gap-3">
          <div class="flex-1 bg-gray-50 rounded-2xl p-3">
            <p class="text-xs font-medium text-gray-700">
              Address : {{ user?.address?.address }} {{ user?.address?.city }} {{ user?.address?.state }} UK
            </p>
            <p class="text-xs text-gray-500 mt-1">Contact : {{ user?.address?.contact || '+44-784232' }}</p>
          </div>
          <button class="p-2 rounded-xl bg-gray-50 hover:bg-gray-100">
            <Edit class="w-4 h-4 text-gray-500" />
          </button>
          <button class="p-2 rounded-xl bg-gray-50 hover:bg-gray-100">
            <Plus class="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <!-- Shopping list -->
      <div>
        <p class="font-bold text-gray-900 mb-3">Shopping List</p>
        <div v-if="cartStore.items.length === 0" class="bg-white rounded-3xl p-8 text-center">
          <p class="text-gray-400 font-medium">Your cart is empty</p>
          <AppButton variant="primary" class="mt-4" @click="$router.push('/shop')">Shop Now</AppButton>
        </div>
        <div v-else class="flex flex-col gap-3">
          <div
            v-for="item in cartStore.items"
            :key="item.key"
            class="bg-white rounded-3xl p-4 shadow-sm"
          >
            <div class="flex gap-3">
              <div class="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1">
                <p class="font-bold text-gray-900 text-sm">{{ item.name }}</p>
                <div class="flex gap-1.5 mt-1">
                  <span class="text-xs bg-gray-100 rounded-md px-2 py-0.5 font-medium text-gray-600">{{ item.size }}</span>
                  <span v-if="item.color" class="text-xs bg-gray-100 rounded-md px-2 py-0.5 font-medium text-gray-600">{{ item.color }}</span>
                </div>
                <div class="flex items-center gap-1 mt-1">
                  <RatingStars :rating="item.rating" :size="10" />
                </div>
                <div class="flex items-center gap-2 mt-1">
                  <span class="font-bold text-gray-900 text-sm">$ {{ item.price }}</span>
                  <span v-if="item.discount" class="text-xs text-primary font-semibold">upto {{ item.discount }}% off</span>
                  <span v-if="item.originalPrice" class="text-xs text-gray-400 line-through">$ {{ item.originalPrice }}</span>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-50 flex justify-between">
              <span class="text-xs text-gray-500">Total Order ({{ item.qty }})</span>
              <span class="text-sm font-bold text-gray-900">$ {{ (item.price * item.qty).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom checkout bar -->
    <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-4 z-30">
      <AppButton variant="primary" block size="lg" @click="$router.push('/cart')">
        Review Order
      </AppButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { MapPin, Edit, Plus } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import AppHeader from '@/components/AppHeader.vue'
import AppButton from '@/components/AppButton.vue'
import RatingStars from '@/components/RatingStars.vue'

const userStore = useUserStore()
const cartStore = useCartStore()
const user = computed(() => userStore.user)
</script>
