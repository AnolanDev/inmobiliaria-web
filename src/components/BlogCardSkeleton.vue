<template>
  <div
    class="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse"
  >
    <!-- Image Skeleton -->
    <div class="h-48 sm:h-52 md:h-56 bg-gray-200"></div>

    <!-- Content Skeleton -->
    <div class="p-4 space-y-3">
      <!-- Title -->
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      <!-- Author and Date -->
      <div class="flex items-center space-x-3">
        <div class="w-4 h-4 bg-gray-200 rounded-full"></div>
        <div class="h-3 bg-gray-200 rounded w-20"></div>
        <div class="h-3 bg-gray-200 rounded w-16"></div>
      </div>

      <!-- Excerpt -->
      <div class="space-y-2">
        <div class="h-3 bg-gray-200 rounded w-full"></div>
        <div class="h-3 bg-gray-200 rounded w-4/5"></div>
      </div>

      <!-- Tags -->
      <div class="flex space-x-2">
        <div class="h-6 bg-gray-200 rounded-full w-12"></div>
        <div class="h-6 bg-gray-200 rounded-full w-16"></div>
        <div class="h-6 bg-gray-200 rounded-full w-10"></div>
      </div>

      <!-- Stats -->
      <div class="flex justify-between items-center pt-2">
        <div class="flex space-x-4">
          <div class="h-3 bg-gray-200 rounded w-12"></div>
          <div class="h-3 bg-gray-200 rounded w-8"></div>
        </div>
        <div class="h-3 bg-gray-200 rounded w-16"></div>
      </div>

      <!-- Button -->
      <div class="pt-3 border-t border-gray-200">
        <div class="h-9 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for skeleton
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
