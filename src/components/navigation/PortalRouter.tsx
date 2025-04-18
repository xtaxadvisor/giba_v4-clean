import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { LoadingSpinner } from '../ui/LoadingSpinner';

// Lazy load portal components
const AdminPortal = React.lazy(() => import('../../pages/admin/AdminPortal'));
const ClientPortal = React.lazy(() => import('../../pages/client/ClientPortal'));
const ProfessionalPortal = React.lazy(() => import('../../pages/professional/ProfessionalPortal')); // Verify the file exists at this path or update the path
const InvestorPortal = React.lazy(() => import('../../pages/investor/InvestorPortal'));
const StudentPortal = React.lazy(() => import('../../pages/student/StudentPortal'));
const MessagingPortal = React.lazy(() => import('../../pages/messaging/MessagingPortal'));
const Cart = React.lazy(() => import('../../components/cart/ShoppingCart'));
const CheckoutPage = React.lazy(() => import('../../components/cart/ShoppingCart'));
const SchedulePage = React.lazy(() => import('../../pages/consultation/SchedulePage'));
const MyConsultationsPage = React.lazy(() => import('../../pages/consultation/ConsultationPage'));

export function PortalRouter() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute requiredRole={['admin']}>
              <AdminPortal />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      
      <Route
        path="/client/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute requiredRole={['client']}>
              <ClientPortal />
            </ProtectedRoute>
          </React.Suspense>
        }
      >
        <Route
          path="schedule"
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <SchedulePage />
            </React.Suspense>
          }
        />
        <Route
          path="my-consultations"
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <MyConsultationsPage />
            </React.Suspense>
          }
        />
      </Route>
      
      <Route
        path="/professional/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute requiredRole={['professional']}>
              <ProfessionalPortal />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      
      <Route
        path="/investor/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute requiredRole={['investor']}>
              <InvestorPortal />
            </ProtectedRoute>
          </React.Suspense>
        }
      />

      <Route
        path="/student/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute requiredRole={['student']}>
              <StudentPortal />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      
      <Route
        path="/messages/*"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>
              <MessagingPortal />
            </ProtectedRoute>
          </React.Suspense>
        }
      />

      <Route
        path="/cart"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <Cart />
          </React.Suspense>
        }
      />

      <Route
        path="/checkout"
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <CheckoutPage />
          </React.Suspense>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}