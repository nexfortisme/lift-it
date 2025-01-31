import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useAuthStore = defineStore('auth', () => {

  const token = ref<string | null>(localStorage.getItem('token') || null);
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken') || null);

  const user = ref<any | null>(null);
  const userPicture = computed(() => {
    const parsedToken: { user: { id: string; avatar: string } } = jwtDecode(token.value as string)
    return `https://cdn.discordapp.com/avatars/${parsedToken.user.id}/${parsedToken.user.avatar}.png`
  });
  const username = computed(() => {
    const parsedToken: { user: { global_name: string } } = jwtDecode(token.value as string)
    return parsedToken.user.global_name
  })

  const isAuthenticated = computed(() => {
    return token.value !== null && refreshToken.value !== null
  });

  async function processToken(parseToken: string, parseRefreshToken: string) {
    try {
      token.value = parseToken
      refreshToken.value = parseRefreshToken

      localStorage.setItem('token', parseToken)
      localStorage.setItem('refreshToken', parseRefreshToken)
    } catch (error) {
      console.error('Error processing token:', error)
      throw new Error('Token processing failed')
    }
  }

  async function login(code: string) {

  }

  async function logout() {

  }

  return {
    token,
    refreshToken,
    user,
    userPicture,
    username,
    isAuthenticated,
    processToken,
    login,
    logout
  }

})
