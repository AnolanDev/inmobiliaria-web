import { defineStore } from "pinia";
import { ref } from "vue";
import type { Property, PropertyFilters, ApiResponse } from "@/types";
import { apiService } from "@/services/api";

export const usePropertiesStore = defineStore("properties", () => {
  const properties = ref<Property[]>([]);
  const currentProperty = ref<Property | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  });

  const fetchProperties = async (filters?: PropertyFilters) => {
    loading.value = true;
    error.value = null;

    try {
      const response: ApiResponse<Property[]> =
        await apiService.getProperties(filters);
      properties.value = response.data;

      if (response.meta) {
        pagination.value = response.meta;
      }
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Error al cargar propiedades";
      console.error("Error fetching properties:", err);
    } finally {
      loading.value = false;
    }
  };

  const fetchProperty = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      currentProperty.value = await apiService.getProperty(id);
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error al cargar propiedad";
      console.error("Error fetching property:", err);
    } finally {
      loading.value = false;
    }
  };

  const clearCurrentProperty = () => {
    currentProperty.value = null;
  };

  return {
    properties,
    currentProperty,
    loading,
    error,
    pagination,
    fetchProperties,
    fetchProperty,
    clearCurrentProperty,
  };
});
