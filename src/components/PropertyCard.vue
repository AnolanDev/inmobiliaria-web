<template>
  <RouterLink :to="`/propiedades/${property.id}`" class="block transition-transform duration-200 hover:scale-105">
    <BaseCard hover>
    <template #image>
      <div class="relative">
        <img 
          :src="property.cover_image_url" 
          :alt="property.title"
          class="w-full h-48 object-cover"
          loading="lazy"
        />
        <div class="absolute top-3 left-3">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {{ property.category }}
          </span>
        </div>
        <div class="absolute top-3 right-3">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800">
            {{ property.type }}
          </span>
        </div>
      </div>
    </template>

    <div class="space-y-3">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
          {{ property.title }}
        </h3>
        <p class="text-sm text-gray-600 mt-1">
          {{ property.address }}, {{ property.city }}
        </p>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold text-primary-600">
          ${{ formatPrice(property.price) }}
        </div>
        <div class="text-sm text-gray-500">
          {{ property.area }}m²
        </div>
      </div>

      <div class="flex items-center justify-between text-sm text-gray-600">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z"></path>
            </svg>
            <span>{{ property.bedrooms }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            <span>{{ property.bathrooms }}</span>
          </div>
        </div>

        <div v-if="property.agent" class="text-xs">
          Agente: {{ property.agent.name }}
        </div>
      </div>

      <div class="pt-3 border-t border-gray-200">
        <BaseButton variant="primary" class="w-full">
          Ver Detalles
        </BaseButton>
      </div>
    </div>
    </BaseCard>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Property } from '@/types'
import BaseCard from './BaseCard.vue'
import BaseButton from './BaseButton.vue'

interface Props {
  property: Property
}

defineProps<Props>()

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES').format(price)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>