<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './components/shared/AppHeader.vue'
import AppFooter from './components/shared/AppFooter.vue'
import { useAuthStore } from './stores/auth.store'

let authStore = useAuthStore()

let onLoginClick = () => {
  window.location.href = 'http://localhost:3000/api/v1/auth/discord'
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
