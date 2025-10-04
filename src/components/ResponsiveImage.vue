<template>
  <div 
    :class="[
      'relative overflow-hidden',
      containerClass,
      {
        'animate-pulse bg-gray-200': isLoading,
        'bg-red-50': hasError && !isLoading
      }
    ]"
    :style="containerStyle"
  >
    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-white"
    >
      <div class="flex flex-col items-center space-y-3">
        <div class="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center animate-pulse">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div v-if="showLoadingText" class="h-2 w-16 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="hasError && !currentSrc"
      class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 via-gray-50 to-white"
    >
      <div class="flex flex-col items-center space-y-2 text-center p-4">
        <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <span class="text-xs text-red-600 font-medium">{{ errorText || 'Error al cargar imagen' }}</span>
      </div>
    </div>

    <!-- Main Image -->
    <img
      v-show="!isLoading && currentSrc"
      v-bind="imageAttributes"
      :class="[
        'w-full h-full object-cover transition-all duration-300',
        imageClass,
        {
          'opacity-0': isLoading,
          'opacity-100': !isLoading && isLoaded,
          'hover:scale-105': enableHoverZoom && !isLoading,
          'filter blur-sm': blurOnError && hasError
        }
      ]"
      @load="handleImageLoad"
      @error="handleImageError"
    />

    <!-- Overlay Content -->
    <div v-if="$slots.overlay" class="absolute inset-0 z-10">
      <slot name="overlay" :loading="isLoading" :error="hasError" :loaded="isLoaded" />
    </div>

    <!-- Badge/Label -->
    <div
      v-if="badge && !isLoading"
      :class="[
        'absolute z-20 px-2 py-1 text-xs font-semibold rounded-md backdrop-blur-sm border transition-all duration-300',
        badgePosition === 'top-left' ? 'top-2 left-2' :
        badgePosition === 'top-right' ? 'top-2 right-2' :
        badgePosition === 'bottom-left' ? 'bottom-2 left-2' : 'bottom-2 right-2',
        badgeVariant === 'primary' ? 'bg-blue-500/90 text-white border-blue-400/30' :
        badgeVariant === 'success' ? 'bg-green-500/90 text-white border-green-400/30' :
        badgeVariant === 'warning' ? 'bg-yellow-500/90 text-white border-yellow-400/30' :
        badgeVariant === 'danger' ? 'bg-red-500/90 text-white border-red-400/30' :
        'bg-white/90 text-gray-700 border-white/50'
      ]"
    >
      {{ badge }}
    </div>

    <!-- Debug Info (Development Only) -->
    <div
      v-if="showDebugInfo && isDev"
      class="absolute bottom-0 left-0 right-0 bg-black/75 text-white text-xs p-2 font-mono"
    >
      <div>Source: {{ debugInfo.source }}</div>
      <div>Size: {{ debugInfo.selectedVariant }}</div>
      <div>Screen: {{ screenWidth }}px</div>
      <div>DPR: {{ devicePixelRatio }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useResponsiveImages } from '@/composables/useResponsiveImages'
import type { ResponsiveImageSet } from '@/types'

interface Props {
  // Image source - can be responsive set or simple URL
  src: ResponsiveImageSet | string | null
  // Alt text for accessibility
  alt: string
  // Fallback image URL
  fallback?: string
  // Container CSS class
  containerClass?: string
  // Image CSS class
  imageClass?: string
  // Container style object
  containerStyle?: Record<string, any>
  // Custom sizes attribute
  sizes?: string
  // Loading behavior
  loading?: 'lazy' | 'eager'
  // Fetch priority
  fetchPriority?: 'high' | 'low' | 'auto'
  // Enable hover zoom effect
  enableHoverZoom?: boolean
  // Blur image on error
  blurOnError?: boolean
  // Show loading text
  showLoadingText?: boolean
  // Error message text
  errorText?: string
  // Badge content
  badge?: string
  // Badge position
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  // Badge variant/color
  badgeVariant?: 'primary' | 'success' | 'warning' | 'danger' | 'default'
  // Enable debug info (dev only)
  showDebugInfo?: boolean
  // Auto-retry on error
  enableRetry?: boolean
  // Preload this image
  preload?: boolean
  // Quality preference for optimization
  quality?: number
}

const props = withDefaults(defineProps<Props>(), {
  containerClass: '',
  imageClass: '',
  loading: 'lazy',
  fetchPriority: 'auto',
  enableHoverZoom: false,
  blurOnError: false,
  showLoadingText: false,
  badgePosition: 'top-right',
  badgeVariant: 'default',
  showDebugInfo: false,
  enableRetry: true,
  preload: false,
  quality: 80
})

const emit = defineEmits<{
  load: [src: string]
  error: [error: Error]
  loadStart: []
}>()

// Use the responsive images composable
const {
  isLoading,
  hasError,
  isLoaded,
  currentSource,
  screenWidth,
  getImageAttributes,
  getOptimizedImageSrc,
  loadImage,
  preloadImage,
  config
} = useResponsiveImages({
  lazy: props.loading === 'lazy',
  fallbackUrl: props.fallback
})

// Local state
const currentSrc = ref<string>('')
const retryCount = ref(0)
const maxRetries = 3

// Development flag
const isDev = import.meta.env.DEV

// Device pixel ratio
const devicePixelRatio = window.devicePixelRatio || 1

// Generate image attributes
const imageAttributes = computed(() => {
  return getImageAttributes(props.src, props.alt, {
    sizes: props.sizes,
    loading: props.loading,
    fetchPriority: props.fetchPriority,
    fallbackSrc: props.fallback
  })
})

// Debug information
const debugInfo = computed(() => {
  const sourceType = typeof props.src === 'string' ? 'URL' : 
                     props.src ? 'Responsive' : 'Fallback'
  
  let selectedVariant = 'N/A'
  if (typeof props.src === 'object' && props.src) {
    // Determine which variant would be selected
    if (screenWidth.value <= config.value.breakpoints.mobile) {
      selectedVariant = props.src.thumbnail ? 'thumbnail' : 'fallback'
    } else if (screenWidth.value <= config.value.breakpoints.tablet) {
      selectedVariant = props.src.medium ? 'medium' : 'fallback'
    } else {
      selectedVariant = props.src.large ? 'large' : 'fallback'
    }
  }

  return {
    source: sourceType,
    selectedVariant,
    retryCount: retryCount.value
  }
})

// Load image when source changes
const loadImageSource = async () => {
  if (!props.src) {
    currentSrc.value = getOptimizedImageSrc(null, props.fallback)
    return
  }

  try {
    emit('loadStart')
    currentSrc.value = await loadImage(props.src, props.fallback)
    retryCount.value = 0
  } catch (error) {
    console.warn('ResponsiveImage: Failed to load image', error)
    if (props.enableRetry && retryCount.value < maxRetries) {
      retryCount.value++
      setTimeout(loadImageSource, 1000 * retryCount.value)
    } else {
      currentSrc.value = getOptimizedImageSrc(null, props.fallback)
      emit('error', error as Error)
    }
  }
}

// Handle image load event
const handleImageLoad = () => {
  emit('load', currentSrc.value)
}

// Handle image error event
const handleImageError = () => {
  if (props.enableRetry && retryCount.value < maxRetries) {
    retryCount.value++
    setTimeout(loadImageSource, 1000 * retryCount.value)
  } else {
    emit('error', new Error('Image failed to load'))
  }
}

// Watch for prop changes
watch(() => props.src, loadImageSource, { immediate: true })

// Preload if requested
watch(() => props.preload, (shouldPreload) => {
  if (shouldPreload && props.src) {
    preloadImage(props.src, props.fetchPriority === 'high' ? 'high' : 'low')
  }
}, { immediate: true })
</script>

<style scoped>
/* Ensure smooth transitions */
img {
  transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease;
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Loading animation */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
</style>