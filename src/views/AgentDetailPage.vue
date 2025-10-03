<template>
  <AppLayout>
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">Cargando información del agente...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="localError && !agent" class="error-container">
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
        <p class="error-message">{{ localError }}</p>
        <p class="error-details" v-if="localError?.includes('servidor')">
          El agente puede no estar disponible temporalmente. Por favor,
          inténtalo más tarde o contacta con el administrador.
        </p>
        <div class="error-actions">
          <button @click="fetchAgentData" class="retry-btn">Reintentar</button>
          <button @click="goBack" class="back-btn-error">
            Volver a Agentes
          </button>
        </div>
      </div>
    </div>

    <!-- Agent Detail Content -->
    <div v-else-if="agent && agent.id" class="agent-detail-container">
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
          <span>Volver a Agentes</span>
        </button>
      </div>

      <!-- Agent Hero Section -->
      <section class="agent-hero">
        <div class="hero-content">
          <!-- Agent Image -->
          <div class="agent-image-section">
            <div class="main-image-container">
              <img
                :src="getImageUrl(agent.profile_picture_url)"
                :alt="agent.name"
                class="agent-main-image"
              />
            </div>
          </div>

          <!-- Agent Information -->
          <div class="agent-info-section">
            <div class="agent-header">
              <h1 class="agent-name">{{ agent.name }}</h1>
              <p class="agent-type" v-if="agent.type">{{ agent.type }}</p>
            </div>

            <div class="contact-info">
              <div class="contact-item" v-if="agent.phone">
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
                <a :href="`tel:${agent.phone}`" class="contact-link">{{
                  agent.phone
                }}</a>
              </div>

              <div class="contact-item" v-if="agent.email">
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
                <a :href="`mailto:${agent.email}`" class="contact-link">{{
                  agent.email
                }}</a>
              </div>
            </div>

            <!-- Social Media Links -->
            <div
              class="social-media"
              v-if="agent.facebook || agent.instagram || agent.linkedin"
            >
              <h3>Sígueme en redes</h3>
              <div class="social-links">
                <a
                  v-if="agent.facebook"
                  :href="agent.facebook"
                  target="_blank"
                  class="social-link facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                  <span>Facebook</span>
                </a>

                <a
                  v-if="agent.instagram"
                  :href="agent.instagram"
                  target="_blank"
                  class="social-link instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348z"
                    />
                  </svg>
                  <span>Instagram</span>
                </a>

                <a
                  v-if="agent.linkedin"
                  :href="agent.linkedin"
                  target="_blank"
                  class="social-link linkedin"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <!-- Properties Count -->
            <div class="stats-section" v-if="agent.properties_count">
              <div class="stat-item">
                <div class="stat-number">{{ agent.properties_count }}</div>
                <div class="stat-label">Propiedades</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Agent Biography -->
      <section class="agent-biography" v-if="agent.bio">
        <div class="biography-container">
          <h2 class="section-title">Sobre {{ agent.name.split(" ")[0] }}</h2>
          <div class="biography-content">
            <p class="biography-text">{{ agent.bio }}</p>
          </div>
        </div>
      </section>

      <!-- Agent Properties (if available) -->
      <section
        class="agent-properties"
        v-if="agent.properties && agent.properties.length > 0"
      >
        <div class="properties-container">
          <h2 class="section-title">
            Propiedades de {{ agent.name.split(" ")[0] }}
          </h2>
          <div class="properties-grid">
            <div
              v-for="property in agent.properties"
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
                <p class="property-location">
                  {{ property.address }}, {{ property.city }}
                </p>
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        <p class="not-found-message">Agente no encontrado</p>
        <button @click="goBack" class="back-btn-alt">Volver a Agentes</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAgentsStore } from "@/stores/agents";
import { storeToRefs } from "pinia";
import AppLayout from "@/components/AppLayout.vue";
import type { Agent } from "@/types";

const route = useRoute();
const router = useRouter();
const agentsStore = useAgentsStore();
const { currentAgent, loading, error } = storeToRefs(agentsStore);

// Estado local para optimización
const agent = ref<Agent | null>(null);
const isLoading = ref(true);
const localError = ref<string | null>(null);

const agentId = computed(() => parseInt(route.params.id as string));

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

// Format price with thousands separator
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Navigation methods
const goBack = () => {
  router.push("/agentes");
};

const goToProperty = (propertyId: number) => {
  router.push(`/propiedades/${propertyId}`);
};

// Fetch agent data with caching strategy
const fetchAgentData = async () => {
  console.log("fetchAgentData called with agentId:", agentId.value);
  isLoading.value = true;
  localError.value = null;

  if (agentId.value) {
    try {
      // Ensure we have the agents list loaded first
      if (agentsStore.agents.length === 0) {
        console.log("Loading agents list first...");
        await agentsStore.fetchAgents();
      }

      // Try to find the agent in the existing agents list
      const existingAgent = agentsStore.agents.find(
        (a) => a.id === agentId.value,
      );
      console.log("Found existing agent:", existingAgent?.name);

      if (existingAgent) {
        // Directly set the agent without going through the store action
        agent.value = existingAgent;
        console.log("Set agent from existing data");
      } else {
        console.log("Agent not found in list, fetching from API...");
        // Fallback to API call if not found in cache
        await agentsStore.fetchAgent(agentId.value);
        agent.value = currentAgent.value;
      }
    } catch (err) {
      console.error("Error in fetchAgentData:", err);
      localError.value = "Error al cargar información del agente";
      agent.value = null;
    } finally {
      isLoading.value = false;
      console.log("Loading finished, agent:", agent.value?.name);
    }
  } else {
    isLoading.value = false;
  }
};

onMounted(() => {
  console.log("AgentDetailPage mounted");
  fetchAgentData();
});

// Watch for agent changes
watch(
  agent,
  (newAgent) => {
    console.log("Agent changed:", newAgent?.name);
  },
  { immediate: true },
);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@300;400;500;600;700&display=swap");

/* Container Styles */
.agent-detail-container {
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
  margin: 0 0 20px;
}

.error-details {
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  color: #6c757d;
  margin: 10px 0 20px;
  line-height: 1.4;
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
  background: linear-gradient(135deg, #6c757d, #495057);
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
}

.retry-btn:hover,
.back-btn-alt:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.back-btn-error:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
}

/* Not Found State */
.not-found-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem);
}

.not-found-content {
  text-align: center;
  color: #6c757d;
  max-width: 400px;
  width: 100%;
}

.not-found-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
}

.not-found-message {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  font-weight: 500;
  margin: 0 0 clamp(1rem, 3vw, 1.25rem);
  color: #2c3e50;
  line-height: 1.4;
}

/* Back Navigation - Responsive */
.back-navigation {
  padding: clamp(60px, 12vw, 80px) clamp(1rem, 4vw, 2.5rem)
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

/* Agent Hero Section */
.agent-hero {
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

/* Progressive enhancement para pantallas más grandes */
@media (min-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr 1.2fr;
  }
}

@media (min-width: 1024px) {
  .hero-content {
    grid-template-columns: 400px 1fr;
  }
}

.agent-image-section {
  position: relative;
}

.main-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4/5;
  height: auto;
  min-height: clamp(300px, 60vh, 500px);
  max-height: 600px;
  border-radius: clamp(12px, 3vw, 20px);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: white;
}

.agent-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.agent-info-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: clamp(12px, 3vw, 20px);
  padding: clamp(1.5rem, 5vw, 2.5rem);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.agent-header {
  margin-bottom: 30px;
}

.agent-name {
  font-family: "Roboto", sans-serif;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 300;
  color: #2c3e50;
  margin: 0 0 clamp(0.5rem, 2vw, 0.75rem) 0;
  line-height: 1.2;
  letter-spacing: clamp(0.5px, 0.1em, 1px);
}

.agent-type {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  font-weight: 500;
  color: #667eea;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: clamp(0.5px, 0.1em, 1px);
  line-height: 1.3;
}

.contact-info {
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.contact-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.contact-item svg {
  width: 20px;
  height: 20px;
  color: #667eea;
  flex-shrink: 0;
}

.contact-link {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  font-weight: 500;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.3s ease;
  line-height: 1.4;
  word-break: break-word;
}

.contact-link:hover {
  color: #667eea;
}

/* Social Media - Responsive */
.social-media {
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
}

.social-media h3 {
  font-family: "Roboto", sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 clamp(0.75rem, 2vw, 1rem) 0;
  line-height: 1.3;
}

.social-links {
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: clamp(6px, 1.5vw, 8px);
  padding: clamp(8px, 2vw, 10px) clamp(12px, 3vw, 15px);
  border-radius: 25px;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-width: fit-content;
}

.social-link svg {
  width: clamp(16px, 4vw, 18px);
  height: clamp(16px, 4vw, 18px);
  flex-shrink: 0;
}

.social-link.facebook {
  background: rgba(24, 119, 242, 0.1);
  color: #1877f2;
  border-color: rgba(24, 119, 242, 0.2);
}

.social-link.facebook:hover {
  background: rgba(24, 119, 242, 0.2);
  border-color: #1877f2;
}

.social-link.instagram {
  background: rgba(225, 48, 108, 0.1);
  color: #e1306c;
  border-color: rgba(225, 48, 108, 0.2);
}

.social-link.instagram:hover {
  background: rgba(225, 48, 108, 0.2);
  border-color: #e1306c;
}

.social-link.linkedin {
  background: rgba(0, 119, 181, 0.1);
  color: #0077b5;
  border-color: rgba(0, 119, 181, 0.2);
}

.social-link.linkedin:hover {
  background: rgba(0, 119, 181, 0.2);
  border-color: #0077b5;
}

/* Stats Section - Responsive */
.stats-section {
  display: flex;
  gap: clamp(1rem, 4vw, 2rem);
  flex-wrap: wrap;
  justify-content: flex-start;
}

.stat-item {
  text-align: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: clamp(1rem, 4vw, 1.25rem);
  border-radius: clamp(12px, 3vw, 15px);
  min-width: clamp(100px, 20vw, 120px);
  flex: 0 1 auto;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(102, 126, 234, 0.4);
}

.stat-number {
  font-family: "Roboto", sans-serif;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  margin-bottom: clamp(0.25rem, 1vw, 0.375rem);
  line-height: 1.2;
}

.stat-label {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: clamp(0.3px, 0.1em, 0.5px);
  line-height: 1.3;
}

/* Biography Section - Responsive */
.agent-biography {
  padding: 0 clamp(1rem, 4vw, 2.5rem) clamp(2rem, 5vw, 2.5rem);
  margin-bottom: clamp(2rem, 5vw, 2.5rem);
}

.biography-container {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: clamp(12px, 3vw, 20px);
  padding: clamp(1.5rem, 5vw, 2.5rem);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-family: "Roboto", sans-serif;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 300;
  color: #2c3e50;
  margin: 0 0 clamp(1rem, 3vw, 1.5rem) 0;
  position: relative;
  letter-spacing: clamp(0.5px, 0.1em, 1px);
  line-height: 1.3;
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

.biography-text {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  line-height: 1.8;
  color: #5a6c7d;
  margin: 0;
  text-align: justify;
}

/* Properties Section - Responsive */
.agent-properties {
  padding: 0 clamp(1rem, 4vw, 2.5rem) clamp(2rem, 5vw, 2.5rem);
}

.properties-container {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: clamp(12px, 3vw, 20px);
  padding: clamp(1.5rem, 5vw, 2.5rem);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.properties-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 4vw, 2rem);
  margin-top: clamp(1.5rem, 4vw, 2rem);
}

/* Progressive enhancement para properties grid */
@media (min-width: 640px) {
  .properties-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .properties-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: clamp(2rem, 4vw, 2.5rem);
  }
}

.property-card {
  background: white;
  border-radius: clamp(12px, 3vw, 15px);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transform: translate3d(0, 0, 0);
  will-change: transform;
}

.property-card:hover {
  transform: translate3d(0, -5px, 0);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
}

.property-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
  height: auto;
  min-height: clamp(160px, 25vw, 200px);
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.property-card:hover .property-image {
  transform: scale(1.05);
}

.property-price {
  position: absolute;
  top: clamp(12px, 3vw, 15px);
  right: clamp(12px, 3vw, 15px);
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: clamp(6px, 2vw, 8px) clamp(12px, 3vw, 15px);
  border-radius: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  line-height: 1.3;
}

.property-info {
  padding: clamp(1rem, 4vw, 1.25rem);
}

.property-title {
  font-family: "Roboto", sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 clamp(0.5rem, 2vw, 0.75rem) 0;
  line-height: 1.4;
  letter-spacing: 0.3px;
}

.property-location {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  color: #6c757d;
  margin: 0 0 clamp(0.75rem, 2vw, 1rem) 0;
  line-height: 1.4;
}

.property-details {
  display: flex;
  gap: clamp(0.5rem, 2vw, 0.75rem);
  flex-wrap: wrap;
}

.property-detail {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: clamp(3px, 1vw, 4px) clamp(8px, 2vw, 10px);
  border-radius: 12px;
  font-weight: 500;
  line-height: 1.3;
  white-space: nowrap;
}

/* Responsive Design Moderno */

/* Mobile devices: Hasta 479px */
@media (max-width: 479px) {
  .back-navigation {
    padding: clamp(60px, 15vw, 80px) clamp(1rem, 4vw, 1.25rem)
      clamp(1rem, 4vw, 1.25rem);
  }

  .social-links {
    flex-direction: column;
    align-items: stretch;
  }

  .social-link {
    justify-content: center;
    text-align: center;
  }

  .stats-section {
    justify-content: center;
  }

  .stat-item {
    flex: 1 1 auto;
    max-width: 150px;
  }
}

/* Small mobile: 375px+ */
@media (min-width: 375px) and (max-width: 479px) {
  .social-link {
    padding: clamp(10px, 3vw, 12px) clamp(16px, 5vw, 20px);
  }
}

/* Large mobile: 480px+ */
@media (min-width: 480px) and (max-width: 639px) {
  .social-links {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .stats-section {
    justify-content: flex-start;
  }
}

/* Tablet portrait: 640px+ */
@media (min-width: 640px) and (max-width: 767px) {
  .hero-content {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .main-image-container {
    max-height: 400px;
  }
}

/* Tablet landscape: 768px+ */
@media (min-width: 768px) and (max-width: 1023px) {
  .hero-content {
    grid-template-columns: 1fr 1.3fr;
  }

  .social-links {
    gap: 1.25rem;
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .back-navigation {
    padding: clamp(80px, 8vw, 100px) clamp(2rem, 5vw, 2.5rem)
      clamp(1.5rem, 4vw, 2rem) clamp(2rem, 5vw, 2.5rem);
  }
}
</style>
