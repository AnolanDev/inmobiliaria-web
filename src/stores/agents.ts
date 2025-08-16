import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Agent } from '@/types'
import { apiService } from '@/services/api'

export const useAgentsStore = defineStore('agents', () => {
  const agents = ref<Agent[]>([])
  const currentAgent = ref<Agent | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAgents = async () => {
    loading.value = true
    error.value = null
    
    try {
      agents.value = await apiService.getAgents()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar agentes'
      console.error('Error fetching agents:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchAgent = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      currentAgent.value = await apiService.getAgent(id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar agente'
      console.error('Error fetching agent:', err)
    } finally {
      loading.value = false
    }
  }

  const clearCurrentAgent = () => {
    currentAgent.value = null
  }

  return {
    agents,
    currentAgent,
    loading,
    error,
    fetchAgents,
    fetchAgent,
    clearCurrentAgent
  }
})