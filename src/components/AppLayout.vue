<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
</script>

<style scoped>
.main-content {
  padding-top: clamp(
    72px,
    10vw,
    80px
  ); /* Responsive padding for fixed header */
  min-height: calc(100vh - clamp(72px, 10vw, 80px));
  background-color: #ffffff;
}

/* Ensure proper spacing on mobile devices */
@media (max-width: 768px) {
  .main-content {
    padding-top: 68px; /* Account for mobile header height */
    min-height: calc(100vh - 68px);
  }
}

@media (max-width: 480px) {
  .main-content {
    padding-top: 64px; /* Exact mobile header height */
    min-height: calc(100vh - 64px);
  }
}
</style>
