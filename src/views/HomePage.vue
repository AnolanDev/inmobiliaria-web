<template>
  <AppLayout>
    <!-- Scroll Animation Container -->
    <div ref="animationContainer">
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-caribbean-50 to-nature-50"
      >
        <div class="text-center">
          <div class="relative">
            <div
              class="w-12 h-12 border-4 border-caribbean-200 border-t-caribbean-500 rounded-full animate-spin mx-auto mb-4"
            ></div>
            <div
              class="absolute inset-0 w-12 h-12 border-2 border-nature-200 rounded-full animate-ping mx-auto opacity-20"
            ></div>
          </div>
          <p class="text-neutral-600 font-medium">Cargando propiedades...</p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="localError"
        class="min-h-screen flex items-center justify-center bg-neutral-50"
      >
        <div class="text-center max-w-md mx-auto px-6">
          <div
            class="bg-white rounded-3xl shadow-lg p-8 border border-neutral-200"
          >
            <div
              class="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg
                class="w-8 h-8 text-coral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">
              Algo salió mal
            </h3>
            <p class="text-neutral-600 mb-6">{{ localError }}</p>
            <button
              @click="retryLoading"
              class="bg-caribbean-500 hover:bg-caribbean-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- Hero Section - Mobile First Responsive -->
        <section
          class="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50 overflow-hidden"
        >
          <!-- Modern Background Elements -->
          <div class="absolute inset-0">
            <!-- Subtle Geometric Pattern -->
            <div class="absolute inset-0 opacity-[0.02]">
              <div
                class="absolute inset-0"
                style="background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.4) 1px, transparent 0); background-size: 32px 32px;">
              </div>
            </div>

            <!-- Elegant Floating Shapes -->
            <div class="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full opacity-60 blur-3xl animate-float-gentle"></div>
            <div class="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full opacity-60 blur-3xl animate-float-gentle" style="animation-delay: 1s"></div>
            <div class="absolute top-1/3 left-1/2 w-80 h-80 bg-gradient-to-br from-slate-100/30 to-blue-100/30 rounded-full opacity-40 blur-3xl animate-float-gentle" style="animation-delay: 2s"></div>

            <!-- Professional Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5"></div>
          </div>

          <!-- Hero Container with Proper Responsive Layout -->
          <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div 
              :class="[
                'grid gap-8 items-center',
                // Mobile First Responsive Grid
                'grid-cols-1',                           // Mobile: stacked layout
                'lg:grid-cols-12 lg:gap-12 xl:gap-16'   // Desktop: 12-column layout
              ]"
            >
              <!-- Hero Content - Mobile First -->
              <div 
                :class="[
                  'lg:col-span-8 space-y-6 lg:space-y-8',
                  'text-center lg:text-left',
                  'order-2 lg:order-1'                      // Mobile: card first, desktop: content first
                ]"
              >
                <!-- Professional Location Badge -->
                <div class="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-md border border-blue-200/60 rounded-full text-blue-700 text-sm font-semibold shadow-sm animate-fade-in">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Costa Caribe Colombiana
                </div>

                <!-- Modern Headline - Mobile Optimized -->
                <h1 
                  :class="[
                    'font-bold leading-tight animate-slide-up',
                    'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl',
                    'mb-6'
                  ]"
                >
                  <span class="text-slate-900">Encuentra tu</span>
                  <span class="block bg-gradient-to-r from-blue-600 via-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                    Paraíso Perfecto
                  </span>
                </h1>

                <!-- Clean Subtitle -->
                <p 
                  :class="[
                    'text-slate-600 leading-relaxed animate-slide-up',
                    'text-lg sm:text-xl lg:text-2xl',
                    'max-w-2xl mx-auto lg:mx-0 mb-8'
                  ]"
                  style="animation-delay: 0.2s"
                >
                  Propiedades exclusivas en la costa caribe colombiana.
                  <span class="font-semibold text-blue-700">Atlántico, Bolívar y Sucre</span>
                  te esperan con inversiones únicas.
                </p>

                <!-- Professional CTA Buttons -->
                <div 
                  :class="[
                    'flex gap-4 animate-slide-up mb-8 lg:mb-12',
                    'flex-col sm:flex-row',
                    'justify-center lg:justify-start'
                  ]"
                  style="animation-delay: 0.4s"
                >
                  <RouterLink
                    to="/proyectos"
                    class="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold text-lg 
                           transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                           focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    <span class="flex items-center justify-center">
                      Explorar Proyectos
                      <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </RouterLink>

                  <RouterLink
                    to="/contacto"
                    class="group bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-slate-300 
                           px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    <span class="flex items-center justify-center">
                      Contactar Ahora
                      <svg class="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                  </RouterLink>
                </div>

                <!-- Enhanced Stats -->
                <div class="animate-slide-up" style="animation-delay: 0.6s">
                  <HeroStats
                    :projects-count="projects.length"
                    :experts-count="agents.length"
                  />
                </div>
              </div>

              <!-- Balanced Feature Card - Mobile First -->
              <div 
                :class="[
                  'lg:col-span-4 relative animate-slide-in-right',
                  'order-1 lg:order-2',                     // Mobile: show first, desktop: show last
                  'flex justify-center lg:justify-end',
                  'mb-8 lg:mb-0'                            // Mobile spacing
                ]"
              >
                <FeatureCard
                  v-if="featuredProject"
                  :title="featuredProject.name"
                  :description="featuredProject.description"
                  :project-image="featuredProject.cover_image_url"
                  :project-type="featuredProject.type"
                  :properties="featuredProject.property_count"
                  :location="featuredProject.location || (featuredProject.city ? `${featuredProject.city}${featuredProject.state ? ', ' + featuredProject.state : ''}` : '')"
                  :region="featuredProject.state || ''"
                  :delivery-date="''"
                  :average-price="''"
                  :area-from="''"
                  @view-details="() => handleProjectClick(featuredProject.id)"
                />
                <!-- Loading placeholder -->
                <div
                  v-else
                  class="w-full max-w-[380px] mx-auto min-h-[500px] bg-white rounded-xl border border-slate-200/60 shadow-lg flex items-center justify-center"
                >
                  <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p class="text-gray-600">Cargando proyecto destacado...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modern Scroll Indicator -->
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div class="flex flex-col items-center">
              <span class="text-xs text-slate-500 mb-2 font-medium">Descubre más</span>
              <div class="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center bg-white/20 backdrop-blur-sm">
                <div class="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Projects Section - Modern Professional Design -->
        <section class="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Professional Section Header -->
            <div class="text-center mb-12 lg:mb-16">
              <!-- Modern Badge -->
              <div class="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-md border border-blue-200/60 rounded-full text-blue-700 text-sm font-semibold mb-6 shadow-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Proyectos Destacados
              </div>

              <!-- Professional Typography -->
              <h2 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Inversiones que
                <span class="block bg-gradient-to-r from-blue-600 via-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                  Transforman Vidas
                </span>
              </h2>

              <p class="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Cada proyecto está diseñado para ofrecer el equilibrio perfecto
                entre naturaleza, comodidad y rentabilidad en la hermosa costa caribe.
              </p>
            </div>

            <!-- Professional Projects Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              <div
                v-for="(project, index) in projects.slice(0, 3)"
                :key="project.id"
                class="group transform hover:scale-[1.02] transition-all duration-500 cursor-pointer"
                @click="goToProject(project.id)"
              >
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl border border-slate-200/60 overflow-hidden transition-all duration-500">
                  <!-- Project Image -->
                  <div class="relative h-48 lg:h-52 overflow-hidden">
                    <HeroImage
                      :image-url="getImageUrl(project.cover_image_url)"
                      :alt="`${project.name} - Proyecto ${project.type || 'Premium'}`"
                      aspect-ratio="16/9"
                      :lazy="false"
                      overlay="gradient"
                      :badge="project.type || 'Premium'"
                      :badge-style="getBadgeStyle(project.type)"
                      :fallback-text="`${project.name} - ${project.type || 'Premium'}`"
                      border-radius="none"
                      shadow="none"
                      hover-effect="both"
                      class="h-full"
                    />
                  </div>

                  <!-- Project Content -->
                  <div class="p-6">
                    <!-- Project Title -->
                    <h3 class="text-xl font-semibold text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                      {{ project.name }}
                    </h3>

                    <!-- Project Description -->
                    <p class="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {{ project.description }}
                    </p>

                    <!-- Project Stats Grid -->
                    <div class="grid grid-cols-2 gap-4 mb-6">
                      <!-- Location -->
                      <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div class="min-w-0">
                          <div class="text-xs text-slate-500 font-medium">Ubicación</div>
                          <div class="text-sm font-semibold text-slate-900 truncate">{{ project.location || project.city || '-' }}</div>
                        </div>
                      </div>

                      <!-- Properties Count - Only show if data exists -->
                      <div v-if="project.property_count" class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                          <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div class="min-w-0">
                          <div class="text-xs text-slate-500 font-medium">Unidades</div>
                          <div class="text-sm font-semibold text-slate-900">{{ project.property_count }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- CTA Button -->
                    <button class="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg 
                                   transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.01]
                                   focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                      <span class="flex items-center justify-center text-sm">
                        Ver Proyecto
                        <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- View All Button -->
            <div class="text-center">
              <RouterLink
                to="/proyectos"
                class="inline-flex items-center bg-gradient-to-r from-caribbean-50 to-nature-50 hover:from-caribbean-100 hover:to-nature-100 text-caribbean-700 border-2 border-caribbean-200 hover:border-caribbean-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 group"
              >
                <svg
                  class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                Ver Todos los Proyectos
              </RouterLink>
            </div>
          </div>
        </section>

        <!-- Services Section -->
        <section
          class="py-20 lg:py-32 bg-gradient-to-br from-neutral-50 to-caribbean-50/30"
        >
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
              <div
                class="inline-flex items-center px-4 py-2 bg-nature-50 border border-nature-200 rounded-full text-nature-700 text-sm font-medium mb-6"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Servicios Premium
              </div>

              <h2
                class="text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 mb-6"
              >
                ¿Por qué elegir
                <span
                  class="bg-gradient-to-r from-nature-600 to-coral-500 bg-clip-text text-transparent"
                  >Tierra Soñada?</span
                >
              </h2>

              <p class="text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto">
                Más que una inmobiliaria, somos tu socio estratégico en la Costa
                Caribe Colombiana.
              </p>
            </div>

            <!-- Services Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <!-- Service 1 -->
              <div
                class="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-depth hover:shadow-caribbean-glow transition-all duration-500 border border-white/30 hover:border-caribbean-300/50 text-center transform hover:-translate-y-2 hover:scale-105"
              >
                <div class="relative">
                  <div
                    class="w-20 h-20 bg-gradient-to-br from-caribbean-100 to-aqua-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:from-caribbean-200 group-hover:to-aqua-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-soft"
                  >
                    <svg
                      class="w-10 h-10 text-caribbean-600 group-hover:text-caribbean-700 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <!-- Floating decoration -->
                  <div
                    class="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-sand-400 to-coral-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-soft"
                  ></div>
                </div>
                <h3
                  class="text-xl font-bold text-neutral-900 mb-4 group-hover:text-caribbean-700 transition-colors"
                >
                  Ubicaciones Privilegiadas
                </h3>
                <p class="text-neutral-600 leading-relaxed">
                  Proyectos estratégicamente ubicados en Atlántico, Bolívar y
                  Sucre con acceso a playas y servicios.
                </p>
              </div>

              <!-- Service 2 -->
              <div
                class="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-depth hover:shadow-nature-glow transition-all duration-500 border border-white/30 hover:border-nature-300/50 text-center transform hover:-translate-y-2 hover:scale-105"
              >
                <div class="relative">
                  <div
                    class="w-20 h-20 bg-gradient-to-br from-nature-100 to-aqua-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:from-nature-200 group-hover:to-aqua-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-soft"
                  >
                    <svg
                      class="w-10 h-10 text-nature-600 group-hover:text-nature-700 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                  <div
                    class="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-nature-400 to-aqua-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-soft"
                  ></div>
                </div>
                <h3
                  class="text-xl font-bold text-neutral-900 mb-4 group-hover:text-nature-700 transition-colors"
                >
                  Garantía Total
                </h3>
                <p class="text-neutral-600 leading-relaxed">
                  Respaldo legal completo y seguros en todas nuestras
                  transacciones inmobiliarias.
                </p>
              </div>

              <!-- Service 3 -->
              <div
                class="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-depth hover:shadow-coral-glow transition-all duration-500 border border-white/30 hover:border-coral-300/50 text-center transform hover:-translate-y-2 hover:scale-105"
              >
                <div class="relative">
                  <div
                    class="w-20 h-20 bg-gradient-to-br from-coral-100 to-sand-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:from-coral-200 group-hover:to-sand-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-soft"
                  >
                    <svg
                      class="w-10 h-10 text-coral-600 group-hover:text-coral-700 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      ></path>
                    </svg>
                  </div>
                  <div
                    class="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-coral-400 to-sand-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-soft"
                  ></div>
                </div>
                <h3
                  class="text-xl font-bold text-neutral-900 mb-4 group-hover:text-coral-700 transition-colors"
                >
                  Financiación Flexible
                </h3>
                <p class="text-neutral-600 leading-relaxed">
                  Planes de pago adaptados a tu presupuesto con las mejores
                  tasas del mercado.
                </p>
              </div>

              <!-- Service 4 -->
              <div
                class="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-depth hover:shadow-aqua-glow transition-all duration-500 border border-white/30 hover:border-aqua-300/50 text-center transform hover:-translate-y-2 hover:scale-105"
              >
                <div class="relative">
                  <div
                    class="w-20 h-20 bg-gradient-to-br from-aqua-100 to-caribbean-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:from-aqua-200 group-hover:to-caribbean-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-soft"
                  >
                    <svg
                      class="w-10 h-10 text-aqua-600 group-hover:text-aqua-700 transition-colors"
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
                  </div>
                  <div
                    class="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-aqua-400 to-caribbean-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-soft"
                  ></div>
                </div>
                <h3
                  class="text-xl font-bold text-neutral-900 mb-4 group-hover:text-aqua-700 transition-colors"
                >
                  Equipo Experto
                </h3>
                <p class="text-neutral-600 leading-relaxed">
                  Asesores especializados en la costa caribe con años de
                  experiencia local.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Team Section -->
        <section class="py-20 lg:py-32 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
              <div
                class="inline-flex items-center px-4 py-2 bg-coral-50 border border-coral-200 rounded-full text-coral-700 text-sm font-medium mb-6"
              >
                <svg
                  class="w-4 h-4 mr-2"
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
                Nuestro Equipo
              </div>

              <h2
                class="text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 mb-6"
              >
                Expertos en
                <span
                  class="bg-gradient-to-r from-coral-500 to-caribbean-600 bg-clip-text text-transparent"
                  >Costa Caribe</span
                >
              </h2>

              <p class="text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto">
                Conoce a los profesionales que harán realidad tu sueño
                inmobiliario en el paraíso caribeño.
              </p>
            </div>

            <!-- Agents Grid -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              <div
                v-for="(agent, index) in agents.slice(0, 3)"
                :key="agent.id"
                class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:border-coral-200 transform hover:-translate-y-1"
                @click="goToAgent(agent.id)"
              >
                <!-- Agent Image -->
                <div class="relative h-80 overflow-hidden">
                  <img
                    :src="getImageUrl(agent.profile_picture_url)"
                    :alt="agent.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    crossorigin="anonymous"
                    @error="() => {}"
                    @load="() => {}"
                  />

                  <!-- Gradient Overlay -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent"
                  ></div>

                  <!-- Social Links -->
                  <div
                    class="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <a
                      v-if="agent.linkedin"
                      :href="agent.linkedin"
                      target="_blank"
                      class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                      </svg>
                    </a>
                    <a
                      v-if="agent.facebook"
                      :href="agent.facebook"
                      target="_blank"
                      class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                        />
                      </svg>
                    </a>
                  </div>

                  <!-- Agent Badge -->
                  <div class="absolute bottom-4 left-4">
                    <span
                      class="px-3 py-1 bg-white/90 backdrop-blur-sm text-coral-700 text-sm font-semibold rounded-full border border-white/50"
                    >
                      {{ agent.type }}
                    </span>
                  </div>
                </div>

                <!-- Agent Info -->
                <div class="p-6 text-center">
                  <h3
                    class="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-coral-700 transition-colors"
                  >
                    {{ agent.name }}
                  </h3>
                  <p class="text-coral-600 font-medium mb-3">
                    {{ agent.type }}
                  </p>
                  <p class="text-neutral-600 text-sm line-clamp-2 mb-4">
                    {{ agent.bio }}
                  </p>

                  <div
                    class="flex items-center justify-center space-x-4 text-sm text-neutral-500"
                  >
                    <span v-if="agent.phone" class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      Contactar
                    </span>
                    <span class="flex items-center text-nature-600 font-medium">
                      Ver perfil
                      <svg
                        class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- View All Button -->
            <div class="text-center">
              <RouterLink
                to="/agentes"
                class="inline-flex items-center bg-gradient-to-r from-coral-50 to-caribbean-50 hover:from-coral-100 hover:to-caribbean-100 text-coral-700 border-2 border-coral-200 hover:border-coral-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 group"
              >
                <svg
                  class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform"
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
                Conocer Todo el Equipo
              </RouterLink>
            </div>
          </div>
        </section>

        <!-- Testimonials Section -->
        <section
          class="py-20 lg:py-32 bg-gradient-to-br from-aqua-50 via-caribbean-50/50 to-nature-50 relative overflow-hidden"
        >
          <!-- Background Effects -->
          <div class="absolute inset-0">
            <div
              class="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-aqua-200/30 to-caribbean-200/30 rounded-full opacity-60 blur-3xl animate-float-slow"
            ></div>
            <div
              class="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-br from-nature-200/30 to-sand-200/30 rounded-full opacity-60 blur-3xl animate-float"
              style="animation-delay: 1s"
            ></div>
          </div>

          <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
              <div
                class="inline-flex items-center px-4 py-2 bg-aqua-50 border border-aqua-200 rounded-full text-aqua-700 text-sm font-medium mb-6"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                Testimonios
              </div>

              <h2
                class="text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 mb-6"
              >
                Lo que dicen nuestros
                <span
                  class="bg-gradient-to-r from-aqua-600 to-caribbean-600 bg-clip-text text-transparent"
                  >Clientes</span
                >
              </h2>

              <p class="text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto">
                Conoce las experiencias de nuestros clientes en la Costa Caribe.
              </p>
            </div>

            <!-- Testimonials Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <!-- Testimonial 1 -->
              <div
                class="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-depth hover:shadow-aqua-glow transition-all duration-500 border border-white/30 hover:border-aqua-300/50 transform hover:-translate-y-1"
              >
                <div class="mb-6">
                  <div class="flex items-center text-sand-500 mb-4">
                    <svg
                      v-for="star in 5"
                      :key="star"
                      class="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>
                  </div>
                  <blockquote class="text-neutral-700 leading-relaxed mb-6">
                    "Tierra Soñada hizo realidad nuestro sueño de tener una casa
                    frente al mar en Cartagena. El proceso fue transparente y el
                    equipo nos acompañó en cada paso."
                  </blockquote>
                </div>

                <div class="flex items-center">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-caribbean-200 to-aqua-200 rounded-full flex items-center justify-center mr-4"
                  >
                    <span class="text-caribbean-700 font-bold text-lg">MC</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-neutral-900">
                      María Carmen Rodríguez
                    </h4>
                    <p class="text-sm text-neutral-600">Cartagena, Bolívar</p>
                  </div>
                </div>

                <!-- Floating decoration -->
                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-aqua-400 to-caribbean-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-soft"
                ></div>
              </div>

              <!-- Testimonial 2 -->
              <div
                class="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-depth hover:shadow-nature-glow transition-all duration-500 border border-white/30 hover:border-nature-300/50 transform hover:-translate-y-1"
              >
                <div class="mb-6">
                  <div class="flex items-center text-sand-500 mb-4">
                    <svg
                      v-for="star in 5"
                      :key="star"
                      class="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>
                  </div>
                  <blockquote class="text-neutral-700 leading-relaxed mb-6">
                    "Excelente inversión en Barranquilla. La rentabilidad supera
                    nuestras expectativas y el proyecto está en una zona que se
                    valoriza constantemente."
                  </blockquote>
                </div>

                <div class="flex items-center">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-nature-200 to-sand-200 rounded-full flex items-center justify-center mr-4"
                  >
                    <span class="text-nature-700 font-bold text-lg">JG</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-neutral-900">
                      Jorge Gustavo Martínez
                    </h4>
                    <p class="text-sm text-neutral-600">
                      Barranquilla, Atlántico
                    </p>
                  </div>
                </div>

                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-nature-400 to-sand-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-soft"
                ></div>
              </div>

              <!-- Testimonial 3 -->
              <div
                class="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-depth hover:shadow-coral-glow transition-all duration-500 border border-white/30 hover:border-coral-300/50 transform hover:-translate-y-1"
              >
                <div class="mb-6">
                  <div class="flex items-center text-sand-500 mb-4">
                    <svg
                      v-for="star in 5"
                      :key="star"
                      class="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>
                  </div>
                  <blockquote class="text-neutral-700 leading-relaxed mb-6">
                    "El servicio postventa es excepcional. Después de 2 años,
                    siguen pendientes de nosotros. Recomendamos Tierra Soñada
                    sin dudarlo."
                  </blockquote>
                </div>

                <div class="flex items-center">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-coral-200 to-sand-200 rounded-full flex items-center justify-center mr-4"
                  >
                    <span class="text-coral-700 font-bold text-lg">AP</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-neutral-900">
                      Ana Patricia Vega
                    </h4>
                    <p class="text-sm text-neutral-600">Sincelejo, Sucre</p>
                  </div>
                </div>

                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-coral-400 to-sand-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-soft"
                ></div>
              </div>
            </div>

            <!-- Simple CTA Section -->
            <div class="mt-20 text-center">
              <p class="text-lg text-neutral-600 mb-6">
                Descubre nuestros proyectos inmobiliarios y encuentra tu hogar ideal
              </p>
              <button
                @click="router.push('/proyectos')"
                class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-caribbean-500 to-aqua-500 hover:from-caribbean-600 hover:to-aqua-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ver Todos los Proyectos
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section
          class="py-20 lg:py-32 bg-gradient-to-br from-caribbean-500 via-nature-500 to-coral-500 relative overflow-hidden"
        >
          <!-- Background Effects -->
          <div class="absolute inset-0">
            <div
              class="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"
            ></div>
            <div
              class="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"
            ></div>
            <div
              class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"
              style="animation-delay: 1s"
            ></div>
          </div>

          <div
            class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h2
              class="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6"
            >
              ¿Listo para Vivir el
              <span class="block">Sueño Caribeño?</span>
            </h2>
            <p class="text-lg lg:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Tu propiedad ideal en la costa caribe te está esperando. Nuestro
              equipo te acompañará en cada paso hacia tu nuevo hogar.
            </p>

            <div
              class="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <RouterLink
                to="/contacto"
                class="group bg-white text-caribbean-700 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-neutral-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span class="flex items-center">
                  Comenzar Mi Búsqueda
                  <svg
                    class="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    ></path>
                  </svg>
                </span>
              </RouterLink>

              <a
                href="tel:+573116598438"
                class="group border-3 border-white text-white hover:bg-white hover:text-caribbean-700 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center"
              >
                <svg
                  class="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                +57 311 659 8438
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import AppLayout from "@/components/AppLayout.vue";
import HeroStats from "@/components/Hero/HeroStats.vue";
import HeroImage from "@/components/Hero/HeroImage.vue";
import FeatureCard from "@/components/Cards/FeatureCard.vue";
import IconComponent from "@/components/UI/IconComponent.vue";
import { useProjectsStore } from "@/stores/projects";
import { useAgentsStore } from "@/stores/agents";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import type { Project, Agent } from "@/types";

const router = useRouter();
const projectsStore = useProjectsStore();
const agentsStore = useAgentsStore();

const isLoading = ref(true);
const localError = ref<string | null>(null);
const projects = ref<Project[]>([]);
const agents = ref<Agent[]>([]);

const loadData = async () => {
  try {
    isLoading.value = true;
    localError.value = null;

    // Load projects first (priority)
    try {
      await projectsStore.fetchProjects();
      projects.value = projectsStore.projects;
    } catch (error) {
      console.error("Error loading projects:", error);
      localError.value = "Error al cargar el contenido. Por favor, intenta de nuevo.";
      return;
    }

    // Load agents in background (non-blocking)
    agentsStore.fetchAgents().then(() => {
      agents.value = agentsStore.agents;
    }).catch(error => {
      console.error("Error loading agents:", error);
    });

  } catch (error) {
    console.error("Error loading homepage data:", error);
    localError.value =
      "Error al cargar el contenido. Por favor, intenta de nuevo.";
  } finally {
    isLoading.value = false;
  }
};

const retryLoading = () => {
  loadData();
};

const goToProject = (projectId: number) => {
  router.push(`/proyectos/${projectId}`);
};

const goToAgent = (agentId: number) => {
  router.push(`/agentes/${agentId}`);
};

// Featured project - always the first project from backend
const featuredProject = computed(() => {
  const firstProject = projects.value[0] || null;
  if (firstProject) {
    console.log('🏠 Featured project data:', {
      id: firstProject.id,
      name: firstProject.name,
      title: firstProject.title,
      cover_image_url: firstProject.cover_image_url,
      cover_image_responsive: firstProject.cover_image_responsive
    });
  }
  return firstProject;
});

// Handle project clicks
const handleProjectClick = (projectId: number) => {
  router.push(`/proyectos/${projectId}`);
};

// Handle feature card click (fallback)
const handleFeatureCardClick = () => {
  // Navigate to projects page or first project if available
  if (projects.value.length > 0) {
    router.push(`/proyectos/${projects.value[0].id}`);
  } else {
    router.push("/proyectos");
  }
};

// Helper function to convert absolute URLs to relative for development - same as ProjectsPage
const getImageUrl = (url: string | null | undefined): string => {
  if (!url) return "/placeholder-agent.svg";

  // Convert absolute URLs to relative
  if (url.includes("app.tierrasonada.com")) {
    const convertedUrl = url
      .replace("https://app.tierrasonada.com", "")
      .replace("http://app.tierrasonada.com", "");
    
    return convertedUrl;
  }

  return url;
};

// Get badge style for project types
const getBadgeStyle = (type: string | undefined): string => {
  if (!type) return 'bg-gray-100 text-gray-800';
  
  const typeMap: Record<string, string> = {
    'Residencial': 'bg-blue-100 text-blue-800',
    'Comercial': 'bg-green-100 text-green-800',
    'Turístico': 'bg-yellow-100 text-yellow-800',
    'Campestres': 'bg-nature-100 text-nature-800',
    'Premium': 'bg-coral-100 text-coral-800',
    'Económico': 'bg-gray-100 text-gray-800',
  };
  
  return typeMap[type] || 'bg-gray-100 text-gray-800';
};


onMounted(() => {
  loadData();
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
