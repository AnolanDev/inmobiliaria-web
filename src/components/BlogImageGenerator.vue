<template>
  <div class="blog-image-generator" :class="gradientClass">
    <div class="content-overlay">
      <!-- Category Icon -->
      <div class="category-icon">
        <component :is="categoryIcon" class="w-8 h-8 text-white/80" />
      </div>

      <!-- Blog Title Preview -->
      <div class="title-preview">
        <h3
          class="text-sm font-semibold text-white/90 text-center line-clamp-2"
        >
          {{ truncatedTitle }}
        </h3>
      </div>

      <!-- Decorative Elements -->
      <div class="decorative-dots">
        <div
          v-for="n in 6"
          :key="n"
          class="dot"
          :style="{ animationDelay: `${n * 0.2}s` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from "vue";

interface Props {
  title: string;
  category?: string;
}

const props = defineProps<Props>();

// Generate consistent gradient based on title hash
const gradientClass = computed(() => {
  const hash = props.title.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  const gradients = [
    "gradient-blue",
    "gradient-purple",
    "gradient-green",
    "gradient-orange",
    "gradient-pink",
    "gradient-indigo",
  ];

  return gradients[Math.abs(hash) % gradients.length];
});

const truncatedTitle = computed(() => {
  return props.title.length > 60
    ? props.title.substring(0, 60) + "..."
    : props.title;
});

const categoryIcon = computed(() => {
  const category = props.category?.toLowerCase() || "general";

  // Return SVG components based on category
  if (category.includes("tecnolog") || category.includes("tech")) {
    return h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, [
      h("path", { d: "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" }),
    ]);
  }

  if (
    category.includes("inmobiliaria") ||
    category.includes("real estate") ||
    category.includes("propied")
  ) {
    return h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, [
      h("path", { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" }),
    ]);
  }

  if (
    category.includes("mercado") ||
    category.includes("market") ||
    category.includes("economia")
  ) {
    return h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, [
      h("path", {
        d: "M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h4v2H3V4h4zM6 7v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6z",
      }),
    ]);
  }

  // Default article icon
  return h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, [
    h("path", {
      d: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z",
    }),
  ]);
});
</script>

<style scoped>
.blog-image-generator {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
}

.content-overlay {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  height: 100%;
  width: 100%;
}

.category-icon {
  margin-bottom: 12px;
  opacity: 0.9;
}

.title-preview {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 280px;
}

.decorative-dots {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: float 3s ease-in-out infinite;
}

.dot:nth-child(1) {
  top: 10%;
  left: 15%;
}
.dot:nth-child(2) {
  top: 20%;
  right: 20%;
}
.dot:nth-child(3) {
  top: 60%;
  left: 10%;
}
.dot:nth-child(4) {
  bottom: 30%;
  right: 15%;
}
.dot:nth-child(5) {
  bottom: 20%;
  left: 25%;
}
.dot:nth-child(6) {
  top: 50%;
  right: 10%;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) scale(1.1);
    opacity: 0.8;
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Gradient Themes */
.gradient-blue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-purple {
  background: linear-gradient(135deg, #9d50bb 0%, #6e48aa 100%);
}

.gradient-green {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.gradient-orange {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.gradient-pink {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.gradient-indigo {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}
</style>
