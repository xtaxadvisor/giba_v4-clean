import { useContext } from 'react';
// import { Navigate } from 'react-router-dom'; // Removed as it is unused
import { UserContext } from '../../contexts/AuthContext';
import type { User, UserRole } from '@/lib/auth/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const user = useContext(UserContext) as User | null;

  console.log('[ProtectedRoute]', {
    user,
    requiredRole,
    isAuthenticated: !!user
  });

  const hasAccess =
    user &&
    (requiredRole?.includes(user.role) || user.role === ('superadmin' as UserRole));

  if (!hasAccess) {
    if (import.meta.env.DEV) {
      console.warn('[ProtectedRoute] Access denied for role:', user?.role);
    }

    return (
      <div className="p-6 text-center text-red-600">
        You do not have permission to access this page.
      </div>
    );

    // OR: return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
}
