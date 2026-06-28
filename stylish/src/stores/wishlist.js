import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])

  const count = computed(() => items.value.length)

  function isWishlisted(productId) {
    return items.value.some((i) => i.id === productId)
  }

  function toggle(product) {
    if (isWishlisted(product.id)) {
      items.value = items.value.filter((i) => i.id !== product.id)
    } else {
      items.value.push({ ...product })
    }
  }

  function remove(productId) {
    items.value = items.value.filter((i) => i.id !== productId)
  }

  return { items, count, isWishlisted, toggle, remove }
})
