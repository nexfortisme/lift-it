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
  <v-app>
    <AppHeader v-if="authStore.isAuthenticated" />
    <v-main>
      <RouterView />
    </v-main>
    <v-footer>
      <AppFooter />
    </v-footer>
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}

footer {
  margin-top: auto;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
