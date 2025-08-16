import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FilterOptions, PropertyFilters, ProjectFilters } from '@/types'
import { apiService } from '@/services/api'

export const useFiltersStore = defineStore('filters', () => {
  // Filter options from API
  const filterOptions = ref<FilterOptions | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Active filters
  const propertyFilters = ref<PropertyFilters>({})
  const projectFilters = ref<ProjectFilters>({})

  // Computed getters
  const propertyTypes = computed(() => filterOptions.value?.property_types || [])
  const propertyCategories = computed(() => filterOptions.value?.property_categories || [])
  const projectTypes = computed(() => filterOptions.value?.project_types || [])
  const cities = computed(() => filterOptions.value?.cities || [])
  const bedrooms = computed(() => filterOptions.value?.bedrooms || [])
  const bathrooms = computed(() => filterOptions.value?.bathrooms || [])
  const priceRanges = computed(() => filterOptions.value?.price_ranges || [])

  const hasActivePropertyFilters = computed(() => {
    return Object.keys(propertyFilters.value).length > 0
  })

  const hasActiveProjectFilters = computed(() => {
    return Object.keys(projectFilters.value).length > 0
  })

  // Actions
  const fetchFilterOptions = async () => {
    loading.value = true
    error.value = null
    
    try {
      filterOptions.value = await apiService.getFilterOptions()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar opciones de filtro'
      console.error('Error fetching filter options:', err)
    } finally {
      loading.value = false
    }
  }

  const setPropertyFilter = (key: keyof PropertyFilters, value: any) => {
    if (value === null || value === undefined || value === '') {
      delete propertyFilters.value[key]
    } else {
      propertyFilters.value[key] = value
    }
  }

  const setProjectFilter = (key: keyof ProjectFilters, value: any) => {
    if (value === null || value === undefined || value === '') {
      delete projectFilters.value[key]
    } else {
      projectFilters.value[key] = value
    }
  }

  const clearPropertyFilters = () => {
    propertyFilters.value = {}
  }

  const clearProjectFilters = () => {
    projectFilters.value = {}
  }

  const clearAllFilters = () => {
    clearPropertyFilters()
    clearProjectFilters()
  }

  return {
    // State
    filterOptions,
    loading,
    error,
    propertyFilters,
    projectFilters,
    
    // Computed
    propertyTypes,
    propertyCategories,
    projectTypes,
    cities,
    bedrooms,
    bathrooms,
    priceRanges,
    hasActivePropertyFilters,
    hasActiveProjectFilters,
    
    // Actions
    fetchFilterOptions,
    setPropertyFilter,
    setProjectFilter,
    clearPropertyFilters,
    clearProjectFilters,
    clearAllFilters
  }
})