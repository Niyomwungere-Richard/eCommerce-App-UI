<template>
  <div class="bg-surface min-h-screen pb-36">
    <!-- Header -->
    <div class="bg-white sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <button @click="$router.back()"><ArrowLeft class="w-6 h-6 text-gray-700" /></button>
      <span class="font-bold text-gray-900 text-lg">Shopping Bag</span>
      <button @click="wishlistAll"><Heart class="w-6 h-6 text-gray-400" /></button>
    </div>

    <div class="px-4 pt-4">
      <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center py-20 gap-4">
        <ShoppingCart class="w-16 h-16 text-gray-200" />
        <p class="text-gray-400 font-medium">Your bag is empty</p>
        <AppButton variant="primary" @click="$router.push('/shop')">Start Shopping</AppButton>
      </div>

      <template v-else>
        <!-- Cart items -->
        <div class="flex flex-col gap-4 mb-5">
          <div
            v-for="item in cartStore.items"
            :key="item.key"
            class="bg-white rounded-3xl p-4 shadow-sm"
          >
            <div class="flex gap-3">
              <div class="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1">
                <div class="flex justify-between">
                  <p class="font-bold text-gray-900 text-sm">{{ item.name }}</p>
                  <button @click="cartStore.removeItem(item.key)" class="text-gray-300 hover:text-primary">
                    <X class="w-4 h-4" />
                  </button>
                </div>
                <p class="text-xs text-gray-400 mt-0.5">{{ item.subtitle }}</p>

                <div class="flex items-center gap-2 mt-2">
                  <span class="text-xs font-medium text-gray-600">Size</span>
                  <div class="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-0.5">
                    <span class="text-xs font-semibold">{{ item.size }}</span>
                    <ChevronDown class="w-3 h-3 text-gray-500" />
                  </div>
                  <span class="text-xs font-medium text-gray-600">Qty</span>
                  <div class="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-0.5">
                    <span class="text-xs font-semibold">{{ item.qty }}</span>
                    <ChevronDown class="w-3 h-3 text-gray-500" />
                  </div>
                </div>

                <div class="flex items-center gap-2 mt-1.5">
                  <button
                    @click="cartStore.updateQty(item.key, item.qty - 1)"
                    class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-sm font-bold"
                  >-</button>
                  <span class="text-sm font-bold w-4 text-center">{{ item.qty }}</span>
                  <button
                    @click="cartStore.updateQty(item.key, item.qty + 1)"
                    class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-sm font-bold"
                  >+</button>
                </div>

                <p class="text-xs text-gray-400 mt-2">Delivery by <span class="font-semibold text-gray-700">{{ item.deliveryDate }}</span></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Apply Coupons -->
        <div class="bg-white rounded-3xl px-4 py-4 mb-4 shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
              <Ticket class="w-5 h-5 text-primary" />
            </div>
            <span class="font-semibold text-gray-800 text-sm">Apply Coupons</span>
          </div>
          <button class="text-primary text-sm font-bold">Select</button>
        </div>

        <!-- Order Payment Details -->
        <div class="bg-white rounded-3xl p-4 mb-4 shadow-sm">
          <p class="font-bold text-gray-900 mb-4">Order Payment Details</p>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Order Amounts</span>
              <span class="font-semibold text-gray-900">₹ {{ cartStore.totalAmount.toLocaleString() }}.00</span>
            </div>
            <div class="flex justify-between text-sm">
              <div class="flex items-center gap-2">
                <span class="text-gray-600">Convenience</span>
                <button class="text-primary text-xs font-semibold">Know More</button>
              </div>
              <button class="text-primary text-xs font-semibold">Apply Coupon</button>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Delivery Fee</span>
              <span class="font-bold text-green-500">Free</span>
            </div>
            <div class="h-px bg-gray-100 my-1" />
            <div class="flex justify-between">
              <span class="font-bold text-gray-900">Order Total</span>
              <span class="font-extrabold text-gray-900 text-lg">₹ {{ cartStore.totalAmount.toLocaleString() }}.00</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-500">EMI Available</span>
              <button class="text-primary font-semibold text-xs">Details</button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Fixed bottom bar -->
    <div v-if="cartStore.items.length > 0" class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 z-30">
      <div class="flex items-center justify-between px-4 py-4">
        <div>
          <p class="text-lg font-extrabold text-gray-900">₹ {{ cartStore.totalAmount.toLocaleString() }}.00</p>
          <button class="text-xs text-primary font-semibold">View Details</button>
        </div>
        <AppButton variant="primary" size="md" @click="$router.push('/checkout/payment')">
          Proceed to Payment
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, Heart, ShoppingCart, X, ChevronDown, Ticket } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import AppButton from '@/components/AppButton.vue'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

function wishlistAll() {
  cartStore.items.forEach(item => {
    const product = { id: item.id, name: item.name, subtitle: item.subtitle, image: item.image, price: item.price, originalPrice: item.originalPrice, discount: item.discount, rating: item.rating }
    wishlistStore.toggle(product)
  })
}
</script>
