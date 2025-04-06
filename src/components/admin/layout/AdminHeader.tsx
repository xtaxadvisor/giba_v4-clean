import { Bell, Shield } from 'lucide-react';
// import { Button } from '../../ui/Button';
import type { User } from '../../../types';

interface AdminHeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function AdminHeader({ user, onLogout }: AdminHeaderProps) {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-red-600">Admin Portal</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m1.2-6L5.4 7M17 13l1.2 6M6 19a1 1 0 100 2 1 1 0 000-2zm12 0a1 1 0 100 2 1 1 0 000-2z"
                />
              </svg>
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-700">{user?.name}</span>
              </button>
              <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}