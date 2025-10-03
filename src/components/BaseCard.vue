<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-200">
      <slot name="header" />
    </div>

    <div v-if="$slots.image" class="relative">
      <slot name="image" />
    </div>

    <div :class="contentClasses">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="px-6 py-4 border-t border-gray-200 bg-gray-50"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  hover: true,
  padding: "md",
  shadow: "sm",
});

const cardClasses = computed(() => {
  const base =
    "bg-white rounded-xl border border-gray-200 overflow-hidden transform transition-all duration-300";

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const hover = props.hover
    ? "hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    : "";

  return [base, shadows[props.shadow], hover].join(" ");
});

const contentClasses = computed(() => {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  // Mobile-first responsive padding
  const mobilePadding = "px-4 py-4 sm:px-6 sm:py-6";

  return props.padding === "md" ? mobilePadding : paddings[props.padding];
});
</script>
