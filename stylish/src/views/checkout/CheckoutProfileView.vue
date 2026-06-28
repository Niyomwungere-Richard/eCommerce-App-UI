<template>
  <div class="bg-white min-h-screen pb-10">
    <AppHeader title="Checkout" show-back />

    <div class="px-4 pt-6">
      <!-- Avatar -->
      <div class="flex justify-center mb-6">
        <div class="relative">
          <div class="w-24 h-24 rounded-full bg-pink-100 overflow-hidden flex items-center justify-center">
            <UserCircle class="w-20 h-20 text-pink-300" />
          </div>
          <button class="absolute bottom-0 right-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow">
            <Pencil class="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <!-- Personal Details -->
      <SectionTitle>Personal Details</SectionTitle>
      <div class="flex flex-col gap-3 mb-6">
        <FieldGroup label="Email Address">
          <input v-model="form.email" type="email" class="field-input" />
        </FieldGroup>
        <FieldGroup label="Password">
          <div class="relative">
            <input type="password" value="***********" readonly class="field-input pr-36" />
            <button class="absolute right-3 top-1/2 -translate-y-1/2 text-primary text-xs font-bold">Change Password</button>
          </div>
        </FieldGroup>
      </div>

      <div class="h-px bg-gray-100 my-4" />

      <!-- Business Address -->
      <SectionTitle>Business Address Details</SectionTitle>
      <div class="flex flex-col gap-3 mb-6">
        <FieldGroup label="Pincode">
          <input v-model="form.pincode" class="field-input" placeholder="Pincode" />
        </FieldGroup>
        <FieldGroup label="Address">
          <input v-model="form.address" class="field-input" placeholder="Address" />
        </FieldGroup>
        <FieldGroup label="City">
          <input v-model="form.city" class="field-input" placeholder="City" />
        </FieldGroup>
        <FieldGroup label="State">
          <div class="relative">
            <input v-model="form.state" class="field-input pr-10" placeholder="State" />
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </FieldGroup>
        <FieldGroup label="Country">
          <input v-model="form.country" class="field-input" placeholder="Country" />
        </FieldGroup>
      </div>

      <div class="h-px bg-gray-100 my-4" />

      <!-- Bank Account -->
      <SectionTitle>Bank Account Details</SectionTitle>
      <div class="flex flex-col gap-3 mb-8">
        <FieldGroup label="Bank Account Number">
          <input v-model="form.bankAccount" class="field-input" placeholder="Account Number" />
        </FieldGroup>
        <FieldGroup label="Account Holder's Name">
          <input v-model="form.accountHolder" class="field-input" placeholder="Full Name" />
        </FieldGroup>
        <FieldGroup label="IFSC Code">
          <input v-model="form.ifsc" class="field-input" placeholder="IFSC Code" />
        </FieldGroup>
      </div>

      <AppButton variant="primary" block size="lg" @click="save">Save</AppButton>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserCircle, Pencil, ChevronDown } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import AppHeader from '@/components/AppHeader.vue'
import AppButton from '@/components/AppButton.vue'

const SectionTitle = { props: ['children'], template: `<h2 class="font-bold text-gray-900 text-base mb-3"><slot /></h2>` }
const FieldGroup = { props: ['label'], template: `<div><label class="text-xs text-gray-500 font-medium mb-1 block">{{ label }}</label><slot /></div>` }

const router = useRouter()
const userStore = useUserStore()
const u = userStore.user

const form = reactive({
  email: u?.email || '',
  pincode: u?.address?.pincode || '450116',
  address: u?.address?.address || '216 St Paul\'s Rd,',
  city: u?.address?.city || 'London',
  state: u?.address?.state || 'N1 2LL,',
  country: u?.address?.country || 'United Kingdom',
  bankAccount: u?.bankAccount?.number || '204356XXXXXXXX',
  accountHolder: u?.bankAccount?.holder || 'Abhiraj Sisodiya',
  ifsc: u?.bankAccount?.ifsc || 'SBIN00428',
})

function save() {
  userStore.updateProfile({
    email: form.email,
    address: { pincode: form.pincode, address: form.address, city: form.city, state: form.state, country: form.country },
    bankAccount: { number: form.bankAccount, holder: form.accountHolder, ifsc: form.ifsc },
  })
  router.back()
}
</script>

<style scoped>
.field-input {
  @apply w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-primary/30 transition-all;
}
</style>
