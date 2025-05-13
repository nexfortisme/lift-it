<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

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

let logout = () => {
  // token.value = ''
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  window.location.reload()
}
</script>

<template>
  <v-app-bar color="background" density="compact" elevation="1">
    <template v-slot:prepend>
      <v-app-bar-title>LiftIt</v-app-bar-title>
    </template>

    <v-btn icon @click="drawer = !drawer" class="d-md-none">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-tabs class="d-none d-md-flex">
      <v-tab to="/home">
        <v-icon start>mdi-home</v-icon>
        Home
      </v-tab>
      <v-tab to="/discover">
        <v-icon start>mdi-compass</v-icon>
        Discover
      </v-tab>
    </v-tabs>

    <template v-slot:append>
      <v-menu v-model="userMenu" location="bottom end">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-avatar color="grey-darken-1" size="32">
              <v-icon icon="mdi-account"></v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/profile">
            <template v-slot:prepend>
              <v-icon icon="mdi-account"></v-icon>
            </template>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

          <v-list-item to="/settings">
            <template v-slot:prepend>
              <v-icon icon="mdi-cog"></v-icon>
            </template>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <template v-slot:prepend>
              <v-icon icon="mdi-logout"></v-icon>
            </template>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list>
      <v-list-item to="/home">
        <v-icon start>mdi-home</v-icon>
        Home
      </v-list-item>
      <v-list-item to="/discover">
        <v-icon start>mdi-compass</v-icon>
        Discover
      </v-list-item>
      <v-list-item>
        <v-icon start>mdi-plus</v-icon>
        Add Post
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style>
.el-menu-item {
  font-family: 'Roboto Mono', monospace;
}

.flex-grow {
  flex-grow: 1;
}
</style>
