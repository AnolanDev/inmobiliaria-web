<template>
  <span :class="badgeClasses" :title="title">
    <!-- Icon slot -->
    <slot name="icon" />

    <!-- Text content -->
    <span>
      <slot>{{ text }}</slot>
    </span>

    <!-- Remove button for dismissible badges -->
    <button
      v-if="dismissible"
      @click="$emit('dismiss')"
      class="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
      type="button"
    >
      <svg
        class="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?:
    | "default"
    | "caribbean"
    | "nature"
    | "coral"
    | "aqua"
    | "sand"
    | "neutral"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg";
  text?: string;
  title?: string;
  dismissible?: boolean;
  outline?: boolean;
  rounded?: "sm" | "md" | "lg" | "full";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
  rounded: "full",
});

const emit = defineEmits<{
  dismiss: [];
}>();

const baseClasses =
  "inline-flex items-center font-medium transition-all duration-200";

const variantClasses = computed(() => {
  const isOutline = props.outline;

  switch (props.variant) {
    case "caribbean":
      return isOutline
        ? "border border-caribbean-300 text-caribbean-700 hover:bg-caribbean-50"
        : "bg-caribbean-100 text-caribbean-800 hover:bg-caribbean-200";
    case "nature":
      return isOutline
        ? "border border-nature-300 text-nature-700 hover:bg-nature-50"
        : "bg-nature-100 text-nature-800 hover:bg-nature-200";
    case "coral":
      return isOutline
        ? "border border-coral-300 text-coral-700 hover:bg-coral-50"
        : "bg-coral-100 text-coral-800 hover:bg-coral-200";
    case "aqua":
      return isOutline
        ? "border border-aqua-300 text-aqua-700 hover:bg-aqua-50"
        : "bg-aqua-100 text-aqua-800 hover:bg-aqua-200";
    case "sand":
      return isOutline
        ? "border border-sand-300 text-sand-700 hover:bg-sand-50"
        : "bg-sand-100 text-sand-800 hover:bg-sand-200";
    case "neutral":
      return isOutline
        ? "border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
        : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200";
    case "success":
      return isOutline
        ? "border border-nature-300 text-nature-700 hover:bg-nature-50"
        : "bg-nature-100 text-nature-800 hover:bg-nature-200";
    case "warning":
      return isOutline
        ? "border border-sand-300 text-sand-700 hover:bg-sand-50"
        : "bg-sand-100 text-sand-800 hover:bg-sand-200";
    case "error":
      return isOutline
        ? "border border-coral-300 text-coral-700 hover:bg-coral-50"
        : "bg-coral-100 text-coral-800 hover:bg-coral-200";
    default:
      return isOutline
        ? "border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
        : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-2 py-1 text-xs";
    case "md":
      return "px-3 py-1 text-sm";
    case "lg":
      return "px-4 py-2 text-base";
    default:
      return "px-3 py-1 text-sm";
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
    case "full":
      return "rounded-full";
    default:
      return "rounded-full";
  }
});

const badgeClasses = computed(() => {
  return [
    baseClasses,
    variantClasses.value,
    sizeClasses.value,
    roundedClasses.value,
  ].join(" ");
});
</script>
