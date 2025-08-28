<template>
  <AppLayout>
    <div class="blog-page">
      <!-- Hero Section -->
      <section class="blog-hero">
        <div class="blog-hero-content">
          <div class="blog-hero-text">
            <h1 class="blog-hero-title">
              Blog <span class="text-primary-400">Tierra Soñada</span>
            </h1>
            <p class="blog-hero-subtitle">
              Descubre las últimas tendencias en inversión inmobiliaria, tips para el hogar y noticias del mercado campestre
            </p>
          </div>
          <div class="blog-hero-stats">
            <div class="blog-stat">
              <span class="blog-stat-number">{{ mockStats.totalArticles }}</span>
              <span class="blog-stat-label">Artículos</span>
            </div>
            <div class="blog-stat">
              <span class="blog-stat-number">{{ mockStats.categories }}</span>
              <span class="blog-stat-label">Categorías</span>
            </div>
            <div class="blog-stat">
              <span class="blog-stat-number">{{ mockStats.monthlyReaders }}K</span>
              <span class="blog-stat-label">Lectores/mes</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Filter -->
      <section class="blog-categories">
        <div class="blog-categories-container">
          <h2 class="blog-categories-title">Explora por Categoría</h2>
          <div class="blog-categories-grid">
            <button 
              v-for="category in mockCategories" 
              :key="category.id"
              class="blog-category-card"
              :class="{ 'active': selectedCategory === category.id }"
              @click="selectCategory(category.id)"
            >
              <div class="blog-category-icon" :style="{ backgroundColor: category.color }">
                <span v-html="category.icon"></span>
              </div>
              <div class="blog-category-info">
                <h3 class="blog-category-name">{{ category.name }}</h3>
                <span class="blog-category-count">{{ category.articleCount }} artículos</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      <!-- Featured Articles -->
      <section class="blog-featured">
        <div class="blog-featured-container">
          <div class="blog-featured-header">
            <h2 class="blog-featured-title">Artículos Destacados</h2>
            <button class="blog-view-all">Ver todos</button>
          </div>
          
          <div class="blog-featured-grid">
            <!-- Main Featured Article -->
            <article class="blog-featured-main">
              <div class="blog-featured-main-image">
                <img src="/placeholder-blog.svg" alt="Artículo destacado" />
                <div class="blog-featured-main-overlay">
                  <span class="blog-featured-badge">Destacado</span>
                </div>
              </div>
              <div class="blog-featured-main-content">
                <div class="blog-featured-main-meta">
                  <span class="blog-featured-category">Inversión</span>
                  <span class="blog-featured-date">15 Dic 2024</span>
                </div>
                <h3 class="blog-featured-main-title">
                  Guía Completa: Cómo Invertir en Lotes Campestres en 2024
                </h3>
                <p class="blog-featured-main-excerpt">
                  Descubre las claves para una inversión exitosa en el mercado inmobiliario campestre. 
                  Desde la selección del terreno hasta el retorno de la inversión.
                </p>
                <div class="blog-featured-main-footer">
                  <div class="blog-author">
                    <div class="blog-author-avatar">TS</div>
                    <span class="blog-author-name">Equipo Tierra Soñada</span>
                  </div>
                  <span class="blog-read-time">8 min lectura</span>
                </div>
              </div>
            </article>

            <!-- Secondary Featured Articles -->
            <div class="blog-featured-secondary">
              <article 
                v-for="article in mockFeaturedSecondary" 
                :key="article.id"
                class="blog-featured-card"
              >
                <div class="blog-featured-card-image">
                  <img :src="article.image" :alt="article.title" />
                </div>
                <div class="blog-featured-card-content">
                  <div class="blog-featured-card-meta">
                    <span class="blog-featured-card-category">{{ article.category }}</span>
                    <span class="blog-featured-card-date">{{ article.date }}</span>
                  </div>
                  <h4 class="blog-featured-card-title">{{ article.title }}</h4>
                  <p class="blog-featured-card-excerpt">{{ article.excerpt }}</p>
                  <span class="blog-featured-card-read-time">{{ article.readTime }} min</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Articles -->
      <section class="blog-recent">
        <div class="blog-recent-container">
          <div class="blog-recent-header">
            <h2 class="blog-recent-title">Artículos Recientes</h2>
            <div class="blog-recent-filters">
              <button 
                class="blog-filter-btn" 
                :class="{ 'active': sortBy === 'newest' }"
                @click="sortBy = 'newest'"
              >
                Más recientes
              </button>
              <button 
                class="blog-filter-btn" 
                :class="{ 'active': sortBy === 'popular' }"
                @click="sortBy = 'popular'"
              >
                Más populares
              </button>
            </div>
          </div>

          <div class="blog-recent-grid">
            <article 
              v-for="article in mockRecentArticles" 
              :key="article.id"
              class="blog-article-card"
            >
              <div class="blog-article-card-image">
                <img :src="article.image" :alt="article.title" />
                <div class="blog-article-card-overlay">
                  <span class="blog-article-category" :style="{ backgroundColor: getCategoryColor(article.category) }">
                    {{ article.category }}
                  </span>
                </div>
              </div>
              <div class="blog-article-card-content">
                <div class="blog-article-card-meta">
                  <span class="blog-article-card-date">{{ article.date }}</span>
                  <span class="blog-article-card-views">{{ article.views }} vistas</span>
                </div>
                <h3 class="blog-article-card-title">{{ article.title }}</h3>
                <p class="blog-article-card-excerpt">{{ article.excerpt }}</p>
                <div class="blog-article-card-footer">
                  <div class="blog-article-author">
                    <div class="blog-article-author-avatar">{{ article.author.initials }}</div>
                    <span class="blog-article-author-name">{{ article.author.name }}</span>
                  </div>
                  <div class="blog-article-card-actions">
                    <span class="blog-article-read-time">{{ article.readTime }} min</span>
                    <button class="blog-article-share">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                        <polyline points="16,6 12,2 8,6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- Load More -->
          <div class="blog-load-more">
            <button class="blog-load-more-btn" @click="loadMore">
              <span>Cargar más artículos</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- Newsletter Subscribe -->
      <section class="blog-newsletter">
        <div class="blog-newsletter-container">
          <div class="blog-newsletter-content">
            <div class="blog-newsletter-text">
              <h3 class="blog-newsletter-title">¿Te gustó nuestro contenido?</h3>
              <p class="blog-newsletter-subtitle">
                Suscríbete a nuestro newsletter y recibe los mejores consejos sobre inversión inmobiliaria
              </p>
            </div>
            <div class="blog-newsletter-form">
              <input 
                type="email" 
                placeholder="Tu correo electrónico"
                v-model="newsletterEmail"
                class="blog-newsletter-input"
              />
              <button class="blog-newsletter-btn" @click="subscribeNewsletter">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/components/AppLayout.vue'

// Reactive data
const selectedCategory = ref('all')
const sortBy = ref('newest')
const newsletterEmail = ref('')

// Mock data - will be replaced with API calls
const mockStats = {
  totalArticles: 156,
  categories: 8,
  monthlyReaders: 25
}

const mockCategories = [
  { id: 'all', name: 'Todos', icon: '📚', color: '#25D366', articleCount: 156 },
  { id: 'investment', name: 'Inversión', icon: '💰', color: '#FFB800', articleCount: 45 },
  { id: 'lifestyle', name: 'Estilo de Vida', icon: '🏡', color: '#FF6B6B', articleCount: 32 },
  { id: 'legal', name: 'Legal', icon: '⚖️', color: '#4ECDC4', articleCount: 28 },
  { id: 'design', name: 'Diseño', icon: '🎨', color: '#45B7D1', articleCount: 23 },
  { id: 'finance', name: 'Finanzas', icon: '📊', color: '#96CEB4', articleCount: 18 },
  { id: 'news', name: 'Noticias', icon: '📰', color: '#FFEAA7', articleCount: 15 },
  { id: 'tips', name: 'Consejos', icon: '💡', color: '#DDA0DD', articleCount: 12 }
]

const mockFeaturedSecondary = [
  {
    id: 1,
    title: 'Tendencias del Mercado Inmobiliario 2024',
    excerpt: 'Análisis completo de las proyecciones y oportunidades.',
    category: 'Mercado',
    date: '12 Dic 2024',
    image: '/placeholder-blog-2.svg',
    readTime: 6
  },
  {
    id: 2,
    title: 'Financiación: Opciones para Tu Lote Campestre',
    excerpt: 'Descubre las mejores alternativas de financiamiento.',
    category: 'Finanzas',
    date: '10 Dic 2024',
    image: '/placeholder-blog-3.svg',
    readTime: 4
  }
]

const mockRecentArticles = [
  {
    id: 1,
    title: 'Los Mejores Sectores para Invertir en Lotes Campestres',
    excerpt: 'Analizamos las zonas con mayor potencial de revalorización y rentabilidad para inversionistas.',
    category: 'Inversión',
    date: '8 Dic 2024',
    image: '/placeholder-blog.svg',
    readTime: 7,
    views: 1245,
    author: { name: 'Carlos Mendoza', initials: 'CM' }
  },
  {
    id: 2,
    title: 'Guía Legal: Qué Documentos Necesitas para Comprar un Lote',
    excerpt: 'Todo lo que debes saber sobre la documentación legal antes de realizar tu compra.',
    category: 'Legal',
    date: '5 Dic 2024',
    image: '/placeholder-blog-2.svg',
    readTime: 5,
    views: 987,
    author: { name: 'Ana Ruiz', initials: 'AR' }
  },
  {
    id: 3,
    title: 'Diseña Tu Casa de Campo: Ideas y Tendencias 2024',
    excerpt: 'Inspiración y consejos prácticos para crear el hogar campestre de tus sueños.',
    category: 'Diseño',
    date: '3 Dic 2024',
    image: '/placeholder-blog-3.svg',
    readTime: 8,
    views: 2156,
    author: { name: 'Laura Silva', initials: 'LS' }
  },
  {
    id: 4,
    title: 'Servicios Públicos en Zona Rural: Lo Que Debes Saber',
    excerpt: 'Información esencial sobre disponibilidad y conexión de servicios básicos.',
    category: 'Consejos',
    date: '1 Dic 2024',
    image: '/placeholder-blog-4.svg',
    readTime: 6,
    views: 756,
    author: { name: 'Miguel Torres', initials: 'MT' }
  },
  {
    id: 5,
    title: 'ROI en Lotes Campestres: Calculando tu Rentabilidad',
    excerpt: 'Herramientas y metodologías para evaluar el retorno de tu inversión inmobiliaria.',
    category: 'Finanzas',
    date: '28 Nov 2024',
    image: '/placeholder-blog.svg',
    readTime: 9,
    views: 1834,
    author: { name: 'Patricia López', initials: 'PL' }
  },
  {
    id: 6,
    title: 'Vida Sostenible: Construye Eco-Friendly en el Campo',
    excerpt: 'Tecnologías verdes y materiales sostenibles para tu proyecto campestre.',
    category: 'Estilo de Vida',
    date: '25 Nov 2024',
    image: '/placeholder-blog-2.svg',
    readTime: 7,
    views: 1423,
    author: { name: 'Ricardo Vega', initials: 'RV' }
  }
]

// Methods - ready for API integration
const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
  // TODO: API call to filter articles by category
  console.log('Filtering by category:', categoryId)
}

const loadMore = () => {
  // TODO: API call to load more articles
  console.log('Loading more articles...')
}

const subscribeNewsletter = () => {
  if (newsletterEmail.value) {
    // TODO: API call to subscribe to newsletter
    console.log('Subscribing email:', newsletterEmail.value)
    newsletterEmail.value = ''
  }
}

const getCategoryColor = (categoryName: string) => {
  const category = mockCategories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase())
  return category?.color || '#25D366'
}
</script>

<style scoped>
/* Blog Page Styles */
.blog-page {
  background-color: #ffffff;
}

/* Hero Section */
.blog-hero {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.blog-hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #25D366, #20B858);
  border-radius: 50%;
  opacity: 0.1;
  transform: translate(100px, -100px);
}

.blog-hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  align-items: center;
}

.blog-hero-title {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
  line-height: 1.1;
}

.blog-hero-subtitle {
  font-size: 20px;
  color: #6c757d;
  line-height: 1.6;
  max-width: 500px;
}

.blog-hero-stats {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.blog-stat {
  text-align: center;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.blog-stat:hover {
  transform: translateY(-5px);
}

.blog-stat-number {
  display: block;
  font-size: 36px;
  font-weight: 700;
  color: #25D366;
  margin-bottom: 8px;
}

.blog-stat-label {
  font-size: 14px;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Categories Section */
.blog-categories {
  padding: 80px 0;
  background: #ffffff;
}

.blog-categories-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.blog-categories-title {
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 48px;
  color: #1a1a1a;
}

.blog-categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.blog-category-card {
  display: flex;
  align-items: center;
  padding: 24px;
  background: white;
  border: 2px solid #f8f9fa;
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: left;
}

.blog-category-card:hover,
.blog-category-card.active {
  border-color: #25D366;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(37, 211, 102, 0.15);
}

.blog-category-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 16px;
}

.blog-category-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.blog-category-count {
  font-size: 14px;
  color: #6c757d;
}

/* Featured Section */
.blog-featured {
  padding: 80px 0;
  background: #f8f9fa;
}

.blog-featured-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.blog-featured-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
}

.blog-featured-title {
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
}

.blog-view-all {
  background: #25D366;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.blog-view-all:hover {
  background: #20B858;
}

.blog-featured-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}

/* Main Featured Article */
.blog-featured-main {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.blog-featured-main:hover {
  transform: translateY(-8px);
}

.blog-featured-main-image {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.blog-featured-main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-featured-main-overlay {
  position: absolute;
  top: 20px;
  left: 20px;
}

.blog-featured-badge {
  background: linear-gradient(45deg, #25D366, #20B858);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.blog-featured-main-content {
  padding: 32px;
}

.blog-featured-main-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.blog-featured-category {
  background: #25D366;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.blog-featured-date {
  color: #6c757d;
  font-size: 14px;
}

.blog-featured-main-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.3;
  margin-bottom: 16px;
}

.blog-featured-main-excerpt {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 24px;
}

.blog-featured-main-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.blog-author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #25D366;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.blog-author-name {
  font-weight: 500;
  color: #1a1a1a;
}

.blog-read-time {
  color: #6c757d;
  font-size: 14px;
}

/* Secondary Featured Articles */
.blog-featured-secondary {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.blog-featured-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.blog-featured-card:hover {
  transform: translateY(-4px);
}

.blog-featured-card-image {
  height: 120px;
  overflow: hidden;
}

.blog-featured-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-featured-card-content {
  padding: 20px;
}

.blog-featured-card-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.blog-featured-card-category {
  background: #e9ecef;
  color: #6c757d;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
}

.blog-featured-card-date {
  color: #6c757d;
  font-size: 12px;
}

.blog-featured-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.3;
  margin-bottom: 8px;
}

.blog-featured-card-excerpt {
  color: #6c757d;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 12px;
}

.blog-featured-card-read-time {
  color: #6c757d;
  font-size: 12px;
}

/* Recent Articles Section */
.blog-recent {
  padding: 80px 0;
  background: #ffffff;
}

.blog-recent-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.blog-recent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
}

.blog-recent-title {
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
}

.blog-recent-filters {
  display: flex;
  gap: 8px;
}

.blog-filter-btn {
  padding: 8px 16px;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.blog-filter-btn:hover,
.blog-filter-btn.active {
  border-color: #25D366;
  background: #25D366;
  color: white;
}

.blog-recent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
}

/* Article Cards */
.blog-article-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.blog-article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.blog-article-card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.blog-article-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-article-card:hover .blog-article-card-image img {
  transform: scale(1.05);
}

.blog-article-card-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
}

.blog-article-category {
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.blog-article-card-content {
  padding: 24px;
}

.blog-article-card-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.blog-article-card-date,
.blog-article-card-views {
  color: #6c757d;
  font-size: 12px;
}

.blog-article-card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.3;
  margin-bottom: 12px;
}

.blog-article-card-excerpt {
  color: #6c757d;
  line-height: 1.5;
  margin-bottom: 16px;
}

.blog-article-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-article-author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.blog-article-author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #25D366;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
}

.blog-article-author-name {
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 500;
}

.blog-article-card-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.blog-article-read-time {
  color: #6c757d;
  font-size: 12px;
}

.blog-article-share {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.blog-article-share:hover {
  background: #f8f9fa;
  color: #25D366;
}

/* Load More */
.blog-load-more {
  text-align: center;
}

.blog-load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: white;
  border: 2px solid #25D366;
  color: #25D366;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.blog-load-more-btn:hover {
  background: #25D366;
  color: white;
}

/* Newsletter Section */
.blog-newsletter {
  padding: 80px 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
}

.blog-newsletter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.blog-newsletter-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 48px;
  align-items: center;
}

.blog-newsletter-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 16px;
}

.blog-newsletter-subtitle {
  font-size: 18px;
  opacity: 0.8;
  line-height: 1.5;
}

.blog-newsletter-form {
  display: flex;
  gap: 12px;
}

.blog-newsletter-input {
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}

.blog-newsletter-btn {
  padding: 16px 24px;
  background: #25D366;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.blog-newsletter-btn:hover {
  background: #20B858;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .blog-hero-title {
    font-size: 36px;
  }
  
  .blog-hero-stats {
    flex-direction: row;
    justify-content: space-around;
  }
  
  .blog-categories-grid {
    grid-template-columns: 1fr;
  }
  
  .blog-featured-grid {
    grid-template-columns: 1fr;
  }
  
  .blog-recent-header {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }
  
  .blog-recent-grid {
    grid-template-columns: 1fr;
  }
  
  .blog-newsletter-content {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }
  
  .blog-newsletter-form {
    flex-direction: column;
  }
}
</style>