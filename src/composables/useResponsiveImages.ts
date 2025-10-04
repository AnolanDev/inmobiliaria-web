import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// Types for responsive image structure
export interface ResponsiveImageVariant {
  url: string
  width: number | null
}

export interface ResponsiveImageSet {
  thumbnail?: ResponsiveImageVariant
  medium?: ResponsiveImageVariant
  large?: ResponsiveImageVariant
  original?: ResponsiveImageVariant
}

export interface UseResponsiveImagesOptions {
  // Fallback image URL when no image is available
  fallbackUrl?: string
  // Whether to enable lazy loading
  lazy?: boolean
  // Whether to use proxy URLs for development
  enableProxy?: boolean
  // Custom breakpoints for responsive images
  breakpoints?: {
    mobile: number
    tablet: number
    desktop: number
  }
  // Quality settings for different variants
  quality?: {
    thumbnail: number
    medium: number
    large: number
    original: number
  }
  // Error retry configuration
  retryConfig?: {
    maxAttempts: number
    retryDelay: number
  }
  // Loading state timeout
  loadingTimeout?: number
}

export interface ResponsiveImageState {
  loading: boolean
  error: boolean
  loaded: boolean
  currentSrc: string
  retryCount: number
  hasTriedFallback: boolean
}

export function useResponsiveImages(options: UseResponsiveImagesOptions = {}) {
  // Default options
  const config = {
    fallbackUrl: '/placeholder-project.svg',
    lazy: true,
    enableProxy: import.meta.env.DEV,
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1920
    },
    quality: {
      thumbnail: 60,
      medium: 75,
      large: 85,
      original: 90
    },
    retryConfig: {
      maxAttempts: 3,
      retryDelay: 1000
    },
    loadingTimeout: 10000,
    ...options
  }

  // State management
  const state = ref<ResponsiveImageState>({
    loading: false,
    error: false,
    loaded: false,
    currentSrc: '',
    retryCount: 0,
    hasTriedFallback: false
  })

  // Screen size detection
  const screenWidth = ref(window.innerWidth)
  
  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', updateScreenWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth)
  })

  // URL conversion helper for dev/production
  const convertToProxyUrl = (url: string): string => {
    if (!url) return url

    // In development, use proxy (relative URLs)
    if (import.meta.env.DEV) {
      if (url.includes('app.tierrasonada.com')) {
        return url
          .replace('https://app.tierrasonada.com', '')
          .replace('http://app.tierrasonada.com', '')
      }
    } else {
      // In production, try to use same domain to avoid CORS
      if (url.startsWith('/storage') || url.startsWith('/api')) {
        // First try same domain, fallback to app.tierrasonada.com
        return url // Keep relative for same domain
      }
      // If it's already an app.tierrasonada.com URL, convert to relative
      if (url.includes('app.tierrasonada.com')) {
        return url
          .replace('https://app.tierrasonada.com', '')
          .replace('http://app.tierrasonada.com', '')
      }
    }

    return url
  }

  // Get the best image variant based on screen size and DPR
  const getBestImageVariant = (responsiveSet: ResponsiveImageSet): ResponsiveImageVariant | null => {
    if (!responsiveSet) return null

    const devicePixelRatio = window.devicePixelRatio || 1
    const effectiveWidth = screenWidth.value * devicePixelRatio

    // Determine target width based on screen size
    let targetWidth: number

    if (screenWidth.value <= config.breakpoints.mobile) {
      targetWidth = 400 * devicePixelRatio
    } else if (screenWidth.value <= config.breakpoints.tablet) {
      targetWidth = 800 * devicePixelRatio
    } else {
      targetWidth = 1200 * devicePixelRatio
    }

    // Select the best variant
    const variants = [
      responsiveSet.thumbnail,
      responsiveSet.medium,
      responsiveSet.large,
      responsiveSet.original
    ].filter(Boolean) as ResponsiveImageVariant[]

    if (variants.length === 0) return null

    // Find the best match - prefer slightly larger over smaller
    const bestMatch = variants.reduce((best, current) => {
      if (!current.width) return current // Original has no width constraint
      if (!best.width) return best // Prefer original if available
      
      // Calculate how well each variant fits our target
      const currentFit = Math.abs(current.width - targetWidth)
      const bestFit = Math.abs(best.width - targetWidth)
      
      // Prefer larger images if they're not too much larger
      if (current.width >= targetWidth && best.width >= targetWidth) {
        return current.width < best.width ? current : best
      }
      
      // If both are smaller than target, prefer the larger one
      if (current.width < targetWidth && best.width < targetWidth) {
        return current.width > best.width ? current : best
      }
      
      // Mixed case - prefer the one closer to target
      return currentFit < bestFit ? current : best
    })

    return bestMatch
  }

  // Generate srcset string for responsive images
  const generateSrcSet = (responsiveSet: ResponsiveImageSet): string => {
    if (!responsiveSet) return ''

    const variants = [
      responsiveSet.thumbnail,
      responsiveSet.medium,
      responsiveSet.large,
      responsiveSet.original
    ].filter(Boolean) as ResponsiveImageVariant[]

    return variants
      .filter(variant => variant.width) // Only include variants with width
      .map(variant => `${convertToProxyUrl(variant.url)} ${variant.width}w`)
      .join(', ')
  }

  // Generate sizes attribute for responsive images
  const generateSizes = (customSizes?: string): string => {
    if (customSizes) return customSizes

    return [
      `(max-width: ${config.breakpoints.mobile}px) 100vw`,
      `(max-width: ${config.breakpoints.tablet}px) 50vw`,
      '33vw'
    ].join(', ')
  }

  // Error handling with intelligent fallbacks
  const handleImageError = async (
    responsiveSet: ResponsiveImageSet | null, 
    fallbackSrc?: string
  ): Promise<string> => {
    state.value.error = true

    // Try fallback from responsive set if available
    if (!state.value.hasTriedFallback && responsiveSet) {
      state.value.hasTriedFallback = true
      
      // Try other variants in order of preference
      const fallbackVariants = [
        responsiveSet.medium,
        responsiveSet.thumbnail,
        responsiveSet.large,
        responsiveSet.original
      ].filter(variant => variant && variant.url !== state.value.currentSrc)

      if (fallbackVariants.length > 0) {
        const fallbackVariant = fallbackVariants[0]
        return convertToProxyUrl(fallbackVariant.url)
      }
    }

    // Try provided fallback
    if (fallbackSrc && fallbackSrc !== state.value.currentSrc) {
      return convertToProxyUrl(fallbackSrc)
    }

    // Last resort - use config fallback
    return config.fallbackUrl
  }

  // Main function to get optimized image source
  const getOptimizedImageSrc = (
    responsiveSet: ResponsiveImageSet | string | null,
    fallbackSrc?: string
  ): string => {
    if (import.meta.env.DEV) {
      console.log('🎯 getOptimizedImageSrc called with:', {
        responsiveSet,
        fallbackSrc,
        type: typeof responsiveSet
      })
    }

    // Handle string URLs (legacy support)
    if (typeof responsiveSet === 'string') {
      const result = convertToProxyUrl(responsiveSet) || fallbackSrc || config.fallbackUrl
      if (import.meta.env.DEV) {
        console.log('🎯 String URL result:', result)
      }
      return result
    }

    // Handle responsive image sets
    if (responsiveSet) {
      const bestVariant = getBestImageVariant(responsiveSet)
      if (import.meta.env.DEV) {
        console.log('🎯 Best variant found:', bestVariant)
      }
      if (bestVariant) {
        const result = convertToProxyUrl(bestVariant.url)
        if (import.meta.env.DEV) {
          console.log('🎯 Responsive set result:', result)
        }
        return result
      }
    }

    // Fallback chain
    const result = convertToProxyUrl(fallbackSrc || '') || config.fallbackUrl
    if (import.meta.env.DEV) {
      console.log('🎯 Fallback result:', result)
    }
    return result
  }

  // Image loading state management
  const loadImage = async (
    responsiveSet: ResponsiveImageSet | string | null,
    fallbackSrc?: string
  ): Promise<string> => {
    state.value.loading = true
    state.value.error = false
    state.value.loaded = false
    state.value.retryCount = 0
    state.value.hasTriedFallback = false

    const loadWithRetry = async (src: string, attempt = 1): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        
        const timeout = setTimeout(() => {
          img.onload = null
          img.onerror = null
          reject(new Error('Image load timeout'))
        }, config.loadingTimeout)

        img.onload = () => {
          clearTimeout(timeout)
          state.value.loading = false
          state.value.loaded = true
          state.value.error = false
          state.value.currentSrc = src
          resolve(src)
        }

        img.onerror = async () => {
          clearTimeout(timeout)
          
          if (attempt < config.retryConfig.maxAttempts) {
            // Retry with delay
            setTimeout(() => {
              loadWithRetry(src, attempt + 1).then(resolve).catch(reject)
            }, config.retryConfig.retryDelay * attempt)
          } else {
            // Try fallback options
            try {
              const fallbackUrl = await handleImageError(
                typeof responsiveSet === 'string' ? null : responsiveSet,
                fallbackSrc
              )
              if (fallbackUrl !== src) {
                loadWithRetry(fallbackUrl, 1).then(resolve).catch(reject)
              } else {
                reject(new Error('All fallback options exhausted'))
              }
            } catch (error) {
              reject(error)
            }
          }
        }

        img.src = src
      })
    }

    try {
      const initialSrc = getOptimizedImageSrc(responsiveSet, fallbackSrc)
      return await loadWithRetry(initialSrc)
    } catch (error) {
      state.value.loading = false
      state.value.error = true
      if (import.meta.env.DEV) {
        console.warn('Image loading failed:', error)
      }
      return config.fallbackUrl
    }
  }

  // Preload critical images
  const preloadImage = (
    responsiveSet: ResponsiveImageSet | string | null,
    priority: 'high' | 'low' = 'low'
  ): Promise<void> => {
    return new Promise((resolve) => {
      const src = getOptimizedImageSrc(responsiveSet)
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      
      if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high')
      }

      link.onload = () => resolve()
      link.onerror = () => resolve() // Don't fail on preload errors
      
      document.head.appendChild(link)
    })
  }

  // Reactive computed properties
  const isLoading = computed(() => state.value.loading)
  const hasError = computed(() => state.value.error)
  const isLoaded = computed(() => state.value.loaded)
  const currentSource = computed(() => state.value.currentSrc)

  // Utility function to create image attributes
  const getImageAttributes = (
    responsiveSet: ResponsiveImageSet | string | null,
    alt: string,
    options: {
      sizes?: string
      loading?: 'lazy' | 'eager'
      fetchPriority?: 'high' | 'low' | 'auto'
      fallbackSrc?: string
    } = {}
  ) => {
    const src = getOptimizedImageSrc(responsiveSet, options.fallbackSrc)
    const srcset = typeof responsiveSet === 'object' ? generateSrcSet(responsiveSet) : ''
    
    return {
      src,
      srcset: srcset || undefined,
      sizes: options.sizes ? generateSizes(options.sizes) : generateSizes(),
      alt,
      loading: options.loading || (config.lazy ? 'lazy' : 'eager'),
      fetchpriority: options.fetchPriority,
      crossorigin: 'anonymous'
    }
  }

  // Image optimization utilities
  const optimizeImageUrl = (
    url: string,
    width?: number,
    height?: number,
    quality?: number
  ): string => {
    if (!url) return config.fallbackUrl

    // Basic URL optimization - can be extended based on CDN capabilities
    const optimizedUrl = convertToProxyUrl(url)
    
    // Add query parameters for optimization if supported by backend
    if (width || height || quality) {
      const params = new URLSearchParams()
      if (width) params.set('w', width.toString())
      if (height) params.set('h', height.toString())
      if (quality) params.set('q', quality.toString())
      
      const separator = optimizedUrl.includes('?') ? '&' : '?'
      return `${optimizedUrl}${separator}${params.toString()}`
    }

    return optimizedUrl
  }

  // Watch for screen size changes to update image selection
  watch(screenWidth, () => {
    // Trigger re-evaluation of best image variant
    // This could trigger re-rendering in components using this composable
  })

  return {
    // State
    isLoading,
    hasError,
    isLoaded,
    currentSource,
    screenWidth: computed(() => screenWidth.value),

    // Core functions
    getOptimizedImageSrc,
    loadImage,
    preloadImage,
    handleImageError,

    // Utility functions
    generateSrcSet,
    generateSizes,
    getImageAttributes,
    optimizeImageUrl,
    convertToProxyUrl,
    getBestImageVariant,

    // Configuration
    config: computed(() => config)
  }
}

// Convenience hook for simple image loading
export function useImageLoader(
  imageSource: ResponsiveImageSet | string | null,
  options: UseResponsiveImagesOptions = {}
) {
  const { 
    isLoading, 
    hasError, 
    isLoaded, 
    loadImage, 
    getOptimizedImageSrc 
  } = useResponsiveImages(options)

  const currentSrc = ref<string>('')

  const load = async (fallbackSrc?: string) => {
    try {
      currentSrc.value = await loadImage(imageSource, fallbackSrc)
    } catch (error) {
      currentSrc.value = getOptimizedImageSrc(imageSource, fallbackSrc)
    }
  }

  return {
    currentSrc,
    isLoading,
    hasError,
    isLoaded,
    load
  }
}

export default useResponsiveImages