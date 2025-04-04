import { clearDevSession } from '@/lib/auth/devBypass';

export function useAuth() {
  const devSession: { user?: { id: string; role: string; name: string; email: string }; role?: string } | null = {
    user: undefined,
    role: undefined
  }; // Replace with actual logic if needed
  const user = devSession?.user || {
    id: 'test-admin',
    role: 'admin',
    name: 'Test Admin',
    email: 'admin@example.com'
  };
  const role = devSession?.role || 'admin';

  return {
    user,
    role,
    loading: false,
    isAuthenticated: !!devSession?.user,
    login: async () => {
      // Optional: could implement dynamic login inject here
    },
    register: async () => {
      // Optional: mock registration logic
    },
    logout: async () => {
      clearDevSession(); // Clear only dev-related keys
      localStorage.clear(); // Clear all local storage
      window.location.href = '/'; // Reset app state
    }
  };
}