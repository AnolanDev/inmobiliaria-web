<template>
  <!-- Professional Stats Section - Mobile First -->
  <div class="space-y-6">
    <!-- Main Stats Grid -->
    <div 
      :class="[
        'grid gap-6 max-w-2xl mx-auto lg:mx-0',
        'grid-cols-1 sm:grid-cols-3',                    // Mobile: stacked, SM+: 3 columns
        'text-center lg:text-left'
      ]"
    >
      <!-- Projects Stat -->
      <div class="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
        <div class="relative mb-3">
          <!-- Massive Typography - Mobile First -->
          <div 
            :class="[
              'font-black leading-none tracking-tight select-none',
              'text-7xl sm:text-6xl lg:text-7xl xl:text-8xl',  // Mobile larger, then responsive
              'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500',
              'bg-clip-text text-transparent'
            ]"
          >
            {{ projectsCount }}
            <span 
              :class="[
                'font-bold',
                'text-6xl sm:text-5xl lg:text-6xl xl:text-7xl'  // Proportional scaling
              ]"
            >+</span>
          </div>
          
          <!-- Elegant Floating Indicator -->
          <div class="absolute -top-1 -right-1 w-3 h-3 bg-blue-400/80 rounded-full 
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      animate-pulse group-hover:animate-bounce">
          </div>
        </div>
        
        <!-- Clean Labels -->
        <div class="space-y-1">
          <div class="text-slate-800 font-bold text-lg lg:text-xl uppercase tracking-wider">
            Proyectos
          </div>
          <div class="text-slate-600 text-sm font-medium">
            En desarrollo
          </div>
        </div>
      </div>

      <!-- Experts Stat -->
      <div class="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
        <div class="relative mb-3">
          <div 
            :class="[
              'font-black leading-none tracking-tight select-none',
              'text-7xl sm:text-6xl lg:text-7xl xl:text-8xl',
              'bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500',
              'bg-clip-text text-transparent'
            ]"
          >
            {{ expertsCount }}
            <span 
              :class="[
                'font-bold',
                'text-6xl sm:text-5xl lg:text-6xl xl:text-7xl'
              ]"
            >+</span>
          </div>
          
          <div class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400/80 rounded-full 
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      animate-pulse group-hover:animate-bounce"
               style="animation-delay: 0.1s">
          </div>
        </div>
        
        <div class="space-y-1">
          <div class="text-slate-800 font-bold text-lg lg:text-xl uppercase tracking-wider">
            Expertos
          </div>
          <div class="text-slate-600 text-sm font-medium">
            Especializados
          </div>
        </div>
      </div>

      <!-- Departments Stat -->
      <div class="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer">
        <div class="relative mb-3">
          <div 
            :class="[
              'font-black leading-none tracking-tight select-none',
              'text-7xl sm:text-6xl lg:text-7xl xl:text-8xl',
              'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-400',
              'bg-clip-text text-transparent'
            ]"
          >
            {{ departmentsCount }}
          </div>
          
          <div class="absolute -top-1 -right-1 w-3 h-3 bg-amber-400/80 rounded-full 
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      animate-pulse group-hover:animate-bounce"
               style="animation-delay: 0.2s">
          </div>
        </div>
        
        <div class="space-y-1">
          <div class="text-slate-800 font-bold text-lg lg:text-xl uppercase tracking-wider">
            Departamentos
          </div>
          <div class="text-slate-600 text-sm font-medium">
            Costa Caribe
          </div>
        </div>
      </div>
    </div>

    <!-- Professional Achievement Badges -->
    <div 
      :class="[
        'flex flex-wrap gap-3 max-w-lg mx-auto lg:mx-0',
        'justify-center lg:justify-start'                // Center on mobile, left on desktop
      ]"
    >
      <!-- ROI Badge -->
      <div class="px-4 py-2 bg-white/80 backdrop-blur-md border border-blue-200/60 rounded-full 
                  text-blue-700 text-sm font-semibold flex items-center shadow-sm
                  hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ROI 15%+ Garantizado
      </div>

      <!-- Delivery Badge -->
      <div class="px-4 py-2 bg-white/80 backdrop-blur-md border border-emerald-200/60 rounded-full 
                  text-emerald-700 text-sm font-semibold flex items-center shadow-sm
                  hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Entrega 2025
      </div>

      <!-- Families Badge -->
      <div class="px-4 py-2 bg-white/80 backdrop-blur-md border border-amber-200/60 rounded-full 
                  text-amber-700 text-sm font-semibold flex items-center shadow-sm
                  hover:bg-amber-50 hover:border-amber-300 transition-all duration-300">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        500+ Familias
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  projectsCount: number;
  expertsCount: number;
  departmentsCount: number;
}

const props = withDefaults(defineProps<Props>(), {
  departmentsCount: 3,
});
</script>
