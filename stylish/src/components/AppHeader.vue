<template>
  <header class="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-30 border-b border-gray-100">
    <button v-if="showMenu" @click="$emit('menu')" class="p-1">
      <Menu class="w-6 h-6 text-gray-700" />
    </button>
    <button v-if="showBack" @click="goBack" class="p-1">
      <ArrowLeft class="w-6 h-6 text-gray-700" />
    </button>
    <div v-if="!showMenu && !showBack" class="w-8" />

    <StylishLogo v-if="showLogo" :size="36" text-color-class="text-primary" size-class="text-xl" />
    <span v-else class="font-bold text-lg text-gray-900">{{ title }}</span>

    <button v-if="showAvatar" @click="$router.push('/checkout/profile')" class="w-9 h-9 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center">
      <img v-if="user?.avatar" :src="user.avatar" alt="avatar" class="w-full h-full object-cover" />
      <UserCircle v-else class="w-7 h-7 text-primary" />
    </button>
    <button v-if="showCart" @click="$router.push('/cart')" class="relative p-1">
      <ShoppingCart class="w-6 h-6 text-gray-700" />
      <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
        {{ cartCount > 9 ? '9+' : cartCount }}
      </span>
    </button>
    <div v-if="!showAvatar && !showCart" class="w-8" />
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, ArrowLeft, UserCircle, ShoppingCart } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import StylishLogo from './StylishLogo.vue'

const props = defineProps({
  showMenu: { type: Boolean, default: false },
  showBack: { type: Boolean, default: false },
  showLogo: { type: Boolean, default: false },
  showAvatar: { type: Boolean, default: false },
  showCart: { type: Boolean, default: false },
  title: { type: String, default: '' },
})

const emit = defineEmits(['menu'])
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const user = computed(() => userStore.user)
const cartCount = computed(() => cartStore.totalItems)

function goBack() {
  router.back()
}
</script>
