<template>
  <div class="p-8 space-y-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Responsive Images Examples</h2>
    
    <!-- Example 1: Property image with responsive set -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">Property Image with Responsive Set</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResponsiveImage
          :src="mockPropertyResponsive"
          alt="Modern property with pool"
          container-class="aspect-video rounded-lg shadow-lg"
          :enable-hover-zoom="true"
          badge="Featured"
          badge-variant="primary"
          loading="eager"
          @load="onImageLoad"
          @error="onImageError"
        />
        
        <!-- Fallback example -->
        <ResponsiveImage
          :src="null"
          alt="Property not available"
          fallback="/placeholder-property.svg"
          container-class="aspect-video rounded-lg shadow-lg"
          error-text="Property image unavailable"
        />
      </div>
    </div>

    <!-- Example 2: Project gallery with different aspect ratios -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">Project Gallery - Different Aspects</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResponsiveImage
          :src="mockProjectResponsive"
          alt="Tourist project overview"
          container-class="aspect-square rounded-xl"
          badge="Turístico"
          badge-variant="success"
          badge-position="top-left"
          :enable-hover-zoom="true"
        />
        
        <ResponsiveImage
          :src="mockProjectResponsive"
          alt="Project amenities"
          container-class="aspect-[4/3] rounded-xl"
          badge="Disponible"
          badge-variant="warning"
          badge-position="top-right"
        />
        
        <ResponsiveImage
          :src="mockProjectResponsive"
          alt="Project location"
          container-class="aspect-[3/4] rounded-xl"
          :show-debug-info="true"
        />
      </div>
    </div>

    <!-- Example 3: Blog post with overlay content -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">Blog Post with Overlay</h3>
      <div class="max-w-md">
        <ResponsiveImage
          :src="mockBlogResponsive"
          alt="Real estate market trends"
          container-class="aspect-video rounded-lg overflow-hidden shadow-lg"
          :enable-hover-zoom="true"
        >
          <template #overlay="{ loading, error, loaded }">
            <div 
              v-if="loaded && !loading && !error"
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
            >
              <div class="absolute bottom-4 left-4 right-4 text-white">
                <h4 class="text-lg font-semibold mb-2">Market Trends 2024</h4>
                <p class="text-sm opacity-90">Discover the latest trends in real estate...</p>
              </div>
            </div>
          </template>
        </ResponsiveImage>
      </div>
    </div>

    <!-- Example 4: Performance monitoring -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">Performance Metrics</h3>
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span class="font-medium text-gray-700">Images Loaded:</span>
            <span class="ml-2 text-green-600">{{ loadStats.loaded }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">Errors:</span>
            <span class="ml-2 text-red-600">{{ loadStats.errors }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">Total Load Time:</span>
            <span class="ml-2 text-blue-600">{{ loadStats.avgLoadTime }}ms</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">Screen Width:</span>
            <span class="ml-2 text-purple-600">{{ screenWidth }}px</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage instructions -->
    <div class="bg-blue-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-4">Usage Instructions</h3>
      <div class="space-y-2 text-sm text-blue-800">
        <p><strong>Responsive Image Sets:</strong> Pass a ResponsiveImageSet object with thumbnail, medium, large, and original variants.</p>
        <p><strong>Fallback Support:</strong> Automatic fallback to different variants and placeholder images.</p>
        <p><strong>Lazy Loading:</strong> Built-in lazy loading with intersection observer.</p>
        <p><strong>Error Handling:</strong> Intelligent retry mechanism and graceful error states.</p>
        <p><strong>Performance:</strong> Automatic variant selection based on screen size and device pixel ratio.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useResponsiveImages } from '@/composables/useResponsiveImages'
import ResponsiveImage from './ResponsiveImage.vue'
import type { ResponsiveImageSet } from '@/types'

// Get screen width for display
const { screenWidth } = useResponsiveImages()

// Mock responsive image data (would come from API in real usage)
const mockPropertyResponsive: ResponsiveImageSet = {
  thumbnail: {
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&q=60',
    width: 400
  },
  medium: {
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=75',
    width: 800
  },
  large: {
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=900&fit=crop&q=85',
    width: 1200
  },
  original: {
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop&q=90',
    width: null
  }
}

const mockProjectResponsive: ResponsiveImageSet = {
  thumbnail: {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=400&fit=crop&q=60',
    width: 400
  },
  medium: {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=800&fit=crop&q=75',
    width: 800
  },
  large: {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=1200&fit=crop&q=85',
    width: 1200
  },
  original: {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop&q=90',
    width: null
  }
}

const mockBlogResponsive: ResponsiveImageSet = {
  thumbnail: {
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop&q=60',
    width: 400
  },
  medium: {
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop&q=75',
    width: 800
  },
  large: {
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=675&fit=crop&q=85',
    width: 1200
  },
  original: {
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&q=90',
    width: null
  }
}

// Performance tracking
const loadStats = reactive({
  loaded: 0,
  errors: 0,
  totalLoadTime: 0,
  avgLoadTime: 0
})

const loadTimes: number[] = []

const onImageLoad = (src: string) => {
  loadStats.loaded++
  console.log('✅ Example image loaded:', src)
}

const onImageError = (error: Error) => {
  loadStats.errors++
  console.warn('❌ Example image error:', error.message)
}
</script>

<style scoped>
/* Custom styles for the example component */
</style>