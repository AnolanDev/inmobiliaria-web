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
        <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <p class="error-message">{{ error }}</p>
        <p class="error-details" v-if="error?.includes('servidor')">
          El proyecto puede no estar disponible temporalmente. Por favor, inténtalo más tarde o contacta con el administrador.
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              
              <button 
                v-if="projectImages.length > 1"
                @click="nextImage" 
                class="image-nav-btn image-nav-next"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
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
                <img :src="getImageUrl(image)" :alt="`${project.name} - ${index + 1}`" />
              </div>
            </div>
          </div>

          <!-- Project Information -->
          <div class="project-info-section">
            <div class="project-header">
              <h1 class="project-name">{{ project.name }}</h1>
              <div class="project-badges">
                <span class="project-type" v-if="project.type" :style="{ backgroundColor: project.type_color }">
                  {{ project.type }}
                </span>
                <span class="project-status" v-if="project.status" :style="{ backgroundColor: project.status_color }">
                  {{ project.status }}
                </span>
              </div>
            </div>

            <div class="project-details-grid">
              <div class="detail-item" v-if="project.location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div class="detail-content">
                  <span class="detail-label">Ubicación</span>
                  <span class="detail-value">{{ project.location }}</span>
                </div>
              </div>

              <div class="detail-item" v-if="project.area">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                <div class="detail-content">
                  <span class="detail-label">Área</span>
                  <span class="detail-value">{{ project.area }}</span>
                </div>
              </div>

              <div class="detail-item" v-if="project.price">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <div class="detail-content">
                  <span class="detail-label">Precio</span>
                  <span class="detail-value">${{ formatPrice(project.price) }}</span>
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
                  <p class="agent-type-mini" v-if="project.agent.type">{{ project.agent.type }}</p>
                  <div class="agent-contact-mini">
                    <a :href="`tel:${project.agent.phone}`" class="contact-mini" v-if="project.agent.phone">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      {{ project.agent.phone }}
                    </a>
                    <a :href="`mailto:${project.agent.email}`" class="contact-mini" v-if="project.agent.email">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
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
            <p class="description-text">{{ project.description }}</p>
          </div>
        </div>
      </section>

      <!-- Info notice when using basic project info -->
      <section class="info-notice" v-else-if="project && !isLoading">
        <div class="notice-container">
          <div class="notice-content">
            <svg class="notice-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="notice-text">
              Mostrando información básica del proyecto. Para ver detalles completos, contacta con nuestro equipo.
            </p>
          </div>
        </div>
      </section>

      <!-- Project Properties (if available) -->
      <section class="project-properties" v-if="project.properties && project.properties.length > 0">
        <div class="properties-container">
          <h2 class="section-title">Propiedades en {{ project.name }}</h2>
          <div class="properties-grid">
            <div 
              v-for="property in project.properties" 
              :key="property.id"
              class="property-card"
              @click="goToProperty(property.id)"
            >
              <div class="property-image-container">
                <img 
                  :src="getImageUrl(property.cover_image_url)" 
                  :alt="property.title"
                  class="property-image"
                />
                <div class="property-price">
                  ${{ formatPrice(property.price) }}
                </div>
              </div>
              <div class="property-info">
                <h3 class="property-title">{{ property.title }}</h3>
                <p class="property-location">{{ property.address }}, {{ property.city }}</p>
                <div class="property-details">
                  <span class="property-detail" v-if="property.bedrooms">
                    {{ property.bedrooms }} hab.
                  </span>
                  <span class="property-detail" v-if="property.bathrooms">
                    {{ property.bathrooms }} baños
                  </span>
                  <span class="property-detail" v-if="property.area">
                    {{ property.area }} m²
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
        <svg class="not-found-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        <p class="not-found-message">Proyecto no encontrado</p>
        <button @click="goBack" class="back-btn-alt">Volver a Proyectos</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { storeToRefs } from 'pinia'
import AppLayout from '@/components/AppLayout.vue'
import type { Project } from '@/types'

const route = useRoute()
const router = useRouter()
const projectsStore = useProjectsStore()
const { currentProject, loading, error } = storeToRefs(projectsStore)

// Local project ref that we can set directly
const project = ref<Project | null>(null)
const isLoading = ref(true)

const currentImageIndex = ref(0)
const currentImage = ref('')
const projectImages = ref<string[]>([])

const projectId = computed(() => parseInt(route.params.id as string))

// Helper function to convert absolute URLs to relative for development
const getImageUrl = (url: string): string => {
  if (!url) return '/placeholder-project.svg'
  
  // In development, convert absolute URLs to relative
  if (import.meta.env.DEV && url.includes('app.tierrasonada.com')) {
    return url.replace('https://app.tierrasonada.com', '').replace('http://app.tierrasonada.com', '')
  }
  
  return url
}

// Format price with thousands separator
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// Image gallery functions
const setupImageGallery = () => {
  console.log('Setting up image gallery for project:', project.value?.name)
  if (project.value) {
    projectImages.value = [project.value.cover_image_url, ...(project.value.gallery_urls || [])].filter(Boolean)
    currentImage.value = projectImages.value[0] || project.value.cover_image_url
    currentImageIndex.value = 0
    console.log('Gallery setup complete, images:', projectImages.value.length)
  }
}

const nextImage = () => {
  if (currentImageIndex.value < projectImages.value.length - 1) {
    currentImageIndex.value++
    currentImage.value = projectImages.value[currentImageIndex.value]
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    currentImage.value = projectImages.value[currentImageIndex.value]
  }
}

const selectImage = (index: number) => {
  currentImageIndex.value = index
  currentImage.value = projectImages.value[index]
}

// Navigation methods
const goBack = () => {
  router.push('/proyectos')
}

const goToProperty = (propertyId: number) => {
  router.push(`/propiedades/${propertyId}`)
}

const goToAgent = (agentId: number) => {
  router.push(`/agentes/${agentId}`)
}

// Fetch project data
const fetchProjectData = async () => {
  console.log('fetchProjectData called with projectId:', projectId.value)
  isLoading.value = true
  
  if (projectId.value) {
    try {
      // Ensure we have the projects list loaded first
      if (projectsStore.projects.length === 0) {
        console.log('Loading projects list first...')
        await projectsStore.fetchProjects()
      }
      
      // Try to find the project in the existing projects list
      const existingProject = projectsStore.projects.find(p => p.id === projectId.value)
      console.log('Found existing project:', existingProject?.name)
      
      if (existingProject) {
        // Directly set the project without going through the store action
        project.value = existingProject
        setupImageGallery()
        console.log('Set project from existing data')
      } else {
        console.log('Project not found in list')
        project.value = null
      }
      
    } catch (err) {
      console.error('Error in fetchProjectData:', err)
      project.value = null
    } finally {
      isLoading.value = false
      console.log('Loading finished, project:', project.value?.name)
    }
  } else {
    isLoading.value = false
  }
}

onMounted(() => {
  console.log('ProjectDetailPage mounted')
  fetchProjectData()
})

// Watch for project changes
watch(project, (newProject) => {
  console.log('Project changed:', newProject?.name)
}, { immediate: true })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@300;400;500;600;700&display=swap');

/* Container Styles */
.project-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 10px;
}

.error-details {
  font-family: 'Montserrat', sans-serif;
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

.retry-btn, .back-btn-alt, .back-btn-error {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-family: 'Montserrat', sans-serif;
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

.retry-btn:hover, .back-btn-alt:hover {
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
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 20px;
  color: #2c3e50;
}

/* Back Navigation */
.back-navigation {
  padding: 80px 40px 20px 40px;
  display: flex;
  justify-content: flex-end;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(102, 126, 234, 0.2);
  color: #667eea;
  padding: 10px 20px;
  border-radius: 25px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  text-decoration: none;
  z-index: 100;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.back-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

/* Project Hero Section */
.project-hero {
  padding: 40px;
  margin-bottom: 40px;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 600px 1fr;
  gap: 60px;
  align-items: start;
}

.project-image-section {
  position: relative;
}

.main-image-container {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: white;
  margin-bottom: 20px;
}

.project-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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
  font-family: 'Montserrat', sans-serif;
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
  object-fit: cover;
}

.project-info-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.project-header {
  margin-bottom: 30px;
}

.project-name {
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  font-weight: 300;
  color: #2c3e50;
  margin: 0 0 15px 0;
  line-height: 1.2;
  letter-spacing: 1px;
}

.project-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.project-type, .project-status {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item svg {
  width: 24px;
  height: 24px;
  color: #667eea;
  flex-shrink: 0;
}

.detail-content {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.detail-value {
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
}

/* Agent Information */
.agent-info {
  margin-bottom: 30px;
}

.agent-info h3 {
  font-family: 'Roboto', sans-serif;
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
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 5px 0;
}

.agent-type-mini {
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-label {
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 300;
  color: #2c3e50;
  margin: 0 0 25px 0;
  position: relative;
  letter-spacing: 1px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.description-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #5a6c7d;
  margin: 0;
  text-align: justify;
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
  font-family: 'Montserrat', sans-serif;
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
  object-fit: cover;
  transition: transform 0.3s ease;
}

.property-card:hover .property-image {
  transform: scale(1.05);
}

.property-price {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.property-info {
  padding: 20px;
}

.property-title {
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.property-location {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0 0 12px 0;
}

.property-details {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.property-detail {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
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
    padding: 80px 20px 20px 20px;
  }


  .project-hero,
  .project-description-section,
  .info-notice,
  .project-properties {
    padding-left: 20px;
    padding-right: 20px;
  }

  .project-info-section,
  .description-container,
  .notice-container,
  .properties-container {
    padding: 25px;
  }

  .notice-content {
    flex-direction: column;
    gap: 10px;
  }

  .notice-text {
    font-size: 0.9rem;
  }

  .project-name {
    font-size: 1.8rem;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .agent-card-mini {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .agent-contact-mini {
    justify-content: center;
  }
}
</style>