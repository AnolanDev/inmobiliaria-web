# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 TypeScript SPA for a real estate platform (inmobiliaria) that consumes APIs from a Laravel backend. The frontend provides public access to properties, projects, agents, and contact forms.

## Development Commands

```bash
# Development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint and fix code
npm run lint

# Format code with Prettier
npm run format
```

## Architecture

### Tech Stack
- **Vue 3** with Composition API and TypeScript
- **Pinia** for state management
- **Vue Router** for routing with lazy loading
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **Vite** as build tool

### API Integration
- Backend proxy configured in `vite.config.ts` to route `/api` calls to `localhost:8000`
- Centralized API service in `src/services/api.ts` with interceptors for auth and error handling
- Environment variables: `VITE_API_BASE_URL` and `VITE_APP_NAME`

### State Management (Pinia Stores)
- `auth.ts` - Authentication with localStorage persistence
- `properties.ts` - Property listings and filtering
- `projects.ts` - Project management
- `agents.ts` - Agent directory
- `filters.ts` - Filter options and search
- `contact.ts` - Contact forms and appointments

### Routing Structure
- `/` - Home page with hero section
- `/proyectos` - Projects listing
- `/proyectos/:id` - Project detail
- `/propiedades` - Properties listing  
- `/propiedades/:id` - Property detail
- `/agentes` - Agents directory
- `/agentes/:id` - Agent profile
- `/contacto` - Contact forms
- `/login` - Admin access (redirects to Laravel admin panel)

### Component Structure
- **Base Components**: `BaseButton`, `BaseCard`, `BaseInput` for consistency
- **Feature Components**: `ProjectCard`, `PropertyCard`, `AppLayout`
- **Views**: Page-level components in `src/views/`

### TypeScript Types
Comprehensive type definitions in `src/types/index.ts` covering:
- API responses with pagination
- Property, Project, and Agent entities
- Form types (Contact, Appointment, Login)
- Filter and search parameters

### Backend API Endpoints
**Public APIs (no auth required):**
- `GET /api/public/projects` - Projects listing
- `GET /api/public/properties` - Properties listing  
- `GET /api/public/agents` - Agents directory
- `POST /api/public/contact` - Contact form submission
- `POST /api/public/appointments` - Appointment scheduling

**Auth APIs:**
- `POST /api/auth/login` - Admin login (redirects to Laravel admin)
- `POST /api/auth/logout` - Logout

## Development Notes

- Uses `@` alias for `src/` directory imports
- All routes use lazy loading for code splitting
- Auto-generated page titles via router meta
- Auth token stored in localStorage with automatic cleanup on 401 errors
- Responsive design with mobile-first Tailwind CSS approach
- Backend relationship: companion to Laravel API at `../inmobiliaria/`