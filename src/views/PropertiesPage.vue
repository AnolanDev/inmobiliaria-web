<template>
  <AppLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Propiedades</h1>
        <p class="text-gray-600">Encuentra la propiedad perfecta para ti</p>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-gray-600">Cargando propiedades...</span>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <p class="mt-2 text-red-600">{{ error }}</p>
          <BaseButton @click="propertiesStore.fetchProperties()" variant="outline" class="mt-4">
            Reintentar
          </BaseButton>
        </div>
      </div>
      
      <!-- Properties Grid -->
      <div v-else-if="properties.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PropertyCard v-for="property in properties" :key="property.id" :property="property" />
      </div>
      
      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        <p class="mt-2 text-gray-600">No se encontraron propiedades disponibles.</p>
        <p class="text-sm text-gray-500 mt-1">Intenta ajustar tus filtros de búsqueda.</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePropertiesStore } from '@/stores/properties'
import { storeToRefs } from 'pinia'
import AppLayout from '@/components/AppLayout.vue'
import PropertyCard from '@/components/PropertyCard.vue'
import BaseButton from '@/components/BaseButton.vue'

const propertiesStore = usePropertiesStore()
const { properties, loading, error } = storeToRefs(propertiesStore)

onMounted(() => {
  propertiesStore.fetchProperties()
})
</script>