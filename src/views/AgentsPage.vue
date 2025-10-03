<template>
  <AppLayout>
    <!-- GALERÍA DE AGENTES ESTILO HOMEPAGE -->
    <section class="agents-gallery-hero" v-if="agents.length > 0">
      <div class="agents-container-full">
        <!-- Header de la galería -->
        <div class="gallery-header">
          <h2 class="gallery-title">Todo Nuestro Equipo</h2>
          <p class="gallery-subtitle">
            Conoce a todos los profesionales que te acompañarán en tu inversión
          </p>
        </div>

        <!-- Grid de agentes -->
        <div class="agents-grid">
          <div
            v-for="agent in agents"
            :key="agent.id"
            class="agent-card"
            @click="openAgentDetail(agent)"
          >
            <!-- Image container with agent click -->
            <div class="agent-image-container">
              <img
                :src="
                  getImageUrl(
                    agent.profile_picture_url || '/placeholder-agent.svg',
                  )
                "
                :alt="agent.name"
                class="agent-image"
                loading="lazy"
              />
              <div class="image-overlay">
                <div class="agent-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Ver Perfil</span>
                </div>
              </div>
            </div>

            <!-- Agent information below image -->
            <div class="agent-info-section">
              <h2 class="agent-title">{{ agent.name }}</h2>
              <div class="agent-details">
                <p class="agent-type" v-if="agent.type">{{ agent.type }}</p>
                <p class="agent-phone" v-if="agent.phone">{{ agent.phone }}</p>
                <p class="agent-email" v-if="agent.email">{{ agent.email }}</p>
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
        <p class="loading-text">Cargando agentes...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-gallery">
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
        <button @click="agentsStore.fetchAgents()" class="retry-btn">
          Reintentar
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-gallery">
      <div class="empty-content">
        <svg
          class="empty-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        <p class="empty-message">No se encontraron agentes disponibles.</p>
        <p class="empty-submessage">
          Vuelve pronto para conocer a nuestro equipo.
        </p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAgentsStore } from "@/stores/agents";
import { storeToRefs } from "pinia";
import AppLayout from "@/components/AppLayout.vue";
import type { Agent } from "@/types";

const router = useRouter();
const agentsStore = useAgentsStore();
const { agents, loading, error } = storeToRefs(agentsStore);

// Helper function to convert absolute URLs to relative for development
const getImageUrl = (url: string): string => {
  if (!url) return "/placeholder-agent.svg";

  // In development, convert absolute URLs to relative
  if (import.meta.env.DEV && url.includes("app.tierrasonada.com")) {
    return url
      .replace("https://app.tierrasonada.com", "")
      .replace("http://app.tierrasonada.com", "");
  }

  return url;
};

const openAgentDetail = (agent: Agent) => {
  // Navigate to agent detail page
  router.push(`/agentes/${agent.id}`);
};

onMounted(() => {
  agentsStore.fetchAgents();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@300;400;500;600;700&display=swap");

/* GALERÍA DE AGENTES - RESPONSIVE OPTIMIZADA */
.agents-gallery-hero {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f2f5 0%, #e8ebed 50%, #dfe3e6 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(1rem, 4vw, 2rem) 0 clamp(2rem, 5vw, 4rem) 0;
  margin: 0;
  /* Mobile-first optimizations */
  overflow-x: hidden;
  position: relative;
}

.agents-container-full {
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
  font-family: "Roboto", sans-serif;
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 300;
  color: #2c3e50;
  margin-bottom: clamp(1rem, 3vw, 1.25rem);
  letter-spacing: clamp(1px, 0.1em, 2px);
  position: relative;
  line-height: 1.2;
}

.gallery-title::after {
  content: "";
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
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  color: #6c757d;
  font-weight: 300;
  font-style: italic;
  line-height: 1.4;
}

/* Grid de agentes - Sistema Adaptativo Mobile-First */
.agents-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  width: 100%;
  justify-items: center;
  align-items: start;
  margin-bottom: clamp(2rem, 6vw, 4rem);
  place-items: center;
}

/* Mobile: Una columna hasta 640px */
@media (min-width: 480px) {
  .agents-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: clamp(1.5rem, 4vw, 2rem);
    max-width: 320px;
    margin: 0 auto clamp(2rem, 6vw, 4rem) auto;
  }
}

/* Tablet: Dos columnas a partir de 640px */
@media (min-width: 640px) {
  .agents-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 680px;
    gap: clamp(1.5rem, 3vw, 2rem);
  }
}

/* Desktop: Tres columnas a partir de 1024px */
@media (min-width: 1024px) {
  .agents-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    max-width: 1200px;
    gap: clamp(2rem, 3vw, 2.5rem);
  }
}

/* Desktop Large: Ajuste para pantallas grandes */
@media (min-width: 1280px) {
  .agents-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    max-width: 1400px;
    gap: clamp(2.5rem, 3vw, 3rem);
  }
}

.agent-card {
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

.agent-card:hover {
  transform: translate3d(0, -8px, 0);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.12);
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(255, 255, 255, 0.95);
}

/* Touch devices optimization */
@media (hover: none) {
  .agent-card:active {
    transform: translate3d(0, -4px, 0);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }
}

.agent-image-container {
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

.agent-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.4s ease;
  border-radius: clamp(12px, 2vw, 16px);
  display: block;
  background: #f3f4f6;
}

.agent-image-container:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.agent-image-container:hover .agent-image {
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

.agent-image-container:hover .image-overlay {
  opacity: 1;
}

.agent-icon {
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

.agent-icon svg {
  width: 32px;
  height: 32px;
}

.agent-info-section {
  padding: 0;
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: clamp(120px, 20vw, 150px);
}

.agent-info-section:hover {
  transform: translate3d(0, -2px, 0);
}

.agent-title {
  font-family: "Roboto", sans-serif;
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 500;
  margin-bottom: clamp(0.5rem, 2vw, 0.75rem);
  color: #2c3e50;
  line-height: 1.4;
  letter-spacing: 0.5px;
}

.agent-details {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 1vw, 0.375rem);
}

.agent-type {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.75rem, 2vw, 0.85rem);
  font-weight: 500;
  color: #667eea;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.3;
}

.agent-phone,
.agent-email {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.75rem, 2vw, 0.85rem);
  font-weight: 400;
  color: #6c757d;
  margin: 0;
  line-height: 1.4;
  word-break: break-word;
}

/* Loading State - Responsive */
.loading-gallery {
  width: 100%;
  min-height: 80vh;
  background: linear-gradient(135deg, #f0f2f5 0%, #e8ebed 50%, #dfe3e6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem);
  margin: clamp(1rem, 3vw, 2.5rem) 0;
  border-radius: clamp(12px, 2vw, 20px);
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
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
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
.error-gallery {
  width: calc(100vw - 80px);
  min-height: 80vh;
  position: relative;
  margin-left: calc(-50vw + 50% + 40px);
  margin-top: 40px;
  margin-right: 40px;
  background: linear-gradient(135deg, #f0f2f5 0%, #e8ebed 50%, #dfe3e6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  border-radius: 20px;
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
  margin: 0 0 20px;
}

.retry-btn {
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

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Empty State */
.empty-gallery {
  width: calc(100vw - 80px);
  min-height: 80vh;
  position: relative;
  margin-left: calc(-50vw + 50% + 40px);
  margin-top: 40px;
  margin-right: 40px;
  background: linear-gradient(135deg, #f0f2f5 0%, #e8ebed 50%, #dfe3e6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  border-radius: 20px;
}

.empty-content {
  text-align: center;
  color: #6c757d;
  max-width: 400px;
}

.empty-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
}

.empty-message {
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 10px;
  color: #2c3e50;
}

.empty-submessage {
  font-family: "Montserrat", sans-serif;
  font-size: 0.95rem;
  margin: 0;
}

/* Responsive design moderno para agentes */

/* Touch devices pequeños: 375px+ */
@media (min-width: 375px) and (max-width: 479px) {
  .agent-icon {
    padding: clamp(12px, 3vw, 16px) clamp(16px, 4vw, 20px);
    font-size: clamp(0.8rem, 2vw, 0.9rem);
  }

  .agent-icon svg {
    width: clamp(24px, 6vw, 32px);
    height: clamp(24px, 6vw, 32px);
  }
}

/* Responsive adjustments for different screen sizes */
@media (max-width: 479px) {
  .agent-card {
    min-height: 420px;
  }

  .agent-image-container {
    min-height: 240px;
  }
}

@media (min-width: 640px) and (max-width: 1023px) {
  .agent-card {
    min-height: 450px;
  }

  .agent-image-container {
    min-height: 280px;
  }
}

/* Desktop grande: 1440px+ */
@media (min-width: 1440px) {
  .agents-container-full {
    max-width: 1600px;
  }

  .agents-grid {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}

/* Ultra wide screens: 1920px+ */
@media (min-width: 1920px) {
  .agents-container-full {
    max-width: 1800px;
  }
}
</style>
