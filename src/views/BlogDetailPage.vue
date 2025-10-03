<template>
  <AppLayout>
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">Cargando artículo...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error && !currentBlog" class="error-container">
      <div class="error-content">
        <svg
          class="error-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
          ></path>
        </svg>
        <p class="error-message">{{ error }}</p>
        <p class="error-details" v-if="error?.includes('servidor')">
          El artículo puede no estar disponible temporalmente. Por favor,
          inténtalo más tarde o contacta con el administrador.
        </p>
        <div class="error-actions">
          <button @click="fetchBlogData" class="retry-btn">Reintentar</button>
          <button @click="goBack" class="back-btn-error">Volver al Blog</button>
        </div>
      </div>
    </div>

    <!-- Blog Detail Content -->
    <article v-else-if="currentBlog && currentBlog.id" class="blog-detail">
      <!-- Back Button -->
      <div class="back-navigation">
        <button @click="goBack" class="back-btn">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Volver al Blog</span>
        </button>
      </div>

      <!-- Blog Header -->
      <header class="blog-header">
        <div class="blog-meta">
          <div class="meta-row">
            <div class="author-info">
              <img
                v-if="currentBlog.author_avatar"
                :src="currentBlog.author_avatar"
                :alt="currentBlog.author_name"
                class="author-avatar"
              />
              <div v-else class="author-avatar-default">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
              </div>
              <div class="author-details">
                <span class="author-name">{{ currentBlog.author_name }}</span>
                <span class="publish-date">{{
                  formatDate(currentBlog.published_at)
                }}</span>
              </div>
            </div>

            <div class="blog-stats">
              <div v-if="currentBlog.reading_time" class="stat-item">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
                <span>{{ currentBlog.reading_time }} min de lectura</span>
              </div>
              <div v-if="currentBlog.views_count" class="stat-item">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span
                  >{{ formatNumber(currentBlog.views_count) }}
                  {{ currentBlog.views_count === 1 ? "vista" : "vistas" }}</span
                >
              </div>
            </div>
          </div>

          <!-- Category and Featured Badge -->
          <div class="badges-row">
            <span class="category-badge">{{ currentBlog.category }}</span>
            <span v-if="currentBlog.is_featured" class="featured-badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              Destacado
            </span>
          </div>
        </div>

        <!-- Blog Title -->
        <h1 class="blog-title">{{ currentBlog.title }}</h1>

        <!-- Blog Excerpt -->
        <p v-if="currentBlog.excerpt" class="blog-excerpt">
          {{ currentBlog.excerpt }}
        </p>

        <!-- Tags -->
        <div
          v-if="currentBlog.tags && currentBlog.tags.length > 0"
          class="blog-tags"
        >
          <span
            v-for="tag in currentBlog.tags"
            :key="tag"
            class="tag"
            @click="searchByTag(tag)"
          >
            #{{ tag }}
          </span>
        </div>
      </header>

      <!-- Featured Image -->
      <div
        v-if="currentBlog.featured_image_url || currentBlog.featured_image"
        class="featured-image-container"
      >
        <img
          :src="
            getImageUrl(
              currentBlog.featured_image_url || currentBlog.featured_image,
            )
          "
          :alt="currentBlog.title"
          class="featured-image"
          @error="handleImageError"
        />
      </div>

      <!-- Blog Content -->
      <div class="blog-content-wrapper">
        <div
          class="blog-content"
          v-html="formatContent(currentBlog.content)"
        ></div>
      </div>

      <!-- Gallery -->
      <div
        v-if="currentBlog.gallery_urls && currentBlog.gallery_urls.length > 0"
        class="blog-gallery"
      >
        <h3 class="gallery-title">Galería</h3>
        <div class="gallery-grid">
          <div
            v-for="(image, index) in currentBlog.gallery_urls"
            :key="index"
            class="gallery-item"
            @click="openImageModal(image, index)"
          >
            <img
              :src="getImageUrl(image)"
              :alt="`${currentBlog.title} - Imagen ${index + 1}`"
              class="gallery-image"
              loading="lazy"
            />
            <div class="gallery-overlay">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Share Section -->
      <div class="share-section">
        <h3 class="share-title">Compartir este artículo</h3>
        <div class="share-buttons">
          <button @click="shareOnFacebook" class="share-btn facebook">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            <span>Facebook</span>
          </button>

          <button @click="shareOnTwitter" class="share-btn twitter">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
              />
            </svg>
            <span>Twitter</span>
          </button>

          <button @click="shareOnWhatsApp" class="share-btn whatsapp">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
              />
            </svg>
            <span>WhatsApp</span>
          </button>

          <button @click="copyLink" class="share-btn copy">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
              />
              <path
                d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
              />
            </svg>
            <span>{{ linkCopied ? "Copiado!" : "Copiar enlace" }}</span>
          </button>
        </div>
      </div>

      <!-- Related Blogs Section -->
      <section v-if="relatedBlogs.length > 0" class="related-blogs">
        <h3 class="section-title">Artículos relacionados</h3>
        <div class="related-blogs-grid">
          <BlogCard
            v-for="blog in relatedBlogs"
            :key="blog.id"
            :blog="blog"
            class="related-blog-card"
          />
        </div>
      </section>
    </article>

    <!-- Image Modal -->
    <div v-if="imageModalOpen" class="image-modal" @click="closeImageModal">
      <div class="image-modal-container" @click.stop>
        <button @click="closeImageModal" class="modal-close-btn">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <img
          :src="getImageUrl(currentModalImage)"
          :alt="currentBlog?.title"
          class="modal-image"
        />

        <div
          v-if="
            currentBlog?.gallery_urls && currentBlog.gallery_urls.length > 1
          "
          class="modal-navigation"
        >
          <button @click="prevModalImage" class="modal-nav-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <span class="modal-counter">
            {{ currentModalIndex + 1 }} / {{ currentBlog.gallery_urls.length }}
          </span>

          <button @click="nextModalImage" class="modal-nav-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBlogStore } from "@/stores/blogs";
import { storeToRefs } from "pinia";
import BlogCard from "@/components/BlogCard.vue";
import AppLayout from "@/components/AppLayout.vue";

// Router
const route = useRoute();
const router = useRouter();

// Store
const blogStore = useBlogStore();
const { currentBlog, isLoading, error, publishedBlogs } =
  storeToRefs(blogStore);

// Local state
const imageModalOpen = ref(false);
const currentModalImage = ref("");
const currentModalIndex = ref(0);
const linkCopied = ref(false);

// Computed
const relatedBlogs = computed(() => {
  if (!currentBlog.value) return [];

  return publishedBlogs.value
    .filter(
      (blog) =>
        blog.id !== currentBlog.value?.id &&
        (blog.category === currentBlog.value?.category ||
          blog.tags.some((tag) => currentBlog.value?.tags.includes(tag))),
    )
    .slice(0, 3);
});

const getImageUrl = computed(() => {
  return (url: string) => {
    if (!url)
      return "https://via.placeholder.com/800x400/f3f4f6/6b7280?text=Blog+Image";

    // In development, convert absolute URLs to relative for proxy
    if (import.meta.env.DEV && url.includes("app.tierrasonada.com")) {
      return url
        .replace("https://app.tierrasonada.com", "")
        .replace("http://app.tierrasonada.com", "");
    }

    return url;
  };
});

// Methods
const fetchBlogData = async () => {
  const slugOrId = route.params.id as string;
  try {
    await blogStore.fetchBlog(slugOrId);
  } catch (err) {
    console.error("Error fetching blog:", err);
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return Math.floor(num / 1000000) + "M";
  if (num >= 1000) return Math.floor(num / 1000) + "K";
  return num.toString();
};

const formatContent = (content: string) => {
  // Basic HTML formatting - in production you might want to use a proper markdown parser
  return content
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
};

const openImageModal = (image: string, index: number) => {
  currentModalImage.value = image;
  currentModalIndex.value = index;
  imageModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeImageModal = () => {
  imageModalOpen.value = false;
  document.body.style.overflow = "";
};

const prevModalImage = () => {
  if (currentBlog.value?.gallery_urls) {
    const newIndex =
      currentModalIndex.value > 0
        ? currentModalIndex.value - 1
        : currentBlog.value.gallery_urls.length - 1;
    currentModalIndex.value = newIndex;
    currentModalImage.value = currentBlog.value.gallery_urls[newIndex];
  }
};

const nextModalImage = () => {
  if (currentBlog.value?.gallery_urls) {
    const newIndex =
      currentModalIndex.value < currentBlog.value.gallery_urls.length - 1
        ? currentModalIndex.value + 1
        : 0;
    currentModalIndex.value = newIndex;
    currentModalImage.value = currentBlog.value.gallery_urls[newIndex];
  }
};

const shareOnFacebook = () => {
  const url = window.location.href;
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    "_blank",
  );
};

const shareOnTwitter = () => {
  const url = window.location.href;
  const text = currentBlog.value?.title || "Mira este artículo";
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    "_blank",
  );
};

const shareOnWhatsApp = () => {
  const url = window.location.href;
  const text = `${currentBlog.value?.title || "Mira este artículo"} ${url}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    linkCopied.value = true;
    setTimeout(() => {
      linkCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Error copying to clipboard:", err);
  }
};

const searchByTag = (tag: string) => {
  router.push({
    path: "/blog",
    query: { tag },
  });
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  console.log("BlogDetailPage: Image failed to load:", target.src);
  target.src =
    "https://via.placeholder.com/800x400/f3f4f6/6b7280?text=Sin+Imagen";
};

const goBack = () => {
  router.push("/blog");
};

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (imageModalOpen.value) {
    if (event.key === "Escape") {
      closeImageModal();
    } else if (event.key === "ArrowLeft") {
      prevModalImage();
    } else if (event.key === "ArrowRight") {
      nextModalImage();
    }
  }
};

// Lifecycle
onMounted(async () => {
  await fetchBlogData();
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<style scoped>
/* Loading and Error States */
.loading-container,
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 40px 20px;
}

.loading-content,
.error-content {
  text-align: center;
  max-width: 400px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #6b7280;
  font-size: 1.125rem;
}

.error-icon {
  width: 48px;
  height: 48px;
  color: #ef4444;
  margin: 0 auto 16px;
}

.error-message {
  color: #374151;
  font-size: 1.125rem;
  margin-bottom: 8px;
}

.error-details {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 20px;
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.retry-btn,
.back-btn-error {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-btn {
  background: #667eea;
  color: white;
}

.retry-btn:hover {
  background: #5a6fd8;
}

.back-btn-error {
  background: #f3f4f6;
  color: #374151;
}

.back-btn-error:hover {
  background: #e5e7eb;
}

/* Blog Detail */
.blog-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(20px, 4vw, 40px) 20px;
}

/* Back Navigation */
.back-navigation {
  margin-bottom: 30px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 2px solid #e5e7eb;
  color: #374151;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateX(-2px);
}

.back-btn svg {
  width: 16px;
  height: 16px;
}

/* Blog Header */
.blog-header {
  margin-bottom: 40px;
}

.blog-meta {
  margin-bottom: 24px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 16px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-avatar-default {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}

.author-avatar-default svg {
  width: 24px;
  height: 24px;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 2px;
}

.publish-date {
  font-size: 0.875rem;
  color: #6b7280;
}

.blog-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 0.875rem;
}

.stat-item svg {
  width: 16px;
  height: 16px;
}

.badges-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.category-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.featured-badge {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.featured-badge svg {
  width: 12px;
  height: 12px;
}

.blog-title {
  font-size: clamp(1.875rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #111827;
  line-height: 1.2;
  margin-bottom: 16px;
}

.blog-excerpt {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 20px;
  font-style: italic;
}

.blog-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: #f3f4f6;
  color: #374151;
  font-size: 0.875rem;
  padding: 6px 12px;
  border-radius: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.tag:hover {
  background: #667eea;
  color: white;
  transform: translateY(-1px);
}

/* Featured Image */
.featured-image-container {
  margin-bottom: 40px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.featured-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Blog Content */
.blog-content-wrapper {
  margin-bottom: 40px;
}

.blog-content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
}

.blog-content :deep(p) {
  margin-bottom: 20px;
}

.blog-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 32px 0 16px;
}

.blog-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 24px 0 12px;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.blog-content :deep(li) {
  margin-bottom: 8px;
}

.blog-content :deep(blockquote) {
  border-left: 4px solid #667eea;
  padding-left: 20px;
  margin: 24px 0;
  font-style: italic;
  color: #6b7280;
}

/* Gallery */
.blog-gallery {
  margin-bottom: 40px;
}

.gallery-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 20px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.gallery-item {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.gallery-item:hover {
  transform: scale(1.02);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-overlay svg {
  width: 32px;
  height: 32px;
}

/* Share Section */
.share-section {
  background: #f9fafb;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 40px;
  text-align: center;
}

.share-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 20px;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
}

.share-btn svg {
  width: 16px;
  height: 16px;
}

.share-btn.facebook {
  background: #1877f2;
}

.share-btn.facebook:hover {
  background: #166fe5;
}

.share-btn.twitter {
  background: #1da1f2;
}

.share-btn.twitter:hover {
  background: #0c90e0;
}

.share-btn.whatsapp {
  background: #25d366;
}

.share-btn.whatsapp:hover {
  background: #20bd5a;
}

.share-btn.copy {
  background: #6b7280;
}

.share-btn.copy:hover {
  background: #4b5563;
}

/* Related Blogs */
.related-blogs {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 2px solid #f3f4f6;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
  text-align: center;
}

.related-blogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* Image Modal */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.image-modal-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-close-btn {
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-close-btn svg {
  width: 20px;
  height: 20px;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
}

.modal-navigation {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.modal-nav-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.modal-nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.modal-nav-btn svg {
  width: 20px;
  height: 20px;
}

.modal-counter {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-detail {
    padding: 20px 16px;
  }

  .meta-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .blog-stats {
    align-items: flex-start;
  }

  .blog-content {
    font-size: 1rem;
  }

  .share-buttons {
    flex-direction: column;
    max-width: 200px;
    margin: 0 auto;
  }

  .share-btn {
    width: 100%;
    justify-content: center;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .related-blogs-grid {
    grid-template-columns: 1fr;
  }

  .modal-navigation {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
