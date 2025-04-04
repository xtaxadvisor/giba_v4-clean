import React, { createContext, useContext } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: {
    name: string;
    role: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}
// Ensure this file contains the UserContext definition and export
// Example:
const UserContext = React.createContext<User | null>(null);
export { UserContext };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Development mock users with full permissions
const mockUsers: Record<string, User> = {
  professional: {
    id: 'dev-professional',
    name: 'Development Professional',
    email: 'professional@example.com',
    role: 'professional',
    displayName: 'Development Professional',
    avatarUrl: 'https://via.placeholder.com/40',
    createdAt: new Date().toISOString(),
    location: 'Development'
  },
  student: {
    id: 'dev-student',
    name: 'Development Student',
    email: 'student@example.com',
    role: 'student',
    displayName: 'Development Student',
    avatarUrl: 'https://via.placeholder.com/40',
    createdAt: new Date().toISOString(),
    location: 'Development'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Return mock data for development
  const value = {
    user: mockUsers.professional, // Default to professional user
    loading: false,
    isAuthenticated: true, // Always authenticated in development
    login: async () => {},
    register: async () => {},
    logout: async () => {
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext }