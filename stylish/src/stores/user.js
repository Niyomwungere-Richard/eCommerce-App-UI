import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => user.value !== null)

  function login(credentials) {
    user.value = {
      id: 1,
      email: credentials.email || 'aashifa@gmail.com',
      username: credentials.username || 'Aashifa',
      avatar: null,
      address: {
        pincode: '450116',
        address: '216 St Paul\'s Rd,',
        city: 'London',
        state: 'N1 2LL,',
        country: 'United Kingdom',
        contact: '+44-784232',
      },
      bankAccount: {
        number: '204356XXXXXXXX',
        holder: 'Abhiraj Sisodiya',
        ifsc: 'SBIN00428',
      },
    }
  }

  function signup(data) {
    user.value = {
      id: 1,
      email: data.email,
      username: data.username || data.email,
      avatar: null,
      address: {},
      bankAccount: {},
    }
  }

  function logout() {
    user.value = null
  }

  function updateProfile(data) {
    if (user.value) {
      user.value = { ...user.value, ...data }
    }
  }

  return { user, isAuthenticated, login, signup, logout, updateProfile }
})
