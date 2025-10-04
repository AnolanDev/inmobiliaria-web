import { defineStore } from "pinia";
import { ref } from "vue";
import type { Agent } from "@/types";
import { apiService } from "@/services/api";

export const useAgentsStore = defineStore("agents", () => {
  const agents = ref<Agent[]>([]);
  const currentAgent = ref<Agent | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const lastFetch = ref<number>(0);
  const CACHE_TIME = 10 * 60 * 1000; // 10 minutes cache (agents change less frequently)

  const fetchAgents = async (forceRefresh = false) => {
    // Return cached data if available and not forcing refresh
    const now = Date.now();
    if (!forceRefresh && agents.value.length > 0 && (now - lastFetch.value) < CACHE_TIME) {
      return Promise.resolve(agents.value);
    }

    loading.value = true;
    error.value = null;

    try {
      agents.value = await apiService.getAgents();
      lastFetch.value = now;
      return agents.value;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error al cargar agentes";
      console.error("Error fetching agents:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchAgent = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      currentAgent.value = await apiService.getAgent(id);
    } catch (err: any) {
      if (err.response?.status === 404) {
        error.value = "Agente no encontrado";
      } else if (err.response?.status === 500) {
        error.value = "Error del servidor al cargar el agente";
      } else {
        error.value = err.response?.data?.message || "Error al cargar agente";
      }
      console.error("Error fetching agent:", err);
      currentAgent.value = null;
    } finally {
      loading.value = false;
    }
  };

  const clearCurrentAgent = () => {
    currentAgent.value = null;
  };

  return {
    agents,
    currentAgent,
    loading,
    error,
    fetchAgents,
    fetchAgent,
    clearCurrentAgent,
  };
});
