# Responsive Images System

This document describes the new responsive images system implemented for the inmobiliaria web application.

## Overview

The responsive images system provides:
- Automatic image optimization based on screen size and device pixel ratio
- Intelligent fallback mechanisms for missing or failed images
- Lazy loading with intersection observer
- Error handling with retry logic
- Loading states and error states
- Support for different image variants (thumbnail, medium, large, original)

## Components

### 1. `useResponsiveImages` Composable

Located at: `src/composables/useResponsiveImages.ts`

The main composable that provides all responsive image functionality.

#### Key Features:
- **Responsive Image Selection**: Automatically selects the best image variant based on screen size
- **Proxy URL Conversion**: Converts absolute URLs to relative URLs for development
- **Error Handling**: Intelligent fallback with retry mechanism
- **Loading States**: Tracks loading, error, and loaded states
- **Performance Optimization**: Preloading, lazy loading, and efficient image selection

#### Usage:
```typescript
import { useResponsiveImages } from '@/composables/useResponsiveImages'

const {
  isLoading,
  hasError,
  isLoaded,
  getOptimizedImageSrc,
  loadImage,
  getImageAttributes
} = useResponsiveImages({
  lazy: true,
  fallbackUrl: '/placeholder.svg'
})
```

### 2. `ResponsiveImage` Component

Located at: `src/components/ResponsiveImage.vue`

A Vue component that wraps the composable functionality with a clean interface.

#### Props:
- `src`: ResponsiveImageSet | string | null - Image source
- `alt`: string - Alt text for accessibility
- `fallback`: string - Fallback image URL
- `containerClass`: string - CSS classes for container
- `imageClass`: string - CSS classes for image
- `loading`: 'lazy' | 'eager' - Loading behavior
- `enableHoverZoom`: boolean - Enable hover zoom effect
- `badge`: string - Badge content
- `badgeVariant`: 'primary' | 'success' | 'warning' | 'danger' | 'default'
- `showDebugInfo`: boolean - Show debug information (dev only)

#### Events:
- `@load`: Emitted when image loads successfully
- `@error`: Emitted when image fails to load
- `@loadStart`: Emitted when loading starts

#### Usage:
```vue
<ResponsiveImage
  :src="property.cover_image_responsive || property.cover_image_url"
  :alt="property.title"
  fallback="/placeholder-property.svg"
  container-class="aspect-video rounded-lg"
  :enable-hover-zoom="true"
  loading="lazy"
  @load="handleImageLoad"
  @error="handleImageError"
>
  <template #overlay>
    <!-- Custom overlay content -->
  </template>
</ResponsiveImage>
```

## Data Structure

### ResponsiveImageSet

The new API should return responsive image objects in this format:

```typescript
interface ResponsiveImageVariant {
  url: string
  width: number | null  // null for original/full size
}

interface ResponsiveImageSet {
  thumbnail?: ResponsiveImageVariant    // ~400px width
  medium?: ResponsiveImageVariant       // ~800px width  
  large?: ResponsiveImageVariant        // ~1200px width
  original?: ResponsiveImageVariant     // Full resolution
}
```

### API Response Example

```json
{
  "id": 1,
  "title": "Modern Apartment",
  "cover_image_url": "https://example.com/image.jpg",
  "cover_image_responsive": {
    "thumbnail": {
      "url": "https://example.com/image_400w.jpg",
      "width": 400
    },
    "medium": {
      "url": "https://example.com/image_800w.jpg", 
      "width": 800
    },
    "large": {
      "url": "https://example.com/image_1200w.jpg",
      "width": 1200
    },
    "original": {
      "url": "https://example.com/image.jpg",
      "width": null
    }
  }
}
```

## Updated Type Definitions

The following types have been updated to support responsive images:

### Project
```typescript
interface Project {
  // ... existing fields
  cover_image_responsive?: ResponsiveImageSet
  gallery_responsive?: ResponsiveImageSet[]
}
```

### Property
```typescript
interface Property {
  // ... existing fields
  cover_image_responsive?: ResponsiveImageSet
  gallery_responsive?: ResponsiveImageSet[]
}
```

### Blog
```typescript
interface Blog {
  // ... existing fields
  featured_image_responsive?: ResponsiveImageSet
  gallery_responsive?: ResponsiveImageSet[]
  author_avatar_responsive?: ResponsiveImageSet
}
```

### Agent
```typescript
interface Agent {
  // ... existing fields
  profile_picture_responsive?: ResponsiveImageSet
}
```

## Updated Components

The following components have been updated to use the responsive image system:

1. **PropertyCard** (`src/components/PropertyCard.vue`)
   - Now uses ResponsiveImage component
   - Prefers responsive image set over simple URL
   - Maintains backward compatibility

2. **ProjectCard** (`src/components/ProjectCard.vue`)
   - Updated to use ResponsiveImage component
   - Preserves existing proxy URL logic as fallback
   - Enhanced with responsive image selection

3. **BlogCard** (`src/components/BlogCard.vue`)
   - Uses ResponsiveImage for valid images
   - Falls back to BlogImageGenerator when no image available
   - Maintains existing badge system

4. **HeroImage** (`src/components/Hero/HeroImage.vue`)
   - Updated to accept responsive image sets
   - Maintains all existing functionality
   - Added new `responsiveImageUrl` prop

## Migration Guide

### Backend Changes Required

1. **Image Processing**: Implement image resizing to generate multiple variants
2. **API Updates**: Update API responses to include responsive image objects
3. **Storage**: Ensure all image variants are properly stored and accessible

### Frontend Migration

1. **Immediate Compatibility**: The system works with existing string URLs
2. **Gradual Migration**: Components will automatically use responsive sets when available
3. **Fallback Support**: If responsive sets are not available, falls back to existing URLs

### Example Migration

Before:
```vue
<img :src="property.cover_image_url" :alt="property.title" />
```

After:
```vue
<ResponsiveImage
  :src="property.cover_image_responsive || property.cover_image_url"
  :alt="property.title"
  :fallback="property.cover_image_url"
/>
```

## Performance Benefits

1. **Bandwidth Optimization**: Serves appropriately sized images for each device
2. **Faster Loading**: Smaller images load faster on mobile devices
3. **Better UX**: Reduced loading times improve user experience
4. **CDN Friendly**: Works well with CDN optimization strategies

## Browser Support

- **Modern Browsers**: Full support for all features
- **Legacy Browsers**: Graceful degradation to single image URLs
- **Intersection Observer**: Used for lazy loading (polyfill available if needed)

## Configuration

The system can be configured via the `useResponsiveImages` options:

```typescript
const options = {
  fallbackUrl: '/placeholder.svg',
  lazy: true,
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
  }
}
```

## Testing

Use the `ResponsiveImageExample` component to test all features:
```vue
<ResponsiveImageExample />
```

This component demonstrates:
- Different image variants
- Error handling
- Loading states
- Badge system
- Overlay content
- Performance monitoring

## Next Steps

1. **Backend Implementation**: Implement image processing and API updates
2. **Testing**: Thoroughly test with real responsive image data
3. **Performance Monitoring**: Monitor loading times and bandwidth usage
4. **Documentation**: Update API documentation with new response format
5. **Training**: Train team on new system usage