import type { Thread } from '../../types/messaging';

const API_BASE_URL = 'https://your-api-base-url.com';

async function fetchJson<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export const threadService = {
  /**
   * Get all message threads
   */
  getAll: async (): Promise<Thread[]> => {
    return await fetchJson<Thread[]>('/threads');
  },

  /**
   * Create a new thread
   * @param data - Thread creation payload
   */
  create: async (data: Partial<Thread>): Promise<Thread> => {
    return await fetchJson<Thread>('/threads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a thread by ID
   * @param id - Thread ID
   */
  delete: async (id: string): Promise<void> => {
    await fetchJson(`/threads/${id}`, {
      method: 'DELETE',
    });
  },
};