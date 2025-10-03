<template>
  <component
    :is="iconComponent"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :class="classes"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";

interface Props {
  name: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  variant?: "outline" | "filled" | "solid";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: "currentColor",
  strokeWidth: 2,
  variant: "outline",
});

// Mapa de iconos más comunes para inmobiliaria
const iconMap: Record<string, string> = {
  // Navegación
  home: "Home",
  search: "Search",
  menu: "Menu",
  close: "X",
  "arrow-right": "ArrowRight",
  "arrow-left": "ArrowLeft",
  "arrow-up": "ArrowUp",
  "arrow-down": "ArrowDown",
  "chevron-right": "ChevronRight",
  "chevron-left": "ChevronLeft",
  "chevron-up": "ChevronUp",
  "chevron-down": "ChevronDown",

  // Propiedades e inmobiliaria
  building: "Building",
  "building-2": "Building2",
  "home-modern": "HomeModern",
  "map-pin": "MapPin",
  map: "Map",
  bed: "Bed",
  bath: "Bath",
  car: "Car",
  ruler: "Ruler",
  "dollar-sign": "DollarSign",
  "trending-up": "TrendingUp",
  calendar: "Calendar",
  clock: "Clock",

  // Amenidades
  waves: "Waves",
  "tree-pine": "TreePine",
  sun: "Sun",
  wifi: "Wifi",
  "shield-check": "ShieldCheck",
  "car-parking": "ParkingCircle",
  dumbbell: "Dumbbell",
  "gamepad-2": "Gamepad2",

  // Acciones
  heart: "Heart",
  share: "Share",
  phone: "Phone",
  mail: "Mail",
  "message-circle": "MessageCircle",
  eye: "Eye",
  download: "Download",
  "external-link": "ExternalLink",

  // Estados y UI
  check: "Check",
  "check-circle": "CheckCircle",
  "alert-circle": "AlertCircle",
  info: "Info",
  star: "Star",
  "star-filled": "Star",
  plus: "Plus",
  minus: "Minus",
  edit: "Edit",
  trash: "Trash",
  filter: "Filter",
  grid: "Grid3x3",
  list: "List",
  image: "Image",
  play: "Play",
  pause: "Pause",
  volume: "Volume2",
  camera: "Camera",
  video: "Video",

  // Usuario y contacto
  user: "User",
  users: "Users",
  "user-circle": "UserCircle",
  settings: "Settings",
  login: "LogIn",
  logout: "LogOut",

  // Ubicación y transporte
  location: "MapPin",
  navigation: "Navigation",
  compass: "Compass",
  route: "Route",
  plane: "Plane",
  train: "Train",

  // Tiempo y clima
  weather: "Cloud",
  "sun-icon": "Sun",
  moon: "Moon",
  temperature: "Thermometer",

  // Finanzas
  "credit-card": "CreditCard",
  bank: "Landmark",
  calculator: "Calculator",
  chart: "BarChart3",
  "pie-chart": "PieChart",

  // Servicios
  "wifi-icon": "Wifi",
  bluetooth: "Bluetooth",
  signal: "Signal",
  battery: "Battery",
  power: "Power",

  // Documentos
  file: "File",
  "file-text": "FileText",
  folder: "Folder",
  archive: "Archive",
};

const iconComponent = computed(() => {
  const iconName = iconMap[props.name] || props.name;

  return defineAsyncComponent({
    loader: () =>
      import("lucide-vue-next").then((module) => {
        const component = module[iconName];
        if (!component) {
          console.warn(
            `Icon "${props.name}" (${iconName}) not found in lucide-vue-next`,
          );
          // Fallback al icono Home si no existe
          return module.Home;
        }
        return component;
      }),
    errorComponent: () =>
      import("lucide-vue-next").then((module) => module.Home),
    delay: 0,
    timeout: 3000,
  });
});

const classes = computed(() => {
  const baseClasses = "transition-colors duration-200";
  const variantClasses = {
    outline: "fill-none",
    filled: "fill-current",
    solid: "fill-current stroke-none",
  };

  return [baseClasses, variantClasses[props.variant], props.class]
    .filter(Boolean)
    .join(" ");
});
</script>
