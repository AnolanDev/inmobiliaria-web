<template>
  <AppLayout>

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Encuentra tu hogar ideal
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-primary-100">
            Descubre las mejores propiedades y proyectos inmobiliarios
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/propiedades" class="btn-secondary">
              Ver Propiedades
            </RouterLink>
            <RouterLink to="/proyectos" class="btn-primary">
              Explorar Proyectos
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p class="text-lg text-gray-600">
            Ofrecemos la mejor experiencia en bienes raíces
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Proyectos Exclusivos</h3>
            <p class="text-gray-600">Accede a los mejores proyectos inmobiliarios de la región</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Agentes Expertos</h3>
            <p class="text-gray-600">Nuestros agentes especializados te guiarán en cada paso</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Garantía de Calidad</h3>
            <p class="text-gray-600">Todas nuestras propiedades cumplen los más altos estándares</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          ¿Listo para encontrar tu próximo hogar?
        </h2>
        <p class="text-xl text-primary-100 mb-8">
          Contáctanos hoy y comienza tu búsqueda
        </p>
        <RouterLink to="/contacto" class="btn-secondary">
          Contactar Ahora
        </RouterLink>
      </div>
    </section>

  </AppLayout>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
</script>