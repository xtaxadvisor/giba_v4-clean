import { useEffect, useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActiveAt: string; // ISO 8601 format 
  } // or Date object
interface UserManagementProps {
  users: User[];
  isLoading: boolean;
  onEditUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onAddUser: () => void;
  onSearch: (term: string) => void;
  onFilter: (role: string) => void;
  onSort: (field: string, order: 'asc' | 'desc') => void;
  onShowAddUserModal: () => void;
  onCloseAddUserModal: () => void;
  onShowEditUserModal: (userId: string) => void;
  onCloseEditUserModal: () => void;
  onShowDeleteUserModal: (userId: string) => void;
  onCloseDeleteUserModal: () => void;
  onShowUserDetails: (userId: string) => void;
  onCloseUserDetails: () => void;
  onShowUserActivity: (userId: string) => void;
  onCloseUserActivity: () => void;
  onShowUserSettings: (userId: string) => void;
  onCloseUserSettings: () => void;
  onShowUserPermissions: (userId: string) => void;
  onCloseUserPermissions: () => void;
  onShowUserRoles: (userId: string) => void;
  onCloseUserRoles: () => void;
  onShowUserGroups: (userId: string) => void;
}
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { useUsers } from '../../../hooks/useUsers';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';

// Removed as it is not in the correct scope
export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  
  const { users, isLoading } = useUsers();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const filteredUsers = users?.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  function onShowAddUserModal(): void {
    console.log('Add User Modal triggered');
    // Here you can implement the logic to show the Add User Modal
    // For example, you might set a state variable to true to display the modal
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <Button variant="primary" icon={Plus} onClick={onShowAddUserModal}> Add User</Button>   
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={onShowAddUserModal}
          className="hidden md:inline-flex"
          aria-label="Add user"
        > Add user</Button> 
      <p className="text-sm text-gray-500">
        Manage your users, their roles, and permissions.
      </p>
      <div className="flex items-center justify-between mb-4"></div>
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          icon={Filter}
          onClick={() => setFilterRole(filterRole === 'all' ? 'admin' : 'all')}
        >
          {filterRole === 'all' ? 'Show Admins' : 'Show All'}
        </Button>
        <Select
          options={[
            { value: 'all', label: 'All Roles' },
            { value: 'admin', label: 'Admin' },
            { value: 'professional', label: 'Professional' },
            { value: 'client', label: 'Client' }
          ]}
          value={filterRole}
          onChange={setFilterRole}
        />
      </div>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <Select
                options={[
                  { value: 'all', label: 'All Roles' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'professional', label: 'Professional' },
                  { value: 'client', label: 'Client' }
                ]}
                value={filterRole}
                onChange={setFilterRole}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers?.map((user) => {
                  const lastActive = user.lastActiveAt ? user.lastActiveAt.toString() : 'N/A';
                  function onShowDeleteUserModal(id: string): void {
                    throw new Error('Function not implemented.');
                  }

                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <div className="h-5 w-5 text-gray-500 bg-gray-300 rounded-full" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{user.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDistanceToNow(new Date(user.lastActiveAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Edit2}
                        className="mr-2"
                        aria-label="Edit user"
                        onClick={() => onShowDeleteUserModal(user.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Trash2}
                        className="text-red-600 hover:text-red-700"
                        aria-label="Delete user"
                        onClick={() => onShowDeleteUserModal(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
                })}
                {filteredUsers?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
                {isLoading && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      Loading...
                    </td>
                  </tr>
                )}
                 <tr>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
    </div>
  );
}
// Removed as it is not in the correct scope