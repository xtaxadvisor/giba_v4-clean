import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  Database,
  Activity,
  UserPlus
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

const wrapIcon = (Icon: LucideIcon): React.FC<React.SVGProps<SVGSVGElement>> =>  { 
  return React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => <Icon {...props} ref={ref} />) as React.FC<React.SVGProps<SVGSVGElement>>;
}
import { useAuth } from '../../../contexts/AuthContext';
import { MenuItem } from '@/types';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
const menuItems: MenuItem[] = [
  { title: 'Dashboard', href: '/admin', icon: wrapIcon(Home) },
  { title: 'Team Management', href: '/admin/team', icon: wrapIcon(Users) },
  { title: 'User Management', href: '/admin/users', icon: wrapIcon(UserPlus) },
  { title: 'System Logs', href: '/admin/logs', icon: wrapIcon(Activity) },
  { title: 'Database', href: '/admin/database', icon: wrapIcon(Database) },
  { title: 'Settings', href: '/admin/settings', icon: wrapIcon(Settings) },
  { title: 'System Logs', href: '/admin/logs', icon: wrapIcon(Activity) },
  { title: 'Database', href: '/admin/database', icon: wrapIcon(Database) },
  { title: 'Settings', href: '/admin/settings', icon: wrapIcon(Settings) }
];

// Removed unused AppLayout function

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader 
        user={user} 
        onLogout={handleLogout}
      />

      <div className="flex pt-16">
        <AdminSidebar 
          menuItems={menuItems}
          currentPath={location.pathname}
        />

        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}