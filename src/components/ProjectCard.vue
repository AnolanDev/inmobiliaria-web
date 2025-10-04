<template>
  <RouterLink
    :to="`/proyectos/${project.id}`"
    class="block transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-xl"
  >
    <BaseCard hover class="h-full">
      <template #image>
        <ResponsiveImage
          :src="project.cover_image_responsive || project.cover_image_url"
          :alt="project.name"
          :fallback="project.cover_image_url || '/placeholder-project.svg'"
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
                :class="getTypeColorClass(project.type)"
                class="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium backdrop-blur-sm"
              >
                {{ project.type }}
              </span>
            </div>
            <div class="absolute top-2 right-2 sm:top-3 sm:right-3">
              <span
                :class="getStatusColorClass(project.status)"
                class="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium backdrop-blur-sm"
              >
                {{ project.status }}
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
            {{ project.name }}
          </h3>

          <!-- Project Type -->
          <div class="mb-1" v-if="project.type">
            <p
              class="text-xs font-medium text-primary-600 uppercase tracking-wide"
            >
              {{ project.type }}
            </p>
          </div>

          <!-- Location Information -->
          <div
            class="flex items-center mt-1 mb-2"
            v-if="project.city || project.state || project.location"
          >
            <svg
              class="w-4 h-4 text-gray-500 mr-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
              />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p class="text-sm text-gray-600 truncate">
              <span v-if="project.location">{{ project.location }}</span>
              <span v-else>
                <span v-if="project.city">{{ project.city }}</span
                ><span v-if="project.city && project.state">, </span
                ><span v-if="project.state">{{ project.state }}</span>
              </span>
            </p>
          </div>

          <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {{ project.description }}
          </p>
        </div>

        <div
          class="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2"
        >
          <div class="flex items-center space-x-1 min-w-0">
            <svg
              class="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
            <span class="truncate"
              >{{ project.property_count }} propiedades</span
            >
          </div>

          <div v-if="project.agent" class="text-xs text-right flex-shrink-0">
            {{ project.agent.name }}
          </div>
        </div>

        <div class="pt-3 border-t border-gray-200 mt-auto">
          <BaseButton
            variant="primary"
            size="md"
            class="w-full text-sm sm:text-base"
          >
            Ver Proyecto
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Project } from "@/types";
import BaseCard from "./BaseCard.vue";
import BaseButton from "./BaseButton.vue";
import ResponsiveImage from "./ResponsiveImage.vue";

interface Props {
  project: Project;
}

defineProps<Props>();


// Image event handlers
const handleImageLoad = (src: string) => {
  if (import.meta.env.DEV) {
    console.log('✅ ProjectCard image loaded:', src);
  }
};

const handleImageError = (error: Error) => {
  if (import.meta.env.DEV) {
    console.warn('❌ ProjectCard image error:', error.message);
  }
};

const getTypeColorClass = (type: string): string => {
  switch (type) {
    case "Turísticos":
      return "bg-blue-100 text-blue-800";
    case "Campestres":
      return "bg-green-100 text-green-800";
    case "Urbanos":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColorClass = (status: string): string => {
  switch (status) {
    case "Disponible":
      return "bg-green-100 text-green-800";
    case "Reservado":
      return "bg-yellow-100 text-yellow-800";
    case "Vendido":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
