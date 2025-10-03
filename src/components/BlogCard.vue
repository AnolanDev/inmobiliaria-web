<template>
  <RouterLink
    :to="`/blog/${blog.slug}`"
    class="block transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
  >
    <BaseCard hover class="h-full">
      <template #image>
        <div class="relative bg-gray-100">
          <!-- Show actual image if URL exists and is valid -->
          <img
            v-if="blogImageUrl && !imageError"
            :src="blogImageUrl"
            :alt="blog.title"
            class="w-full h-48 sm:h-52 md:h-56 object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
            @error="handleImageError"
            @load="handleImageLoad"
          />

          <!-- Show generated image if no image URL or image failed to load -->
          <BlogImageGenerator
            v-else
            :title="blog.title"
            :category="blog.category"
            class="w-full h-48 sm:h-52 md:h-56"
          />

          <!-- Featured Badge -->
          <div
            v-if="blog.is_featured"
            class="absolute top-2 left-2 sm:top-3 sm:left-3"
          >
            <span
              class="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 backdrop-blur-sm"
            >
              <svg class="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              Destacado
            </span>
          </div>

          <!-- Category Badge -->
          <div class="absolute top-2 right-2 sm:top-3 sm:right-3">
            <span
              class="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 backdrop-blur-sm"
            >
              {{ blog.category }}
            </span>
          </div>
        </div>
      </template>

      <div class="space-y-2 sm:space-y-3 flex flex-col flex-1 p-1">
        <div class="flex-1">
          <h3
            class="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 leading-tight"
          >
            {{ blog.title }}
          </h3>

          <!-- Author and Date -->
          <div class="flex items-center mt-1 mb-2">
            <div class="flex items-center">
              <img
                v-if="blog.author_avatar"
                :src="blog.author_avatar"
                :alt="blog.author_name"
                class="w-4 h-4 rounded-full mr-2"
              />
              <svg
                v-else
                class="w-4 h-4 text-gray-500 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
              <span class="text-sm text-gray-600 truncate">{{
                blog.author_name
              }}</span>
            </div>
            <span class="mx-2 text-gray-400">•</span>
            <span class="text-sm text-gray-500">{{
              formatDate(blog.published_at)
            }}</span>
          </div>

          <!-- Excerpt -->
          <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {{ blog.excerpt }}
          </p>

          <!-- Tags -->
          <div
            v-if="blog.tags && blog.tags.length > 0"
            class="flex items-center mt-2 gap-1 flex-wrap"
          >
            <span
              v-for="tag in blog.tags.slice(0, 3)"
              :key="tag"
              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
            >
              #{{ tag }}
            </span>
            <span v-if="blog.tags.length > 3" class="text-xs text-gray-500">
              +{{ blog.tags.length - 3 }}
            </span>
          </div>
        </div>

        <!-- Stats -->
        <div
          class="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-2"
        >
          <div class="flex items-center space-x-4">
            <div v-if="blog.reading_time" class="flex items-center space-x-1">
              <svg
                class="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <span class="truncate">{{ blog.reading_time }} min</span>
            </div>

            <div v-if="blog.views_count" class="flex items-center space-x-1">
              <svg
                class="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span class="truncate">{{ formatNumber(blog.views_count) }}</span>
            </div>
          </div>

          <div class="text-xs text-right flex-shrink-0">
            {{ blog.category }}
          </div>
        </div>

        <!-- Action Button -->
        <div class="pt-3 border-t border-gray-200 mt-auto">
          <BaseButton
            variant="outline"
            size="md"
            class="w-full text-sm sm:text-base"
          >
            Leer Artículo
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import type { Blog } from "@/types";
import BaseCard from "./BaseCard.vue";
import BaseButton from "./BaseButton.vue";
import BlogImageGenerator from "./BlogImageGenerator.vue";

interface Props {
  blog: Blog;
}

const props = defineProps<Props>();

// Debug logging (simplified)
if (import.meta.env.DEV && props.blog.featured_image_url) {
  console.log(
    "BlogCard: Found image for blog",
    props.blog.id,
    props.blog.featured_image_url,
  );
}

// State
const imageError = ref(false);
const imageLoaded = ref(false);

// Computed
const hasValidImage = computed(() => {
  const blog = props.blog as any;
  // Try multiple possible image fields
  const imageUrl =
    blog.featured_image_url ||
    blog.featured_image ||
    blog.image ||
    blog.banner ||
    blog.cover ||
    blog.thumbnail;

  const hasImage = !!(
    imageUrl &&
    imageUrl !== "null" &&
    imageUrl !== "undefined" &&
    imageUrl.trim() !== "" &&
    !imageError.value
  );

  // Log only if we have an image
  if (import.meta.env.DEV && hasImage) {
    console.log("BlogCard: Valid image found for blog", blog.id);
  }

  return hasImage;
});

const blogImageUrl = computed(() => {
  // Use same logic as BlogDetailPage
  const imageUrl = props.blog.featured_image_url || props.blog.featured_image;

  if (!imageUrl) return "";

  // In development, convert absolute URLs to relative for proxy
  if (import.meta.env.DEV && imageUrl.includes("app.tierrasonada.com")) {
    return imageUrl
      .replace("https://app.tierrasonada.com", "")
      .replace("http://app.tierrasonada.com", "");
  }

  return imageUrl;
});

// Methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return Math.floor(num / 1000000) + "M";
  if (num >= 1000) return Math.floor(num / 1000) + "K";
  return num.toString();
};

const handleImageError = () => {
  imageError.value = true;
  if (import.meta.env.DEV) {
    console.warn("Failed to load blog image:", props.blog.title);
  }
};

const handleImageLoad = () => {
  imageLoaded.value = true;
  imageError.value = false;
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

/* Mobile optimizations */
@media (max-width: 640px) {
  .line-clamp-2 {
    -webkit-line-clamp: 3; /* Show more content on mobile */
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  a {
    -webkit-tap-highlight-color: transparent;
  }

  /* Reduce scale effect on touch devices */
  a:hover {
    transform: scale(1.02) !important;
  }
}
</style>
