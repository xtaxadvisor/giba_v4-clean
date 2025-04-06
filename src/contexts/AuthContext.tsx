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
    location: 'Development',
    lastActiveAt: new Date().toISOString()
  },
  student: {
    id: 'dev-student',
    name: 'Development Student',
    email: 'student@example.com',
    role: 'student',
    displayName: 'Development Student',
    avatarUrl: 'https://via.placeholder.com/40',
    location: 'Development',
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString()
  }
  }
  export const UserContext = createContext<User | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars 
  export const UserProvider = AuthProvider; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserConsumer = AuthContext.Consumer; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextProvider = AuthProvider; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextConsumer = AuthContext.Consumer; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValue = mockUsers; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMock = mockUsers; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockProfessional = mockUsers.professional; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockStudent = mockUsers.student; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockProfessionalId = mockUsers.professional.id; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockStudentId = mockUsers.student.id; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockProfessionalName = mockUsers.professional.name; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockStudentName = mockUsers.student.name; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockProfessionalEmail = mockUsers.professional.email; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockStudentEmail = mockUsers.student.email; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockProfessionalRole = mockUsers.professional.role; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockStudentRole = mockUsers.student.role; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockProfessionalDisplayName = mockUsers.professional.displayName; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockStudentDisplayName = mockUsers.student.displayName; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockProfessionalAvatarUrl = mockUsers.professional.avatarUrl; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockStudentAvatarUrl = mockUsers.student.avatarUrl; // eslint-disable-line @typescript-eslint/no-unused-vars   
  export const UserContextValueMockProfessionalCreatedAt = mockUsers.professional.createdAt; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockStudentCreatedAt = mockUsers.student.createdAt; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockProfessionalLocation = mockUsers.professional.location; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockStudentLocation = mockUsers.student.location; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockProfessionalLastActiveAt = mockUsers.professional.lastActiveAt; // eslint-disable-line @typescript-eslint/no-unused-vars
  export const UserContextValueMockStudentLastActiveAt = mockUsers.student.lastActiveAt; // eslint-disable-line @typescript-eslint/no-unused-vars
   
  
; // TODO: Remove this mock data in production  

const mockRole: keyof typeof mockUsers = 'professional'; // Change to 'student' if needed

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Return mock data for development
  const value = {
    user: mockUsers[mockRole],
    loading: false,
    isAuthenticated: true,
    login: async () => {
      console.warn('Login is mocked');
    },
    register: async () => {
      console.warn('Register is mocked');
    },
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