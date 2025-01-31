<script setup lang="ts">
let onLoginClick = () => {
  window.location.href = 'http://localhost:3000/api/v1/auth/discord'
}

// let token = localStorage.getItem('token')
</script>

<template>
  <div style="text-align: center; padding-top: 20px">
    <button @click="onLoginClick()">
      <h3>LOGIN</h3>
    </button>
  </div>
</template>
