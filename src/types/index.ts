// API Response types
export interface ApiResponse<T> {
  data: T
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

// Project types
export interface Project {
  id: number
  name: string
  description: string
  type: string
  status: string
  property_count: number
  city?: string
  state?: string
  location?: string
  cover_image: string
  gallery: string[]
  videos: string[]
  cover_image_url: string
  gallery_urls: string[]
  type_color: string
  status_color: string
  properties?: Property[]
  agent?: Agent
  created_at: string
  updated_at: string
}

// Property types
export interface Property {
  id: number
  title: string
  description: string
  price: number
  type: string
  category: string
  address: string
  city: string
  state: string
  zip_code: string
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  features: string[]
  status: string
  cover_image: string
  gallery: string[]
  videos: string[]
  cover_image_url: string
  gallery_urls: string[]
  video_urls: string[]
  agent_id: number
  project_id: number
  agent?: Agent
  project?: Project
  created_at: string
  updated_at: string
}

// Agent types
export interface Agent {
  id: number
  name: string
  email: string
  phone: string
  type: string
  bio: string
  profile_picture: string
  facebook: string
  instagram: string
  linkedin: string
  is_active: boolean
  profile_picture_url: string
  gallery_urls: string[]
  video_urls: string[]
  properties_count?: number
  properties?: Property[]
  created_at: string
  updated_at: string
}

// Filter types
export interface FilterOptions {
  property_types: string[]
  property_categories: string[]
  project_types: string[]
  cities: string[]
  bedrooms: number[]
  bathrooms: number[]
  price_ranges: PriceRange[]
}

export interface PriceRange {
  label: string
  min: number
  max: number | null
}

// Form types
export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  property_id?: number
  project_id?: number
  preferred_contact?: 'email' | 'phone' | 'whatsapp'
  budget_range?: string
}

export interface AppointmentForm {
  property_id: number
  agent_id: number
  client_name: string
  client_email: string
  client_phone: string
  preferred_date: string
  preferred_time: string
  message?: string
  visit_type?: 'presencial' | 'virtual'
}

// Authentication types
export interface LoginForm {
  email: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  message: string
  user: User
  token: string
  admin_url: string
}

// Blog types
export interface Blog {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  featured_image_url: string
  gallery: string[]
  gallery_urls: string[]
  author_name: string
  author_avatar?: string
  category: string
  tags: string[]
  published_at: string
  reading_time?: number
  views_count?: number
  is_featured: boolean
  status: 'published' | 'draft' | 'scheduled'
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}

// Search and filter types
export interface PropertyFilters {
  project_id?: number
  type?: string
  category?: string
  min_price?: number
  max_price?: number
  bedrooms?: number
  bathrooms?: number
  min_area?: number
  max_area?: number
  city?: string
}

export interface ProjectFilters {
  type?: string
  location?: string
  min_price?: number
  max_price?: number
}

export interface BlogFilters {
  category?: string
  tag?: string
  author?: string
  featured?: boolean
  page?: number
  per_page?: number
  include?: string
  with?: string
  fields?: string
}