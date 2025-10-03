import { defineStore } from "pinia";
import { ref } from "vue";
import type { Project, ProjectFilters, ApiResponse } from "@/types";
import { apiService } from "@/services/api";

export const useProjectsStore = defineStore("projects", () => {
  const projects = ref<Project[]>([]);
  const currentProject = ref<Project | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  });

  const fetchProjects = async (filters?: ProjectFilters) => {
    loading.value = true;
    error.value = null;

    try {
      const response: ApiResponse<Project[]> =
        await apiService.getProjects(filters);
      projects.value = response.data;

      if (response.meta) {
        pagination.value = response.meta;
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error al cargar proyectos";
      console.error("Error fetching projects:", err);
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
