import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type {
  ApiResponse,
  Project,
  Property,
  Agent,
  Blog,
  FilterOptions,
  ContactForm,
  AppointmentForm,
  LoginForm,
  AuthResponse,
  PropertyFilters,
  ProjectFilters,
  BlogFilters,
} from "@/types";

class ApiService {
  private client: AxiosInstance;

  constructor() {
    const isProduction = import.meta.env.PROD;
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest", // Importante para Laravel
      },
      // En producción usamos las URLs directas sin cookies, en desarrollo usamos proxy con cookies
      withCredentials: !isProduction,
    });

    // Request interceptor for auth token
    this.client.interceptors.request.use(async (config) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }


  // Projects API
  async getProjects(filters?: ProjectFilters): Promise<ApiResponse<Project[]>> {
    const response: AxiosResponse<ApiResponse<Project[]>> =
      await this.client.get("/public/projects", {
        params: filters,
      });
    return response.data;
  }

  async getProject(id: number): Promise<Project> {
    const response: AxiosResponse<Project> = await this.client.get(
      `/public/projects/${id}`,
    );
    return response.data;
  }

  // Properties API
  async getProperties(
    filters?: PropertyFilters,
  ): Promise<ApiResponse<Property[]>> {
    const response: AxiosResponse<ApiResponse<Property[]>> =
      await this.client.get("/public/properties", {
        params: filters,
      });
    return response.data;
  }

  async getProperty(id: number): Promise<Property> {
    const response: AxiosResponse<Property> = await this.client.get(
      `/public/properties/${id}`,
    );
    return response.data;
  }

  // Agents API
  async getAgents(): Promise<Agent[]> {
    const response: AxiosResponse<Agent[]> =
      await this.client.get("/public/agents");
    return response.data;
  }

  async getAgent(id: number): Promise<Agent> {
    const response: AxiosResponse<Agent> = await this.client.get(
      `/public/agents/${id}`,
    );
    return response.data;
  }

  // Blogs API
  async getBlogs(filters?: BlogFilters): Promise<ApiResponse<Blog[]>> {
    const response: AxiosResponse<ApiResponse<Blog[]>> = await this.client.get(
      "/public/blogs",
      {
        params: filters,
      },
    );
    return response.data;
  }

  async getBlog(id: number): Promise<Blog>;
  async getBlog(slug: string): Promise<Blog>;
  async getBlog(idOrSlug: number | string): Promise<Blog> {
    const response: AxiosResponse<Blog> = await this.client.get(
      `/public/blogs/${idOrSlug}`,
    );
    return response.data;
  }

  async getFeaturedBlogs(): Promise<Blog[]> {
    const response: AxiosResponse<Blog[]> = await this.client.get(
      "/public/blogs/featured",
    );
    return response.data;
  }

  async getBlogCategories(): Promise<string[]> {
    const response: AxiosResponse<string[]> = await this.client.get(
      "/public/blogs/categories",
    );
    return response.data;
  }

  async getBlogTags(): Promise<string[]> {
    const response: AxiosResponse<string[]> =
      await this.client.get("/public/blogs/tags");
    return response.data;
  }

  // Filter Options API
  async getFilterOptions(): Promise<FilterOptions> {
    const response: AxiosResponse<FilterOptions> = await this.client.get(
      "/public/filter-options",
    );
    return response.data;
  }

  // Contact API
  async submitContact(
    data: ContactForm,
  ): Promise<{ message: string; lead_id: number }> {
    console.log("📤 Sending contact data:", data);
    
    try {
      const response = await this.client.post("/public/contact", data);
      console.log("✅ Contact response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Contact API error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
      
      // Si es error 419 CSRF en producción, intentar petición directa
      if (error.response?.status === 419 && import.meta.env.PROD) {
        console.log("🔄 CSRF Error - Retrying with direct request...");
        
        try {
          const directClient = axios.create({
            timeout: 15000,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: false,
          });
          
          const directResponse = await directClient.post(
            `${import.meta.env.VITE_API_BASE_URL}/public/contact`,
            data
          );
          console.log("✅ Direct request successful:", directResponse.data);
          return directResponse.data;
        } catch (directError: any) {
          console.error("❌ Direct request also failed:", directError.response?.data);
          throw directError;
        }
      }
      
      throw error;
    }
  }

  // Appointments API
  async scheduleAppointment(
    data: AppointmentForm,
  ): Promise<{ message: string; appointment: any }> {
    const response = await this.client.post("/public/appointments", data);
    return response.data;
  }

  // Authentication API
  async login(credentials: LoginForm): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.client.post(
      "/auth/login",
      credentials,
    );
    return response.data;
  }

  async logout(): Promise<{ message: string }> {
    const response = await this.client.post("/auth/logout");
    return response.data;
  }

  async getUser(): Promise<any> {
    const response = await this.client.get("/auth/user");
    return response.data;
  }

  // Health check for API availability
  async checkHealth(): Promise<boolean> {
    try {
      const response = await this.client.get('/public/projects?limit=1');
      return response.status === 200;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('API health check failed:', error);
      }
      return false;
    }
  }

  // Utility method to convert backend URLs to proxy URLs
  static getProxyImageUrl(backendUrl: string | null | undefined): string | null {
    if (!backendUrl) return null;
    
    // Si ya es una URL relativa, devolverla tal como está
    if (backendUrl.startsWith('/')) {
      return backendUrl;
    }
    
    // Si es una URL completa de app.tierrasonada.com, convertirla a proxy local
    if (backendUrl.includes('app.tierrasonada.com')) {
      // Extraer solo la parte /storage/... de la URL completa
      const match = backendUrl.match(/\/storage\/.*$/);
      if (match) {
        return match[0];
      }
    }
    
    // Si es otra URL (como Unsplash), devolverla tal como está
    return backendUrl;
  }

  // Process responsive image set
  static processResponsiveImageSet(responsiveSet: any): any {
    if (!responsiveSet) return null;

    const processed = { ...responsiveSet };
    
    // Process each variant
    if (processed.thumbnail?.url) {
      processed.thumbnail.url = this.getProxyImageUrl(processed.thumbnail.url);
    }
    if (processed.medium?.url) {
      processed.medium.url = this.getProxyImageUrl(processed.medium.url);
    }
    if (processed.large?.url) {
      processed.large.url = this.getProxyImageUrl(processed.large.url);
    }
    if (processed.original?.url) {
      processed.original.url = this.getProxyImageUrl(processed.original.url);
    }

    return processed;
  }
}

export const apiService = new ApiService();
export { ApiService };
export default apiService;
