<template>
  <AppLayout>
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">Blog</h1>
          <p class="page-description">
            Descubre artículos, consejos y tendencias del sector inmobiliario
          </p>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="isLoading && blogs.length === 0" class="loading-container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">Cargando blogs...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error && blogs.length === 0" class="error-container">
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
        <button @click="fetchBlogs" class="retry-btn">Reintentar</button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="main-content">
      <div class="container">
        <!-- Filters Section -->
        <div class="filters-section">
          <div class="filter-row">
            <!-- Search Bar -->
            <div class="search-container">
              <div class="search-input-wrapper">
                <svg
                  class="search-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Buscar blogs..."
                  class="search-input"
                  @input="handleSearch"
                />
                <button
                  v-if="searchQuery"
                  @click="clearSearch"
                  class="clear-search-btn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Category Filter -->
            <div class="filter-container">
              <select
                v-model="selectedCategory"
                @change="applyFilters"
                class="filter-select"
              >
                <option value="">Todas las categorías</option>
                <option
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- Sort Options -->
            <div class="filter-container">
              <select
                v-model="sortOption"
                @change="applySorting"
                class="filter-select"
              >
                <option value="recent">Más recientes</option>
                <option value="popular">Más populares</option>
                <option value="title">Por título</option>
              </select>
            </div>
          </div>

          <!-- Active Filters -->
          <div v-if="hasActiveFilters" class="active-filters">
            <span class="active-filters-label">Filtros activos:</span>

            <div class="filter-tags">
              <span v-if="searchQuery" class="filter-tag">
                <span>Búsqueda: "{{ searchQuery }}"</span>
                <button @click="clearSearch">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </span>

              <span v-if="selectedCategory" class="filter-tag">
                <span>Categoría: {{ selectedCategory }}</span>
                <button @click="clearCategoryFilter">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </span>
            </div>

            <button @click="clearAllFilters" class="clear-filters-btn">
              Limpiar todos los filtros
            </button>
          </div>
        </div>

        <!-- Featured Blogs Section -->
        <section
          v-if="featuredBlogs.length > 0 && !hasActiveFilters"
          class="featured-section"
        >
          <div class="section-header">
            <h2 class="section-title">Artículos destacados</h2>
          </div>

          <div class="featured-grid">
            <BlogCard
              v-for="blog in featuredBlogs.slice(0, 3)"
              :key="`featured-${blog.id}`"
              :blog="blog"
              class="featured-card"
            />
          </div>
        </section>

        <!-- Results Info -->
        <div class="results-info">
          <p class="results-text">
            <span v-if="hasActiveFilters">
              {{ displayedBlogs.length }}
              {{
                displayedBlogs.length === 1
                  ? "resultado encontrado"
                  : "resultados encontrados"
              }}
            </span>
            <span v-else>
              Mostrando {{ displayedBlogs.length }} blogs{{
                featuredBlogs.length > 0
                  ? ` (+ ${featuredBlogs.length} destacados)`
                  : ""
              }}
            </span>
          </p>
        </div>

        <!-- Blogs Grid -->
        <section class="blogs-section">
          <div
            v-if="displayedBlogs.length === 0 && hasActiveFilters"
            class="no-results"
          >
            <svg
              class="no-results-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3>No se encontraron blogs</h3>
            <p>Intenta ajustar tus filtros de búsqueda</p>
            <button @click="clearAllFilters" class="clear-filters-btn">
              Ver todos los blogs
            </button>
          </div>

          <!-- Skeleton Loading -->
          <div v-if="isLoading && blogs.length === 0" class="blogs-grid">
            <BlogCardSkeleton v-for="n in 6" :key="`skeleton-${n}`" />
          </div>

          <!-- Actual Content -->
          <div v-else :class="gridClasses">
            <BlogCard
              v-for="blog in displayedBlogs"
              :key="blog.id"
              :blog="blog"
            />

            <!-- Loading more items -->
            <BlogCardSkeleton
              v-if="isLoading && blogs.length > 0"
              v-for="n in 3"
              :key="`loading-${n}`"
            />
          </div>
        </section>

        <!-- Load More Button -->
        <div
          v-if="
            pagination.currentPage < pagination.lastPage && !hasActiveFilters
          "
          class="load-more-container"
        >
          <button
            @click="loadMoreBlogs"
            :disabled="isLoading"
            class="load-more-btn"
          >
            <span v-if="!isLoading">Cargar más artículos</span>
            <span v-else class="flex items-center">
              <div class="loading-spinner-small mr-2"></div>
              Cargando...
            </span>
          </button>

          <p class="load-more-info">
            Mostrando {{ blogs.length }} de {{ pagination.total }} artículos
          </p>
        </div>

        <!-- Traditional Pagination (backup) -->
        <div
          v-if="pagination.lastPage > 1 && hasActiveFilters"
          class="pagination"
        >
          <button
            @click="goToPage(pagination.currentPage - 1)"
            :disabled="pagination.currentPage <= 1"
            class="pagination-btn"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Anterior
          </button>

          <div class="pagination-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'pagination-number',
                { active: page === pagination.currentPage },
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="goToPage(pagination.currentPage + 1)"
            :disabled="pagination.currentPage >= pagination.lastPage"
            class="pagination-btn"
          >
            Siguiente
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

    <!-- Loading overlay for pagination -->
    <div v-if="isLoading && blogs.length > 0" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useBlogStore } from "@/stores/blogs";
import { storeToRefs } from "pinia";
import BlogCard from "@/components/BlogCard.vue";
import BlogCardSkeleton from "@/components/BlogCardSkeleton.vue";
import AppLayout from "@/components/AppLayout.vue";

// Store
const blogStore = useBlogStore();
const { blogs, featuredBlogs, categories, isLoading, error, pagination } =
  storeToRefs(blogStore);

// Local state
const searchQuery = ref("");
const selectedCategory = ref("");
const sortOption = ref("recent");
const searchResults = ref<typeof blogs.value>([]);
let searchTimeout: NodeJS.Timeout | null = null;

// Computed
const hasActiveFilters = computed(() => {
  return searchQuery.value.length > 0 || selectedCategory.value.length > 0;
});

const displayedBlogs = computed(() => {
  let result = hasActiveFilters.value ? searchResults.value : blogs.value;

  // If no filters are active, exclude featured blogs to avoid duplicates
  if (!hasActiveFilters.value && featuredBlogs.value.length > 0) {
    const featuredIds = new Set(featuredBlogs.value.map((blog) => blog.id));
    result = result.filter((blog) => !featuredIds.has(blog.id));
  }

  // Apply sorting
  if (sortOption.value === "popular") {
    result = [...result].sort(
      (a, b) => (b.views_count || 0) - (a.views_count || 0),
    );
  } else if (sortOption.value === "title") {
    result = [...result].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    result = [...result].sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
    );
  }

  return result;
});

// Computed para las clases dinámicas del grid
const gridClasses = computed(() => {
  const count = displayedBlogs.value.length;
  
  return {
    'blogs-grid': true,
    'single-blog': count === 1,
    'two-blogs': count === 2,
    'three-blogs': count === 3,
    'multiple-blogs': count > 3
  };
});

const visiblePages = computed(() => {
  const current = pagination.value.currentPage;
  const last = pagination.value.lastPage;
  const delta = 2;
  const range = [];
  const rangeWithDots = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(last - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current - delta > 2) {
    rangeWithDots.push(1, "...");
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (current + delta < last - 1) {
    rangeWithDots.push("...", last);
  } else if (last > 1) {
    rangeWithDots.push(last);
  }

  return rangeWithDots;
});

// Methods
const fetchBlogs = async (page = 1) => {
  await blogStore.fetchBlogs(
    {
      with: "media,image,featured_image",
      include: "featured_image,gallery,media,image",
      fields: "*",
    },
    page,
  );
};

const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    applyFilters();
  }, 300); // Debounce search by 300ms
};

const applyFilters = () => {
  if (!selectedCategory.value && !searchQuery.value) {
    searchResults.value = [];
    return;
  }

  let results = [...blogs.value];

  // Apply category filter
  if (selectedCategory.value) {
    results = results.filter(
      (blog) => blog.category === selectedCategory.value,
    );
  }

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase().trim();
    results = results.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        blog.category.toLowerCase().includes(query),
    );
  }

  searchResults.value = results;
};

const applySorting = () => {
  // Sorting is handled in computed displayedBlogs
};

const clearSearch = () => {
  searchQuery.value = "";
  handleSearch();
};

const clearCategoryFilter = () => {
  selectedCategory.value = "";
  applyFilters();
};

const clearAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  searchResults.value = [];
};

const loadMoreBlogs = async () => {
  if (pagination.value.currentPage < pagination.value.lastPage) {
    await blogStore.loadMoreBlogs(pagination.value.currentPage + 1);
  }
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= pagination.value.lastPage) {
    fetchBlogs(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Watch for filter changes
watch([searchQuery, selectedCategory], () => {
  applyFilters();
});

// Lifecycle
onMounted(async () => {
  try {
    // Use optimized single call to load all data and prevent multiple re-renders
    await blogStore.initializeBlogsPage();
    
    // Apply grid classes after initial render to prevent flash
    await nextTick();
  } catch (err) {
    console.error("Failed to load blogs:", err);
  }
});
</script>

<style scoped>
/* Page Header */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: clamp(60px, 8vw, 80px) 0 clamp(40px, 6vw, 60px);
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  opacity: 0.9;
  line-height: 1.6;
}

/* Loading and Error States */
.loading-container,
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
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
  margin-bottom: 20px;
}

.retry-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-btn:hover {
  background: #5a6fd8;
}

/* Main Content */
.main-content {
  padding: 40px 0;
}

/* Filters Section */
.filters-section {
  margin-bottom: 40px;
}

.filter-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: stretch;
}

.search-container {
  flex: 2;
  min-width: 300px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 20px;
  height: 20px;
  color: #9ca3af;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.clear-search-btn {
  position: absolute;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  background: #f3f4f6;
  border-radius: 50%;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.clear-search-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.clear-search-btn svg {
  width: 14px;
  height: 14px;
}

.filter-container {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Active Filters */
.active-filters {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.active-filters-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.filter-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  padding: 4px 8px 4px 12px;
  font-size: 0.875rem;
  color: #374151;
}

.filter-tag button {
  background: none;
  border: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.filter-tag button:hover {
  background: #f3f4f6;
  color: #374151;
}

.filter-tag button svg {
  width: 12px;
  height: 12px;
}

.clear-filters-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-filters-btn:hover {
  background: #5a6fd8;
  transform: translateY(-1px);
}

/* Featured Section */
.featured-section {
  margin-bottom: 40px;
  padding: 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.section-header {
  margin-bottom: 24px;
  text-align: center;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.5rem, 4vw, 2rem);
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .featured-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Results Info */
.results-info {
  margin-bottom: 24px;
}

.results-text {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Blogs Section */
.blogs-section {
  margin-bottom: 40px;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.no-results-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  color: #d1d5db;
}

.no-results h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.no-results p {
  font-size: 1rem;
  margin-bottom: 24px;
}

.blogs-grid {
  display: grid;
  gap: clamp(1.5rem, 4vw, 2rem);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  /* Fixed grid for single blog to prevent layout shift */
  grid-template-columns: 1fr;
  /* Smooth transitions for layout changes */
  transition: all 0.3s ease-in-out;
}

/* Single blog layout - always centered and fixed width */
.blogs-grid.single-blog {
  grid-template-columns: 1fr;
  max-width: 400px !important;
  margin: 0 auto;
}

/* Two blogs layout */
.blogs-grid.two-blogs {
  grid-template-columns: repeat(2, 1fr);
  max-width: 800px;
  margin: 0 auto;
}

/* Three blogs layout */
.blogs-grid.three-blogs {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  max-width: 900px;
  margin: 0 auto;
}

/* Multiple blogs layout */
.blogs-grid.multiple-blogs {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Responsive adjustments for multiple blogs */
@media (min-width: 640px) {
  .blogs-grid.multiple-blogs {
    grid-template-columns: repeat(2, 1fr);
    max-width: 680px;
  }
  
  .blogs-grid.three-blogs {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1020px;
  }
}

@media (min-width: 1024px) {
  .blogs-grid.multiple-blogs {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1200px;
    gap: clamp(2rem, 3vw, 2.5rem);
  }
}

@media (min-width: 1280px) {
  .blogs-grid.multiple-blogs {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1400px;
  }
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 2px solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn svg {
  width: 16px;
  height: 16px;
}

.pagination-numbers {
  display: flex;
  gap: 4px;
}

.pagination-number {
  width: 40px;
  height: 40px;
  border: 2px solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-number:hover {
  border-color: #667eea;
  color: #667eea;
}

.pagination-number.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

/* Load More Section */
.load-more-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
  padding: 24px;
}

.load-more-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 48px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.load-more-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.load-more-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.load-more-info {
  color: #6b7280;
  font-size: 0.875rem;
  text-align: center;
}

.loading-spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

/* Mobile-First Responsive Design */
@media (max-width: 640px) {
  .page-header {
    padding: 32px 0 24px;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-description {
    font-size: 1rem;
  }

  .main-content {
    padding: 24px 0;
  }

  .filters-section {
    margin-bottom: 24px;
  }

  .filter-row {
    flex-direction: column;
    gap: 12px;
  }

  .search-container {
    min-width: unset;
    order: 1;
  }

  .filter-container {
    min-width: unset;
  }

  .search-input {
    padding: 14px 14px 14px 44px;
    font-size: 16px; /* Prevents zoom on iOS */
  }

  .filter-select {
    padding: 14px 16px;
    font-size: 16px; /* Prevents zoom on iOS */
  }

  .active-filters {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 12px;
  }

  .filter-tags {
    justify-content: flex-start;
  }

  .featured-section {
    margin: 0 -16px 24px -16px;
    border-radius: 0;
    border-left: none;
    border-right: none;
    padding: 20px 16px;
  }

  .featured-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .blogs-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    max-width: 100%;
  }

  .results-info {
    margin-bottom: 16px;
  }

  .pagination {
    gap: 4px;
    margin-top: 32px;
  }

  .pagination-btn {
    padding: 10px 14px;
    font-size: 0.875rem;
  }

  .pagination-number {
    width: 38px;
    height: 38px;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .page-header {
    padding: 24px 0 20px;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .search-container {
    min-width: 240px;
  }

  .filter-select {
    padding: 12px 14px;
  }

  .pagination {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .pagination-numbers {
    order: 1;
  }

  .pagination-btn {
    min-width: 120px;
    justify-content: center;
  }

  .load-more-container {
    margin-top: 24px;
    padding: 16px;
  }

  .load-more-btn {
    padding: 12px 24px;
    font-size: 0.875rem;
    min-width: 180px;
    min-height: 44px;
  }
}
</style>
