<template>
  <div class="agents-gallery-hero" v-if="agents.length > 0">
    <div class="agents-container-full">
      <!-- Header de la galería -->
      <div class="gallery-header">
        <h2 class="gallery-title">Nuestro Equipo de Expertos</h2>
        <p class="gallery-subtitle">
          Conoce a los profesionales que te acompañarán en tu inversión
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
            <ResponsiveImage
              :src="agent.profile_picture_responsive || agent.profile_picture_url"
              :alt="agent.name"
              :fallback="agent.profile_picture_url || '/placeholder-agent.svg'"
              container-class="w-full h-full"
              image-class="agent-image"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              @load="handleImageLoad"
              @error="handleImageError"
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

      <!-- Botón para ver todos los agentes -->
      <div class="gallery-footer">
        <button @click="$emit('viewAllAgents')" class="gallery-btn-all">
          <span>Conocer Todo el Equipo</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Agent } from "@/types";
import ResponsiveImage from "./ResponsiveImage.vue";

interface Props {
  agents: Agent[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  viewAgent: [id: number];
  viewAllAgents: [];
}>();

const router = useRouter();

// Image event handlers
const handleImageLoad = (src: string) => {
  if (import.meta.env.DEV) {
    console.log('✅ AgentsGallery image loaded:', src);
  }
};

const handleImageError = (error: Error) => {
  if (import.meta.env.DEV) {
    console.warn('❌ AgentsGallery image error:', error.message);
  }
};

const openAgentDetail = (agent: Agent) => {
  // Emit event to parent and navigate
  emit("viewAgent", agent.id);
  router.push(`/agentes/${agent.id}`);
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@300;400;500;600;700&display=swap");

/* GALERÍA DE AGENTES */
.agents-gallery-hero {
  width: calc(100vw - 80px);
  min-height: 80vh;
  position: relative;
  margin-left: calc(-50vw + 50% + 40px);
  margin-top: 40px;
  margin-right: 40px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dcfce7 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 0;
  border-radius: 20px;
}

.agents-container-full {
  width: 100%;
  max-width: 1400px;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery-header {
  text-align: center;
  margin-bottom: 60px;
}

.gallery-title {
  font-family: "Inter", sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #171717;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
  position: relative;
}

.gallery-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #0ea5e9, #22c55e);
  border-radius: 2px;
}

.gallery-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  color: #525252;
  font-weight: 400;
  font-style: normal;
}

/* Grid de agentes */
.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 50px;
  width: 100%;
  justify-items: center;
  margin-bottom: 60px;
}

.agent-card {
  width: 380px;
  height: 620px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  overflow: visible;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  gap: 15px;
  padding: 20px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.agent-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15);
  border-color: rgba(14, 165, 233, 0.3);
  background: rgba(255, 255, 255, 0.95);
}

.agent-image-container {
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.agent-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s ease;
  border-radius: 16px;
  display: block;
  background: transparent;
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
  padding: 10px 0 0 0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 140px;
}

.agent-info-section:hover {
  transform: translateY(-2px);
}

.agent-title {
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 12px;
  color: #2c3e50;
  line-height: 1.4;
  letter-spacing: 0.5px;
}

.agent-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.agent-type {
  font-family: "Inter", sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #0ea5e9;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.agent-phone,
.agent-email {
  font-family: "Montserrat", sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  color: #6c757d;
  margin: 0;
}

/* Botón principal para ver todos */
.gallery-footer {
  text-align: center;
  margin-top: 40px;
}

.gallery-btn-all {
  background: linear-gradient(135deg, #0ea5e9, #22c55e);
  color: white;
  border: none;
  padding: 16px 40px;
  border-radius: 50px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s ease;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
}

.gallery-btn-all:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(14, 165, 233, 0.4);
  background: linear-gradient(135deg, #0284c7, #16a34a);
}

.gallery-btn-all svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.gallery-btn-all:hover svg {
  transform: translateX(5px);
}

/* Responsive design para agentes */
@media (max-width: 768px) {
  .agents-gallery-hero {
    width: calc(100vw - 40px);
    margin-left: calc(-50vw + 50% + 20px);
    margin-right: 20px;
    padding: 30px 0;
  }

  .agents-container-full {
    padding: 0 20px;
  }

  .gallery-title {
    font-size: 2.2rem;
  }

  .gallery-subtitle {
    font-size: 1rem;
  }

  .agents-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .agent-card {
    max-width: 400px;
    height: auto;
    min-height: 580px;
    margin: 0 auto;
    padding: 15px;
    gap: 15px;
  }

  .agent-image-container {
    height: 350px;
  }

  .agent-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .agents-gallery-hero {
    width: calc(100vw - 30px);
    margin-left: calc(-50vw + 50% + 15px);
    margin-right: 15px;
  }

  .agents-container-full {
    padding: 0 15px;
  }

  .gallery-title {
    font-size: 1.8rem;
  }

  .gallery-subtitle {
    font-size: 0.9rem;
  }

  .agents-grid {
    gap: 30px;
  }

  .agent-card {
    max-width: 100%;
    height: auto;
    min-height: 520px;
    padding: 15px;
    gap: 15px;
  }

  .agent-image-container {
    height: 300px;
  }

  .agent-title {
    font-size: 1.2rem;
  }
}
</style>
