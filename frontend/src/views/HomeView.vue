<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'

let authStore = useAuthStore()

let onLogoutClick = () => {
  authStore.logout()
}

const getRandomPlaceholderIcon = () => {
  const randomNum = Math.floor(Math.random() * 4) + 1
  return `/src/assets/placeholder-icons/icon_${String(randomNum).padStart(2, '0')}.png`
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <img :src="getRandomPlaceholderIcon()" alt="Logo" class="w-10 h-10" />
  </div>
</template>
