<template>
  <div class="project-carousel-fullwidth">
    <div class="carousel-container">
      <div
        class="carousel-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="carousel-slide"
        >
          <div class="image-container">
            <img
              :src="getImageUrl(project.cover_image_url)"
              :alt="`Proyecto ${project.name}`"
              class="project-image"
              @load="onImageLoad"
            />
          </div>
          <div class="project-overlay">
            <div class="project-info">
              <h2 class="project-title">{{ project.name }}</h2>
              <p class="project-description" v-if="project.description">
                {{ project.description.substring(0, 150)
                }}{{ project.description.length > 150 ? "..." : "" }}
              </p>
              <div class="project-buttons">
                <button
                  @click="$emit('viewProject', project.id)"
                  class="btn-primary"
                >
                  Ver Proyecto
                </button>
                <button @click="$emit('viewAllProjects')" class="btn-secondary">
                  Todos los Proyectos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation arrows -->
      <button
        @click="prevSlide"
        class="nav-arrow nav-prev"
        aria-label="Proyecto anterior"
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
        @click="nextSlide"
        class="nav-arrow nav-next"
        aria-label="Proyecto siguiente"
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
      <div class="carousel-dots">
        <button
          v-for="(project, index) in projects"
          :key="`dot-${project.id}`"
          @click="goToSlide(index)"
          class="dot"
          :class="{ active: currentIndex === index }"
          :aria-label="`Ir al proyecto ${index + 1}`"
        ></button>
      </div>

      <!-- Auto-play indicator -->
      <div class="autoplay-progress" v-if="autoPlay">
        <div class="progress-bar" :style="{ width: `${progressWidth}%` }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import type { Project } from "@/types";

interface Props {
  projects: Project[];
  autoPlay?: boolean;
  interval?: number;
}

const props = withDefaults(defineProps<Props>(), {
  autoPlay: true,
  interval: 5000,
});

const emit = defineEmits<{
  viewProject: [id: number];
  viewAllProjects: [];
}>();

const currentIndex = ref(0);
const progressWidth = ref(0);
let autoPlayTimer: NodeJS.Timeout | null = null;
let progressTimer: NodeJS.Timeout | null = null;

const getImageUrl = (url: string): string => {
  if (!url) return "/placeholder-project.svg";

  if (url.includes("app.tierrasonada.com")) {
    return url
      .replace("https://app.tierrasonada.com", "")
      .replace("http://app.tierrasonada.com", "");
  }

  return url;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.projects.length;
  resetAutoPlay();
};

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0
      ? props.projects.length - 1
      : currentIndex.value - 1;
  resetAutoPlay();
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
  resetAutoPlay();
};

const startAutoPlay = () => {
  if (!props.autoPlay || props.projects.length <= 1) return;

  autoPlayTimer = setInterval(() => {
    nextSlide();
  }, props.interval);

  // Progress bar animation
  progressWidth.value = 0;
  progressTimer = setInterval(() => {
    progressWidth.value += 100 / (props.interval / 100);
    if (progressWidth.value >= 100) {
      progressWidth.value = 0;
    }
  }, 100);
};

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
  progressWidth.value = 0;
};

const resetAutoPlay = () => {
  stopAutoPlay();
  startAutoPlay();
};

const onImageLoad = () => {
  // Image loaded successfully
};

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
};

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeThreshold = 50;
  const swipeDistance = touchStartX - touchEndX;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

watch(
  () => props.projects,
  () => {
    currentIndex.value = 0;
    resetAutoPlay();
  },
);

onMounted(() => {
  startAutoPlay();
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchend", handleTouchEnd);
});

onUnmounted(() => {
  stopAutoPlay();
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("touchstart", handleTouchStart);
  window.removeEventListener("touchend", handleTouchEnd);
});
</script>

<style scoped>
.project-carousel-fullwidth {
  width: 100vw;
  height: 100vh;
  min-height: 500px;
  position: relative;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.project-image {
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.project-image:hover {
  transform: scale(1.02);
}

.project-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 60px 40px 40px;
  color: white;
}

.project-info {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.project-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.project-description {
  font-size: 1.1rem;
  margin-bottom: 32px;
  opacity: 0.9;
  line-height: 1.6;
}

.project-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10;
}

.nav-arrow:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow svg {
  width: 24px;
  height: 24px;
}

.nav-prev {
  left: 32px;
}

.nav-next {
  right: 32px;
}

.carousel-dots {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: white;
  border-color: white;
}

.dot:hover {
  border-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.autoplay-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 10;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.1s linear;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .project-title {
    font-size: 2rem;
  }

  .project-description {
    font-size: 1rem;
  }

  .project-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary,
  .btn-secondary {
    min-width: 200px;
  }

  .nav-arrow {
    width: 48px;
    height: 48px;
  }

  .nav-arrow svg {
    width: 20px;
    height: 20px;
  }

  .nav-prev {
    left: 16px;
  }

  .nav-next {
    right: 16px;
  }

  .project-overlay {
    padding: 40px 20px 20px;
  }

  .carousel-dots {
    bottom: 80px;
  }
}

@media (max-width: 480px) {
  .project-title {
    font-size: 1.5rem;
  }

  .project-description {
    font-size: 0.9rem;
  }
}
</style>
