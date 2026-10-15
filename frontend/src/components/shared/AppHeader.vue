<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.store'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

let authStore = useAuthStore()
let dummyCounter = ref(0)
let drawer = ref(false)
let userMenu = ref(false)
const activeIndex = ref('1')

const handleSelect = (key: string, keyPath: string[]) => {
  dummyCounter.value++
}

let onLoginClick = () => {
  window.location.href = 'http://localhost:3000/api/v1/auth/discord'
}

const getRandomPlaceholderIcon = () => {
  const randomNum = Math.floor(Math.random() * 4) + 1
  return `@/assets/placeholder-icons/icon_${String(randomNum).padStart(2, '0')}.png`
}

let logout = () => {
  // token.value = ''
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  window.location.reload()
}
</script>

<template>
  <header class="flex items-center justify-between px-4 py-2 bg-background shadow">
    <div class="flex items-center gap-2">
      <!-- <Avatar :src="profilePicture" alt="Logo" /> -->
      <span class="font-bold text-lg">Lift It</span>
      <Button variant="ghost">Home</Button>
      <Button variant="ghost">About</Button>
      <Button variant="ghost">Contact</Button>
    </div>
    <nav class="hidden md:flex gap-4" v-if="authStore.isAuthenticated">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Avatar :src="getRandomPlaceholderIcon()" alt="Logo" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>My Account</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  </header>
</template>

<style scoped>
.header {
  font-family: 'Roboto Mono', monospace;
}
</style>
