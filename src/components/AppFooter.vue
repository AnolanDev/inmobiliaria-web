<template>
  <!-- FOOTER -->
  <footer class="immobilia-footer-section">
    <div class="immobilia-footer-content">
      <div class="immobilia-footer-main">
        <!-- Logo y descripción -->
        <div class="immobilia-footer-brand">
          <div class="immobilia-footer-logo-container">
            <img src="/ts/logo.png" alt="Tierra Soñada" class="immobilia-footer-logo-img" />
          </div>
          <p class="immobilia-footer-desc">
            Tu hogar ideal te está esperando. Conectamos sueños con realidad en los mejores lotes campestres.
          </p>
          <div class="immobilia-footer-social">
            <a href="https://co.linkedin.com/company/tierrasonadactg" target="_blank" rel="noopener noreferrer" class="immobilia-social-link">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/TierraSonadaInmobiliaria.ctg" target="_blank" rel="noopener noreferrer" class="immobilia-social-link">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@tierrasonadactg_" target="_blank" rel="noopener noreferrer" class="immobilia-social-link">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/tierrasonadactg" target="_blank" rel="noopener noreferrer" class="immobilia-social-link">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Enlaces rápidos -->
        <div class="immobilia-footer-links">
          <div class="immobilia-footer-column">
            <h4 class="immobilia-footer-title">Proyectos</h4>
            <ul class="immobilia-footer-list">
              <li><a href="/proyectos">Todos los Proyectos</a></li>
              <li><a href="/proyectos?tipo=campestres">Lotes Campestres</a></li>
              <li><a href="/proyectos?tipo=turisticos">Proyectos Turísticos</a></li>
              <li><a href="/proyectos?tipo=urbanos">Desarrollos Urbanos</a></li>
            </ul>
          </div>

          <div class="immobilia-footer-column">
            <h4 class="immobilia-footer-title">Servicios</h4>
            <ul class="immobilia-footer-list">
              <li><a href="/agentes">Nuestros Agentes</a></li>
              <li><a href="/financiacion">Financiación</a></li>
              <li><a href="/asesoria">Asesoría Legal</a></li>
            </ul>
          </div>

          <div class="immobilia-footer-column">
            <h4 class="immobilia-footer-title">Contacto</h4>
            <ul class="immobilia-footer-list">
              <li>
                <span class="immobilia-contact-icon">📍</span>
                <span>Calle Principal 123, Ciudad</span>
              </li>
              <li>
                <span class="immobilia-contact-icon">📞</span>
                <span>+57 300 123 4567</span>
              </li>
              <li>
                <span class="immobilia-contact-icon">✉️</span>
                <span>info@tierrasonada.com</span>
              </li>
              <li>
                <span class="immobilia-contact-icon">🕒</span>
                <span>Lun - Vie: 8AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Línea separadora -->
      <div class="immobilia-footer-divider"></div>

      <!-- Copyright -->
      <div class="immobilia-footer-bottom">
        <div class="immobilia-footer-copyright">
          <p class="immobilia-footer-creator">Created by: <span class="immobilia-creator-name">Gustavo Olivera</span></p>
          <p>&copy; 2025 Tierra Soñada. All rights reserved.</p>
        </div>
        <div class="immobilia-footer-legal">
          <a href="/privacidad">Política de Privacidad</a>
          <a href="/terminos">Términos y Condiciones</a>
          <a href="/cookies">Política de Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* FOOTER STYLES */
.immobilia-footer-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 2rem 0 1.5rem 0;
  position: relative;
  overflow: hidden;
}

@media (min-width: 768px) {
  .immobilia-footer-section {
    padding: 2.5rem 0 1.5rem 0;
  }
}

@media (min-width: 1024px) {
  .immobilia-footer-section {
    padding: 3rem 0 1.5rem 0;
  }
}

.immobilia-footer-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #25D366 50%, transparent 100%);
}

.immobilia-footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .immobilia-footer-content {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-footer-content {
    padding: 0 2rem;
  }
}

.immobilia-footer-main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .immobilia-footer-main {
    grid-template-columns: 1fr 2fr;
    gap: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-footer-main {
    gap: 3rem;
    margin-bottom: 2.5rem;
  }
}

/* Brand section */
.immobilia-footer-brand {
  max-width: 400px;
}

.immobilia-footer-logo-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
}

.immobilia-footer-logo-img {
  height: 60px;
  width: auto;
  transition: transform 0.3s ease;
}

.immobilia-footer-logo-img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .immobilia-footer-logo-img {
    height: 50px;
  }
}

.immobilia-footer-desc {
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: 24px;
}

.immobilia-footer-social {
  display: flex;
  gap: 16px;
}

.immobilia-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.immobilia-social-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
}

.immobilia-social-link[href*="linkedin"]:hover {
  background: #0077B5;
}

.immobilia-social-link[href*="facebook"]:hover {
  background: #1877F2;
}

.immobilia-social-link[href*="tiktok"]:hover {
  background: #000000;
}

.immobilia-social-link[href*="instagram"]:hover {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
}

/* Links section */
.immobilia-footer-links {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 480px) {
  .immobilia-footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .immobilia-footer-links {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .immobilia-footer-links {
    gap: 2.5rem;
  }
}

.immobilia-footer-column h4 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #25D366;
}

.immobilia-footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.immobilia-footer-list li {
  margin-bottom: 8px;
}

.immobilia-footer-list a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 14px;
}

.immobilia-footer-list a:hover {
  color: #25D366;
}

.immobilia-contact-icon {
  display: inline-block;
  width: 20px;
  margin-right: 8px;
}

/* Divider */
.immobilia-footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 32px 0;
}


.immobilia-footer-copyright {
  font-size: 14px;
  opacity: 0.7;
}

.immobilia-footer-creator {
  font-size: 12px;
  margin-bottom: 0.5rem;
  opacity: 0.7;
}

@media (min-width: 768px) {
  .immobilia-footer-creator {
    font-size: 13px;
  }
}

.immobilia-creator-name {
  color: #25D366;
  font-weight: 500;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.immobilia-creator-name:hover {
  opacity: 0.8;
}


.immobilia-footer-legal a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.immobilia-footer-legal a:hover {
  color: #25D366;
}

/* Responsive bottom section */
.immobilia-footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

@media (min-width: 768px) {
  .immobilia-footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.immobilia-footer-legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

@media (min-width: 768px) {
  .immobilia-footer-legal {
    gap: 1.5rem;
  }
}
</style>