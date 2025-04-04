import { fetchWithRetry } from './retry';

// Removed redundant namespace declaration for clientService

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-api-url.com';

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

export const clientService = {
  getById(clientId: string): Promise<any> {
    return fetchJson(`/clients/${clientId}`);
  },

  getAll(): Promise<any> {
    return fetchJson('/clients');
  },

  create(client: any): Promise<any> {
    return fetchJson('/clients', {
      method: 'POST',
      body: JSON.stringify(client),
    });
  },

  update(clientId: string, client: any): Promise<any> {
    return fetchJson(`/clients/${clientId}`, {
      method: 'PUT',
      body: JSON.stringify(client),
    });
  },

  remove(clientId: string): Promise<void> {
    return fetchJson(`/clients/${clientId}`, {
      method: 'DELETE',
    });
  }
};
