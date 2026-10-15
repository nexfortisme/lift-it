<script setup lang="ts">
import { Button } from '@/components/ui/button'

let onLoginClick = () => {
  // TODO: Add this to .env
  window.location.href = 'http://localhost:3000/api/v1/auth/discord'
}

// let token = localStorage.getItem('token')
</script>

<template>
  <div style="text-align: center; padding-top: 20px">
    <Button @click="onLoginClick()" variant="outline">
      <h3>LOGIN</h3>
    </Button>
  </div>
</template>
