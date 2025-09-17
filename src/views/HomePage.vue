<template>
  <AppLayout>
    <div class="immobilia-homepage">
      <!-- Enhanced Loading State -->
      <div v-if="loading" class="immobilia-loading-container">
        <div class="immobilia-loading-content">
          <div class="immobilia-loading-spinner"></div>
          <p class="immobilia-loading-text">Cargando proyectos...</p>
        </div>
      </div>

      <!-- Project Sections -->
      <div v-else class="relative">
      
      <!-- SECCIÓN 1: SLIDER FULLSCREEN CON TODOS LOS PROYECTOS -->
      <div class="immobilia-slider-section">
        <div 
          class="immobilia-slider-container" 
          ref="sliderContainer"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
          role="region"
          aria-label="Proyectos destacados"
          aria-live="polite"
        >
          <div 
            v-for="(project, index) in projects" 
            :key="project.id"
            class="immobilia-slide"
            :class="{ active: currentSlide === index }"
          >
            <!-- Imagen completa con lazy loading -->
            <img 
              :src="getImageUrl(project.cover_image_url)" 
              :alt="`Proyecto inmobiliario ${project.name}`"
              class="immobilia-slide-image immobilia-clickable-image"
              loading="lazy"
              :decoding="index === 0 ? 'sync' : 'async'"
              @click="openImageModal(project.cover_image_url, projects.map(p => p.cover_image_url).filter(Boolean))"
            />
            
            <!-- Content -->
            <div class="immobilia-hero-content">
              <!-- Tesla-style buttons -->
              <div class="immobilia-button-group">
                <button 
                  @click="goToProject(project.id)"
                  class="immobilia-btn immobilia-btn-universal"
                  :aria-label="`Ver detalles del proyecto ${project.name}`"
                >
                  Ver Detalles
                </button>
                <button 
                  @click="goToProjects()"
                  class="immobilia-btn immobilia-btn-universal"
                  aria-label="Ver todos los proyectos"
                >
                  Proyectos
                </button>
              </div>
            </div>
          </div>

          <!-- Slider Controls -->
          <button @click="prevSlide" class="immobilia-slider-btn immobilia-slider-prev">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button @click="nextSlide" class="immobilia-slider-btn immobilia-slider-next">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <!-- Slider Indicators -->
          <div class="immobilia-slider-indicators">
            <button 
              v-for="(project, index) in projects"
              :key="`indicator-${project.id}`"
              @click="goToSlide(index)"
              class="immobilia-slider-indicator"
              :class="{ active: currentSlide === index }"
            ></button>
          </div>

          <!-- Scroll indicator -->
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-75">
            <div class="animate-bounce">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 2: DOS PROYECTOS LADO A LADO -->
      <div class="immobilia-dual-section" v-if="projects.length >= 2">
        <div class="immobilia-dual-left">
          <div class="immobilia-dual-project">
            <!-- Imagen con object-fit para mejor control -->
            <img 
              :src="getImageUrl(projects[0]?.cover_image_url)" 
              :alt="`Proyecto inmobiliario ${projects[0]?.name}`"
              class="immobilia-dual-image immobilia-clickable-image"
              loading="lazy"
              @click="openImageModal(projects[0]?.cover_image_url, projects.map(p => p.cover_image_url).filter(Boolean))"
            />
            <!-- Botones centrados -->
            <div class="immobilia-dual-content">
              <div class="immobilia-button-group">
                <button @click="goToProject(projects[0]?.id)" class="immobilia-btn immobilia-btn-universal">
                  Ver Detalles
                </button>
                <button @click="goToProjects()" class="immobilia-btn immobilia-btn-universal">
                  Proyectos
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="immobilia-dual-right">
          <div class="immobilia-dual-project">
            <!-- Imagen con object-fit para mejor control -->
            <img 
              :src="getImageUrl(projects[1]?.cover_image_url)" 
              :alt="`Proyecto inmobiliario ${projects[1]?.name}`"
              class="immobilia-dual-image immobilia-clickable-image"
              loading="lazy"
              @click="openImageModal(projects[1]?.cover_image_url, projects.map(p => p.cover_image_url).filter(Boolean))"
            />
            <!-- Botones centrados -->
            <div class="immobilia-dual-content">
              <div class="immobilia-button-group">
                <button @click="goToProject(projects[1]?.id)" class="immobilia-btn immobilia-btn-universal">
                  Ver Detalles
                </button>
                <button @click="goToProjects()" class="immobilia-btn immobilia-btn-universal">
                  Proyectos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 3: BLOG PUBLICITARIO -->
      <section class="immobilia-blog-section">
        <div class="immobilia-blog-container">
          <!-- Header optimizado -->
          <header class="immobilia-blog-header">
            <h2 class="immobilia-blog-title">Descubre Tu Nuevo Estilo de Vida</h2>
            <p class="immobilia-blog-subtitle">Conoce las últimas novedades y beneficios de vivir en Tierra Soñada</p>
          </header>

          <!-- Content grid responsive -->
          <div class="immobilia-blog-content">
            <!-- Artículo destacado -->
            <article class="immobilia-blog-featured">
              <div class="immobilia-blog-image">
                <img 
                  src="/placeholder-blog.svg" 
                  alt="Vida campestre en lotes Tierra Soñada" 
                  class="immobilia-blog-main-img"
                  loading="lazy"
                />
                <div class="immobilia-blog-overlay">
                  <span class="immobilia-blog-badge">Destacado</span>
                </div>
              </div>
              <div class="immobilia-blog-text">
                <h3 class="immobilia-blog-post-title">
                  5 Razones para Invertir en Lotes Campestres en 2024
                </h3>
                <p class="immobilia-blog-excerpt">
                  Descubre por qué los lotes campestres se han convertido en la mejor inversión inmobiliaria. 
                  Desde la revalorización hasta la calidad de vida, te contamos todo lo que necesitas saber.
                </p>
                <div class="immobilia-blog-meta">
                  <span class="immobilia-blog-date">📅 15 Dic 2024</span>
                  <span class="immobilia-blog-read-time">⏱️ 5 min lectura</span>
                </div>
                <button class="immobilia-blog-btn" aria-label="Leer artículo sobre inversión en lotes campestres">
                  Leer Artículo
                </button>
              </div>
            </article>

            <!-- Grid de tarjetas -->
            <div class="immobilia-blog-grid">
              <article class="immobilia-blog-card">
                <div class="immobilia-blog-card-image">
                  <img 
                    src="/placeholder-blog-2.svg" 
                    alt="Planes de financiación flexibles"
                    loading="lazy"
                  />
                </div>
                <div class="immobilia-blog-card-content">
                  <h4>Financiación Flexible</h4>
                  <p>Planes de pago que se adaptan a tu presupuesto</p>
                  <button class="immobilia-blog-card-link" aria-label="Conocer más sobre financiación">
                    Conoce más →
                  </button>
                </div>
              </article>

              <article class="immobilia-blog-card">
                <div class="immobilia-blog-card-image">
                  <img 
                    src="/placeholder-blog-3.svg" 
                    alt="Servicios públicos incluidos"
                    loading="lazy"
                  />
                </div>
                <div class="immobilia-blog-card-content">
                  <h4>Servicios Incluidos</h4>
                  <p>Energía, agua y conectividad garantizados</p>
                  <button class="immobilia-blog-card-link" aria-label="Ver servicios incluidos">
                    Ver servicios →
                  </button>
                </div>
              </article>

              <article class="immobilia-blog-card">
                <div class="immobilia-blog-card-image">
                  <img 
                    src="/placeholder-blog-4.svg" 
                    alt="Ubicación privilegiada cerca de la ciudad"
                    loading="lazy"
                  />
                </div>
                <div class="immobilia-blog-card-content">
                  <h4>Ubicación Privilegiada</h4>
                  <p>A solo 45 minutos del centro de la ciudad</p>
                  <button class="immobilia-blog-card-link" aria-label="Ver ubicación en el mapa">
                    Ver ubicación →
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- SECCIÓN 4: EXPERIENCIA CAMPESTRE -->
      <div class="immobilia-nature-section">
        <!-- Interactive nature scene as background -->
        <div class="immobilia-landscape">
          <!-- Sky gradient -->
          <div class="immobilia-sky"></div>
          
          <!-- Mountains with realistic layers -->
          <div class="immobilia-mountains">
            <div class="immobilia-mountain immobilia-mountain-far" :style="{ '--index': 1 }"></div>
            <div class="immobilia-mountain immobilia-mountain-mid" :style="{ '--index': 2 }"></div>
            <div class="immobilia-mountain immobilia-mountain-near" :style="{ '--index': 3 }"></div>
          </div>
          
          <!-- Realistic forest layers -->
          <div class="immobilia-forest">
            <div class="immobilia-tree immobilia-pine-tree" v-for="n in 3" :key="`pine-${n}`" :style="{ '--index': n }"></div>
            <div class="immobilia-tree immobilia-oak-tree" v-for="n in 2" :key="`oak-${n}`" :style="{ '--index': n + 3 }"></div>
          </div>
          
          <!-- Grass field -->
          <div class="immobilia-grass-field">
            <div class="immobilia-grass-blade" v-for="n in 20" :key="`grass-${n}`" :style="{ '--index': n }"></div>
          </div>
          
          <!-- Realistic sun with rays -->
          <div class="immobilia-sun">
            <div class="immobilia-sun-rays"></div>
          </div>
          
          <!-- Realistic clouds -->
          <div class="immobilia-clouds">
            <div class="immobilia-cloud immobilia-cloud-fluffy" :style="{ '--index': 1 }">
              <div class="immobilia-cloud-part"></div>
              <div class="immobilia-cloud-part"></div>
              <div class="immobilia-cloud-part"></div>
            </div>
            <div class="immobilia-cloud immobilia-cloud-wispy" :style="{ '--index': 2 }"></div>
            <div class="immobilia-cloud immobilia-cloud-small" :style="{ '--index': 3 }"></div>
          </div>
          
          <!-- Flying birds -->
          <div class="immobilia-birds">
            <div class="immobilia-bird" v-for="n in 3" :key="`bird-${n}`" :style="{ '--delay': n * 2 + 's' }">
              <div class="immobilia-bird-wing immobilia-bird-wing-left"></div>
              <div class="immobilia-bird-body"></div>
              <div class="immobilia-bird-wing immobilia-bird-wing-right"></div>
            </div>
          </div>
          
          <!-- Floating leaves -->
          <div class="immobilia-leaves">
            <div class="immobilia-leaf immobilia-leaf-maple" v-for="n in 5" :key="`leaf-${n}`" :style="{ '--delay': n * 1.5 + 's', '--duration': (n + 4) + 's' }"></div>
          </div>
        </div>

        <!-- Content overlay -->
        <div class="immobilia-nature-content">
          <div class="immobilia-nature-text">
            <h2 class="immobilia-nature-title">
              Vive en Armonía con la
              <span class="immobilia-nature-highlight">Naturaleza</span>
            </h2>
            <p class="immobilia-nature-desc">
              Lotes campestres diseñados para quienes buscan tranquilidad, aire puro y conexión con la naturaleza. 
              Tu escape perfecto del estrés urbano te espera.
            </p>
            
            <!-- Nature benefits -->
            <div class="immobilia-nature-benefits">
              <div class="immobilia-benefit-item">
                <div class="immobilia-benefit-icon">🌳</div>
                <h4>Entorno Natural</h4>
                <p>Rodeado de árboles nativos y vegetación exuberante</p>
              </div>
              <div class="immobilia-benefit-item">
                <div class="immobilia-benefit-icon">🦋</div>
                <h4>Vida Silvestre</h4>
                <p>Observa aves y mariposas en su hábitat natural</p>
              </div>
              <div class="immobilia-benefit-item">
                <div class="immobilia-benefit-icon">💧</div>
                <h4>Aire Puro</h4>
                <p>Respira aire limpio lejos de la contaminación</p>
              </div>
              <div class="immobilia-benefit-item">
                <div class="immobilia-benefit-icon">🌅</div>
                <h4>Amaneceres Únicos</h4>
                <p>Despierta con los sonidos y colores del campo</p>
              </div>
            </div>

            <!-- Nature stats -->
            <div class="immobilia-nature-stats">
              <div class="immobilia-stat-item" v-for="(stat, index) in campestresStats" :key="index">
                <div class="immobilia-stat-number" :data-target="stat.value">{{ animatedStats[index] }}</div>
                <div class="immobilia-stat-label">{{ stat.label }}</div>
              </div>
            </div>

            <div class="immobilia-nature-actions">
              <button @click="startVirtualTour" class="immobilia-btn immobilia-btn-primary immobilia-btn-xl">
                Recorrido Virtual
              </button>
            </div>
          </div>
        </div>
      </div>



      <!-- Tesla-style navigation header -->
      <nav class="immobilia-header">
        <div class="immobilia-header-content">
          <div class="immobilia-header-inner">
            <!-- Logo -->
            <RouterLink to="/" class="immobilia-logo">
              <img src="/ts/logo.png" alt="Tierra Soñada" class="immobilia-logo-img" />
            </RouterLink>
            
            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-8">
              <RouterLink 
                to="/proyectos" 
                class="immobilia-nav-link"
              >
                Proyectos
              </RouterLink>
              <RouterLink 
                to="/agentes" 
                class="immobilia-nav-link"
              >
                Agentes
              </RouterLink>
              <RouterLink 
                to="/contacto" 
                class="immobilia-nav-link"
              >
                Contacto
              </RouterLink>
              <RouterLink 
                to="/blog" 
                class="immobilia-nav-link"
              >
                Blog
              </RouterLink>
              
              <!-- Social Media Icons -->
              <div class="flex items-center space-x-3 ml-8">
                <a href="https://co.linkedin.com/company/tierrasonadactg" target="_blank" rel="noopener noreferrer" class="immobilia-header-social">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/TierraSonadaInmobiliaria.ctg" target="_blank" rel="noopener noreferrer" class="immobilia-header-social">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@tierrasonadactg_" target="_blank" rel="noopener noreferrer" class="immobilia-header-social">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/tierrasonadactg" target="_blank" rel="noopener noreferrer" class="immobilia-header-social">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Mobile menu button -->
            <button 
              @click="toggleMobileMenu"
              class="md:hidden p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Mobile Navigation -->
          <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200">
            <div class="px-2 pt-2 pb-3 space-y-1">
              <RouterLink 
                to="/proyectos" 
                class="immobilia-mobile-nav-link"
                @click="closeMobileMenu"
              >
                Proyectos
              </RouterLink>
              <RouterLink 
                to="/agentes" 
                class="immobilia-mobile-nav-link"
                @click="closeMobileMenu"
              >
                Agentes
              </RouterLink>
              <RouterLink 
                to="/contacto" 
                class="immobilia-mobile-nav-link"
                @click="closeMobileMenu"
              >
                Contacto
              </RouterLink>
              <RouterLink 
                to="/blog" 
                class="immobilia-mobile-nav-link"
                @click="closeMobileMenu"
              >
                Blog
              </RouterLink>
            </div>
          </div>
        </div>
      </nav>

      <!-- Navigation Dots (Tesla style) -->
      <div class="immobilia-nav-dots">
        <button 
          v-for="(project, index) in projects" 
          :key="`dot-${project.id}`"
          @click="scrollToSection(index)"
          class="immobilia-nav-dot"
          :class="{ 'bg-white': currentSection === index, 'bg-transparent': currentSection !== index }"
        ></button>
      </div>

    </div>

    <!-- Error State -->
      <div v-if="error" class="flex items-center justify-center min-h-screen bg-white text-gray-900">
        <div class="text-center">
          <div class="text-xl mb-4">Error al cargar proyectos</div>
          <button @click="fetchProjects" class="immobilia-btn immobilia-btn-primary">
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de galería de imágenes -->
    <Teleport to="body">
      <div 
        v-if="isModalOpen" 
        class="immobilia-image-modal"
        @click="closeModal"
        @touchstart="handleModalTouchStart"
        @touchend="handleModalTouchEnd"
        role="dialog"
        aria-modal="true"
        aria-label="Galería de imágenes"
      >
        <div class="immobilia-modal-content" @click.stop>
          <!-- Imagen principal -->
          <img 
            :src="modalImages[currentModalImage]" 
            :alt="`Imagen ${currentModalImage + 1} de ${modalImages.length}`"
            class="immobilia-modal-image"
          />
          
          <!-- Botones de navegación -->
          <button 
            @click="prevModalImage" 
            class="immobilia-modal-nav immobilia-modal-prev"
            aria-label="Imagen anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          
          <button 
            @click="nextModalImage" 
            class="immobilia-modal-nav immobilia-modal-next"
            aria-label="Imagen siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          
          <!-- Botón cerrar -->
          <button 
            @click="closeModal" 
            class="immobilia-modal-close"
            aria-label="Cerrar galería"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          
          <!-- Contador -->
          <div class="immobilia-modal-counter">
            {{ currentModalImage + 1 }} / {{ modalImages.length }}
          </div>
        </div>
      </div>
    </Teleport>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import { useProjectsStore } from '@/stores/projects'

const router = useRouter()
const projectsStore = useProjectsStore()

// Reactive data
const currentSection = ref(0)
const mobileMenuOpen = ref(false)
const currentSlide = ref(0)
const sliderContainer = ref(null)
const animatedStats = ref([0, 0, 0, 0])
const imageButtonClasses = ref<{[key: number]: string}>({})

// Modal gallery state
const isModalOpen = ref(false)
const currentModalImage = ref(0)
const modalImages = ref<string[]>([])

// Campestre section data
const campestresStats = ref([
  { value: 500, label: 'Hectáreas Protegidas' },
  { value: 85, label: '% Área Verde' },
  { value: 15, label: 'Especies de Aves' },
  { value: 1200, label: 'Árboles Nativos' }
])

// Computed properties
const projects = computed(() => projectsStore.projects)
const loading = computed(() => projectsStore.loading)
const error = computed(() => projectsStore.error)

// Methods
const fetchProjects = async () => {
  await projectsStore.fetchProjects()
}

const goToProject = (projectId: number) => {
  router.push(`/proyectos/${projectId}`)
}

const goToProjects = () => {
  router.push('/proyectos')
}

// Helper function to convert absolute URLs to relative for development
const getImageUrl = (url: string): string => {
  if (!url) return '/placeholder-project.svg'
  
  // In development, convert absolute URLs to relative
  if (import.meta.env.DEV && url.includes('app.tierrasonada.com')) {
    return url.replace('https://app.tierrasonada.com', '').replace('http://app.tierrasonada.com', '')
  }
  
  return url
}

const scrollToSection = (index: number) => {
  const sectionSelectors = [
    '.immobilia-slider-section',    // Sección 1: Slider
    '.immobilia-dual-section',      // Sección 2: Dos proyectos
    '.immobilia-blog-section',      // Sección 3: Blog
    '.immobilia-nature-section',    // Sección 4: Naturaleza
  ]
  
  const section = document.querySelector(sectionSelectors[index])
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    currentSection.value = index
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Slider functions
const nextSlide = () => {
  if (currentSlide.value < projects.value.length - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = projects.value.length - 1
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// Touch gesture support for mobile
let touchStartX = 0
let touchEndX = 0
let modalTouchStartX = 0
let modalTouchEndX = 0

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipeGesture()
}

const handleModalTouchStart = (e: TouchEvent) => {
  modalTouchStartX = e.changedTouches[0].screenX
}

const handleModalTouchEnd = (e: TouchEvent) => {
  modalTouchEndX = e.changedTouches[0].screenX
  handleModalSwipeGesture()
}

const handleModalSwipeGesture = () => {
  const swipeThreshold = 50
  const swipeDistance = modalTouchStartX - modalTouchEndX
  
  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      // Swipe left - next image
      nextModalImage()
    } else {
      // Swipe right - previous image
      prevModalImage()
    }
  }
}

const handleSwipeGesture = () => {
  const swipeThreshold = 50 // minimum distance for swipe
  const swipeDistance = touchStartX - touchEndX
  
  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      // Swipe left - next slide
      nextSlide()
    } else {
      // Swipe right - previous slide
      prevSlide()
    }
  }
}

// Modal gallery functions
const getFullImageUrl = (url: string): string => {
  if (!url) return '/placeholder-project.svg'
  
  // For modal, always return the full URL without modifications
  if (import.meta.env.DEV && url.includes('app.tierrasonada.com')) {
    return url.replace('https://app.tierrasonada.com', '').replace('http://app.tierrasonada.com', '')
  }
  
  return url
}

const openImageModal = (imageUrl: string, allImages: string[]) => {
  modalImages.value = allImages.map(img => getFullImageUrl(img))
  currentModalImage.value = modalImages.value.findIndex(img => img === getFullImageUrl(imageUrl))
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = 'unset'
}

const nextModalImage = () => {
  if (currentModalImage.value < modalImages.value.length - 1) {
    currentModalImage.value++
  } else {
    currentModalImage.value = 0
  }
}

const prevModalImage = () => {
  if (currentModalImage.value > 0) {
    currentModalImage.value--
  } else {
    currentModalImage.value = modalImages.value.length - 1
  }
}

// Keyboard navigation support
const handleKeydown = (event: KeyboardEvent) => {
  if (isModalOpen.value) {
    // Modal navigation
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        prevModalImage()
        break
      case 'ArrowRight':
        event.preventDefault()
        nextModalImage()
        break
      case 'Escape':
        event.preventDefault()
        closeModal()
        break
    }
  } else {
    // Slider navigation
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        prevSlide()
        break
      case 'ArrowRight':
        event.preventDefault()
        nextSlide()
        break
      case 'Home':
        event.preventDefault()
        goToSlide(0)
        break
      case 'End':
        event.preventDefault()
        goToSlide(projects.value.length - 1)
        break
    }
  }
}

// Immersive section functions
const startVirtualTour = () => {
  // Implementar tour virtual
  alert('¡Tour Virtual próximamente!')
}

const animateStats = () => {
  campestresStats.value.forEach((stat, index) => {
    let current = 0
    const increment = stat.value / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= stat.value) {
        current = stat.value
        clearInterval(timer)
      }
      animatedStats.value[index] = Math.floor(current)
    }, 20)
  })
}

// Function to analyze image brightness
const analyzeImageBrightness = (imageUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        resolve(false) // Default to dark if can't analyze
        return
      }
      
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        let brightness = 0
        
        // Sample every 10th pixel for performance
        for (let i = 0; i < data.length; i += 40) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          // Calculate perceived brightness using weighted formula
          brightness += (r * 0.299 + g * 0.587 + b * 0.114)
        }
        
        brightness = brightness / (data.length / 40)
        
        // If brightness > 128, it's a light image
        resolve(brightness > 128)
      } catch (e) {
        // If CORS error or other issue, default to dark
        resolve(false)
      }
    }
    
    img.onerror = () => {
      resolve(false) // Default to dark if image fails to load
    }
    
    img.src = imageUrl
  })
}

// Function to get button class based on image brightness
const getButtonClass = (projectId: number): string => {
  return imageButtonClasses.value[projectId] || 'immobilia-btn-dark'
}

// Function to analyze all project images
const analyzeProjectImages = async () => {
  for (const project of projects.value) {
    if (project.cover_image_url) {
      try {
        const isLightImage = await analyzeImageBrightness(getImageUrl(project.cover_image_url))
        imageButtonClasses.value[project.id] = isLightImage ? 'immobilia-btn-light' : 'immobilia-btn-dark'
      } catch (e) {
        // Default to dark button if analysis fails
        imageButtonClasses.value[project.id] = 'immobilia-btn-dark'
      }
    } else {
      // Default for placeholder images
      imageButtonClasses.value[project.id] = 'immobilia-btn-dark'
    }
  }
}

// Auto-slider
let sliderInterval: NodeJS.Timeout | null = null

const startAutoSlider = () => {
  sliderInterval = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

const stopAutoSlider = () => {
  if (sliderInterval) {
    clearInterval(sliderInterval)
    sliderInterval = null
  }
}

// Scroll tracking
const handleScroll = () => {
  const sections = document.querySelectorAll('.hero-section')
  const scrollPosition = window.scrollY + window.innerHeight / 2

  sections.forEach((section, index) => {
    const element = section as HTMLElement
    const top = element.offsetTop
    const bottom = top + element.offsetHeight

    if (scrollPosition >= top && scrollPosition <= bottom) {
      currentSection.value = index
    }
  })
}

// Lifecycle
onMounted(async () => {
  await fetchProjects()
  
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
  startAutoSlider()
  
  // Animate stats when page loads
  setTimeout(() => {
    animateStats()
  }, 1000)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  stopAutoSlider()
  if (isModalOpen.value) {
    closeModal()
  }
})
</script>

<style scoped>
.immobilia-homepage {
  font-family: 'Gotham', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
}

.hero-section {
  scroll-snap-align: start;
  display: block;
  margin-bottom: 40px;
}

.hero-section:last-child {
  margin-bottom: 0;
}

/* Full width hero section (first project) */
.hero-section-full {
  width: 100%;
}

/* Project row container */
.project-row {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.project-row:last-child {
  margin-bottom: 0;
}

/* Half width hero sections */
.hero-section-half {
  width: calc(50% - 20px);
  margin-bottom: 0;
}

.hero-section-left {
  /* Additional styles for left column if needed */
}

.hero-section-right {
  /* Additional styles for right column if needed */
}

/* SECCIÓN 1: SLIDER STYLES - Mobile First */
.immobilia-slider-section {
  position: relative;
  height: 100vh;
  min-height: 450px;
  overflow: hidden;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .immobilia-slider-section {
    min-height: 600px;
    margin-bottom: 1.25rem;
  }
}

.immobilia-slider-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.immobilia-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: #f8f9fa;
}

.immobilia-slide-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 1rem;
}

@media (min-width: 768px) {
  .immobilia-slide-image {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-slide-image {
    padding: 2rem;
  }
}

.immobilia-slide:first-child {
  opacity: 1;
  transform: translateX(0);
}

.immobilia-slide.active {
  opacity: 1;
  transform: translateX(0);
  z-index: 2;
}

.immobilia-slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 15;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.immobilia-slider-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-50%) scale(1.1);
}

.immobilia-slider-prev {
  left: 40px;
}

.immobilia-slider-next {
  right: 100px;
}

.immobilia-slider-indicators {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
  z-index: 15;
}

.immobilia-slider-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.immobilia-slider-indicator.active {
  background: rgba(255, 255, 255, 1);
  border-color: rgba(255, 255, 255, 1);
}

.immobilia-slider-indicator:hover {
  border-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

/* SECCIÓN 2: DUAL PROJECT STYLES */
/* SECCIÓN 2: DUAL PROJECT STYLES - Mobile First */
.immobilia-dual-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 1rem 2rem 1rem;
  background-color: #ffffff;
}

@media (min-width: 640px) {
  .immobilia-dual-section {
    gap: 1.5rem;
  }
}

@media (min-width: 768px) {
  .immobilia-dual-section {
    flex-direction: row;
    height: 70vh;
    min-height: 500px;
    gap: 1rem;
    margin: 0 1rem 2rem 1rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-dual-section {
    margin: 0 1.5rem 3rem 1.5rem;
    gap: 1.5rem;
    height: 80vh;
    min-height: 600px;
  }
}

.immobilia-dual-left,
.immobilia-dual-right {
  flex: 1;
  position: relative;
  min-height: 40vh;
}

@media (min-width: 480px) {
  .immobilia-dual-left,
  .immobilia-dual-right {
    min-height: 45vh;
  }
}

@media (min-width: 640px) {
  .immobilia-dual-left,
  .immobilia-dual-right {
    min-height: 50vh;
  }
}

@media (min-width: 768px) {
  .immobilia-dual-left,
  .immobilia-dual-right {
    min-height: auto;
  }
}

.immobilia-dual-project {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: #f8f9fa;
  transition: transform 0.3s ease;
}

@media (min-width: 768px) {
  .immobilia-dual-project {
    border-radius: 0;
    transition: transform 0.5s ease;
  }
}

.immobilia-dual-project:hover {
  transform: scale(1.02);
}

/* Imagen responsive con object-fit */
.immobilia-dual-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 1rem;
}

@media (min-width: 768px) {
  .immobilia-dual-image {
    object-fit: cover;
    padding: 0;
  }
}

@media (min-width: 1024px) {
  .immobilia-dual-image {
    object-fit: contain;
    padding: 1.5rem;
  }
}

.immobilia-dual-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  max-width: 90%;
  padding: 1rem;
}

.immobilia-dual-title {
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 16px;
  line-height: 1.2;
}

.immobilia-dual-subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 32px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* SECCIÓN 3: BLOG PUBLICITARIO STYLES - Mobile First */
.immobilia-blog-section {
  background-color: #ffffff;
  padding: 2rem 0;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .immobilia-blog-section {
    padding: 3rem 0;
    margin-bottom: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-blog-section {
    padding: 4rem 0;
    margin-bottom: 2rem;
    min-height: 50vh;
  }
}

.immobilia-blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .immobilia-blog-container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-blog-container {
    padding: 0 2rem;
  }
}

.immobilia-blog-header {
  text-align: center;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .immobilia-blog-header {
    margin-bottom: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-blog-header {
    margin-bottom: 3rem;
  }
}

.immobilia-blog-title {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .immobilia-blog-title {
    font-size: 2.25rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-blog-title {
    font-size: 2.5rem;
  }
}

.immobilia-blog-subtitle {
  font-size: 1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

@media (min-width: 768px) {
  .immobilia-blog-subtitle {
    font-size: 1.125rem;
  }
}

.immobilia-blog-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
}

@media (min-width: 768px) {
  .immobilia-blog-content {
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-blog-content {
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
}

.immobilia-blog-featured {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease;
}

@media (min-width: 768px) {
  .immobilia-blog-featured {
    flex-direction: row;
    border-radius: 1rem;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  }
}

@media (min-width: 1024px) {
  .immobilia-blog-featured {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
}

.immobilia-blog-featured:hover {
  transform: translateY(-5px);
}

.immobilia-blog-image {
  position: relative;
  flex: 1;
  min-height: 280px;
}

.immobilia-blog-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.immobilia-blog-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
}

.immobilia-blog-badge {
  background: linear-gradient(45deg, #25D366, #20B858);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.immobilia-blog-text {
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.immobilia-blog-post-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  line-height: 1.3;
}

.immobilia-blog-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.immobilia-blog-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #888;
}

.immobilia-blog-btn {
  background: linear-gradient(45deg, #25D366, #20B858);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.immobilia-blog-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
}

.immobilia-blog-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.immobilia-blog-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.immobilia-blog-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.immobilia-blog-card-image {
  height: 120px;
  overflow: hidden;
}

.immobilia-blog-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.immobilia-blog-card:hover .immobilia-blog-card-image img {
  transform: scale(1.05);
}

.immobilia-blog-card-content {
  padding: 20px;
}

.immobilia-blog-card-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.immobilia-blog-card-content p {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 12px;
}

.immobilia-blog-card-link {
  color: #25D366;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 768px) {
  .immobilia-blog-section {
    padding: 30px 0;
  }
  
  .immobilia-blog-title {
    font-size: 28px;
  }
  
  .immobilia-blog-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .immobilia-blog-featured {
    flex-direction: column;
  }
  
  .immobilia-blog-image {
    min-height: 200px;
  }
  
  .immobilia-blog-text {
    padding: 24px;
  }
  
  .immobilia-blog-post-title {
    font-size: 20px;
  }
  
  .immobilia-blog-grid {
    grid-template-columns: 1fr;
  }
}

/* SECCIÓN 4: EXPERIENCIA CAMPESTRE STYLES */
.immobilia-nature-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #2d5016 100%);
  margin-bottom: 20px;
}

.immobilia-grass-animate {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(0deg, #2d5016 0%, rgba(77, 124, 89, 0.3) 100%);
  animation: grassWave 8s ease-in-out infinite;
}

@keyframes grassWave {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.1); }
}

.immobilia-floating-nature {
  position: absolute;
  width: 100%;
  height: 100%;
}

.immobilia-float-item {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
  animation-delay: var(--delay);
}

.immobilia-float-item:nth-child(1) { top: 20%; left: 10%; }
.immobilia-float-item:nth-child(2) { top: 40%; left: 80%; }
.immobilia-float-item:nth-child(3) { top: 60%; left: 20%; }
.immobilia-float-item:nth-child(4) { top: 80%; left: 70%; }
.immobilia-float-item:nth-child(5) { top: 30%; left: 50%; }
.immobilia-float-item:nth-child(6) { top: 70%; left: 90%; }

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.1; }
  50% { transform: translateY(-20px) scale(1.5); opacity: 0.3; }
}

.immobilia-nature-content {
  position: relative;
  z-index: 10;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 32px;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
}

.immobilia-nature-text {
  flex: 1;
  max-width: 500px;
  color: white;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.3);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.immobilia-nature-title {
  font-size: 36px;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 16px;
}

.immobilia-nature-highlight {
  background: linear-gradient(45deg, #00d4ff, #ff6b9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 500;
}

.immobilia-nature-desc {
  font-size: 16px;
  line-height: 1.4;
  opacity: 0.8;
  margin-bottom: 20px;
  max-width: 400px;
}

.immobilia-nature-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.immobilia-stat-item {
  text-align: center;
}

.immobilia-stat-number {
  font-size: 28px;
  font-weight: 300;
  color: #25D366;
  line-height: 1;
  margin-bottom: 4px;
}

.immobilia-stat-label {
  font-size: 12px;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.immobilia-nature-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.immobilia-btn-xl {
  padding: 10px 16px;
  font-size: 12px;
  width: 100%;
  text-align: center;
}

/* 3D Building Model */
.immobilia-3d-preview {
  flex: 1;
  height: 500px;
  position: relative;
  perspective: 1000px;
}

.immobilia-building-model {
  position: relative;
  width: 200px;
  height: 300px;
  margin: 0 auto;
  transform-style: preserve-3d;
  animation: rotateBuilding 15s linear infinite;
}

@keyframes rotateBuilding {
  from { transform: rotateY(0deg) rotateX(10deg); }
  to { transform: rotateY(360deg) rotateX(10deg); }
}

.immobilia-building-layer {
  position: absolute;
  width: 100%;
  height: 30px;
  background: linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 157, 0.1));
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: translateZ(calc(var(--index) * -20px)) translateY(calc(var(--index) * -35px));
  animation: layerGlow 3s ease-in-out infinite alternate;
  animation-delay: calc(var(--index) * 0.2s);
}

@keyframes layerGlow {
  from { box-shadow: 0 0 10px rgba(0, 212, 255, 0.2); }
  to { box-shadow: 0 0 30px rgba(255, 107, 157, 0.4); }
}

/* NUEVOS ESTILOS CAMPESTRES */

/* Hojas flotantes */
.immobilia-leaf-item {
  position: absolute;
  width: 12px;
  height: 8px;
  background: radial-gradient(ellipse at center, #4a7c59 0%, #2d5016 100%);
  border-radius: 0 100% 0 100%;
  transform: rotate(45deg);
  animation: leafFloat var(--duration, 6s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  opacity: 0.7;
}

.immobilia-leaf-item:nth-child(1) { top: 20%; left: 15%; }
.immobilia-leaf-item:nth-child(2) { top: 40%; left: 85%; }
.immobilia-leaf-item:nth-child(3) { top: 60%; left: 25%; }
.immobilia-leaf-item:nth-child(4) { top: 80%; left: 75%; }
.immobilia-leaf-item:nth-child(5) { top: 30%; left: 55%; }
.immobilia-leaf-item:nth-child(6) { top: 70%; left: 95%; }
.immobilia-leaf-item:nth-child(7) { top: 50%; left: 35%; }
.immobilia-leaf-item:nth-child(8) { top: 90%; left: 65%; }

@keyframes leafFloat {
  0%, 100% { transform: translateY(0px) rotate(45deg); opacity: 0.7; }
  50% { transform: translateY(-30px) rotate(90deg); opacity: 0.3; }
}

/* Pájaros */
.immobilia-bird-item {
  position: absolute;
  width: 20px;
  height: 8px;
  animation: birdFly 12s linear infinite;
  animation-delay: var(--delay, 0s);
  opacity: 0.6;
}

.immobilia-bird-item:before {
  content: '🕊️';
  font-size: 16px;
}

.immobilia-bird-item:nth-child(9) { top: 25%; }
.immobilia-bird-item:nth-child(10) { top: 45%; }
.immobilia-bird-item:nth-child(11) { top: 65%; }

@keyframes birdFly {
  0% { left: -50px; transform: translateY(0px); }
  25% { transform: translateY(-20px); }
  50% { transform: translateY(10px); }
  75% { transform: translateY(-15px); }
  100% { left: calc(100% + 50px); transform: translateY(0px); }
}

/* Partículas de naturaleza */
.immobilia-nature-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.immobilia-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 223, 186, 0.6);
  border-radius: 50%;
  animation: particleFloat 5s ease-in-out infinite;
  animation-delay: calc(var(--index) * 0.3s);
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(100vh) scale(0.5); opacity: 0; }
  50% { transform: translateY(-20px) scale(1); opacity: 1; }
}

/* Beneficios de naturaleza */
.immobilia-nature-benefits {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 16px 0;
}

.immobilia-benefit-item {
  text-align: center;
  padding: 14px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.immobilia-benefit-item:hover {
  transform: translateY(-3px);
}

.immobilia-benefit-icon {
  font-size: 20px;
  margin-bottom: 6px;
}

.immobilia-benefit-item h4 {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
}

.immobilia-benefit-item p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  line-height: 1.3;
}

/* Escena de naturaleza - ahora sin contenedor separado */
.immobilia-nature-scene {
  display: none; /* Ya no necesaria */
}

.immobilia-landscape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, 
    #87CEEB 0%,     /* Cielo azul claro */
    #98D8E8 30%,    /* Azul medio */
    #F0E68C 70%,    /* Amarillo horizonte */
    #90EE90 85%,    /* Verde claro */
    #228B22 100%    /* Verde pasto */
  );
  z-index: 1;
}

/* Cielo realista */
.immobilia-sky {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(180deg, 
    #4A90E2 0%,
    #87CEEB 40%,
    #F0E68C 80%,
    rgba(240, 230, 140, 0.5) 100%
  );
  z-index: 1;
}

/* Montañas realistas con capas */
.immobilia-mountains {
  position: absolute;
  bottom: 25%;
  width: 100%;
  height: 45%;
  z-index: 2;
}

.immobilia-mountain {
  position: absolute;
  bottom: 0;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  animation: subtleMountainShift 8s ease-in-out infinite alternate;
}

.immobilia-mountain-far {
  width: 200px;
  height: 120px;
  left: 10%;
  background: linear-gradient(45deg, #4A6741 0%, #5A7A51 100%);
  opacity: 0.6;
  z-index: 1;
}

.immobilia-mountain-mid {
  width: 180px;
  height: 140px;
  left: 40%;
  background: linear-gradient(45deg, #2D4A2B 0%, #4A6741 100%);
  opacity: 0.8;
  z-index: 2;
}

.immobilia-mountain-near {
  width: 160px;
  height: 100px;
  left: 70%;
  background: linear-gradient(45deg, #1B3B1A 0%, #2D4A2B 100%);
  z-index: 3;
}

@keyframes subtleMountainShift {
  0%, 100% { 
    filter: brightness(0.9) contrast(1.1); 
    transform: translateY(0px);
  }
  50% { 
    filter: brightness(1) contrast(1); 
    transform: translateY(-2px);
  }
}

/* Bosque realista */
.immobilia-forest {
  position: absolute;
  bottom: 8%;
  width: 100%;
  height: 35%;
  z-index: 4;
}

.immobilia-tree {
  position: absolute;
  bottom: 0;
  animation: gentleTreeSway 4s ease-in-out infinite;
  animation-delay: calc(var(--index) * 0.6s);
}

/* Pinos realistas */
.immobilia-pine-tree {
  width: 25px;
  height: 80px;
  background: linear-gradient(0deg, #8B4513 0%, #8B4513 25%, #228B22 25%, #006400 100%);
  clip-path: polygon(50% 0%, 20% 25%, 80% 25%, 30% 50%, 70% 50%, 40% 75%, 60% 75%, 45% 100%, 55% 100%);
}

.immobilia-pine-tree:nth-child(1) { left: 15%; height: 70px; }
.immobilia-pine-tree:nth-child(2) { left: 35%; height: 85px; }
.immobilia-pine-tree:nth-child(3) { left: 55%; height: 75px; }

/* Robles realistas */
.immobilia-oak-tree {
  width: 35px;
  height: 70px;
  background: linear-gradient(0deg, #8B4513 0%, #8B4513 40%, #32CD32 40%, #228B22 100%);
  border-radius: 50% 50% 0 0;
}

.immobilia-oak-tree:before {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 35px;
  background: #654321;
  border-radius: 2px;
}

.immobilia-oak-tree:nth-child(4) { left: 75%; height: 65px; }
.immobilia-oak-tree:nth-child(5) { left: 85%; height: 60px; }

@keyframes gentleTreeSway {
  0%, 100% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(1deg) scale(1.02); }
  75% { transform: rotate(-1deg) scale(0.98); }
}

/* Sol realista con rayos */
.immobilia-sun {
  position: absolute;
  top: 15%;
  right: 15%;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, 
    #FFD700 0%, 
    #FFA500 50%, 
    #FF8C00 100%
  );
  border-radius: 50%;
  box-shadow: 
    0 0 20px rgba(255, 215, 0, 0.8),
    0 0 40px rgba(255, 215, 0, 0.6),
    0 0 60px rgba(255, 215, 0, 0.4);
  z-index: 3;
  animation: sunGlow 6s ease-in-out infinite;
}

.immobilia-sun-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  transform: translate(-50%, -50%);
  animation: sunRaysRotate 20s linear infinite;
}

.immobilia-sun-rays:before,
.immobilia-sun-rays:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 120px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 215, 0, 0.3) 20%,
    transparent 40%,
    rgba(255, 215, 0, 0.3) 60%,
    transparent 100%
  );
  transform: translate(-50%, -50%);
}

.immobilia-sun-rays:after {
  transform: translate(-50%, -50%) rotate(90deg);
}

@keyframes sunGlow {
  0%, 100% { 
    filter: brightness(1) saturate(1);
    transform: scale(1);
  }
  50% { 
    filter: brightness(1.1) saturate(1.2);
    transform: scale(1.05);
  }
}

@keyframes sunRaysRotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Nubes realistas */
.immobilia-clouds {
  position: absolute;
  top: 8%;
  width: 100%;
  height: 50%;
  z-index: 2;
}

.immobilia-cloud {
  position: absolute;
  animation: cloudDrift 25s linear infinite;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
}

/* Nube esponjosa */
.immobilia-cloud-fluffy {
  width: 120px;
  height: 40px;
  top: 10%;
  left: -120px;
  animation-delay: 0s;
}

.immobilia-cloud-fluffy .immobilia-cloud-part {
  position: absolute;
  background: linear-gradient(45deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(255, 255, 255, 0.7) 100%
  );
  border-radius: 50px;
}

.immobilia-cloud-fluffy .immobilia-cloud-part:nth-child(1) {
  width: 50px;
  height: 35px;
  left: 0;
  top: 0;
}

.immobilia-cloud-fluffy .immobilia-cloud-part:nth-child(2) {
  width: 60px;
  height: 40px;
  left: 35px;
  top: -5px;
}

.immobilia-cloud-fluffy .immobilia-cloud-part:nth-child(3) {
  width: 45px;
  height: 30px;
  left: 75px;
  top: 5px;
}

/* Nube alargada */
.immobilia-cloud-wispy {
  width: 100px;
  height: 20px;
  top: 25%;
  left: -100px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.6) 20%, 
    rgba(255, 255, 255, 0.8) 50%, 
    rgba(255, 255, 255, 0.6) 80%, 
    transparent 100%
  );
  border-radius: 20px;
  animation-delay: 8s;
}

/* Nube pequeña */
.immobilia-cloud-small {
  width: 60px;
  height: 25px;
  top: 15%;
  left: -60px;
  background: radial-gradient(ellipse, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(255, 255, 255, 0.5) 100%
  );
  border-radius: 30px;
  animation-delay: 15s;
}

@keyframes cloudDrift {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(100vw + 150px)); }
}

/* Campo de pasto realista */
.immobilia-grass-field {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25%;
  background: linear-gradient(0deg, #228B22 0%, #32CD32 100%);
  z-index: 5;
}

.immobilia-grass-blade {
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 15px;
  background: linear-gradient(0deg, #006400 0%, #32CD32 100%);
  border-radius: 2px 2px 0 0;
  animation: grassSway 3s ease-in-out infinite;
  animation-delay: calc(var(--index) * 0.1s);
  left: calc(var(--index) * 5%);
}

@keyframes grassSway {
  0%, 100% { transform: rotate(0deg) scaleY(1); }
  25% { transform: rotate(2deg) scaleY(1.1); }
  75% { transform: rotate(-1deg) scaleY(0.9); }
}

/* Pájaros realistas */
.immobilia-birds {
  position: absolute;
  top: 20%;
  width: 100%;
  height: 40%;
  z-index: 6;
}

.immobilia-bird {
  position: absolute;
  width: 20px;
  height: 8px;
  animation: birdFlight 18s linear infinite;
  animation-delay: var(--delay);
}

.immobilia-bird-body {
  position: absolute;
  width: 6px;
  height: 3px;
  background: #2F4F4F;
  border-radius: 50%;
  left: 7px;
  top: 2px;
}

.immobilia-bird-wing {
  position: absolute;
  width: 8px;
  height: 2px;
  background: #2F4F4F;
  border-radius: 50%;
  animation: wingFlap 0.3s ease-in-out infinite alternate;
}

.immobilia-bird-wing-left {
  left: 2px;
  top: 3px;
  transform-origin: right center;
}

.immobilia-bird-wing-right {
  right: 2px;
  top: 3px;
  transform-origin: left center;
}

@keyframes birdFlight {
  0% { 
    left: -50px; 
    top: 30%; 
    transform: translateY(0px);
  }
  25% { 
    top: 20%; 
    transform: translateY(-10px);
  }
  50% { 
    top: 35%; 
    transform: translateY(5px);
  }
  75% { 
    top: 15%; 
    transform: translateY(-15px);
  }
  100% { 
    left: calc(100% + 50px); 
    top: 25%; 
    transform: translateY(0px);
  }
}

@keyframes wingFlap {
  0% { transform: rotate(0deg) scaleX(1); }
  100% { transform: rotate(-20deg) scaleX(0.8); }
}

/* Hojas realistas */
.immobilia-leaves {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 7;
}

.immobilia-leaf {
  position: absolute;
  animation: leafFall var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
}

.immobilia-leaf-maple {
  width: 12px;
  height: 12px;
  background: linear-gradient(45deg, #8B4513 0%, #CD853F 50%, #DEB887 100%);
  clip-path: polygon(50% 0%, 80% 35%, 100% 35%, 75% 57%, 85% 85%, 50% 70%, 15% 85%, 25% 57%, 0% 35%, 20% 35%);
  animation: leafFall var(--duration) ease-in-out infinite, leafRotate 2s linear infinite;
  animation-delay: var(--delay);
}

.immobilia-leaf:nth-child(1) { 
  top: -20px; 
  left: 10%; 
  --delay: 0s; 
  --duration: 8s; 
}
.immobilia-leaf:nth-child(2) { 
  top: -20px; 
  left: 30%; 
  --delay: 1.5s; 
  --duration: 9s; 
}
.immobilia-leaf:nth-child(3) { 
  top: -20px; 
  left: 50%; 
  --delay: 3s; 
  --duration: 7s; 
}
.immobilia-leaf:nth-child(4) { 
  top: -20px; 
  left: 70%; 
  --delay: 4.5s; 
  --duration: 8.5s; 
}
.immobilia-leaf:nth-child(5) { 
  top: -20px; 
  left: 90%; 
  --delay: 6s; 
  --duration: 9.5s; 
}

@keyframes leafFall {
  0% { 
    transform: translateY(0px) translateX(0px) scale(0.8);
    opacity: 0;
  }
  10% { 
    opacity: 1;
  }
  90% { 
    opacity: 1;
  }
  100% { 
    transform: translateY(420px) translateX(20px) scale(1.2);
    opacity: 0;
  }
}

@keyframes leafRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .immobilia-nature-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .immobilia-stat-number {
    font-size: 28px;
  }
  
  .immobilia-nature-actions {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  
  .immobilia-btn-xl {
    min-width: 250px;
  }
  
  .immobilia-nature-scene {
    height: 250px;
  }
  
  .immobilia-mountain {
    width: 60px !important;
    height: 40px !important;
  }
  
  .immobilia-tree {
    width: 25px;
    height: 35px;
  }
  
  .immobilia-sun {
    width: 40px;
    height: 40px;
  }
}

/* Content passes under the header - Tesla style */
.immobilia-homepage .relative {
  position: relative;
  z-index: 10;
  background-color: #ffffff;
}

.immobilia-title {
  font-size: 40px;
  line-height: 48px;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  color: #ffffff;
}

@media (min-width: 768px) {
  .immobilia-title {
    font-size: 56px;
    line-height: 64px;
    margin-bottom: 32px;
  }
}

@media (min-width: 1024px) {
  .immobilia-title {
    font-size: 80px;
    line-height: 88px;
    margin-bottom: 40px;
  }
}

/* Mobile-First Button Styles */
.immobilia-btn {
  /* Mobile base styles */
  padding: 0.875rem 1.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.4;
  letter-spacing: 0.025em;
  border: 2px solid;
  border-radius: 0.5rem;
  min-width: 100%;
  height: 3rem;
  text-transform: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  position: relative;
  overflow: hidden;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

@media (min-width: 640px) {
  .immobilia-btn {
    min-width: 10rem;
    font-size: 0.8125rem;
    padding: 0.75rem 1.75rem;
    height: 2.75rem;
  }
}

@media (min-width: 768px) {
  .immobilia-btn {
    min-width: 10rem;
    font-size: 0.8125rem;
    padding: 0.875rem 1.75rem;
    height: auto;
    border-radius: 0;
    text-transform: uppercase;
    letter-spacing: 0.03125em;
  }
}

.immobilia-btn-primary {
  background-color: rgba(23, 26, 32, 0.8);
  border-color: rgba(23, 26, 32, 0.8);
  color: #fff;
}

.immobilia-btn-primary:hover {
  background-color: rgba(23, 26, 32, 1);
  border-color: rgba(23, 26, 32, 1);
}

.immobilia-btn-secondary {
  background-color: rgba(244, 244, 244, 0.65);
  border-color: rgba(244, 244, 244, 0.65);
  color: rgba(23, 26, 32, 0.8);
}

.immobilia-btn-secondary:hover {
  background-color: rgba(244, 244, 244, 1);
  border-color: rgba(244, 244, 244, 1);
  color: rgba(23, 26, 32, 1);
}

/* Button group styles - Professional & minimalist */
.immobilia-button-group {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .immobilia-button-group {
    flex-direction: row;
    gap: 8px;
    width: 100%;
    justify-content: center;
  }
  
  .immobilia-button-group .immobilia-btn {
    flex: 1;
    min-width: 140px;
    max-width: 160px;
  }
}

/* Professional minimalist button styles */
.immobilia-btn-light {
  background-color: transparent;
  border-color: rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.87);
  backdrop-filter: blur(10px);
}

.immobilia-btn-light::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  transition: left 0.6s ease;
}

.immobilia-btn-light:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.6);
  color: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.immobilia-btn-light:hover::before {
  left: 100%;
}

.immobilia-btn-dark {
  background-color: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.9);
  color: rgba(23, 26, 32, 0.87);
  backdrop-filter: blur(10px);
}

.immobilia-btn-dark::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
  transition: left 0.6s ease;
}

.immobilia-btn-dark:hover {
  background-color: rgba(255, 255, 255, 1);
  border-color: rgba(255, 255, 255, 1);
  color: rgba(23, 26, 32, 1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.immobilia-btn-dark:hover::before {
  left: 100%;
}

/* Botón universal transparente - siempre consistente */
.immobilia-btn-universal {
  background-color: transparent;
  border-color: rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.immobilia-btn-universal::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  transition: left 0.6s ease;
}

.immobilia-btn-universal:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.immobilia-btn-universal:hover::before {
  left: 100%;
}

/* Additional professional touches */
.immobilia-btn:active {
  transform: translateY(0);
  transition: all 0.1s ease;
}

.immobilia-btn:focus {
  outline: none;
}

.immobilia-btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  background-color: #ffffff;
}

body {
  background-color: #ffffff;
  margin: 0;
  padding: 0;
}

/* Navigation dots animation */
.fixed button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fixed button:hover {
  transform: scale(1.2);
}

/* Tesla Header Styles */
.immobilia-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.immobilia-header-content {
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.immobilia-header-inner {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.immobilia-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.immobilia-logo-img {
  height: 40px;
  width: auto;
  transition: transform 0.3s ease;
}

.immobilia-logo:hover .immobilia-logo-img {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .immobilia-logo-img {
    height: 36px;
  }
}

.immobilia-nav-link {
  color: rgba(23, 26, 32, 0.6);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding: 12px 0;
  transition: color 0.3s ease;
  position: relative;
}

.immobilia-nav-link:hover,
.immobilia-nav-link.router-link-active {
  color: rgba(23, 26, 32, 1);
}

.immobilia-nav-link:after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  height: 2px;
  background: #25D366;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.immobilia-nav-link:hover:after,
.immobilia-nav-link.router-link-active:after {
  transform: scaleX(1);
}

.immobilia-header-social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: rgba(23, 26, 32, 0.6);
  text-decoration: none;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.immobilia-header-social:hover {
  transform: scale(1.1);
  background: rgba(0, 0, 0, 0.05);
}

.immobilia-header-social[href*="linkedin"]:hover {
  color: #0077B5;
  background: rgba(0, 119, 181, 0.1);
}

.immobilia-header-social[href*="facebook"]:hover {
  color: #1877F2;
  background: rgba(24, 119, 242, 0.1);
}

.immobilia-header-social[href*="tiktok"]:hover {
  color: #000000;
  background: rgba(0, 0, 0, 0.1);
}

.immobilia-header-social[href*="instagram"]:hover {
  color: #E4405F;
  background: rgba(228, 64, 95, 0.1);
}

.immobilia-mobile-nav-link {
  display: block;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(23, 26, 32, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
}

.immobilia-mobile-nav-link:hover,
.immobilia-mobile-nav-link.router-link-active {
  color: #25D366;
  background: rgba(37, 211, 102, 0.1);
}

@media (max-width: 768px) {
  .immobilia-header-content {
    padding: 0 16px;
  }
}

.immobilia-header-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  position: relative;
}

.immobilia-nav-dots {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 768px) {
  .immobilia-nav-dots {
    right: 32px;
    gap: 20px;
  }
}

.immobilia-nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background-color: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  z-index: 101;
}

.immobilia-nav-dot:hover {
  transform: scale(1.25);
  border-color: rgba(255, 255, 255, 1);
}

.immobilia-nav-dot.bg-white {
  background-color: rgba(255, 255, 255, 1);
  border-color: rgba(255, 255, 255, 1);
}

@media (min-width: 768px) {
  .immobilia-nav-dot {
    width: 10px;
    height: 10px;
  }
}

.immobilia-mobile-nav-link {
  @apply block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors duration-200;
}

.immobilia-mobile-nav-link.router-link-active {
  @apply text-black bg-gray-100;
}

/* Hero Content Positioning - Centro de imagen */
.immobilia-hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  max-width: 95%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .immobilia-hero-content {
    max-width: 90%;
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-hero-content {
    max-width: 80%;
    padding: 2rem;
  }
}

.immobilia-button-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
}

@media (min-width: 640px) {
  .immobilia-button-group {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }
}

/* Loading States */
.immobilia-loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.immobilia-loading-content {
  text-align: center;
  padding: 2rem;
}

.immobilia-loading-spinner {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1.5rem;
  border: 3px solid #e9ecef;
  border-top: 3px solid #25D366;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.immobilia-loading-text {
  color: #6c757d;
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Button Micro-interactions */
.immobilia-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.immobilia-btn:active {
  transform: translateY(0);
  transition: all 0.1s ease;
}

.immobilia-btn:focus-visible {
  outline: 2px solid #25D366;
  outline-offset: 2px;
}

/* Slide transition enhancement */
.immobilia-slide {
  will-change: transform, opacity;
}

.immobilia-slide.active {
  animation: slideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .immobilia-slider-section {
    height: 100vh;
    min-height: 500px;
  }
  
  .immobilia-slide-image {
    object-fit: contain;
    padding: 20px;
  }
  
  .immobilia-btn {
    @apply min-w-[160px] px-4 py-2 text-xs;
  }
  
  .immobilia-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .immobilia-hero-content {
    bottom: 40px;
    max-width: 95%;
    padding: 0 20px;
  }
  
  .immobilia-button-group {
    gap: 0.5rem;
    flex-direction: column;
    align-items: center;
  }
  
  .hero-section h1 {
    @apply text-3xl md:text-5xl;
  }
  
  .hero-section p {
    @apply text-base md:text-lg;
  }
}

@media (max-width: 480px) {
  .immobilia-slider-section {
    min-height: 450px;
  }
  
  .immobilia-slide-image {
    padding: 15px;
  }
  
  .immobilia-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .immobilia-hero-content {
    bottom: 30px;
  }
}

/* Clickable images cursor */
.immobilia-clickable-image {
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.immobilia-clickable-image:hover {
  transform: scale(1.02);
  opacity: 0.9;
}

/* Modal Gallery Styles */
.immobilia-image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(10px);
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.immobilia-modal-content {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 4rem 5rem 4rem;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .immobilia-modal-content {
    padding: 4rem 6rem 6rem 6rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-modal-content {
    padding: 4rem 8rem 6rem 8rem;
  }
}

.immobilia-modal-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  animation: imageZoomIn 0.4s ease-out;
  /* Preserve quality */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  /* Block any parent transforms */
  transform-origin: center center;
}

@keyframes imageZoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Navigation buttons */
.immobilia-modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10;
}

@media (min-width: 768px) {
  .immobilia-modal-nav {
    width: 3.5rem;
    height: 3.5rem;
  }
}

.immobilia-modal-nav:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.immobilia-modal-prev {
  left: 1rem;
}

.immobilia-modal-next {
  right: 1rem;
}

@media (min-width: 768px) {
  .immobilia-modal-prev {
    left: 2rem;
  }
  
  .immobilia-modal-next {
    right: 2rem;
  }
}

.immobilia-modal-nav svg {
  width: 1.5rem;
  height: 1.5rem;
}

/* Close button */
.immobilia-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10;
}

@media (min-width: 768px) {
  .immobilia-modal-close {
    width: 3rem;
    height: 3rem;
  }
}

.immobilia-modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.1);
}

.immobilia-modal-close svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Counter */
.immobilia-modal-counter {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
  .immobilia-modal-counter {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
}

</style>