import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))
  const totalAmount = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  )
  const shipping = computed(() => (totalAmount.value > 0 ? 30 : 0))
  const grandTotal = computed(() => totalAmount.value + shipping.value)

  function addItem(product, { size = null, color = null, qty = 1 } = {}) {
    const key = `${product.id}-${size}-${color}`
    const existing = items.value.find((i) => i.key === key)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({
        key,
        id: product.id,
        name: product.name,
        subtitle: product.subtitle,
        image: product.images?.[0] ?? product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        rating: product.rating,
        size,
        color,
        qty,
        deliveryDate: getDeliveryDate(),
      })
    }
  }

  function removeItem(key) {
    items.value = items.value.filter((i) => i.key !== key)
  }

  function updateQty(key, qty) {
    const item = items.value.find((i) => i.key === key)
    if (item) {
      if (qty <= 0) removeItem(key)
      else item.qty = qty
    }
  }

  function clearCart() {
    items.value = []
  }

  function getDeliveryDate() {
    const d = new Date()
    d.setDate(d.getDate() + 5)
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return { items, totalItems, totalAmount, shipping, grandTotal, addItem, removeItem, updateQty, clearCart }
})
