<template>
  <div
    class="group relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-depth hover:shadow-depth-lg transition-all duration-700 border border-white/30 hover:border-caribbean-300/50 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
  >
    <!-- Project Image -->
    <div class="relative h-64 overflow-hidden rounded-t-3xl">
      <HeroImage
        :image-url="getImageUrl(project.cover_image_url)"
        :alt="`${project.name} - Proyecto ${project.type}`"
        aspect-ratio="16/9"
        :lazy="true"
        overlay="gradient"
        :badge="project.type || 'Proyecto'"
        :show-view-button="true"
        :fallback-text="`${project.name} - ${project.type}`"
        class="h-full rounded-t-3xl"
        @view="$emit('view', project.id)"
        @load="handleImageLoad"
        @error="handleImageError"
      />

      <!-- Quick Stats Overlay -->
      <div class="absolute bottom-4 left-4 right-4">
        <div class="flex items-center justify-between" v-if="project.property_count">
          <!-- Property Count -->
          <div
            class="bg-white/90 backdrop-blur-lg rounded-full px-3 py-2 shadow-soft"
          >
            <span class="text-sm font-bold text-neutral-900">{{
              project.property_count
            }}</span>
            <span class="text-xs text-neutral-600 font-medium"> propiedades</span>
          </div>

          <!-- Project Status -->
          <div
            v-if="project.status"
            class="bg-white/90 backdrop-blur-lg rounded-full px-3 py-2 shadow-soft"
          >
            <span class="text-xs font-medium text-neutral-700">{{
              project.status
            }}</span>
          </div>
        </div>
      </div>

      <!-- Gallery Indicator -->
      <div 
        v-if="hasGallery" 
        class="absolute top-4 right-4 bg-white/90 backdrop-blur-lg rounded-full px-2 py-1 shadow-soft"
      >
        <div class="flex items-center">
          <svg class="w-3 h-3 text-caribbean-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span class="text-xs font-semibold text-neutral-700">{{ galleryCount }}</span>
        </div>
      </div>
    </div>

    <!-- Project Info -->
    <div class="p-6">
      <!-- Header -->
      <div class="mb-4">
        <h3
          class="text-xl font-bold text-neutral-900 group-hover:text-caribbean-700 transition-colors duration-300 mb-2"
        >
          {{ project.name }}
        </h3>
        <div class="flex items-center text-sm text-neutral-500 mb-3">
          <svg
            class="w-4 h-4 mr-2 text-caribbean-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span class="font-medium">{{
            project.city || project.location
          }}</span>
          <span class="mx-2">•</span>
          <span>{{ project.state || "Costa Caribe" }}</span>
        </div>
      </div>

      <p class="text-neutral-600 mb-6 line-clamp-2 leading-relaxed">
        {{ project.description }}
      </p>

      <!-- Features Grid - Only show real data -->
      <div class="grid gap-4 mb-6" :class="getGridCols()">
        <div
          v-if="project.property_count"
          class="text-center p-3 bg-gradient-to-br from-caribbean-50 to-aqua-50 rounded-xl border border-caribbean-100/50"
        >
          <div
            class="text-lg font-bold bg-gradient-to-r from-caribbean-600 to-aqua-600 bg-clip-text text-transparent"
          >
            {{ project.property_count }}
          </div>
          <div
            class="text-xs text-caribbean-700 font-medium uppercase tracking-wide"
          >
            Unidades
          </div>
        </div>

        <div
          v-if="project.type"
          class="text-center p-3 bg-gradient-to-br from-nature-50 to-sand-50 rounded-xl border border-nature-100/50"
        >
          <div
            class="text-sm font-bold bg-gradient-to-r from-nature-600 to-sand-600 bg-clip-text text-transparent"
          >
            {{ project.type }}
          </div>
          <div
            class="text-xs text-nature-700 font-medium uppercase tracking-wide"
          >
            Tipo
          </div>
        </div>

        <div
          v-if="project.status"
          class="text-center p-3 bg-gradient-to-br from-coral-50 to-sand-50 rounded-xl border border-coral-100/50"
        >
          <div
            class="text-sm font-bold bg-gradient-to-r from-coral-600 to-sand-600 bg-clip-text text-transparent"
          >
            {{ project.status }}
          </div>
          <div
            class="text-xs text-coral-700 font-medium uppercase tracking-wide"
          >
            Estado
          </div>
        </div>
      </div>

      <!-- Amenities - Only show if provided -->
      <div v-if="amenities && amenities.length > 0" class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="amenity in displayAmenities"
          :key="amenity"
          class="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-full"
        >
          {{ amenity }}
        </span>
      </div>

      <!-- CTA Button -->
      <button
        @click="$emit('view-details', project.id)"
        class="w-full bg-gradient-to-r from-caribbean-500 to-aqua-500 hover:from-caribbean-600 hover:to-aqua-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-soft hover:shadow-glow group/btn"
      >
        <span class="flex items-center justify-center">
          Ver Proyecto Completo
          <svg
            class="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </span>
      </button>
    </div>

    <!-- Floating decorations -->
    <div
      class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-sand-400 to-coral-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce-gentle"
    ></div>

    <!-- Investment indicator -->
    <div v-if="highROI" class="absolute top-4 left-4">
      <div
        class="px-2 py-1 bg-nature-500 text-white text-xs font-bold rounded-full shadow-nature-glow animate-pulse-soft"
      >
        TOP ROI
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import HeroImage from "../Hero/HeroImage.vue";
import type { Project } from "@/types";
import { ApiService } from "@/services/api";

interface Props {
  project: Project;
  rating?: number;
  roi?: number;
  minPrice?: number;
  propertiesCount?: number;
  deliveryYear?: string | number;
  amenities?: string[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  view: [id: number];
  viewDetails: [id: number];
}>();

const formatPrice = (price: number): string => {
  if (price >= 1000000000) {
    return `$${(price / 1000000000).toFixed(0)}MM`;
  } else if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(0)}M`;
  }
  return `$${price.toLocaleString()}`;
};

const displayAmenities = computed(() => {
  return props.amenities ? props.amenities.slice(0, 4) : [];
});

const getGridCols = () => {
  const itemsCount = [
    props.project.property_count,
    props.project.type,
    props.project.status
  ].filter(Boolean).length;
  
  if (itemsCount === 1) return 'grid-cols-1';
  if (itemsCount === 2) return 'grid-cols-2';
  return 'grid-cols-3';
};

const hasGallery = computed(() => {
  return props.project.gallery_urls && props.project.gallery_urls.length > 0;
});

const galleryCount = computed(() => {
  return props.project.gallery_urls ? props.project.gallery_urls.length : 0;
});

// Use API service for URL processing
const getImageUrl = (url: string | null | undefined): string => {
  const processed = ApiService.getProxyImageUrl(url);
  return processed || "/placeholder-project.svg";
};

const handleImageLoad = () => {
  console.log(`✅ Imagen cargada para proyecto: ${props.project.name}`);
  console.log(`🔗 URL exitosa: ${getImageUrl(props.project.cover_image_url)}`);
};

const handleImageError = () => {
  console.log(`❌ Error cargando imagen para proyecto: ${props.project.name}`);
  console.log(`🔗 URL fallida: ${getImageUrl(props.project.cover_image_url)}`);
  console.log(`📊 Datos completos del proyecto:`, {
    id: props.project.id,
    name: props.project.name,
    type: props.project.type,
    cover_image_url: props.project.cover_image_url,
    converted_url: getImageUrl(props.project.cover_image_url),
    gallery_urls: props.project.gallery_urls
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
