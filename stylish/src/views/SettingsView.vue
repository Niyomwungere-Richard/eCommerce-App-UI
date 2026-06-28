<template>
  <div class="bg-surface min-h-screen pb-24">
    <AppHeader title="Settings" show-back />

    <div class="px-4 pt-6">
      <!-- Profile card -->
      <div class="bg-white rounded-3xl p-5 flex items-center gap-4 mb-6 shadow-sm">
        <div class="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <UserCircle class="w-12 h-12 text-primary" />
        </div>
        <div class="flex-1">
          <p class="font-bold text-gray-900 text-lg">{{ user?.username || 'User' }}</p>
          <p class="text-sm text-gray-500">{{ user?.email }}</p>
        </div>
        <button @click="$router.push('/checkout/profile')" class="p-2 rounded-full bg-surface hover:bg-primary/10">
          <Edit class="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <!-- Settings groups -->
      <div v-for="group in settingsGroups" :key="group.title" class="mb-5">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">{{ group.title }}</p>
        <div class="bg-white rounded-3xl overflow-hidden shadow-sm divide-y divide-gray-50">
          <button
            v-for="item in group.items"
            :key="item.label"
            @click="item.action"
            class="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
          >
            <div class="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0" :class="item.iconBg">
              <component :is="item.icon" class="w-5 h-5" :class="item.iconColor" />
            </div>
            <span class="flex-1 text-sm font-semibold text-gray-800">{{ item.label }}</span>
            <ChevronRight class="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      <!-- Logout -->
      <button
        @click="handleLogout"
        class="w-full flex items-center justify-center gap-2 bg-red-50 text-primary font-bold py-4 rounded-3xl mt-2 hover:bg-red-100 transition-colors"
      >
        <LogOut class="w-5 h-5" /> Log Out
      </button>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { UserCircle, Edit, ChevronRight, ShoppingBag, Heart, Bell, Shield, HelpCircle, LogOut, MapPin, CreditCard } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()
const userStore = useUserStore()
const user = computed(() => userStore.user)

const settingsGroups = [
  {
    title: 'Account',
    items: [
      { label: 'My Orders', icon: ShoppingBag, iconBg: 'bg-blue-50', iconColor: 'text-blue-500', action: () => router.push('/cart') },
      { label: 'My Wishlist', icon: Heart, iconBg: 'bg-red-50', iconColor: 'text-red-500', action: () => router.push('/wishlist') },
      { label: 'Delivery Address', icon: MapPin, iconBg: 'bg-green-50', iconColor: 'text-green-500', action: () => router.push('/checkout/address') },
      { label: 'Payment Methods', icon: CreditCard, iconBg: 'bg-purple-50', iconColor: 'text-purple-500', action: () => router.push('/checkout/payment') },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { label: 'Notifications', icon: Bell, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500', action: () => {} },
      { label: 'Privacy & Security', icon: Shield, iconBg: 'bg-gray-50', iconColor: 'text-gray-500', action: () => {} },
      { label: 'Help & Support', icon: HelpCircle, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-500', action: () => {} },
    ],
  },
]

function handleLogout() {
  userStore.logout()
  router.push('/auth/signin')
}
</script>
