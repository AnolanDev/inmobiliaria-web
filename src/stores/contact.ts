import { defineStore } from "pinia";
import { ref } from "vue";
import type { ContactForm, AppointmentForm } from "@/types";
import { apiService } from "@/services/api";

export const useContactStore = defineStore("contact", () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref<string | null>(null);
  const lastLeadId = ref<number | null>(null);

  const submitContact = async (data: ContactForm) => {
    loading.value = true;
    error.value = null;
    success.value = null;

    try {
      const response = await apiService.submitContact(data);
      success.value = response.message;
      lastLeadId.value = response.lead_id;
      return response;
    } catch (err: any) {
      console.error("Contact store error:", err);
      console.error("Error response:", err.response?.data);
      
      if (err.response?.status === 500) {
        error.value = "Error interno del servidor. Inténtalo más tarde.";
      } else {
        error.value = err.response?.data?.message || "Error al enviar el formulario";
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const scheduleAppointment = async (data: AppointmentForm) => {
    loading.value = true;
    error.value = null;
    success.value = null;

    try {
      const response = await apiService.scheduleAppointment(data);
      success.value = response.message;
      return response;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error al agendar la cita";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearMessages = () => {
    error.value = null;
    success.value = null;
  };

  return {
    loading,
    error,
    success,
    lastLeadId,
    submitContact,
    scheduleAppointment,
    clearMessages,
  };
});
