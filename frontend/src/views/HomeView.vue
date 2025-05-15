<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { useAuthStore } from '../stores/auth.store'

let authStore = useAuthStore()

let onLogoutClick = () => {
  authStore.logout()
}
</script>

<template>
  <main>
    <button @click="onLogoutClick">Logout</button>
    <TheWelcome />
  </main>
</template>
