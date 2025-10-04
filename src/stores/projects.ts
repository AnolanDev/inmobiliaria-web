import { defineStore } from "pinia";
import { ref } from "vue";
import type { Project, ProjectFilters, ApiResponse } from "@/types";
import { apiService } from "@/services/api";

export const useProjectsStore = defineStore("projects", () => {
  const projects = ref<Project[]>([]);
  const currentProject = ref<Project | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const lastFetch = ref<number>(0);
  const CACHE_TIME = 5 * 60 * 1000; // 5 minutes cache
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  });

  const fetchProjects = async (filters?: ProjectFilters, forceRefresh = false) => {
    // Return cached data if available and not forcing refresh
    const now = Date.now();
    if (!forceRefresh && projects.value.length > 0 && (now - lastFetch.value) < CACHE_TIME) {
      return Promise.resolve(projects.value);
    }

    loading.value = true;
    error.value = null;

    try {
      const response: ApiResponse<Project[]> =
        await apiService.getProjects(filters);
      projects.value = response.data;
      lastFetch.value = now;

      if (response.meta) {
        pagination.value = response.meta;
      }
      
      return projects.value;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error al cargar proyectos";
      console.error("Error fetching projects:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchProject = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      currentProject.value = await apiService.getProject(id);
    } catch (err: any) {
      if (err.response?.status === 404) {
        error.value = "Proyecto no encontrado";
      } else if (err.response?.status === 500) {
        error.value = "Error del servidor al cargar el proyecto";
      } else {
        error.value = err.response?.data?.message || "Error al cargar proyecto";
      }
      console.error("Error fetching project:", err);
      currentProject.value = null;
    } finally {
      loading.value = false;
    }
  };

  const clearCurrentProject = () => {
    currentProject.value = null;
  };

  return {
    projects,
    currentProject,
    loading,
    error,
    pagination,
    fetchProjects,
    fetchProject,
    clearCurrentProject,
  };
});
