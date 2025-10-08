import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Blog, BlogFilters, ApiResponse } from "@/types";
import { apiService } from "@/services/api";

export const useBlogStore = defineStore("blogs", () => {
  // State
  const blogs = ref<Blog[]>([]);
  const currentBlog = ref<Blog | null>(null);
  const featuredBlogs = ref<Blog[]>([]);
  const categories = ref<string[]>([]);
  const tags = ref<string[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const filters = ref<BlogFilters>({});
  const pagination = ref({
    currentPage: 1,
    lastPage: 1,
    perPage: 6, // Reducido para carga más rápida
    total: 0,
  });

  // Cache para evitar recargas innecesarias
  const cache = ref<{ [key: string]: any }>({});
  const cacheTimestamps = ref<{ [key: string]: number }>({});
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  // Getters
  const publishedBlogs = computed(() =>
    blogs.value.filter((blog) => blog.status === "published"),
  );

  const blogsByCategory = computed(() => {
    return (category: string) =>
      publishedBlogs.value.filter((blog) => blog.category === category);
  });

  const blogsByTag = computed(() => {
    return (tag: string) =>
      publishedBlogs.value.filter((blog) => blog.tags.includes(tag));
  });

  const recentBlogs = computed(() =>
    publishedBlogs.value
      .slice()
      .sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime(),
      )
      .slice(0, 6),
  );

  const popularBlogs = computed(() =>
    publishedBlogs.value
      .slice()
      .sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
      .slice(0, 6),
  );

  // Helper function to process blog image URLs
  const processBlogImages = (blog: Blog): Blog => {
    const processedBlog = { ...blog };
    
    // Try to find a valid image from different possible fields (updated based on actual backend structure)
    const possibleImageFields = [
      'cover_image_url',
      'featured_image_url',
      'featured_image', 
      'cover_image',
      'image',
      'banner',
      'cover',
      'thumbnail'
    ];
    
    let foundImageUrl = null;
    for (const field of possibleImageFields) {
      const value = (blog as any)[field];
      if (value && value !== 'null' && value !== 'undefined' && typeof value === 'string') {
        foundImageUrl = value;
        break;
      }
    }
    
    // Set the featured_image_url to the first valid image found
    if (foundImageUrl) {
      processedBlog.featured_image_url = foundImageUrl;
      processedBlog.featured_image = foundImageUrl;
    }
    
    return processedBlog;
  };

  // Cache helper functions
  const getCacheKey = (filters: BlogFilters, page: number) => {
    return JSON.stringify({ filters, page });
  };

  const isValidCache = (key: string) => {
    const timestamp = cacheTimestamps.value[key];
    return timestamp && Date.now() - timestamp < CACHE_DURATION;
  };

  // Actions
  const loadMoreBlogs = async (page: number) => {
    try {
      isLoading.value = true;
      error.value = null;

      const finalFilters = { ...filters.value };
      const cacheKey = getCacheKey(finalFilters, page);

      // Verificar caché primero
      if (isValidCache(cacheKey) && cache.value[cacheKey]) {
        const cachedData = cache.value[cacheKey];
        // Agregar blogs al array existente en lugar de reemplazar
        blogs.value = [...blogs.value, ...cachedData.data];
        pagination.value = cachedData.pagination;
        isLoading.value = false;
        return;
      }

      const response: ApiResponse<Blog[]> = await apiService.getBlogs({
        ...finalFilters,
        page,
        // Minimal fields for better performance
        fields: "id,title,slug,excerpt,cover_image_url,featured_image_url,author,category,tags,status,published_at,views_count,reading_time,is_featured",
      });

      // Process blogs to fix image URLs
      const processedBlogs = response.data.map(processBlogImages);

      // Only log in development
      if (import.meta.env.DEV) {
        console.log("BlogStore: Loaded", processedBlogs.length, "more blogs");
      }

      // Agregar nuevos blogs al array existente
      blogs.value = [...blogs.value, ...processedBlogs];

      if (response.meta) {
        pagination.value = {
          currentPage: response.meta.current_page,
          lastPage: response.meta.last_page,
          perPage: response.meta.per_page,
          total: response.meta.total,
        };
      }

      // Guardar en caché
      cache.value[cacheKey] = {
        data: response.data,
        pagination: pagination.value,
      };
      cacheTimestamps.value[cacheKey] = Date.now();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error al cargar más blogs";
      console.error("Error loading more blogs:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchBlogs = async (newFilters?: BlogFilters, page: number = 1) => {
    try {
      isLoading.value = true;
      error.value = null;

      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters };
      }

      const finalFilters = { ...filters.value };
      const cacheKey = getCacheKey(finalFilters, page);

      // Verificar caché primero
      if (isValidCache(cacheKey) && cache.value[cacheKey]) {
        const cachedData = cache.value[cacheKey];
        blogs.value = cachedData.data;
        pagination.value = cachedData.pagination;
        isLoading.value = false;
        return;
      }

      const response: ApiResponse<Blog[]> = await apiService.getBlogs({
        ...finalFilters,
        page,
        // Minimal fields for better performance
        fields: "id,title,slug,excerpt,cover_image_url,featured_image_url,author,category,tags,status,published_at,views_count,reading_time,is_featured",
      });

      // Process blogs to fix image URLs
      const processedBlogs = response.data.map(processBlogImages);

      // Only log in development
      if (import.meta.env.DEV) {
        console.log("BlogStore: Loaded", processedBlogs.length, "blogs");
      }

      blogs.value = processedBlogs;

      if (response.meta) {
        pagination.value = {
          currentPage: response.meta.current_page,
          lastPage: response.meta.last_page,
          perPage: response.meta.per_page,
          total: response.meta.total,
        };
      }

      // Guardar en caché
      cache.value[cacheKey] = {
        data: response.data,
        pagination: pagination.value,
      };
      cacheTimestamps.value[cacheKey] = Date.now();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error al cargar los blogs";
      console.error("Error fetching blogs:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchBlog = async (idOrSlug: number | string) => {
    try {
      isLoading.value = true;
      error.value = null;

      const blog = await apiService.getBlog(idOrSlug);

      // Log individual blog data for debugging
      if (import.meta.env.DEV) {
        console.log("BlogStore: Individual blog data:", {
          id: blog.id,
          title: blog.title,
          featured_image: blog.featured_image,
          featured_image_url: blog.featured_image_url,
          image: (blog as any).image,
          banner: (blog as any).banner,
          cover: (blog as any).cover,
          thumbnail: (blog as any).thumbnail,
          allFields: Object.keys(blog),
        });
      }

      currentBlog.value = blog;

      return blog;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error al cargar el blog";
      console.error("Error fetching blog:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchFeaturedBlogs = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      const featured = await apiService.getFeaturedBlogs();
      
      // Process featured blogs to fix image URLs
      const processedFeatured = featured.map(processBlogImages);
      
      if (import.meta.env.DEV) {
        console.log("BlogStore: Loaded", processedFeatured.length, "featured blogs");
      }
      featuredBlogs.value = processedFeatured;

      return processedFeatured;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Error al cargar blogs destacados";
      console.error("Error fetching featured blogs:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchBlogCategories = async () => {
    try {
      const blogCategories = await apiService.getBlogCategories();
      categories.value = blogCategories;
      return blogCategories;
    } catch (err: any) {
      console.error("Error fetching blog categories:", err);
    }
  };

  const fetchBlogTags = async () => {
    try {
      const blogTags = await apiService.getBlogTags();
      tags.value = blogTags;
      return blogTags;
    } catch (err: any) {
      console.error("Error fetching blog tags:", err);
    }
  };

  const setFilters = (newFilters: BlogFilters) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  const clearFilters = () => {
    filters.value = {};
  };

  const clearError = () => {
    error.value = null;
  };

  const clearCurrentBlog = () => {
    currentBlog.value = null;
  };

  const searchBlogs = (query: string) => {
    return publishedBlogs.value.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        blog.content.toLowerCase().includes(query.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase()),
        ),
    );
  };

  // Optimized function to load all initial data in one batch
  const initializeBlogsPage = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      // Load essential data first (blogs only) for faster initial render
      const blogsResponse = await apiService.getBlogs({
        per_page: 6,
        // Minimal fields for faster loading
        fields: "id,title,slug,excerpt,cover_image_url,featured_image_url,author,category,tags,status,published_at,views_count,reading_time,is_featured",
        // Remove heavy includes that slow down the API
      });

      // Process and show blogs immediately
      const processedBlogs = blogsResponse.data.map(processBlogImages);
      blogs.value = processedBlogs;
      
      if (blogsResponse.meta) {
        pagination.value = {
          currentPage: blogsResponse.meta.current_page,
          lastPage: blogsResponse.meta.last_page,
          perPage: blogsResponse.meta.per_page,
          total: blogsResponse.meta.total,
        };
      }

      // Load secondary data in background (non-blocking)
      Promise.allSettled([
        apiService.getFeaturedBlogs(),
        apiService.getBlogCategories()
      ]).then(([featuredResponse, categoriesResponse]) => {
        // Process featured blogs
        if (featuredResponse.status === 'fulfilled') {
          const processedFeatured = featuredResponse.value.map(processBlogImages);
          featuredBlogs.value = processedFeatured;
        }

        // Process categories
        if (categoriesResponse.status === 'fulfilled') {
          categories.value = categoriesResponse.value;
        }

        if (import.meta.env.DEV) {
          console.log("BlogStore: Secondary data loaded -", featuredBlogs.value.length, "featured blogs,", categories.value.length, "categories");
        }
      }).catch(err => {
        console.warn("Error loading secondary blog data:", err);
      });


    } catch (err: any) {
      error.value = err.response?.data?.message || "Error al cargar los datos de blogs";
      console.error("Error initializing blogs page:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    blogs,
    currentBlog,
    featuredBlogs,
    categories,
    tags,
    isLoading,
    error,
    filters,
    pagination,

    // Getters
    publishedBlogs,
    blogsByCategory,
    blogsByTag,
    recentBlogs,
    popularBlogs,

    // Actions
    fetchBlogs,
    loadMoreBlogs,
    fetchBlog,
    fetchFeaturedBlogs,
    fetchBlogCategories,
    fetchBlogTags,
    initializeBlogsPage,
    setFilters,
    clearFilters,
    clearError,
    clearCurrentBlog,
    searchBlogs,
  };
});
