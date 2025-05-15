<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const token = route.query.token
  const refreshToken = route.query.refreshToken
  if (token) {
    try {
      await authStore.processToken(token as string, refreshToken as string)
      router.push('/') // Redirect to home after processing
    } catch (error) {
      console.error('Failed to process token:', error)
      router.push('/login') // Redirect to login on failure
    }
  } else {
    router.push('/login') // Redirect if no token is found
  }
})
</script>

<template>
  <div>
    <h1>Auth Callback</h1>
  </div>
</template>
