import { ref, onMounted } from 'vue'
import { apiService } from '@/services/api'

export function useApiHealth() {
  const isApiHealthy = ref(true)
  const isChecking = ref(false)
  const lastCheckTime = ref<Date | null>(null)
  const checkInterval = ref<NodeJS.Timeout | null>(null)

  const checkApiHealth = async () => {
    if (isChecking.value) return

    isChecking.value = true
    console.log('🔍 Checking API health...')

    try {
      const healthy = await apiService.checkHealth()
      isApiHealthy.value = healthy
      lastCheckTime.value = new Date()
      
      if (healthy) {
        console.log('✅ API is healthy')
      } else {
        console.warn('⚠️ API health check failed')
      }
    } catch (error) {
      console.error('❌ API health check error:', error)
      isApiHealthy.value = false
      lastCheckTime.value = new Date()
    } finally {
      isChecking.value = false
    }
  }

  const startHealthMonitoring = (intervalMs = 30000) => {
    // Check immediately
    checkApiHealth()
    
    // Then check periodically
    checkInterval.value = setInterval(checkApiHealth, intervalMs)
  }

  const stopHealthMonitoring = () => {
    if (checkInterval.value) {
      clearInterval(checkInterval.value)
      checkInterval.value = null
    }
  }

  onMounted(() => {
    // Start monitoring when component mounts
    startHealthMonitoring()
  })

  return {
    isApiHealthy,
    isChecking,
    lastCheckTime,
    checkApiHealth,
    startHealthMonitoring,
    stopHealthMonitoring
  }
}