import type { appointmentService } from '../lib/auth/types';
import { fetchWithRetry } from '@/services/api/retry';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetchWithRetry<T>(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  return response;
}

export const appointmentServiceAPI = {
  async getAppointmentService(): Promise<appointmentService[]> {
    return await fetchJson('/appointments');
  },

  async getAvailability(): Promise<{ time: string; available: boolean }[]> {
    return Promise.resolve([
      { time: '10:00 AM', available: true },
      { time: '11:00 AM', available: false },
    ]);
  },

  getAll: (): Promise<appointmentService[]> => {
    return fetchJson('/appointments');
  },

  getById: async (id: string): Promise<appointmentService> => {
    return await fetchJson(`/appointments/${id}`);
  },

  create: (data: Partial<appointmentService>): Promise<appointmentService> => {
    return fetchJson('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: Partial<appointmentService>): Promise<appointmentService> => {
    return fetchJson(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (id: string): Promise<void> => {
    return fetchJson(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },

  initiateAppointment: async (serviceType: string): Promise<string> => {
    try {
      const response = await fetchJson<{ redirectUrl: string }>(
        '/appointments/initiate',
        {
          method: 'POST',
          body: JSON.stringify({ serviceType }),
        }
      );
      return response.redirectUrl;
    } catch (error) {
      console.error('Failed to initiate appointment:', error);
      throw error;
    }
  }
};