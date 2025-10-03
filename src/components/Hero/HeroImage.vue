<template>
  <div 
    :class="[
      'relative overflow-hidden group transition-all duration-500',
      borderRadius === 'xl' ? 'rounded-xl' : 
      borderRadius === '2xl' ? 'rounded-2xl' : 
      borderRadius === '3xl' ? 'rounded-3xl' : 'rounded-lg',
      shadow === 'lg' ? 'shadow-lg hover:shadow-xl' :
      shadow === 'xl' ? 'shadow-xl hover:shadow-2xl' :
      shadow === '2xl' ? 'shadow-2xl hover:shadow-3xl' : 'shadow-md hover:shadow-lg'
    ]"
  >
    <!-- Loading Skeleton - Moderno y Minimalista -->
    <div
      v-if="loading"
      class="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-white"
    >
      <!-- Skeleton Animation -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" 
           style="background-size: 200% 100%;"></div>
      
      <!-- Icon Loader -->
      <div class="flex items-center justify-center h-full">
        <div class="flex flex-col items-center space-y-3">
          <div class="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center animate-pulse">
            <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div v-if="showLoadingText" class="h-2 w-24 bg-slate-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Main Image Container -->
    <div
      v-show="!loading"
      :class="[
        'relative overflow-hidden',
        aspectRatio === 'square' ? 'aspect-square' : 
        aspectRatio === '4/3' ? 'aspect-[4/3]' : 
        aspectRatio === '16/9' ? 'aspect-[16/9]' : 
        aspectRatio === '3/4' ? 'aspect-[3/4]' : 'aspect-video'
      ]"
    >
      <!-- Optimized Image -->
      <img
        v-if="currentImageUrl"
        :src="currentImageUrl"
        :alt="alt"
        :loading="lazy ? 'lazy' : 'eager'"
        :srcset="generateSrcSet()"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        :class="[
          'w-full h-full object-cover transition-all duration-700',
          hoverEffect === 'zoom' ? 'group-hover:scale-110' :
          hoverEffect === 'brightness' ? 'group-hover:brightness-110' :
          hoverEffect === 'both' ? 'group-hover:scale-105 group-hover:brightness-105' : ''
        ]"
        @load="handleImageLoad"
        @error="handleImageError"
        crossorigin="anonymous"
      />

      <!-- Elegant Fallback Design -->
      <div
        v-else
        class="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center relative overflow-hidden"
      >
        <!-- Subtle Pattern -->
        <div class="absolute inset-0 opacity-[0.03]">
          <div class="absolute inset-0" 
               style="background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.5) 1px, transparent 0); background-size: 24px 24px;">
          </div>
        </div>
        
        <!-- Central Content -->
        <div class="text-center relative z-10 px-6">
          <div class="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 mx-auto 
                      shadow-lg group-hover:scale-105 transition-all duration-300">
            <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="text-slate-700 font-medium text-base">{{ fallbackText }}</span>
        </div>
        
        <!-- Minimal Decoration -->
        <div class="absolute top-6 right-6 w-3 h-3 bg-blue-200/40 rounded-full"></div>
        <div class="absolute bottom-8 left-8 w-2 h-2 bg-emerald-200/40 rounded-full"></div>
      </div>

      <!-- Modern Overlay System -->
      <div
        v-if="overlay && currentImageUrl"
        :class="[
          'absolute inset-0 transition-all duration-500',
          overlay === 'gradient' ? 'bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent' :
          overlay === 'dark' ? 'bg-slate-900/50' :
          overlay === 'light' ? 'bg-white/30' :
          overlay === 'blue' ? 'bg-blue-600/30' :
          overlay === 'emerald' ? 'bg-emerald-600/30' : '',
          'group-hover:opacity-90'
        ]"
      ></div>

      <!-- Content Overlay Slot -->
      <div v-if="$slots.overlay" class="absolute inset-0 flex items-end p-6 z-10">
        <slot name="overlay" />
      </div>
    </div>

    <!-- Professional Badge -->
    <div
      v-if="badge"
      :class="[
        'absolute top-3 left-3 z-20 px-3 py-1.5 text-xs font-semibold rounded-lg backdrop-blur-md border transition-all duration-300',
        badgeStyle === 'blue' ? 'bg-blue-500/90 text-white border-blue-400/30' :
        badgeStyle === 'emerald' ? 'bg-emerald-500/90 text-white border-emerald-400/30' :
        badgeStyle === 'amber' ? 'bg-amber-500/90 text-white border-amber-400/30' :
        'bg-white/90 text-slate-700 border-white/50'
      ]"
    >
      {{ badge }}
    </div>

    <!-- Elegant View Button -->
    <div
      v-if="showViewButton"
      class="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
    >
      <button
        @click="$emit('view')"
        class="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white 
               hover:bg-white/30 transition-all duration-200 border border-white/20 hover:border-white/40"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface Props {
  imageUrl?: string;
  alt: string;
  aspectRatio?: "square" | "video" | "4/3" | "16/9" | "3/4" | "auto";
  lazy?: boolean;
  overlay?: "none" | "gradient" | "dark" | "light" | "blue" | "emerald";
  badge?: string;
  badgeStyle?: "blue" | "emerald" | "amber" | "white";
  showViewButton?: boolean;
  showLoadingText?: boolean;
  fallbackText?: string;
  borderRadius?: "lg" | "xl" | "2xl" | "3xl";
  shadow?: "md" | "lg" | "xl" | "2xl";
  hoverEffect?: "none" | "zoom" | "brightness" | "both";
  baseImageSizes?: Array<{ width: number; suffix?: string }>;
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: "16/9",
  lazy: true,
  overlay: "none",
  badgeStyle: "white",
  showViewButton: false,
  showLoadingText: false,
  fallbackText: "Proyecto Inmobiliario",
  borderRadius: "xl",
  shadow: "lg",
  hoverEffect: "both",
  baseImageSizes: () => [
    { width: 400, suffix: "_thumb" },
    { width: 800, suffix: "_medium" },
    { width: 1200, suffix: "_large" },
  ],
});

const emit = defineEmits<{
  view: [];
  load: [];
  error: [];
}>();

const loading = ref(true);
const currentImageUrl = ref(props.imageUrl);
const hasTriedFallback = ref(false);

// Watch for changes in imageUrl prop
watch(() => props.imageUrl, (newUrl) => {
  console.log('🔍 HeroImage received imageUrl:', newUrl);
  currentImageUrl.value = newUrl;
  hasTriedFallback.value = false;
  loading.value = true;
}, { immediate: true });

const generateSrcSet = () => {
  if (!props.imageUrl) return "";

  // En producción, no generar srcset - usar imagen original
  if (import.meta.env.PROD) {
    console.log('🚀 HeroImage PRODUCTION: No srcset, using original image');
    return "";
  }

  // No generar srcset para URLs de desarrollo o fallback
  if (props.imageUrl.startsWith('/storage') || props.imageUrl.includes('unsplash.com')) {
    return "";
  }

  // Generate srcset for different screen sizes solo en desarrollo
  return props.baseImageSizes
    .map((size) => {
      const url = props.imageUrl!.replace(
        /\.[^/.]+$/,
        `${size.suffix || ""}_${size.width}w$&`,
      );
      return `${url} ${size.width}w`;
    })
    .join(", ");
};

const handleImageLoad = () => {
  loading.value = false;
  emit("load");
};

const handleImageError = () => {
  // Intelligent fallback system
  if (!hasTriedFallback.value && currentImageUrl.value && !currentImageUrl.value.includes('unsplash.com')) {
    hasTriedFallback.value = true;
    const keywords = extractKeywords(props.alt);
    const unsplashUrl = generateUnsplashUrl(keywords);
    
    currentImageUrl.value = unsplashUrl;
    loading.value = true;
  } else {
    loading.value = false;
    emit("error");
  }
};

const extractKeywords = (alt: string): string => {
  const text = alt.toLowerCase();
  
  if (text.includes('campestre') || text.includes('rural')) return 'rural-house';
  if (text.includes('urbano') || text.includes('apartamento')) return 'apartment-building';
  if (text.includes('turístico') || text.includes('playa') || text.includes('resort')) return 'beach-resort';
  if (text.includes('casa') || text.includes('home')) return 'modern-house';
  
  return 'real-estate';
};

const generateUnsplashUrl = (keywords: string): string => {
  const width = 800;
  const height = 450; // 16:9 aspect ratio
  
  // URLs específicas para cada tipo de proyecto inmobiliario
  const unsplashImages = {
    'rural-house': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', // Casa campestre
    'apartment-building': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', // Edificio urbano
    'beach-resort': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d', // Resort turístico
    'modern-house': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', // Casa moderna
    'real-estate': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64' // Inmobiliario general
  };
  
  const imageId = unsplashImages[keywords as keyof typeof unsplashImages] || unsplashImages['real-estate'];
  return `${imageId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
};
</script>

<style scoped>
/* Professional Animations */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes float-gentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

.animate-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  background-size: 200% 100%;
  animation: shimmer 2.5s ease-in-out infinite;
}

.animate-pulse-soft {
  animation: pulse-soft 2s ease-in-out infinite;
}

.animate-float-gentle {
  animation: float-gentle 3s ease-in-out infinite;
}

/* Enhanced hover states */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:brightness-105 {
  filter: brightness(1.05);
}

.group:hover .group-hover\:brightness-110 {
  filter: brightness(1.1);
}

/* Professional shadow utilities */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>
