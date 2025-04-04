import axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import { retryAdapterEnhancer } from 'axios-extensions';


export namespace clientService {
  export function getById(clientId: string): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    return api.get(`/clients/${clientId}`).then((response) => response.data);
  }
  export function getAll(): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Implement the API call logic here
    return Promise.resolve([]); // Replace with actual API response
  }
  export function create(client: any): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Implement the API call logic here
    return api.post('/clients', client).then((response) => response.data); // Perform API call to create the client
  }
  export function update(clientId: string, client: any): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    return api.put(`/clients/${clientId}`, client).then((response) => response.data); // Perform API call to update the client
  }
  export function deleteClient(clientId: string): Promise<void> { // eslint-disable-line @typescript-eslint/no-explicit-any
    return api.delete(`/clients/${clientId}`).then(() => undefined); // Perform API call to delete the client
  }
}

  // Removed redundant export statement for clientService
// }
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { useNotificationStore } from '../lib/store';
// import { useAuth } from '../contexts/AuthContext';
// import { useQueryClient } from '@tanstack/react-query';
// import { useClient } from '../hooks/useClient';
// import { useClients } from '../hooks/useClients';
// import { useConsultation } from '../hooks/useConsultation';
// import { useThread } from '../hooks/useThread';
// import { useMessage } from '../hooks/useMessage';
// import { useNotification } from '../hooks/useNotification';
// Step 1: Setup cache
const cache = setupCache({
  maxAge: 15 * 60 * 1000, // 15 minutes
  exclude: { query: false } // cache GET requests with query params too
});

// Step 2: Create axios instance with retry + cache
const api: AxiosInstance = axios.create({
  adapter: retryAdapterEnhancer(cache.adapter),
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://your-api-url.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // You can add retry logic here if needed
});

// Step 3: Optional request/response interceptors
api.interceptors.request.use(
  (config) => {
    // Optionally add auth token or logging
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;

export function getById(_clientId: string): any {
  throw new Error('Function not implemented.');
}


export function update(_clientId: string, _data: any): Promise<unknown> {
  throw new Error('Function not implemented.');
}


export function deleteClient(_id: string) {
  throw new Error('Function not implemented.');
}


export function getAll(): any {
  throw new Error('Function not implemented.');
}


export function create(_data: any): Promise<unknown> {
  throw new Error('Function not implemented.');
}
