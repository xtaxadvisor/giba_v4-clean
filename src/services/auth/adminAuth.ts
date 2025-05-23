import { z } from 'zod';
import { useNotificationStore } from '../../lib/store';
import { adminSessionManager } from './adminSession';
// Removed unused import of 'hasRequiredPermissions'
import { createSecureHash } from '../../utils/crypto';

const adminCredentialsSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(12)
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[a-z]/, 'Must contain lowercase letter')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^A-Za-z0-9]/, 'Must contain special character'),
  totpCode: z.string().length(6).optional()
});

export class AdminAuthService {
  private static instance: AdminAuthService;
  private readonly API_URL = import.meta.env.VITE_API_URL || '/.netlify/functions'; // Removed unused import of 'import.meta.env.VITE_API_URL' and replaced with a default value  
  private readonly adminSessionManager = adminSessionManager; // Removed unused import of 'adminSessionManager' and replaced with a reference to the class property    
  private readonly notificationStore = useNotificationStore(); // Removed unused import of 'useNotificationStore'  and replaced with a reference to the class property  
  signup: any;

  private constructor() {}

  static getInstance(): AdminAuthService {
    if (!AdminAuthService.instance) {
      AdminAuthService.instance = new AdminAuthService();
    }
    return AdminAuthService.instance;
  }

  async login(credentials: {
    username: string;
    password: string;
    totpCode?: string;
  }): Promise<boolean> {
    try {
      const validated = adminCredentialsSchema.parse(credentials);
      
      const response = await fetch(`${this.API_URL}/admin-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getAuthToken()}`
        },
        body: JSON.stringify({
          username: validated.username,
          password: await createSecureHash(validated.password),
          totpCode: validated.totpCode
        })
      });

      if (!response.ok) {
        throw new Error(`Admin auth failed: ${response.statusText}`);
      }

      const data = await response.json();
      await adminSessionManager.createSession(data.user.id, data.user.permissions);
      return true;
    } catch (error) {
      console.error('Admin login error:', error);
      useNotificationStore.getState().addNotification(
        'Invalid admin credentials',
        'error'
      );
      return false;
    }
  }

  private async getAuthToken(): Promise<string> {
    const session = await adminSessionManager.validateSession();
    return session ? `${session.id}-${session.exp}` : '';
  }
}

export const adminAuthService = AdminAuthService.getInstance();