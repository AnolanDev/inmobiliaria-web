import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginForm } from '@/types'
import { apiService } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const login = async (credentials: LoginForm) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiService.login(credentials)
      
      token.value = response.token
      user.value = response.user
      
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      // Redirect to admin panel
      window.location.href = response.admin_url
      
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al iniciar sesión'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    
    try {
      await apiService.logout()
    } catch (err) {
      console.error('Error during logout:', err)
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      loading.value = false
    }
  }

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    initializeAuth
  }
})