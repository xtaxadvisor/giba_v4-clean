import { useAuth } from '../../contexts/AuthContext';
import { useNotificationStore } from '../../lib/store';
import { getPortalConfig } from './portalConfig';

export function usePortalManager() {
  const { user, isAuthenticated } = useAuth();
  const { addNotification } = useNotificationStore();

  console.log('[PortalAccess] User:', user);

  const checkPortalAccess = (portalId: string): boolean => {
    const config = getPortalConfig(portalId);
    if (!config) return false;

    if (import.meta.env.DEV) return true; // ✅ Allow all access in dev

    if (!isAuthenticated) return false;

    if (config.requiredRole && (!user?.role || !config.requiredRole.includes(user.role))) {
      return false;
    }

    return true;
  };

  const handlePortalAccess = (
    portalId: string
  ): { canAccess: boolean; redirectPath?: string } => {
    const config = getPortalConfig(portalId);
    if (!config) {
      addNotification('Portal not found', 'error');
      return { canAccess: false };
    }

    // ✅ DEV mode shortcut
    if (import.meta.env.DEV) {
      console.log(`[DevMode] Bypassing access checks for ${portalId}`);
      return { canAccess: true };
    }

    if (!isAuthenticated) {
      return {
        canAccess: false,
        redirectPath: `/login?redirect=${portalId}`,
      };
    }

    if (config.requiredRole && (!user?.role || !config.requiredRole.includes(user.role))) {
      addNotification('You do not have permission to access this portal', 'error');
      return { canAccess: false };
    }

    return { canAccess: true };
  };

  return {
    checkPortalAccess,
    handlePortalAccess,
  };
}