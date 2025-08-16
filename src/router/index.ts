import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue'),
      meta: {
        title: 'Inicio - Inmobiliaria'
      }
    },
    {
      path: '/proyectos',
      name: 'projects',
      component: () => import('@/views/ProjectsPage.vue'),
      meta: {
        title: 'Proyectos - Inmobiliaria'
      }
    },
    {
      path: '/proyectos/:id',
      name: 'project-detail',
      component: () => import('@/views/ProjectDetailPage.vue'),
      meta: {
        title: 'Detalle del Proyecto - Inmobiliaria'
      }
    },
    {
      path: '/propiedades',
      name: 'properties',
      component: () => import('@/views/PropertiesPage.vue'),
      meta: {
        title: 'Propiedades - Inmobiliaria'
      }
    },
    {
      path: '/propiedades/:id',
      name: 'property-detail',
      component: () => import('@/views/PropertyDetailPage.vue'),
      meta: {
        title: 'Detalle de la Propiedad - Inmobiliaria'
      }
    },
    {
      path: '/agentes',
      name: 'agents',
      component: () => import('@/views/AgentsPage.vue'),
      meta: {
        title: 'Agentes - Inmobiliaria'
      }
    },
    {
      path: '/agentes/:id',
      name: 'agent-detail',
      component: () => import('@/views/AgentDetailPage.vue'),
      meta: {
        title: 'Perfil del Agente - Inmobiliaria'
      }
    },
    {
      path: '/contacto',
      name: 'contact',
      component: () => import('@/views/ContactPage.vue'),
      meta: {
        title: 'Contacto - Inmobiliaria'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue'),
      meta: {
        title: 'Acceso al Sistema - Inmobiliaria'
      }
    }
  ]
})

// Update document title
router.beforeEach((to) => {
  document.title = to.meta?.title as string || 'Inmobiliaria'
})

export default router