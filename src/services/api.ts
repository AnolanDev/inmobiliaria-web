import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import type { 
  ApiResponse, 
  Project, 
  Property, 
  Agent, 
  FilterOptions,
  ContactForm,
  AppointmentForm,
  LoginForm,
  AuthResponse,
  PropertyFilters,
  ProjectFilters
} from '@/types'

class ApiService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    // Request interceptor for auth token
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // Projects API
  async getProjects(filters?: ProjectFilters): Promise<ApiResponse<Project[]>> {
    const response: AxiosResponse<ApiResponse<Project[]>> = await this.client.get('/public/projects', {
      params: filters
    })
    return response.data
  }

  async getProject(id: number): Promise<Project> {
    const response: AxiosResponse<Project> = await this.client.get(`/public/projects/${id}`)
    return response.data
  }

  // Properties API
  async getProperties(filters?: PropertyFilters): Promise<ApiResponse<Property[]>> {
    const response: AxiosResponse<ApiResponse<Property[]>> = await this.client.get('/public/properties', {
      params: filters
    })
    return response.data
  }

  async getProperty(id: number): Promise<Property> {
    const response: AxiosResponse<Property> = await this.client.get(`/public/properties/${id}`)
    return response.data
  }

  // Agents API
  async getAgents(): Promise<Agent[]> {
    const response: AxiosResponse<Agent[]> = await this.client.get('/public/agents')
    return response.data
  }

  async getAgent(id: number): Promise<Agent> {
    const response: AxiosResponse<Agent> = await this.client.get(`/public/agents/${id}`)
    return response.data
  }

  // Filter Options API
  async getFilterOptions(): Promise<FilterOptions> {
    const response: AxiosResponse<FilterOptions> = await this.client.get('/public/filter-options')
    return response.data
  }

  // Contact API
  async submitContact(data: ContactForm): Promise<{ message: string; lead_id: number }> {
    const response = await this.client.post('/public/contact', data)
    return response.data
  }

  // Appointments API
  async scheduleAppointment(data: AppointmentForm): Promise<{ message: string; appointment: any }> {
    const response = await this.client.post('/public/appointments', data)
    return response.data
  }

  // Authentication API
  async login(credentials: LoginForm): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.client.post('/auth/login', credentials)
    return response.data
  }

  async logout(): Promise<{ message: string }> {
    const response = await this.client.post('/auth/logout')
    return response.data
  }

  async getUser(): Promise<any> {
    const response = await this.client.get('/auth/user')
    return response.data
  }
}

export const apiService = new ApiService()
export default apiService