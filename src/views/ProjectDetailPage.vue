<template>
  <AppLayout>
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">Cargando información del proyecto...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error && !project" class="error-container">
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
          El proyecto puede no estar disponible temporalmente. Por favor,
          inténtalo más tarde o contacta con el administrador.
        </p>
        <div class="error-actions">
          <button @click="fetchProjectData" class="retry-btn">
            Reintentar
          </button>
          <button @click="goBack" class="back-btn-error">
            Volver a Proyectos
          </button>
        </div>
      </div>
    </div>

    <!-- Project Detail Content -->
    <div v-else-if="project && project.id" class="project-detail-container">
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
          <span>Volver a Proyectos</span>
        </button>
      </div>

      <!-- Project Hero Section -->
      <section class="project-hero">
        <div class="hero-content">
          <!-- Project Image Gallery -->
          <div class="project-image-section">
            <div class="main-image-container">
              <img
                :src="getImageUrl(currentImage)"
                :alt="project.name"
                class="project-main-image"
              />

              <!-- Image Navigation -->
              <button
                v-if="projectImages.length > 1"
                @click="prevImage"
                class="image-nav-btn image-nav-prev"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                v-if="projectImages.length > 1"
                @click="nextImage"
                class="image-nav-btn image-nav-next"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <!-- Image Counter -->
              <div v-if="projectImages.length > 1" class="image-counter">
                {{ currentImageIndex + 1 }} / {{ projectImages.length }}
              </div>
            </div>

            <!-- Thumbnails -->
            <div v-if="projectImages.length > 1" class="thumbnails-container">
              <div
                v-for="(image, index) in projectImages"
                :key="index"
                class="thumbnail-item"
                :class="{ active: currentImageIndex === index }"
                @click="selectImage(index)"
              >
                <img
                  :src="getImageUrl(image)"
                  :alt="`${project.name} - ${index + 1}`"
                />
              </div>
            </div>
          </div>

          <!-- Project Information -->
          <div class="project-info-section">
            <div class="project-header">
              <h1 class="project-name">{{ project.name }}</h1>

              <!-- Información como las cards -->
              <div class="project-card-info">
                <!-- Tipo de Proyecto -->
                <div class="project-type-card" v-if="project.type">
                  {{ project.type }}
                </div>

                <!-- Ubicación completa -->
                <div class="project-location-card">
                  <svg
                    class="location-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span v-if="project.location">{{ project.location }}</span>
                  <span v-else-if="project.city">
                    {{ project.city
                    }}<span v-if="project.state">, {{ project.state }}</span>
                  </span>
                  <span v-else>-</span>
                </div>
              </div>
            </div>

            <div class="project-details-grid">
              <!-- Tipo de Proyecto -->
              <div class="detail-item" v-if="project.type">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  />
                  <polyline points="7.5,4.21 12,6.81 16.5,4.21" />
                  <polyline points="7.5,19.79 7.5,14.6 3,12" />
                  <polyline points="21,12 16.5,14.6 16.5,19.79" />
                </svg>
                <div class="detail-content">
                  <span class="detail-label">Tipo de Proyecto</span>
                  <span class="detail-value">{{ project.type }}</span>
                </div>
              </div>

              <!-- Estado del Proyecto -->
              <div class="detail-item" v-if="project.status">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <div class="detail-content">
                  <span class="detail-label">Estado</span>
                  <span
                    class="detail-value"
                    :style="{ color: project.status_color || '#28a745' }"
                    >{{ project.status }}</span
                  >
                </div>
              </div>

              <!-- Videos disponibles -->
              <div
                class="detail-item"
                v-if="project.videos && project.videos.length > 0"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                <div class="detail-content">
                  <span class="detail-label">Videos</span>
                  <span class="detail-value"
                    >{{ project.videos.length }}
                    {{ project.videos.length === 1 ? "Video" : "Videos" }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Agent Information (if available) -->
            <div class="agent-info" v-if="project.agent">
              <h3>Agente del Proyecto</h3>
              <div class="agent-card-mini" @click="goToAgent(project.agent.id)">
                <div class="agent-avatar">
                  <img
                    :src="getImageUrl(project.agent.profile_picture_url)"
                    :alt="project.agent.name"
                    class="agent-image-mini"
                  />
                </div>
                <div class="agent-details-mini">
                  <h4 class="agent-name-mini">{{ project.agent.name }}</h4>
                  <p class="agent-type-mini" v-if="project.agent.type">
                    {{ project.agent.type }}
                  </p>
                  <div class="agent-contact-mini">
                    <a
                      :href="`tel:${project.agent.phone}`"
                      class="contact-mini"
                      v-if="project.agent.phone"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                        />
                      </svg>
                      {{ project.agent.phone }}
                    </a>
                    <a
                      :href="`mailto:${project.agent.email}`"
                      class="contact-mini"
                      v-if="project.agent.email"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      {{ project.agent.email }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Properties Count -->
            <div class="stats-section" v-if="project.property_count">
              <div class="stat-item">
                <div class="stat-number">{{ project.property_count }}</div>
                <div class="stat-label">Propiedades</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Description -->
      <section class="project-description-section" v-if="project.description">
        <div class="description-container">
          <h2 class="section-title">Sobre {{ project.name }}</h2>
          <div class="description-content">
            <!-- Párrafos organizados -->
            <!-- Simple description as it comes from API -->
            <div class="description-paragraphs">
              <p class="text-lg text-gray-700 leading-relaxed">
                {{ project.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Info notice when using basic project info -->
      <section class="info-notice" v-else-if="project && !isLoading">
        <div class="notice-container">
          <div class="notice-content">
            <svg
              class="notice-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="notice-text">
              Mostrando información básica del proyecto. Para ver detalles
              completos, contacta con nuestro equipo.
            </p>
          </div>
        </div>
      </section>

      <!-- Project Properties (if available) -->
      <section
        class="project-properties"
        v-if="project.properties && project.properties.length > 0"
      >
        <div class="properties-container">
          <h2 class="section-title">
            Propiedades del Proyecto ({{ project.properties.length }})
          </h2>
          <div class="properties-grid">
            <div
              v-for="property in project.properties"
              :key="property.id"
              class="property-card"
              @click="goToProperty(property.id)"
            >
              <div class="property-image-container">
                <img
                  :src="
                    getImageUrl(
                      property.cover_image_url || '/placeholder-property.svg',
                    )
                  "
                  :alt="property.title"
                  class="property-image"
                />
                <div class="property-price-badge">
                  {{ formatPriceComplete(property.price) }}
                </div>
              </div>
              <div class="property-info">
                <h3 class="property-title">{{ property.title }}</h3>
                <p class="property-address">
                  {{ property.address }}, {{ property.city }}
                </p>
                <div class="property-features">
                  <span class="feature" v-if="property.bedrooms">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M2 4v16" />
                      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                      <path d="M2 17h20" />
                      <path d="M6 8v9" />
                    </svg>
                    {{ property.bedrooms }}
                  </span>
                  <span class="feature" v-if="property.bathrooms">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
                      />
                      <line x1="10" x2="8" y1="5" y2="7" />
                      <line x1="2" x2="22" y1="12" y2="12" />
                      <line x1="7" x2="7" y1="19" y2="21" />
                      <line x1="17" x2="17" y1="19" y2="21" />
                    </svg>
                    {{ property.bathrooms }}
                  </span>
                  <span class="feature" v-if="property.area">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                      />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {{ property.area }}m²
                  </span>
                  <span class="feature" v-if="property.status">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    {{ property.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Not Found State -->
    <div v-else class="not-found-container">
      <div class="not-found-content">
        <svg
          class="not-found-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          ></path>
        </svg>
        <p class="not-found-message">Proyecto no encontrado</p>
        <button @click="goBack" class="back-btn-alt">Volver a Proyectos</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProjectsStore } from "@/stores/projects";
import { storeToRefs } from "pinia";
import AppLayout from "@/components/AppLayout.vue";
import { formatProjectDescription, markdownToHtml } from "@/utils/descriptionFormatter";
import type { Project } from "@/types";

const route = useRoute();
const router = useRouter();
const projectsStore = useProjectsStore();
const { currentProject, loading, error } = storeToRefs(projectsStore);

// Local project ref that we can set directly
const project = ref<Project | null>(null);
const isLoading = ref(true);

const currentImageIndex = ref(0);
const currentImage = ref("");
const projectImages = ref<string[]>([]);

const projectId = computed(() => parseInt(route.params.id as string));

// Helper function to convert absolute URLs to relative for development
const getImageUrl = (url: string | null | undefined | any): string => {
  if (!url) {
    return "/placeholder-project.svg";
  }

  // If it's an object with responsive image sizes, get the original or url
  if (typeof url === 'object') {
    if (url.original) {
      url = url.original;
      // If original is also an object, extract its url property
      if (typeof url === 'object' && url.url) {
        url = url.url;
      }
    } else if (url.url) {
      url = url.url;
    }
  }

  // If it's still not a string, return placeholder
  if (typeof url !== 'string') {
    return "/placeholder-project.svg";
  }

  // In development, convert to relative URLs for proxy
  if (import.meta.env.DEV) {
    if (url.includes("app.tierrasonada.com")) {
      return url
        .replace("https://app.tierrasonada.com", "")
        .replace("http://app.tierrasonada.com", "");
    }
  } else {
    // In production, use absolute URLs - backend now handles CORS
    if (url.includes("app.tierrasonada.com")) {
      return url; // Keep absolute URL - backend API routes have CORS configured
    }
    // Convert relative API URLs to absolute
    if (url.startsWith("/api/") || url.startsWith("/storage/")) {
      return `https://app.tierrasonada.com${url}`;
    }
  }

  return url;
};

// Format price with thousands separator
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Format date function
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format price with currency for property cards
const formatPriceComplete = (price: number): string => {
  if (!price) return "Precio no disponible";

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Format description into organized paragraphs (fallback)
const formatDescription = (description: string): string[] => {
  if (!description) return [];

  // Split by double line breaks or periods followed by spaces for better paragraph structure
  let paragraphs = description
    .split(/\.\s+(?=[A-Z])|[\n\r]{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // If we don't have natural paragraphs, try to split by sentences for readability
  if (paragraphs.length === 1 && description.length > 200) {
    paragraphs = description
      .split(/(?<=[.!?])\s+/)
      .reduce((acc: string[], sentence: string, index: number) => {
        const groupIndex = Math.floor(index / 2); // Group every 2 sentences
        if (!acc[groupIndex]) acc[groupIndex] = "";
        acc[groupIndex] += (acc[groupIndex] ? " " : "") + sentence;
        return acc;
      }, [])
      .filter((p) => p.trim().length > 0);
  }

  return paragraphs.map((p) => (p.endsWith(".") ? p : p + "."));
};

// Enhanced description with professional formatting
const enhancedDescription = computed(() => {
  if (!project.value?.description) return null;
  
  const formatted = formatProjectDescription(
    project.value.description, 
    project.value.name
  );
  
  return {
    ...formatted,
    htmlContent: markdownToHtml(formatted.originalFormatted)
  };
});

// Image gallery functions
const setupImageGallery = () => {
  if (project.value) {
    projectImages.value = [
      project.value.cover_image_url,
      ...(project.value.gallery_urls || []),
    ].filter(Boolean);
    
    currentImage.value =
      projectImages.value[0] || project.value.cover_image_url;
    currentImageIndex.value = 0;
  }
};

const nextImage = () => {
  if (currentImageIndex.value < projectImages.value.length - 1) {
    currentImageIndex.value++;
    currentImage.value = projectImages.value[currentImageIndex.value];
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
    currentImage.value = projectImages.value[currentImageIndex.value];
  }
};

const selectImage = (index: number) => {
  currentImageIndex.value = index;
  currentImage.value = projectImages.value[index];
};

// Navigation methods
const goBack = () => {
  router.push("/proyectos");
};

const goToProperty = (propertyId: number) => {
  router.push(`/propiedades/${propertyId}`);
};

const goToAgent = (agentId: number) => {
  router.push(`/agentes/${agentId}`);
};

// Fetch project data
const fetchProjectData = async () => {
  isLoading.value = true;

  if (projectId.value) {
    try {
      // Ensure we have the projects list loaded first
      if (projectsStore.projects.length === 0) {
        await projectsStore.fetchProjects();
      }

      // Try to find the project in the existing projects list
      const existingProject = projectsStore.projects.find(
        (p) => p.id === projectId.value,
      );

      if (existingProject) {
        // Directly set the project without going through the store action
        project.value = existingProject;
        setupImageGallery();
      } else {
        project.value = null;
      }
    } catch (err) {
      console.error("Error in fetchProjectData:", err);
      project.value = null;
    } finally {
      isLoading.value = false;
    }
  } else {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProjectData();
});

// Watch for project changes
watch(
  project,
  (newProject) => {
    // Project changed logic if needed
  },
  { immediate: true },
);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@300;400;500;600;700&display=swap");

/* Container Styles */
.project-detail-container {
  min-height: calc(100vh - 40px);
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding-top: 0;
}

/* Loading State */
.loading-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.loading-content {
  text-align: center;
  color: #2c3e50;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(102, 126, 234, 0.1);
  border-left: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.loading-text {
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.error-content {
  text-align: center;
  color: #dc3545;
  max-width: 400px;
}

.error-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
}

.error-message {
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 10px;
}

.error-details {
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0 0 20px;
  line-height: 1.5;
  text-align: center;
}

.error-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.retry-btn,
.back-btn-alt,
.back-btn-error {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.back-btn-error {
  background: rgba(108, 117, 125, 0.1) !important;
  color: #6c757d !important;
  border: 2px solid rgba(108, 117, 125, 0.3) !important;
}

.back-btn-error:hover {
  background: rgba(108, 117, 125, 0.2) !important;
  color: #495057 !important;
  border-color: rgba(108, 117, 125, 0.5) !important;
}

.retry-btn:hover,
.back-btn-alt:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Not Found State */
.not-found-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.not-found-content {
  text-align: center;
  color: #6c757d;
  max-width: 400px;
}

.not-found-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
}

.not-found-message {
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 20px;
  color: #2c3e50;
}

/* Back Navigation - Responsive */
.back-navigation {
  padding: clamp(20px, 4vw, 30px) clamp(1rem, 4vw, 2.5rem)
    clamp(1rem, 3vw, 1.25rem) clamp(1rem, 4vw, 2.5rem);
  display: flex;
  justify-content: flex-end;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: clamp(6px, 1.5vw, 8px);
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(102, 126, 234, 0.2);
  color: #667eea;
  padding: clamp(8px, 2vw, 10px) clamp(16px, 4vw, 20px);
  border-radius: 25px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  text-decoration: none;
  z-index: 100;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
}

.back-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.back-btn svg {
  width: clamp(16px, 4vw, 18px);
  height: clamp(16px, 4vw, 18px);
  flex-shrink: 0;
}

/* Project Hero Section - Responsive */
.project-hero {
  padding: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: clamp(2rem, 5vw, 2.5rem);
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

/* Progressive enhancement para el hero */
@media (min-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr 1.2fr;
  }
}

@media (min-width: 1024px) {
  .hero-content {
    grid-template-columns: 600px 1fr;
  }
}

.project-image-section {
  position: relative;
}

.main-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  height: auto;
  min-height: clamp(300px, 60vh, 500px);
  max-height: 600px;
  border-radius: clamp(12px, 3vw, 20px);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: white;
  margin-bottom: clamp(1rem, 3vw, 1.25rem);
}

.project-main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  background: #f8f9fa;
}

.image-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(0, 0, 0, 0.1);
  color: #2c3e50;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-nav-prev {
  left: 15px;
}

.image-nav-next {
  right: 15px;
}

.image-nav-btn:hover {
  background: rgba(255, 255, 255, 1);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.image-nav-btn svg {
  width: 20px;
  height: 20px;
}

.image-counter {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.thumbnails-container {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
}

.thumbnail-item {
  flex-shrink: 0;
  width: 80px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.thumbnail-item.active {
  border-color: #667eea;
}

.thumbnail-item:hover {
  border-color: rgba(102, 126, 234, 0.5);
  transform: scale(1.05);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f8f9fa;
}

.project-info-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: clamp(12px, 3vw, 20px);
  padding: clamp(1.5rem, 5vw, 2.5rem);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.project-header {
  margin-bottom: 30px;
}

.project-name {
  font-family: "Roboto", sans-serif;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 300;
  color: #2c3e50;
  margin: 0 0 clamp(0.75rem, 3vw, 1rem) 0;
  line-height: 1.2;
  letter-spacing: clamp(0.5px, 0.1em, 1px);
}

.project-card-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 0;
  padding: 20px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.project-type-card {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: 500;
  color: #667eea;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.3;
}

.project-location-card {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(1rem, 2.8vw, 1.1rem);
  font-weight: 500;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.08),
    rgba(118, 75, 162, 0.05)
  );
  padding: 12px 16px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
}

.project-location-card:hover {
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.12),
    rgba(118, 75, 162, 0.08)
  );
  transform: translateX(3px);
}

.project-location-card .location-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: #667eea;
}

.project-details-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: clamp(12px, 3vw, 15px);
  padding: clamp(12px, 3vw, 15px) 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item svg {
  width: clamp(20px, 5vw, 24px);
  height: clamp(20px, 5vw, 24px);
  color: #667eea;
  flex-shrink: 0;
}

.detail-content {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.75rem, 2vw, 0.85rem);
  font-weight: 500;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: clamp(0.3px, 0.1em, 0.5px);
  margin-bottom: clamp(3px, 1vw, 4px);
  line-height: 1.3;
}

.detail-value {
  font-family: "Roboto", sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  font-weight: 500;
  color: #2c3e50;
  line-height: 1.4;
  word-break: break-word;
}

/* Agent Information */
.agent-info {
  margin-bottom: 30px;
}

.agent-info h3 {
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 15px 0;
}

.agent-card-mini {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 20px;
  background: rgba(102, 126, 234, 0.05);
  border: 2px solid rgba(102, 126, 234, 0.1);
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.agent-card-mini:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.agent-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.agent-image-mini {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-details-mini {
  flex: 1;
}

.agent-name-mini {
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 5px 0;
}

.agent-type-mini {
  font-family: "Montserrat", sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #667eea;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.agent-contact-mini {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.contact-mini {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6c757d;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-mini:hover {
  color: #667eea;
}

.contact-mini svg {
  width: 14px;
  height: 14px;
}

/* Stats Section */
.stats-section {
  display: flex;
  gap: 30px;
}

.stat-item {
  text-align: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 20px;
  border-radius: 15px;
  min-width: 120px;
}

.stat-number {
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-label {
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Description Section */
.project-description-section {
  padding: 0 40px 40px;
  margin-bottom: 40px;
}

.description-container {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  font-weight: 300;
  color: #2c3e50;
  margin: 0 0 25px 0;
  position: relative;
  letter-spacing: 1px;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.description-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.description-paragraph {
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #5a6c7d;
  margin: 0;
  text-align: justify;
  padding: 0;
  position: relative;
}

.description-paragraph.first-paragraph {
  font-size: 1.15rem;
  font-weight: 500;
  color: #4a5568;
  padding-left: 20px;
  border-left: 4px solid rgba(102, 126, 234, 0.3);
  background: rgba(102, 126, 234, 0.02);
  padding: 16px 20px;
  border-radius: 8px;
}

.description-paragraph:not(.first-paragraph) {
  padding-left: 10px;
  position: relative;
}

.description-paragraph:not(.first-paragraph):before {
  content: "•";
  position: absolute;
  left: 0;
  color: rgba(102, 126, 234, 0.6);
  font-weight: bold;
}

/* Info Notice Section */
.info-notice {
  padding: 0 40px 40px;
  margin-bottom: 40px;
}

.notice-container {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 243, 205, 0.95);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(255, 193, 7, 0.1);
}

.notice-content {
  display: flex;
  align-items: center;
  gap: 15px;
  text-align: center;
  justify-content: center;
}

.notice-icon {
  width: 24px;
  height: 24px;
  color: #f57c00;
  flex-shrink: 0;
}

.notice-text {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  color: #e65100;
  margin: 0;
  font-weight: 500;
}

/* Properties Section */
.project-properties {
  padding: 0 40px 40px;
}

.properties-container {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.property-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
}

.property-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f8f9fa;
  transition: transform 0.3s ease;
}

.property-card:hover .property-image {
  transform: scale(1.05);
}

.property-price-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.property-info {
  padding: 20px;
}

.property-title {
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.property-address {
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.property-features {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.property-features .feature {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 6px 12px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.property-features .feature:hover {
  background: rgba(102, 126, 234, 0.15);
  transform: translateY(-1px);
}

.property-features .feature svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .main-image-container {
    height: 400px;
  }

  .project-name {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .properties-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .thumbnails-container {
    justify-content: center;
  }

  .project-details-grid {
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .back-navigation {
    padding: 15px 15px 10px 15px;
  }

  .project-hero {
    padding: 15px;
    margin-bottom: 20px;
  }

  .hero-content {
    gap: 20px;
  }

  .main-image-container {
    min-height: 250px;
    max-height: 350px;
    margin-bottom: 15px;
  }

  .project-info-section {
    padding: 20px;
  }

  .project-name {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  .project-card-info {
    margin: 15px 0;
    padding: 15px 0;
  }

  .project-details-grid {
    gap: 12px;
  }

  .detail-item {
    padding: 10px 0;
    gap: 10px;
  }

  .detail-item svg {
    width: 18px;
    height: 18px;
  }

  .project-description-section,
  .info-notice,
  .project-properties {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 20px;
  }

  .description-container,
  .notice-container,
  .properties-container {
    padding: 20px;
  }

  .notice-content {
    flex-direction: column;
    gap: 10px;
  }

  .notice-text {
    font-size: 0.9rem;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .description-paragraph {
    font-size: 1rem;
    line-height: 1.6;
  }

  .description-paragraph.first-paragraph {
    font-size: 1.05rem;
    padding: 12px 16px;
  }

  .description-paragraphs {
    gap: 16px;
  }

  .agent-card-mini {
    flex-direction: column;
    text-align: center;
    gap: 10px;
    padding: 15px;
  }

  .agent-contact-mini {
    justify-content: center;
  }

  .thumbnails-container {
    padding: 5px 0;
    gap: 8px;
  }

  .thumbnail-item {
    width: 70px;
    height: 52px;
  }

  .image-nav-btn {
    width: 40px;
    height: 40px;
  }

  .image-nav-btn svg {
    width: 16px;
    height: 16px;
  }

  .image-counter {
    top: 10px;
    right: 10px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .properties-grid {
    gap: 15px;
  }

  .property-card {
    border-radius: 12px;
  }

  .property-image-container {
    height: 180px;
  }

  .property-info {
    padding: 15px;
  }

  .property-features {
    gap: 8px;
  }

  .property-features .feature {
    padding: 4px 8px;
    font-size: 0.75rem;
  }
}
</style>
