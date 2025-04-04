import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

// Lazy load portal components
const AdminPortal = React.lazy(() => import('../pages/admin/AdminPortal'));
const InvestorPortal = React.lazy(() => import('../pages/investor/InvestorPortal'));
const StudentPortal = React.lazy(() => import('../pages/student/StudentPortal'));
const ProfessionalPortal = React.lazy(() => import('../pages/professional/ProfessionalPortal'));
const ClientPortal = React.lazy(() => import('../pages/client/ClientPortal'));
const MessagingPortal = React.lazy(() => import('../pages/messaging/MessagingPortal'));
const VideoLibrary = React.lazy(() => import('../pages/videos/VideoLibrary'));
const VideoDetail = React.lazy(() => import('../pages/videos/VideoDetail'));


export function PortalRoutes() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <AdminPortal />
          </React.Suspense>
        }
      />
      
      <Route
        path="/investor/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <InvestorPortal />
          </React.Suspense>
        }
      />

      <Route
        path="/student/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <StudentPortal />
          </React.Suspense>
        }
      />

      <Route
        path="/professional/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <ProfessionalPortal />
          </React.Suspense>
        }
      />
      <Route
        path="/client/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <ClientPortal />
          </React.Suspense>
        }
      />
      <Route
        path="/messaging/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <MessagingPortal />
          </React.Suspense>
        }
      />
      <Route
        path="/browse-videos"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <VideoLibrary />
          </React.Suspense>
        }
      />
      <Route
        path="/browse-videos/:videoId"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <VideoDetail />
          </React.Suspense>
        }
      />
    </Routes>
  );
}
export default PortalRoutes;
// Note: The above code assumes that the components are correctly exported from their respective files.