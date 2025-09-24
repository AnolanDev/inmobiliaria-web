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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
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
            <p class="project-location" v-if="project.location">{{ project.location }}</p>
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
    
    <button 
      v-if="projects.length > 3"
      @click="rotateRight" 
      class="nav-arrow nav-right"
      aria-label="Proyectos siguientes"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>

    <!-- Dots indicator -->
    <div class="dots-indicator" v-if="projects.length > 3">
      <button 
        v-for="(dot, index) in totalPages"
        :key="index"
        @click="goToPage(index)"
        class="dot"
        :class="{ active: currentPage === index }"
      ></button>
    </div>

    <!-- Project Modal -->
    <div v-if="projectModalOpen" class="project-modal" @click="closeProjectModal">
      <div class="modal-container" @click.stop>
        <!-- Modal Header -->
        <div class="modal-header">
          <h2 class="modal-title">{{ selectedProject?.name }}</h2>
          <div class="modal-controls">
            <button @click="closeProjectModal" class="modal-back-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5"/>
                <path d="M12 19l-7-7 7-7"/>
              </svg>
              <span>Volver</span>
            </button>
            <button @click="closeProjectModal" class="modal-close-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="modal-content-wrapper">
          <!-- Image Gallery Section -->
          <div class="modal-gallery-section">
            <div class="main-image-container">
              <img 
                :src="getImageUrl(currentModalImage)" 
                :alt="selectedProject?.name"
                class="modal-main-image"
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
                <img :src="getImageUrl(image)" :alt="`${selectedProject?.name} - ${index + 1}`" />
              </div>
            </div>
          </div>
          
          <!-- Project Information Section -->
          <div class="modal-info-section">
            <div class="project-full-description">
              <h3>Descripción</h3>
              <p>{{ selectedProject?.description || 'Sin descripción disponible' }}</p>
            </div>
            
            <!-- Project Details -->
            <div class="project-details" v-if="selectedProject">
              <h3>Detalles del Proyecto</h3>
              <div class="details-grid">
                <div class="detail-row" v-if="selectedProject.location">
                  <span class="detail-label">Ubicación:</span>
                  <span class="detail-value">{{ selectedProject.location }}</span>
                </div>
                <div class="detail-row" v-if="selectedProject.area">
                  <span class="detail-label">Área:</span>
                  <span class="detail-value">{{ selectedProject.area }}</span>
                </div>
                <div class="detail-row" v-if="selectedProject.status">
                  <span class="detail-label">Estado:</span>
                  <span class="detail-value">{{ selectedProject.status }}</span>
                </div>
                <div class="detail-row" v-if="selectedProject.type">
                  <span class="detail-label">Tipo:</span>
                  <span class="detail-value">{{ selectedProject.type }}</span>
                </div>
                <div class="detail-row" v-if="selectedProject.price">
                  <span class="detail-label">Precio:</span>
                  <span class="detail-value">{{ selectedProject.price }}</span>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="modal-actions">
              <button 
                @click="$emit('viewProject', selectedProject?.id)"
                class="btn-modal-primary"
              >
                Ver Proyecto Completo
              </button>
              <button 
                @click="$emit('viewAllProjects')"
                class="btn-modal-secondary"
              >
                Todos los Proyectos
              </button>
            </div>
          </div>
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
import { ref, onMounted, computed } from 'vue'
import type { Project } from '@/types'

interface Props {
  projects: Project[]
  showParticles?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showParticles: true
})

const emit = defineEmits<{
  viewProject: [id: number]
  viewAllProjects: []
}>()

const currentPage = ref(0)
const selectedProject = ref<Project | null>(null)
const projectModalOpen = ref(false)
const currentModalImage = ref('')
const currentImageIndex = ref(0)
const projectImages = ref<string[]>([])

const getImageUrl = (url: string): string => {
  if (!url) return '/placeholder-project.svg'
  
  if (import.meta.env.DEV && url.includes('app.tierrasonada.com')) {
    return url.replace('https://app.tierrasonada.com', '').replace('http://app.tierrasonada.com', '')
  }
  
  return url
}

const visibleProjects = computed(() => {
  const startIndex = currentPage.value * 3
  return props.projects.slice(startIndex, startIndex + 3)
})

const totalPages = computed(() => {
  return Math.ceil(props.projects.length / 3)
})

const rotateLeft = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  } else {
    currentPage.value = totalPages.value - 1
  }
}

const rotateRight = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  } else {
    currentPage.value = 0
  }
}

const goToPage = (pageIndex: number) => {
  currentPage.value = pageIndex
}

const openProjectModal = (project: Project) => {
  selectedProject.value = project
  // Set up project images array (cover image + additional images)
  projectImages.value = [project.cover_image_url, ...(project.images || [])].filter(Boolean)
  currentModalImage.value = project.cover_image_url
  currentImageIndex.value = 0
  projectModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeProjectModal = () => {
  projectModalOpen.value = false
  selectedProject.value = null
  document.body.style.overflow = 'unset'
}

const nextImage = () => {
  if (currentImageIndex.value < projectImages.value.length - 1) {
    currentImageIndex.value++
    currentModalImage.value = projectImages.value[currentImageIndex.value]
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    currentModalImage.value = projectImages.value[currentImageIndex.value]
  }
}

const selectImage = (index: number) => {
  currentImageIndex.value = index
  currentModalImage.value = projectImages.value[index]
}

const viewFullProject = () => {
  if (selectedProject.value) {
    emit('viewProject', selectedProject.value.id)
    closeGallery()
  }
}

const getParticleStyle = (index: number) => {
  const random = (seed: number) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }
  
  return {
    left: `${random(index * 3) * 100}%`,
    top: `${random(index * 5) * 100}%`,
    animationDelay: `${random(index * 7) * 4}s`,
    animationDuration: `${3 + random(index * 11) * 4}s`
  }
}

// Auto rotation
let autoRotateTimer: NodeJS.Timeout | null = null

const startAutoRotation = () => {
  if (props.projects.length <= 3) return
  
  autoRotateTimer = setInterval(() => {
    rotateRight()
  }, 6000)
}

const stopAutoRotation = () => {
  if (autoRotateTimer) {
    clearInterval(autoRotateTimer)
    autoRotateTimer = null
  }
}

onMounted(() => {
  startAutoRotation()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@300;400;500;600;700&display=swap');

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
}

.project-card {
  flex: 1;
  width: 380px;
  height: 600px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  overflow: visible;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  gap: 20px;
  padding: 20px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(255, 255, 255, 0.95);
}

.project-image-container {
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 16px;
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
  border-radius: 16px;
  display: block;
  background: transparent;
}

.project-image-container:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.project-image-container:hover .project-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(30, 30, 50, 0.8));
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
  font-family: 'Montserrat', sans-serif;
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
  color: white;
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-info-section:hover {
  transform: translateY(-2px);
}

.project-title {
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 16px;
  color: #2c3e50;
  line-height: 1.4;
  letter-spacing: 0.5px;
}

.project-description {
  font-family: 'Montserrat', sans-serif;
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
  gap: 8px;
}

.project-type {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #667eea;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.project-location {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  color: #6c757d;
  margin: 0;
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
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
  animation: modalFadeIn 0.3s ease;
}

.modal-container {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 20px;
  max-width: 95vw;
  max-height: 95vh;
  width: 1200px;
  height: 800px;
  overflow: hidden;
  position: relative;
  animation: modalSlideIn 0.4s ease;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-family: 'Roboto', sans-serif;
  font-size: 1.8rem;
  font-weight: 500;
  color: white;
  margin: 0;
}

.modal-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.modal-back-btn, .modal-close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.modal-close-btn {
  padding: 8px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  justify-content: center;
}

.modal-back-btn:hover, .modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

.modal-back-btn svg, .modal-close-btn svg {
  width: 18px;
  height: 18px;
}

.modal-content-wrapper {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.modal-gallery-section {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-image-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0c0c0c, #1a1a2e);
}

.modal-main-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  object-position: center;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.image-nav-btn {
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

.image-nav-prev {
  left: 20px;
}

.image-nav-next {
  right: 20px;
}

.image-nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
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
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.thumbnails-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  max-width: 90%;
  overflow-x: auto;
}

.thumbnail-item {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.thumbnail-item.active {
  border-color: rgba(102, 126, 234, 0.8);
}

.thumbnail-item:hover {
  border-color: rgba(102, 126, 234, 0.8);
  transform: scale(1.1);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-info-section {
  flex: 0.8;
  padding: 30px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

.project-full-description h3 {
  font-family: 'Roboto', sans-serif;
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 15px;
  color: rgba(102, 126, 234, 0.9);
}

.project-full-description p {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  color: rgba(255, 255, 255, 0.85);
}

.project-details h3 {
  font-family: 'Roboto', sans-serif;
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
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: rgba(102, 126, 234, 0.9);
  font-size: 0.9rem;
}

.detail-value {
  font-family: 'Montserrat', sans-serif;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
}

.modal-actions {
  display: flex;
  gap: 12px;
  flex-direction: column;
  margin-top: auto;
}

.btn-modal-primary, .btn-modal-secondary {
  padding: 14px 28px;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
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
  from { opacity: 0; }
  to { opacity: 1; }
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
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
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
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-30px) rotate(120deg); }
  66% { transform: translateY(15px) rotate(240deg); }
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

/* Mobile Responsive */
@media (max-width: 768px) {
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
    max-width: 400px;
    margin: 0 auto;
    padding: 15px;
    gap: 15px;
  }
  
  .project-image-container {
    height: 350px;
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
    flex-direction: column;
    width: 95vw;
    height: 95vh;
  }
  
  .modal-content-wrapper {
    flex-direction: column;
  }
  
  .modal-gallery-section {
    flex: 1.2;
  }
  
  .modal-info-section {
    flex: 1;
    padding: 20px 15px;
  }
  
  .modal-title {
    font-size: 1.4rem;
  }
  
  .project-full-description h3, .project-details h3 {
    font-size: 1.1rem;
  }
  
  .project-full-description p {
    font-size: 0.9rem;
  }
  
  .modal-actions {
    flex-direction: row;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .project-gallery-hero {
    width: calc(100vw - 30px);
    margin-left: calc(-50vw + 50% + 15px);
    margin-right: 15px;
  }
  
  .projects-container {
    padding: 0 15px;
    gap: 30px;
  }
  
  .project-card {
    max-width: 100%;
    padding: 15px;
    gap: 15px;
  }
  
  .project-image-container {
    height: 300px;
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
  
  .modal-info-section {
    padding: 15px 10px;
  }
  
  .modal-title {
    font-size: 1.2rem;
  }
  
  .project-full-description h3, .project-details h3 {
    font-size: 1rem;
  }
  
  .project-full-description p {
    font-size: 0.85rem;
  }
  
}

</style>