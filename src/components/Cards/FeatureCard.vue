<template>
  <!-- Professional Feature Card - Mobile First Responsive -->
  <div
    :class="[
      'relative bg-white transition-all duration-500 cursor-pointer group',
      // Mobile First Responsive Sizing
      'w-full max-w-[420px] mx-auto',                    // Mobile: full width, max 420px, centered
      'md:max-w-[340px]',                                // Tablet: 340px max
      'lg:max-w-[380px]',                                // Desktop: 380px max
      // Responsive Heights
      'min-h-[480px]',                                   // Mobile: 480px min
      'md:min-h-[460px]',                                // Tablet: 460px min  
      'lg:min-h-[500px]',                                // Desktop: 500px min
      // Professional Styling
      'rounded-xl border border-slate-200/60',
      'shadow-lg hover:shadow-xl',
      'hover:-translate-y-1 hover:scale-[1.02]',
      // Mobile optimizations
      'touch-manipulation select-none'
    ]"
    @click="$emit('view-details')"
  >
    <!-- Project Image - Responsive Heights -->
    <div 
      :class="[
        'relative overflow-hidden rounded-t-xl',
        'h-[200px]',                                     // Mobile: 200px
        'md:h-[160px]',                                  // Tablet: 160px  
        'lg:h-[180px]'                                   // Desktop: 180px
      ]"
    >
      <HeroImage
        :image-url="getImageUrl(projectImage)"
        :alt="`${title} - Proyecto ${projectType}`"
        aspect-ratio="16/9"
        :lazy="false"
        overlay="gradient"
        :badge="projectType || 'Premium'"
        :badge-style="getBadgeStyle(projectType)"
        :fallback-text="`${title} - ${projectType}`"
        border-radius="none"
        shadow="none"
        hover-effect="both"
        class="h-full rounded-t-xl"
        @load="handleImageLoad"
        @error="handleImageError"
      />
    </div>

    <!-- Professional Content Container -->
    <div class="p-5 lg:p-6 flex flex-col flex-1">
      <!-- Project Title - Clean Typography -->
      <h3 class="text-lg font-semibold text-slate-900 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
        {{ title }}
      </h3>

      <!-- Clean Description - Limited Text -->
      <p class="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
        {{ truncatedDescription }}
      </p>

      <!-- Professional 2x2 Key Data Grid -->
      <div class="grid grid-cols-2 gap-3 mb-6">
        <!-- Location - MapPin Icon -->
        <div class="flex items-start space-x-2">
          <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Ubicación</div>
            <div class="text-sm font-semibold text-slate-900 truncate">{{ location }}</div>
          </div>
        </div>

        <!-- Price - DollarSign Icon -->
        <div class="flex items-start space-x-2">
          <div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Desde</div>
            <div class="text-sm font-semibold text-slate-900 truncate">{{ formatPrice(averagePrice) }}</div>
          </div>
        </div>

        <!-- Area - Ruler Icon -->
        <div class="flex items-start space-x-2">
          <div class="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Área</div>
            <div class="text-sm font-semibold text-slate-900">{{ areaFrom ? areaFrom + ' m²' : '-' }}</div>
          </div>
        </div>

      </div>

      <!-- Professional CTA Button -->
      <button
        @click="$emit('view-details')"
        class="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg 
               transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.01]
               focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
               active:scale-[0.99]"
      >
        <span class="flex items-center justify-center text-sm">
          Ver Detalles
          <svg
            class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import HeroImage from "../Hero/HeroImage.vue";

interface Props {
  title: string;
  description: string;
  projectImage?: string;
  projectType?: string;
  properties: number;
  location: string;
  region: string;
  deliveryDate: string;
  averagePrice: string;
  areaFrom?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'view-details': [];
}>();

// Smart URL conversion for development proxy
const getImageUrl = (url: string | null | undefined): string => {
  console.log('🔍 FeatureCard getImageUrl input:', url);
  
  if (!url) {
    console.log('❌ FeatureCard: No URL, using placeholder');
    return "/placeholder-project.svg";
  }
  
  if (url.includes("app.tierrasonada.com")) {
    const convertedUrl = url
      .replace("https://app.tierrasonada.com", "")
      .replace("http://app.tierrasonada.com", "");
    console.log('🔄 FeatureCard URL conversion:', url, '→', convertedUrl);
    return convertedUrl;
  }
  
  console.log('✅ FeatureCard: URL unchanged:', url);
  return url;
};

// Professional badge styling based on project type
const getBadgeStyle = (type: string | undefined): string => {
  switch (type?.toLowerCase()) {
    case 'campestres':
    case 'campestre':
      return 'emerald';
    case 'urbanos':
    case 'urbano':
      return 'blue';
    case 'turísticos':
    case 'turístico':
      return 'amber';
    default:
      return 'blue';
  }
};

// Truncate description to maintain clean layout
const truncatedDescription = computed(() => {
  if (props.description.length <= 120) return props.description;
  return props.description.substring(0, 120).trim() + '...';
});

// Clean price formatting
const formatPrice = (price: string): string => {
  return price.replace(/^\$/, '$').replace(/M$/, 'M');
};

// Optimized event handlers
const handleImageLoad = () => {
  // Image loaded successfully
};

const handleImageError = () => {
  // Handle image error if needed
};
</script>

<style scoped>
/* Professional truncation utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Touch optimizations */
@media (hover: none) {
  .group:active {
    transform: translateY(-2px) scale(1.01);
  }
  
  .group:active button {
    transform: scale(0.98);
  }
}

/* High-resolution displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .group {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* Focus visible for accessibility */
.group:focus-visible {
  outline: 2px solid theme(colors.blue.500);
  outline-offset: 2px;
}

/* Smooth transitions for better UX */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
