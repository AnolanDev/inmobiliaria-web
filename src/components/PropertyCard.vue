<template>
  <RouterLink
    :to="`/propiedades/${property.id}`"
    class="block transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-xl"
  >
    <BaseCard hover class="h-full">
      <template #image>
        <ResponsiveImage
          :src="processedCoverImage || processedImageUrl"
          :alt="property.title"
          :fallback="processedImageUrl || '/placeholder-property.svg'"
          container-class="relative"
          image-class="w-full h-48 sm:h-52"
          :enable-hover-zoom="true"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          @load="handleImageLoad"
          @error="handleImageError"
        >
          <template #overlay>
            <div class="absolute top-2 left-2 sm:top-3 sm:left-3">
              <span
                class="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 backdrop-blur-sm"
              >
                {{ property.category }}
              </span>
            </div>
            <div class="absolute top-2 right-2 sm:top-3 sm:right-3">
              <span
                class="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 backdrop-blur-sm"
              >
                {{ property.type }}
              </span>
            </div>
          </template>
        </ResponsiveImage>
      </template>

      <div class="space-y-3 flex flex-col flex-1">
        <div class="flex-1">
          <h3
            class="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 leading-tight"
          >
            {{ property.title }}
          </h3>
          <p
            class="text-sm text-gray-600 mt-1 truncate"
            :title="`${property.address}, ${property.city}`"
          >
            {{ property.address }}, {{ property.city }}
          </p>
        </div>

        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="text-lg sm:text-2xl font-bold text-primary-600 min-w-0">
            <span class="truncate">${{ formatPrice(property.price) }}</span>
          </div>
          <div class="text-sm text-gray-500 flex-shrink-0">
            {{ property.area }}m²
          </div>
        </div>

        <div
          class="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2"
        >
          <div class="flex items-center space-x-3 sm:space-x-4 min-w-0">
            <div class="flex items-center space-x-1 flex-shrink-0">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z"
                ></path>
              </svg>
              <span>{{ property.bedrooms }}</span>
            </div>
            <div class="flex items-center space-x-1 flex-shrink-0">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
              <span>{{ property.bathrooms }}</span>
            </div>
          </div>

          <div
            v-if="property.agent"
            class="text-xs text-right flex-shrink-0 truncate max-w-[120px]"
            :title="`Agente: ${property.agent.name}`"
          >
            Agente: {{ property.agent.name }}
          </div>
        </div>

        <div class="pt-3 border-t border-gray-200 mt-auto">
          <BaseButton
            variant="primary"
            size="md"
            class="w-full text-sm sm:text-base"
          >
            Ver Detalles
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { computed } from "vue";
import type { Property } from "@/types";
import BaseCard from "./BaseCard.vue";
import BaseButton from "./BaseButton.vue";
import ResponsiveImage from "./ResponsiveImage.vue";
import { ApiService } from "@/services/api";

interface Props {
  property: Property;
}

const props = defineProps<Props>();

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-ES").format(price);
};

// Process image URLs using API service
const processedCoverImage = computed(() => {
  const responsive = props.property.cover_image_responsive;
  if (responsive) {
    return ApiService.processResponsiveImageSet(responsive);
  }
  return null;
});

const processedImageUrl = computed(() => {
  return ApiService.getProxyImageUrl(props.property.cover_image_url);
});

// Image event handlers
const handleImageLoad = (src: string) => {
  console.log('✅ PropertyCard image loaded:', src);
  console.log('🏠 Property data:', {
    id: props.property.id,
    title: props.property.title,
    original_url: props.property.cover_image_url,
    processed_url: processedImageUrl.value,
    responsive_set: props.property.cover_image_responsive,
    processed_responsive: processedCoverImage.value
  });
};

const handleImageError = (error: Error) => {
  console.warn('❌ PropertyCard image error:', error.message);
  console.log('🏠 Property data on error:', {
    id: props.property.id,
    title: props.property.title,
    original_url: props.property.cover_image_url,
    processed_url: processedImageUrl.value,
    responsive_set: props.property.cover_image_responsive,
    processed_responsive: processedCoverImage.value
  });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
