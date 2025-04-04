import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { AdminDashboard } from '../../components/admin/dashboard/AdminDashboard';
import { TeamManagement } from '../../components/admin/team/TeamManagement';
import { UserManagement } from '../../components/admin/users/UserManagement';
import { AdminSettings } from '../../components/admin/settings/AdminSettings';
import { NotFoundPage } from '../../components/shared/NotFoundPage';
import { AdminProtectedRoute } from '../../components/admin/auth/AdminProtectedRoute';

export default function AdminPortal() {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <Routes>
          <Route path="/admin" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/login" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/register" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/forgot-password" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/reset-password" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug/:trace" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug/:trace/:stack" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug/:trace/:stack/:file" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug/:trace/:stack/:file/:line" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug/:trace/:stack/:file/:line/:column" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug/:trace/:stack/:file/:line/:column/:char" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug/:trace/:stack/:file/:line/:column/:char/:offset" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug/:trace/:stack/:file/:line/:column/:char/:offset/:length" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug/:trace/:stack/:file/:line/:column/:char/:offset/:length/:position" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug/:trace/:stack/:file/:line/:column/:char/:offset/:length/:position/:context" element={<Navigate to="/admin/" replace />} />
          <Route path="/admin/verify-email/:id/:token/:email/:type/:redirect/:status/:message/:error/:success/:info/:warning/:debug/:trace/:stack/:file/:line/:column/:char/:offset/:length/:position/:context/:source" element={<Navigate to="/admin/" replace />} />    
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/team" element={<TeamManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/admin/404" replace />} />
        </Routes>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}