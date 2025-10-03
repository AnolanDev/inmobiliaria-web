<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="target"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center">
      <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {{ loadingText }}
    </div>

    <!-- Normal state -->
    <span v-else class="flex items-center justify-center">
      <!-- Left icon -->
      <slot name="icon-left" />

      <!-- Content -->
      <span>
        <slot>{{ text }}</slot>
      </span>

      <!-- Right icon -->
      <slot name="icon-right">
        <svg
          v-if="showArrow"
          class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          ></path>
        </svg>
      </slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

interface Props {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  showArrow?: boolean;
  to?: string;
  href?: string;
  target?: string;
  fullWidth?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  loadingText: "Cargando...",
  rounded: "xl",
  showArrow: false,
});

const emit = defineEmits<{
  click: [event: Event];
}>();

const tag = computed(() => {
  if (props.to) return RouterLink;
  if (props.href) return "a";
  return "button";
});

const baseClasses =
  "group inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-95";

const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-caribbean-500 hover:bg-caribbean-600 text-white shadow-soft hover:shadow-glow focus:ring-caribbean-200";
    case "secondary":
      return "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 shadow-soft hover:shadow-lg focus:ring-neutral-200";
    case "outline":
      return "border-2 border-caribbean-500 text-caribbean-600 hover:bg-caribbean-50 hover:border-caribbean-600 focus:ring-caribbean-200";
    case "ghost":
      return "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-200";
    case "gradient":
      return "bg-gradient-to-r from-caribbean-500 to-aqua-500 hover:from-caribbean-600 hover:to-aqua-600 text-white shadow-soft hover:shadow-caribbean-glow focus:ring-caribbean-200";
    default:
      return "bg-caribbean-500 hover:bg-caribbean-600 text-white shadow-soft hover:shadow-glow focus:ring-caribbean-200";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-4 py-2 text-sm";
    case "md":
      return "px-6 py-3 text-base";
    case "lg":
      return "px-8 py-4 text-lg";
    case "xl":
      return "px-10 py-5 text-xl";
    default:
      return "px-6 py-3 text-base";
  }
});

const roundedClasses = computed(() => {
  switch (props.rounded) {
    case "sm":
      return "rounded-sm";
    case "md":
      return "rounded-md";
    case "lg":
      return "rounded-lg";
    case "xl":
      return "rounded-xl";
    case "full":
      return "rounded-full";
    default:
      return "rounded-xl";
  }
});

const disabledClasses = computed(() => {
  if (props.disabled || props.loading) {
    return "opacity-50 cursor-not-allowed pointer-events-none";
  }
  return "hover:scale-105";
});

const widthClasses = computed(() => {
  return props.fullWidth ? "w-full" : "";
});

const buttonClasses = computed(() => {
  return [
    baseClasses,
    variantClasses.value,
    sizeClasses.value,
    roundedClasses.value,
    disabledClasses.value,
    widthClasses.value,
  ].join(" ");
});

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>
