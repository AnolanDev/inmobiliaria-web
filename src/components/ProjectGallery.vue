<template>
  <div class="project-gallery-hero">
    <!-- Three project cards with images and info below -->
    <div class="projects-container">
      <div
        v-for="(project, index) in visibleProjects"
        :key="project.id"
        class="project-card"
      >
        <!-- Image container with project click -->
        <div class="project-image-container" @click="openProjectModal(project)">
          <img
            :src="getImageUrl(project.cover_image_url)"
            :alt="project.name"
            class="project-image"
            loading="lazy"
          />
          <div class="image-overlay">
            <div class="project-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>Ver Proyecto</span>
            </div>
          </div>
        </div>

        <!-- Project information below image -->
        <div class="project-info-section" @click="openProjectModal(project)">
          <h2 class="project-title">{{ project.name }}</h2>
          <div class="project-details">
            <p class="project-type" v-if="project.type">{{ project.type }}</p>
            <p
              class="project-location"
              v-if="project.city || project.state || project.location"
            >
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
              <span v-else>
                <span v-if="project.city">{{ project.city }}</span
                ><span v-if="project.city && project.state">, </span
                ><span v-if="project.state">{{ project.state }}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation arrows for rotating projects -->
    <button
      v-if="projects.length > 3"
      @click="rotateLeft"
      class="nav-arrow nav-left"
      aria-label="Proyectos anteriores"
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
      v-if="projects.length > 3"
      @click="rotateRight"
      class="nav-arrow nav-right"
      aria-label="Proyectos siguientes"
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

    <!-- Dots indicator -->
    <div class="dots-indicator" v-if="projects.length > 3">
      <button
        v-for="(dot, index) in totalPages"
        :key="index"
        @click="goToPage(index, $event)"
        class="dot"
        :class="{ active: currentPage === index }"
      ></button>
    </div>

    <!-- Project Modal -->
    <div
      v-if="projectModalOpen"
      class="project-modal"
      @click="closeProjectModal"
    >
      <div class="modal-container" @click.stop>
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="modal-back-navigation">
            <button @click="closeProjectModal" class="modal-back-btn">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Volver</span>
            </button>
          </div>
          <button @click="closeProjectModal" class="modal-close-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="modal-content-wrapper">
          <!-- Project Hero Section -->
          <section class="modal-project-hero">
            <div class="modal-hero-content">
              <!-- Project Image Gallery -->
              <div class="modal-project-image-section">
                <div class="modal-main-image-container">
                  <img
                    :src="getImageUrl(currentModalImage)"
                    :alt="selectedProject?.name"
                    class="modal-project-main-image"
                  />

                  <!-- Image Navigation -->
                  <button
                    v-if="projectImages.length > 1"
                    @click="prevImage"
                    class="modal-image-nav-btn modal-image-nav-prev"
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
                    class="modal-image-nav-btn modal-image-nav-next"
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
                  <div
                    v-if="projectImages.length > 1"
                    class="modal-image-counter"
                  >
                    {{ currentImageIndex + 1 }} / {{ projectImages.length }}
                  </div>
                </div>

                <!-- Thumbnails -->
                <div
                  v-if="projectImages.length > 1"
                  class="modal-thumbnails-container"
                >
                  <div
                    v-for="(image, index) in projectImages"
                    :key="index"
                    class="modal-thumbnail-item"
                    :class="{ active: currentImageIndex === index }"
                    @click="selectImage(index)"
                  >
                    <img
                      :src="getImageUrl(image)"
                      :alt="`${selectedProject?.name} - ${index + 1}`"
                    />
                  </div>
                </div>
              </div>

              <!-- Project Information - Professional Design -->
              <div class="modal-project-info-professional">
                <div class="professional-content">
                  <!-- Project Title -->
                  <div class="project-title-section">
                    <h1 class="professional-title">
                      {{ selectedProject?.name }}
                    </h1>
                    <div class="title-divider"></div>
                  </div>

                  <!-- Project Brief Description -->
                  <div
                    class="project-description-brief"
                    v-if="selectedProject?.description"
                  >
                    <p>
                      {{
                        selectedProject.description.length > 150
                          ? selectedProject.description.substring(0, 150) +
                            "..."
                          : selectedProject.description
                      }}
                    </p>
                  </div>

                  <!-- Project Details - Formato como las cards -->
                  <div class="project-details-card-format">
                    <!-- Tipo de Proyecto -->
                    <div class="project-type-display">
                      {{ selectedProject?.type || "Turísticos" }}
                    </div>

                    <!-- Ubicación completa -->
                    <div class="project-location-display">
                      <svg
                        class="location-icon"
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
                      <span v-if="selectedProject?.location">{{
                        selectedProject.location
                      }}</span>
                      <span v-else-if="selectedProject?.city">
                        {{ selectedProject.city
                        }}<span v-if="selectedProject?.state"
                          >, {{ selectedProject.state }}</span
                        >
                      </span>
                      <span v-else>Ubicación por definir</span>
                    </div>
                  </div>

                  <!-- CTA Section -->
                  <div class="professional-cta">
                    <button
                      @click="viewFullProject"
                      class="professional-button-elegant"
                    >
                      <span class="button-text">Explorar Proyecto</span>
                      <div class="button-icon">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Project Description -->
          <section
            class="modal-project-description-section"
            v-if="selectedProject?.description"
          >
            <div class="modal-description-container">
              <h2 class="modal-section-title">
                Sobre {{ selectedProject.name }}
              </h2>
              <div class="modal-description-content">
                <p class="modal-description-text">
                  {{ selectedProject.description }}
                </p>
              </div>
            </div>
          </section>

          <!-- Related Properties -->
          <section
            class="modal-properties-section"
            v-if="
              selectedProject?.properties &&
              selectedProject.properties.length > 0
            "
          >
            <div class="modal-properties-container">
              <h2 class="modal-section-title">
                Propiedades del Proyecto ({{
                  selectedProject.properties.length
                }})
              </h2>
              <div class="modal-properties-grid">
                <div
                  v-for="property in selectedProject.properties.slice(0, 6)"
                  :key="property.id"
                  class="modal-property-card"
                >
                  <div class="property-image-container">
                    <img
                      :src="
                        getImageUrl(
                          property.cover_image_url ||
                            '/placeholder-property.svg',
                        )
                      "
                      :alt="property.title"
                      class="property-image"
                    />
                    <div class="property-price-badge">
                      {{ formatPrice(property.price) }}
                    </div>
                  </div>
                  <div class="property-info">
                    <h4 class="property-title">{{ property.title }}</h4>
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
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="modal-properties-actions"
                v-if="selectedProject.properties.length > 6"
              >
                <p class="properties-note">
                  Mostrando 6 de
                  {{ selectedProject.properties.length }} propiedades
                </p>
                <button
                  @click="$emit('viewProject', selectedProject?.id)"
                  class="btn-view-all-properties"
                >
                  Ver Todas las Propiedades
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Animated background elements -->
    <div class="background-decoration">
      <div class="floating-element element-1"></div>
      <div class="floating-element element-2"></div>
      <div class="floating-element element-3"></div>
    </div>

    <!-- Interactive particles (optional) -->
    <div class="particles-container" v-if="showParticles">
      <div
        v-for="n in 15"
        :key="n"
        class="particle"
        :style="getParticleStyle(n)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import type { Project } from "@/types";

interface Props {
  projects: Project[];
  showParticles?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showParticles: true,
});

const emit = defineEmits<{
  viewProject: [id: number];
  viewAllProjects: [];
}>();

const router = useRouter();
const currentPage = ref(0);
const selectedProject = ref<Project | null>(null);
const projectModalOpen = ref(false);
const currentModalImage = ref("");
const currentImageIndex = ref(0);
const projectImages = ref<string[]>([]);

const getImageUrl = (url: string): string => {
  if (!url) return "/placeholder-project.svg";

  if (import.meta.env.DEV && url.includes("app.tierrasonada.com")) {
    return url
      .replace("https://app.tierrasonada.com", "")
      .replace("http://app.tierrasonada.com", "");
  }

  return url;
};

const visibleProjects = computed(() => {
  const startIndex = currentPage.value * 3;
  return props.projects.slice(startIndex, startIndex + 3);
});

const totalPages = computed(() => {
  return Math.ceil(props.projects.length / 3);
});

const rotateLeft = (event?: Event) => {
  // Stop event propagation to prevent accidental card clicks
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // Pause rotation temporarily to prevent DOM reconciliation issues
  if (autoRotateTimer) {
    clearInterval(autoRotateTimer);
    autoRotateTimer = null;
  }

  if (currentPage.value > 0) {
    currentPage.value--;
  } else {
    currentPage.value = totalPages.value - 1;
  }

  // Resume rotation after DOM updates
  setTimeout(() => {
    startAutoRotation();
  }, 100);
};

const rotateRight = () => {
  // Pause rotation temporarily to prevent DOM reconciliation issues
  if (autoRotateTimer) {
    clearInterval(autoRotateTimer);
    autoRotateTimer = null;
  }

  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
  } else {
    currentPage.value = 0;
  }

  // Resume rotation after DOM updates
  setTimeout(() => {
    startAutoRotation();
  }, 100);
};

const goToPage = (pageIndex: number, event?: Event) => {
  // Stop event propagation to prevent accidental card clicks
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // Pause rotation when user manually navigates
  if (autoRotateTimer) {
    clearInterval(autoRotateTimer);
    autoRotateTimer = null;
  }

  currentPage.value = pageIndex;

  // Resume rotation after user interaction
  setTimeout(() => {
    startAutoRotation();
  }, 100);
};

const openProjectModal = (project: Project) => {
  selectedProject.value = project;
  // Set up project images array (cover image + gallery images)
  const galleryImages = project.gallery_urls || project.gallery || [];
  projectImages.value = [project.cover_image_url, ...galleryImages].filter(
    Boolean,
  );
  currentModalImage.value = project.cover_image_url;
  currentImageIndex.value = 0;
  projectModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeProjectModal = () => {
  projectModalOpen.value = false;
  selectedProject.value = null;
  document.body.style.overflow = "unset";
};

const nextImage = () => {
  if (currentImageIndex.value < projectImages.value.length - 1) {
    currentImageIndex.value++;
    currentModalImage.value = projectImages.value[currentImageIndex.value];
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
    currentModalImage.value = projectImages.value[currentImageIndex.value];
  }
};

const selectImage = (index: number) => {
  currentImageIndex.value = index;
  currentModalImage.value = projectImages.value[index];
};

const viewFullProject = () => {
  if (selectedProject.value) {
    const projectId = selectedProject.value.id;
    closeProjectModal();
    router.push(`/proyectos/${projectId}`);
  }
};

const viewAllProjects = () => {
  closeProjectModal();
  router.push("/proyectos");
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

// Format price function
const formatPrice = (price: number): string => {
  if (!price) return "Precio no disponible";

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const getParticleStyle = (index: number) => {
  const random = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return {
    left: `${random(index * 3) * 100}%`,
    top: `${random(index * 5) * 100}%`,
    animationDelay: `${random(index * 7) * 4}s`,
    animationDuration: `${3 + random(index * 11) * 4}s`,
  };
};

// Auto rotation
let autoRotateTimer: NodeJS.Timeout | null = null;

const startAutoRotation = () => {
  if (props.projects.length <= 3) return;

  autoRotateTimer = setInterval(() => {
    // Only rotate if modal is not open
    if (!projectModalOpen.value) {
      rotateRight();
    }
  }, 6000);
};

const stopAutoRotation = () => {
  if (autoRotateTimer) {
    clearInterval(autoRotateTimer);
    autoRotateTimer = null;
  }
};

onMounted(() => {
  startAutoRotation();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@300;400;500;600;700&display=swap");

.project-gallery-hero {
  width: calc(100vw - 80px);
  min-height: 100vh;
  position: relative;
  margin-left: calc(-50vw + 50% + 40px);
  margin-right: 40px;
  margin-top: 40px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  border-radius: 20px;
}

.projects-container {
  display: flex;
  gap: 50px;
  width: 100%;
  max-width: 1400px;
  padding: 0 40px;
  align-items: stretch;
  justify-content: center;
  flex-wrap: nowrap;
}

.project-card {
  flex: 0 0 380px;
  width: 380px;
  max-width: 380px;
  aspect-ratio: 3/4.8;
  min-height: clamp(400px, 80vw, 600px);
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  border-radius: clamp(12px, 2.5vw, 20px);
  overflow: visible;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  gap: clamp(1rem, 3vw, 1.25rem);
  padding: clamp(1rem, 3vw, 1.25rem);
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.project-card:hover {
  transform: translate3d(0, -8px, 0);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.12);
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(255, 255, 255, 0.95);
}

.project-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4/5;
  height: auto;
  min-height: clamp(280px, 65vw, 450px);
  overflow: hidden;
  cursor: pointer;
  border-radius: clamp(12px, 2vw, 16px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s ease;
  border-radius: clamp(12px, 2vw, 16px);
  display: block;
  background: #f3f4f6;
}

.project-image-container:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

/* Touch devices optimization */
@media (hover: none) {
  .project-card:active {
    transform: translate3d(0, -4px, 0);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }
}

.project-image-container:hover .project-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7),
    rgba(30, 30, 50, 0.8)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 16px;
  backdrop-filter: blur(2px);
}

.project-image-container:hover .image-overlay {
  opacity: 1;
}

.project-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: white;
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.1);
  padding: 16px 20px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-icon svg {
  width: 32px;
  height: 32px;
}

.project-info-section {
  padding: 0;
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: clamp(100px, 15vw, 120px);
  max-height: clamp(120px, 20vw, 150px);
  overflow: hidden;
}

.project-info-section:hover {
  transform: translateY(-2px);
}

.project-title {
  font-family: "Roboto", sans-serif;
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 500;
  margin-bottom: clamp(0.5rem, 2vw, 0.75rem);
  color: #2c3e50;
  line-height: 1.3;
  letter-spacing: 0.5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-description {
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  text-align: justify;
  hyphens: auto;
  background: rgba(255, 255, 255, 0.05);
  padding: 16px 20px;
  border-radius: 12px;
  border-left: 4px solid rgba(102, 126, 234, 0.6);
  backdrop-filter: blur(10px);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 1vw, 0.375rem);
  overflow: hidden;
  flex-shrink: 0;
}

.project-type {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.75rem, 2vw, 0.85rem);
  font-weight: 500;
  color: #667eea;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-location {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.75rem, 2vw, 0.85rem);
  font-weight: 400;
  color: #6c757d;
  margin: 0;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.location-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* Navigation arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(0, 0, 0, 0.1);
  color: #2c3e50;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-arrow:hover {
  background: rgba(255, 255, 255, 1);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.nav-arrow svg {
  width: 24px;
  height: 24px;
}

.nav-left {
  left: 20px;
}

.nav-right {
  right: 20px;
}

/* Dots indicator */
.dots-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 20;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.3);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #667eea;
  border-color: #667eea;
}

.dot:hover {
  border-color: #667eea;
  transform: scale(1.2);
}

/* Project Modal */
.project-modal {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
  animation: modalFadeIn 0.3s ease;
  padding-top: 40px;
}

.modal-container {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  max-width: 95vw;
  max-height: calc(95vh - 80px);
  width: min(1200px, 95vw);
  height: min(800px, calc(95vh - 80px));
  overflow: hidden;
  position: relative;
  animation: modalSlideIn 0.4s ease;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: auto;
  /* Ensure proper mobile scrolling */
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 100;
  flex-shrink: 0;
  overflow: visible;
  min-height: 80px;
}

.modal-title {
  font-family: "Roboto", sans-serif;
  font-size: 1.8rem;
  font-weight: 500;
  color: white;
  margin: 0;
}

.modal-back-navigation {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 102;
}

.modal-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.modal-back-btn,
.modal-close-btn {
  background: rgba(0, 0, 0, 0.05);
  border: 2px solid rgba(0, 0, 0, 0.1);
  color: #2c3e50;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 101;
  flex-shrink: 0;
  min-height: 40px;
}

.modal-back-btn {
  white-space: nowrap;
}

.modal-close-btn {
  padding: 8px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  justify-content: center;
  flex-shrink: 0;
  min-width: 40px;
  min-height: 40px;
}

.modal-back-btn:hover,
.modal-close-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  color: #667eea;
  transform: scale(1.05);
}

.modal-back-btn svg,
.modal-close-btn svg {
  width: 18px;
  height: 18px;
}

.modal-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  /* Better mobile scrolling */
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  position: relative;
  z-index: 1;
}

/* Modal Project Hero Section */
.modal-project-hero {
  flex: none;
  min-height: 400px;
  display: flex;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
}

.modal-hero-content {
  width: 100%;
  display: flex;
  height: 100%;
}

.modal-project-image-section {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  position: relative;
}

.modal-main-image-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f0f0, #e8e9ea);
}

.modal-project-main-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  object-position: center;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-image-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image-nav-prev {
  left: 20px;
}

.modal-image-nav-next {
  right: 20px;
}

.modal-image-nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-50%) scale(1.1);
}

.modal-image-nav-btn svg {
  width: 20px;
  height: 20px;
}

.modal-image-counter {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.modal-thumbnails-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  max-width: 90%;
  overflow-x: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.modal-thumbnail-item {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.modal-thumbnail-item.active {
  border-color: rgba(102, 126, 234, 0.8);
}

.modal-thumbnail-item:hover {
  border-color: rgba(102, 126, 234, 0.8);
  transform: scale(1.1);
}

.modal-thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Professional Modal Design */
.modal-project-info-professional {
  flex: 0.8;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
}

.professional-content {
  max-width: 480px;
  width: 100%;
  padding: 60px 40px;
  text-align: left;
}

.project-title-section {
  margin-bottom: 48px;
}

.professional-title {
  font-family: "Roboto", sans-serif;
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 300;
  color: #1a1a1a;
  line-height: 1.2;
  margin: 0 0 20px 0;
  letter-spacing: -1px;
}

.title-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #1a1a1a, #666666);
  border: none;
  border-radius: 2px;
}

.project-description-brief {
  margin: 32px 0 40px 0;
  padding: 24px 0;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
}

.project-description-brief p {
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #666666;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

.project-details-card-format {
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 0;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
}

.project-type-display {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: 500;
  color: #667eea;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.3;
}

.project-location-display {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: 400;
  color: #6c757d;
  margin: 0;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 6px;
}

.project-location-display .location-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: #6c757d;
}

.professional-cta {
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.professional-button-elegant {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #ffffff;
  border: 2px solid transparent;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
}

.professional-button-elegant::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.6s ease;
}

.professional-button-elegant:hover::before {
  left: 100%;
}

.professional-button-elegant:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}

.professional-button-elegant:active {
  transform: translateY(-1px);
}

.button-text {
  font-size: 1.05rem;
  font-weight: 400;
  letter-spacing: 0.3px;
  z-index: 1;
  position: relative;
}

.button-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  transition: all 0.3s ease;
  z-index: 1;
  position: relative;
}

.button-icon svg {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.professional-button-elegant:hover .button-icon {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.professional-button-elegant:hover .button-icon svg {
  transform: translateX(2px);
}

/* Professional Mobile Responsive */
@media (max-width: 768px) {
  .professional-content {
    padding: 40px 32px;
  }

  .professional-title {
    font-size: clamp(1.8rem, 6vw, 2.2rem);
  }

  .project-title-section {
    margin-bottom: 28px;
  }

  .project-description-brief {
    margin: 24px 0 32px 0;
    padding: 20px 0;
  }

  .project-description-brief p {
    font-size: 0.95rem;
  }

  .project-details-professional {
    margin-bottom: 32px;
  }

  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 16px 0;
  }

  .detail-row:hover {
    margin: 0 -16px;
    padding: 16px;
  }

  .detail-value {
    text-align: left;
    font-size: 1.05rem;
  }

  .professional-button-elegant {
    padding: 18px 24px;
  }

  .button-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .professional-content {
    padding: 32px 24px;
  }

  .detail-row:hover {
    margin: 0 -12px;
    padding: 16px 12px;
  }
}

.modal-project-header {
  margin-bottom: 30px;
}

.modal-project-name {
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 15px;
  line-height: 1.2;
}

.modal-project-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.modal-project-type,
.modal-project-status {
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.2),
    rgba(118, 75, 162, 0.2)
  );
  color: rgba(102, 126, 234, 0.9);
  padding: 6px 16px;
  border-radius: 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  backdrop-filter: blur(10px);
}

.modal-project-status {
  background: linear-gradient(
    135deg,
    rgba(40, 167, 69, 0.2),
    rgba(32, 134, 55, 0.2)
  );
  color: rgba(40, 167, 69, 0.9);
  border-color: rgba(40, 167, 69, 0.3);
}

.modal-project-details-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.modal-detail-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  border-left: 4px solid rgba(102, 126, 234, 0.6);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.modal-detail-item:hover {
  background: rgba(102, 126, 234, 0.08);
  transform: translateX(5px);
  border-color: rgba(102, 126, 234, 0.2);
}

.modal-detail-item svg {
  width: 24px;
  height: 24px;
  color: rgba(102, 126, 234, 0.8);
  flex-shrink: 0;
}

.modal-detail-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal-detail-label {
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(102, 126, 234, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modal-detail-value {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
  line-height: 1.4;
}

/* Modal Description Section */
.modal-project-description-section {
  padding: 30px;
  background: rgba(248, 249, 250, 0.8);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-description-container {
  max-width: 800px;
  margin: 0 auto;
}

.modal-section-title {
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.modal-description-content {
  text-align: center;
}

.modal-description-text {
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #495057;
  margin: 0;
}

/* Modal Agent Section */
.modal-agent-section {
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-section-subtitle {
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(102, 126, 234, 0.9);
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modal-agent-card {
  display: flex;
  gap: 15px;
  background: rgba(102, 126, 234, 0.05);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.modal-agent-card:hover {
  background: rgba(102, 126, 234, 0.08);
  border-color: rgba(102, 126, 234, 0.4);
}

.agent-avatar {
  flex-shrink: 0;
}

.agent-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(102, 126, 234, 0.3);
}

.agent-info {
  flex: 1;
}

.agent-name {
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 5px 0;
}

.agent-type {
  font-family: "Montserrat", sans-serif;
  font-size: 0.85rem;
  color: rgba(102, 126, 234, 0.8);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 10px 0;
}

.agent-contact {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.agent-phone,
.agent-email {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  color: #495057;
  text-decoration: none;
  transition: color 0.3s ease;
}

.agent-phone:hover,
.agent-email:hover {
  color: rgba(102, 126, 234, 0.9);
}

.agent-phone svg,
.agent-email svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Modal Properties Section */
.modal-properties-section {
  padding: 30px;
  background: rgba(240, 242, 245, 0.8);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-properties-container {
  max-width: 1000px;
  margin: 0 auto;
}

.modal-properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.modal-property-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal-property-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 1);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.property-image-container {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.modal-property-card:hover .property-image {
  transform: scale(1.05);
}

.property-price-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.property-info {
  padding: 15px;
}

.property-title {
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.property-address {
  font-family: "Montserrat", sans-serif;
  font-size: 0.85rem;
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
  gap: 5px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  color: rgba(102, 126, 234, 0.9);
  font-weight: 500;
}

.property-features .feature svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.modal-properties-actions {
  text-align: center;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.properties-note {
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0 0 15px 0;
  font-style: italic;
}

.btn-view-all-properties {
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.2),
    rgba(118, 75, 162, 0.2)
  );
  border: 2px solid rgba(102, 126, 234, 0.4);
  color: rgba(102, 126, 234, 0.9);
  padding: 12px 24px;
  border-radius: 25px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.btn-view-all-properties:hover {
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.3),
    rgba(118, 75, 162, 0.3)
  );
  border-color: rgba(102, 126, 234, 0.6);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.project-full-description h3 {
  font-family: "Roboto", sans-serif;
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 15px;
  color: rgba(102, 126, 234, 0.9);
}

.project-full-description p {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  color: rgba(255, 255, 255, 0.85);
}

.project-details h3 {
  font-family: "Roboto", sans-serif;
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 15px;
  color: rgba(102, 126, 234, 0.9);
}

.details-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 25px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-label {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: rgba(102, 126, 234, 0.9);
  font-size: 0.9rem;
}

.detail-value {
  font-family: "Montserrat", sans-serif;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
}

.modal-actions {
  display: flex;
  gap: 12px;
  flex-direction: column;
  margin-top: auto;
}

.btn-modal-primary,
.btn-modal-secondary {
  padding: 14px 28px;
  border-radius: 12px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.btn-modal-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-modal-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.btn-modal-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-modal-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.6);
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideIn {
  from {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.background-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1),
    rgba(118, 75, 162, 0.1)
  );
  animation: float 8s ease-in-out infinite;
}

.element-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 15%;
  animation-delay: 0s;
}

.element-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 20%;
  animation-delay: 3s;
}

.element-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 60%;
  animation-delay: 6s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-30px) rotate(120deg);
  }
  66% {
    transform: translateY(15px) rotate(240deg);
  }
}

.particles-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(102, 126, 234, 0.6);
  border-radius: 50%;
  animation: particle-float linear infinite;
}

@keyframes particle-float {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: scale(1);
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(0);
    opacity: 0;
  }
}

/* Desktop Layout Restoration */
@media (min-width: 1025px) {
  .modal-content-wrapper {
    flex-direction: row;
    overflow: hidden;
  }

  .modal-project-hero {
    flex: 1;
    min-height: auto;
    height: 100%;
  }

  .modal-hero-content {
    flex-direction: row;
    height: 100%;
  }

  .modal-project-image-section {
    flex: 1.2;
  }

  .modal-project-info-section {
    flex: 0.8;
    overflow-y: auto;
  }

  .modal-project-description-section {
    display: none; /* Hide in horizontal layout to save space */
  }

  .modal-properties-section {
    display: none; /* Hide in horizontal layout to save space */
  }
}

/* Mobile Image Navigation Improvements */
@media (hover: none) and (pointer: coarse) {
  .modal-image-nav-btn {
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.7);
    border: 2px solid rgba(255, 255, 255, 0.8);
  }

  .modal-image-nav-btn:active {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-50%) scale(0.95);
  }

  .modal-thumbnails-container {
    padding: 15px;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.8);
  }

  .modal-thumbnail-item {
    width: 70px;
    height: 70px;
    border-radius: 12px;
  }

  .modal-image-counter {
    padding: 10px 16px;
    font-size: 0.9rem;
    border-radius: 25px;
    background: rgba(0, 0, 0, 0.8);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .modal-agent-card {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }

  .agent-contact {
    align-items: center;
  }

  .modal-properties-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .property-features {
    justify-content: center;
  }

  .modal-section-title {
    font-size: 1.3rem;
  }

  .modal-description-text {
    font-size: 1rem;
  }

  .modal-detail-item {
    padding: 12px 15px;
    gap: 12px;
  }

  .modal-detail-item svg {
    width: 20px;
    height: 20px;
  }

  .modal-detail-label {
    font-size: 0.75rem;
  }

  .modal-detail-value {
    font-size: 0.9rem;
  }
  .project-gallery-hero {
    width: calc(100vw - 40px);
    margin-left: calc(-50vw + 50% + 20px);
    margin-right: 20px;
    padding: 30px 0;
  }

  .projects-container {
    flex-direction: column;
    padding: 0 20px;
    gap: 40px;
  }

  .project-card {
    max-width: 380px;
    margin: 0 auto;
    min-height: 420px;
  }

  .project-image-container {
    min-height: 240px;
  }

  .project-info-section {
    padding: 0;
  }

  .project-title {
    font-size: 1.3rem;
  }

  .project-description {
    font-size: 0.95rem;
    padding: 14px 18px;
  }

  .nav-arrow {
    display: none;
  }

  .dots-indicator {
    bottom: 15px;
  }

  .modal-container {
    width: min(95vw, 600px);
    height: min(calc(95vh - 80px), 800px);
    max-height: calc(95vh - 80px);
  }

  .modal-content-wrapper {
    flex-direction: column;
    overflow-y: auto;
  }

  .modal-project-hero {
    flex-direction: column;
    min-height: auto;
  }

  .modal-hero-content {
    flex-direction: column;
  }

  .modal-project-image-section {
    flex: none;
    min-height: 300px;
  }

  .modal-main-image-container {
    min-height: 250px;
  }

  .modal-project-info-section {
    flex: none;
    padding: 20px 15px;
  }

  .modal-project-name {
    font-size: 1.4rem;
  }

  .modal-project-description-section {
    padding: 20px 15px;
  }

  .modal-properties-section {
    padding: 20px 15px;
  }

  .modal-title {
    font-size: 1.4rem;
  }

  .project-full-description h3,
  .project-details h3 {
    font-size: 1.1rem;
  }

  .project-full-description p {
    font-size: 0.9rem;
  }

  .modal-actions {
    flex-direction: column;
    gap: 12px;
  }

  .btn-modal-primary,
  .btn-modal-secondary {
    width: 100%;
    padding: 16px;
    font-size: 1rem;
  }

  .modal-header {
    padding: 15px 20px;
    min-height: 70px;
    overflow: visible;
  }

  .modal-back-btn span {
    display: none;
  }

  .modal-back-btn,
  .modal-close-btn {
    z-index: 110;
    position: relative;
  }

  .modal-back-navigation {
    z-index: 110;
  }

  .modal-project-badges {
    justify-content: center;
    margin-bottom: 20px;
  }

  .modal-project-details-grid {
    gap: 15px;
  }
}

/* Tablet Responsive */
@media (max-width: 1024px) and (min-width: 769px) {
  .modal-container {
    width: min(90vw, 900px);
    height: min(calc(90vh - 80px), 700px);
    max-height: calc(90vh - 80px);
  }

  .modal-hero-content {
    flex-direction: column;
  }

  .modal-project-image-section {
    flex: none;
    min-height: 400px;
  }

  .modal-project-info-section {
    flex: none;
    padding: 25px 20px;
  }

  .modal-properties-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  .modal-project-name {
    font-size: 1.6rem;
  }

  .modal-section-title {
    font-size: 1.4rem;
  }

  .modal-description-text {
    font-size: 1.05rem;
  }
}

@media (max-width: 480px) {
  .project-gallery-hero {
    width: calc(100vw - 20px);
    margin-left: calc(-50vw + 50% + 10px);
    margin-right: 10px;
  }

  .projects-container {
    padding: 0 10px;
    gap: 25px;
  }

  .project-card {
    max-width: 100%;
    min-height: 400px;
  }

  .project-image-container {
    min-height: 220px;
  }

  .project-info-section {
    padding: 0;
  }

  .project-title {
    font-size: 1.2rem;
  }

  .project-description {
    font-size: 0.9rem;
    padding: 12px 16px;
    line-height: 1.6;
  }

  .modal-container {
    width: min(98vw, 400px);
    height: min(calc(98vh - 80px), 700px);
    max-height: calc(98vh - 80px);
    border-radius: 12px;
  }

  .modal-project-info-section {
    padding: 15px 10px;
  }

  .modal-project-name {
    font-size: 1.2rem;
    text-align: center;
  }

  .modal-section-title {
    font-size: 1.1rem;
  }

  .modal-description-text {
    font-size: 0.9rem;
  }

  .modal-detail-item {
    padding: 10px 12px;
    gap: 10px;
    border-radius: 8px;
  }

  .modal-detail-item svg {
    width: 18px;
    height: 18px;
  }

  .modal-detail-label {
    font-size: 0.7rem;
  }

  .modal-detail-value {
    font-size: 0.85rem;
  }

  .modal-project-description-section {
    padding: 15px 10px;
  }

  .modal-properties-section {
    padding: 15px 10px;
  }

  .modal-properties-grid {
    gap: 12px;
  }

  .property-image-container {
    height: 150px;
  }

  .property-info {
    padding: 12px;
  }

  .property-title {
    font-size: 0.95rem;
  }

  .property-address {
    font-size: 0.8rem;
  }

  .property-features .feature {
    font-size: 0.75rem;
  }

  .property-features .feature svg {
    width: 12px;
    height: 12px;
  }

  .agent-image {
    width: 50px;
    height: 50px;
  }

  .agent-name {
    font-size: 1rem;
  }

  .agent-type {
    font-size: 0.8rem;
  }

  .agent-phone,
  .agent-email {
    font-size: 0.85rem;
  }

  .btn-view-all-properties {
    font-size: 0.85rem;
    padding: 10px 20px;
  }
}
</style>
