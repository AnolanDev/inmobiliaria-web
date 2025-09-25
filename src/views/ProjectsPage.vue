<template>
  <AppLayout>
    <!-- GALERÍA DE PROYECTOS ESTILO HOMEPAGE -->
    <section class="project-gallery-hero" v-if="projects.length > 0">
      <div class="projects-container-full">
        <!-- Header de la galería -->
        <div class="gallery-header">
          <h2 class="gallery-title">Todos Nuestros Proyectos</h2>
          <p class="gallery-subtitle">Descubre nuestra colección completa de desarrollos inmobiliarios</p>
        </div>
        
        <!-- Grid de proyectos -->
        <div class="projects-grid">
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="project-card"
            @click="openProjectDetail(project)"
          >
            <!-- Image container with project click -->
            <div class="project-image-container">
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
            <div class="project-info-section">
              <h2 class="project-title">{{ project.name }}</h2>
              <div class="project-details">
                <p class="project-type" v-if="project.type">{{ project.type }}</p>
                <p class="project-location" v-if="project.city || project.state || project.location">
                  <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span v-if="project.location">{{ project.location }}</span>
                  <span v-else>
                    <span v-if="project.city">{{ project.city }}</span><span v-if="project.city && project.state">, </span><span v-if="project.state">{{ project.state }}</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-else-if="loading" class="loading-gallery">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">Cargando proyectos...</p>
      </div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-gallery">
      <div class="error-content">
        <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <p class="error-message">{{ error }}</p>
        <button @click="projectsStore.fetchProjects()" class="retry-btn">
          Reintentar
        </button>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="empty-gallery">
      <div class="empty-content">
        <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        <p class="empty-message">No se encontraron proyectos disponibles.</p>
        <p class="empty-submessage">Vuelve pronto para conocer nuestros nuevos desarrollos.</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { storeToRefs } from 'pinia'
import AppLayout from '@/components/AppLayout.vue'

const router = useRouter()
const projectsStore = useProjectsStore()
const { projects, loading, error } = storeToRefs(projectsStore)

// Helper function to convert absolute URLs to relative for development
const getImageUrl = (url: string): string => {
  if (!url) return '/placeholder-project.svg'
  
  // In development, convert absolute URLs to relative
  if (import.meta.env.DEV && url.includes('app.tierrasonada.com')) {
    return url.replace('https://app.tierrasonada.com', '').replace('http://app.tierrasonada.com', '')
  }
  
  return url
}

const openProjectDetail = (project: any) => {
  // Navegar al detalle del proyecto
  router.push(`/proyectos/${project.id}`)
}

onMounted(() => {
  projectsStore.fetchProjects()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@300;400;500;600;700&display=swap');

/* GALERÍA DE PROYECTOS - RESPONSIVE OPTIMIZADA */
.project-gallery-hero {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(1rem, 4vw, 2rem) 0 clamp(2rem, 5vw, 4rem) 0;
  /* Mobile-first optimizations */
  overflow-x: hidden;
  position: relative;
}

.projects-container-full {
  width: 100%;
  max-width: 1400px;
  padding: 0 clamp(0.75rem, 3vw, 2.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Safe area for notched devices */
  padding-left: max(clamp(0.75rem, 3vw, 2.5rem), env(safe-area-inset-left));
  padding-right: max(clamp(0.75rem, 3vw, 2.5rem), env(safe-area-inset-right));
}

.gallery-header {
  text-align: center;
  margin-bottom: clamp(2rem, 6vw, 4rem);
}

.gallery-title {
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 300;
  color: #2c3e50;
  margin-bottom: clamp(1rem, 3vw, 1.25rem);
  letter-spacing: clamp(1px, 0.1em, 2px);
  position: relative;
  line-height: 1.2;
}

.gallery-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.gallery-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  color: #6c757d;
  font-weight: 300;
  font-style: italic;
  line-height: 1.4;
}

/* Grid de proyectos - Sistema Adaptativo Mobile-First */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  width: 100%;
  justify-items: center;
  align-items: start;
  place-items: center;
}

/* Mobile: Una columna hasta 640px */
@media (min-width: 480px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: clamp(1.5rem, 4vw, 2rem);
    max-width: 320px;
    margin: 0 auto;
  }
}

/* Tablet: Dos columnas a partir de 640px */
@media (min-width: 640px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 680px;
    gap: clamp(1.5rem, 3vw, 2rem);
  }
}

/* Desktop: Tres columnas a partir de 1024px */
@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    max-width: 1200px;
    gap: clamp(2rem, 3vw, 2.5rem);
  }
}

/* Desktop Large: Ajuste para pantallas grandes */
@media (min-width: 1280px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    max-width: 1400px;
    gap: clamp(2.5rem, 3vw, 3rem);
  }
}

.project-card {
  width: 100%;
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
  transform: translate3d(0, 0, 0);
  will-change: transform;
  /* Mobile touch optimization */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.project-card:hover {
  transform: translate3d(0, -8px, 0);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.12);
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(255, 255, 255, 0.95);
}

/* Touch devices optimization */
@media (hover: none) {
  .project-card:active {
    transform: translate3d(0, -4px, 0);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }
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
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: auto;
}

.project-info-section:hover {
  transform: translate3d(0, -2px, 0);
}

.project-title {
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 500;
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  color: #2c3e50;
  line-height: 1.4;
  letter-spacing: 0.5px;
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 1vw, 0.5rem);
}

.project-type {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(0.75rem, 2vw, 0.85rem);
  font-weight: 500;
  color: #667eea;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.3;
}

.project-location {
  font-family: 'Montserrat', sans-serif;
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

/* Estados de carga, error y vacío */
.loading-gallery,
.error-gallery,
.empty-gallery {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%);
}

.loading-content,
.error-content,
.empty-content {
  text-align: center;
  max-width: 400px;
  padding: 40px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text,
.error-message,
.empty-message {
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.empty-submessage {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #6c757d;
}

.error-icon,
.empty-icon {
  width: 48px;
  height: 48px;
  color: #6c757d;
  margin: 0 auto 20px;
}

.retry-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

/* Responsive design moderno para proyectos */

/* Touch devices pequeños: 375px+ */
@media (min-width: 375px) and (max-width: 479px) {
  .project-icon {
    padding: clamp(12px, 3vw, 16px) clamp(16px, 4vw, 20px);
    font-size: clamp(0.8rem, 2vw, 0.9rem);
  }
  
  .project-icon svg {
    width: clamp(24px, 6vw, 32px);
    height: clamp(24px, 6vw, 32px);
  }
}

/* Responsive adjustments for different screen sizes */
@media (max-width: 479px) {
  .project-card {
    min-height: 420px;
  }
  
  .project-image-container {
    height: 240px;
  }
}

@media (min-width: 640px) and (max-width: 1023px) {
  .project-card {
    min-height: 450px;
  }
  
  .project-image-container {
    height: 280px;
  }
}

/* Desktop grande: 1440px+ */
@media (min-width: 1440px) {
  .projects-container-full {
    max-width: 1600px;
  }
  
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}

/* Ultra wide screens: 1920px+ */
@media (min-width: 1920px) {
  .projects-container-full {
    max-width: 1800px;
  }
}
</style>