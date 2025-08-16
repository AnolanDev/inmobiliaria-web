# Inmobiliaria Web - SPA Vue.js

SPA público para la plataforma inmobiliaria construido con Vue 3, TypeScript y Tailwind CSS.

## 🚀 Características

- **Vue 3** con Composition API y TypeScript
- **Vue Router** para navegación SPA
- **Pinia** para manejo de estado
- **Tailwind CSS** para estilos
- **Axios** para comunicación con APIs
- **Responsive Design** mobile-first
- **Integración completa** con APIs de Laravel

## 📋 Páginas Principales

- **Inicio**: Hero section y características principales
- **Proyectos**: Catálogo de proyectos inmobiliarios
- **Propiedades**: Búsqueda y filtrado de propiedades
- **Agentes**: Directorio de agentes especializados
- **Contacto**: Formularios de contacto y citas
- **Login**: Acceso al sistema administrativo

## 🛠️ Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (puerto 3000)
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview
```

## 🔧 Configuración

### Variables de Entorno

Archivo `.env` para desarrollo:
```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME="Inmobiliaria Web"
```

Archivo `.env.production` para producción:
```
VITE_API_BASE_URL=https://tu-dominio-laravel.com/api
VITE_APP_NAME="Inmobiliaria Web"
```

### Proxy de Desarrollo

El proyecto está configurado para hacer proxy de las llamadas `/api` al backend Laravel en `localhost:8000`.

## 📦 Estructura del Proyecto

```
src/
├── assets/          # Recursos estáticos (CSS, imágenes)
├── components/      # Componentes reutilizables
├── router/          # Configuración de rutas
├── services/        # Servicios API y utilidades
├── stores/          # Stores de Pinia
├── types/           # Tipos TypeScript
├── utils/           # Funciones de utilidad
└── views/           # Páginas/vistas principales
```

## 🔗 Integración con Backend

El SPA se conecta a las siguientes APIs de Laravel:

### APIs Públicas (sin autenticación)
- `GET /api/public/projects` - Lista de proyectos
- `GET /api/public/properties` - Lista de propiedades
- `GET /api/public/agents` - Lista de agentes
- `POST /api/public/contact` - Envío de formularios
- `POST /api/public/appointments` - Agendamiento de citas

### APIs de Autenticación
- `POST /api/auth/login` - Login para acceso al backoffice
- `POST /api/auth/logout` - Cerrar sesión

## 🎨 Diseño y UX

- **Framework CSS**: Tailwind CSS
- **Colores principales**: Verde (primary) y grises
- **Tipografía**: Inter font family
- **Responsive**: Mobile-first approach
- **Componentes**: Cards, botones y formularios consistentes

## 🔄 Estado de Desarrollo

### ✅ Completado
- Configuración base del proyecto
- Estructura de directorios y archivos
- Configuración de TypeScript y Tailwind
- Router básico con todas las rutas
- Servicios API y stores principales
- Página de inicio funcional
- Páginas de proyectos y propiedades básicas

### 🚧 En Desarrollo
- Componentes de filtrado avanzado
- Páginas de detalle (proyecto, propiedad, agente)
- Formularios de contacto y citas
- Sistema de autenticación completo
- Galería de imágenes y videos
- Optimizaciones de performance

## 📝 Próximos Pasos

1. Implementar componentes de filtrado
2. Desarrollar páginas de detalle
3. Crear formularios interactivos
4. Añadir galería de medios
5. Implementar SEO y meta tags
6. Testing y optimizaciones
7. Deploy a producción

## 🤝 Conexión con Backend

Este frontend consume las APIs del proyecto Laravel ubicado en `../inmobiliaria/`. Asegúrate de que el backend esté corriendo en `localhost:8000` para desarrollo local.