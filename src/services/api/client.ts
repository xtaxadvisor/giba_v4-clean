import { fetchWithRetry } from './retry';

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

export namespace clientService {
  export function getById(clientId: string): Promise<any> {
    return fetchJson(`/clients/${clientId}`);
  }

  export function getAll(): Promise<any> {
    return fetchJson('/clients');
  }

  export function create(client: any): Promise<any> {
    return fetchJson('/clients', {
      method: 'POST',
      body: JSON.stringify(client),
    });
  }

  export function update(clientId: string, client: any): Promise<any> {
    return fetchJson(`/clients/${clientId}`, {
      method: 'PUT',
      body: JSON.stringify(client),
    });
  }

  export function deleteClient(clientId: string): Promise<void> {
    return fetchJson(`/clients/${clientId}`, {
      method: 'DELETE',
    });
  }
}
