import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

// Eagerly load critical components
import Home from '../pages/Home';
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm';
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm';

// Lazy load other components
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../pages/RegisterPage'));
const ServiceCatalog = React.lazy(() => import('../pages/services/ServiceCatalog'));
const SameDayServices = React.lazy(() => import('../pages/services/SameDayServices'));
const VideoLibrary = React.lazy(() => import('../pages/videos/VideoLibrary'));
const VideoDetail = React.lazy(() => import('../pages/videos/VideoDetail'));
const AdminPortal = React.lazy(() => import('../pages/admin/AdminPortal'));
const ClientPortal = React.lazy(() => import('../pages/client/ClientPortal'));
const InvestorPortal = React.lazy(() => import('../pages/investor/InvestorPortal'));
const StudentPortal = React.lazy(() => import('../pages/student/StudentPortal'));
const ProfessionalPortal = React.lazy(() => import("../pages/professional/ProfessionalPortal"));
const TaxCalculator = React.lazy(() => import('../pages/calculator/TaxCalculator'));
const TaxForms = React.lazy(() => import('../pages/forms/TaxForms'));
const TermsAndConditions = React.lazy(() => import('../pages/legal/TermsAndConditions'));
const MessagingPortal = React.lazy(() => import('../pages/messaging/MessagingPortal'));

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/terms-and-conditions" element={
        <Suspense fallback={<LoadingSpinner />}>
          <TermsAndConditions />
        </Suspense>
      } />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      <Route path="/services" element={
        <Suspense fallback={<LoadingSpinner />}>
          <ServiceCatalog />
        </Suspense>
      } />
      <Route path="/same-day-services" element={
        <Suspense fallback={<LoadingSpinner />}>
          <SameDayServices />
        </Suspense>
      } />
      <Route path="/calculator" element={
        <Suspense fallback={<LoadingSpinner />}>
          <TaxCalculator />
        </Suspense>
      } />
      <Route path="/tax-forms" element={
        <Suspense fallback={<LoadingSpinner />}>
          <TaxForms />
        </Suspense>
      } />
      <Route path="/browse-videos" element={
        <Suspense fallback={<LoadingSpinner />}>
          <VideoLibrary />
        </Suspense>
      } />
      <Route path="/browse-videos/:videoId" element={
        <Suspense fallback={<LoadingSpinner />}>
          <VideoDetail />
        </Suspense>
      } />
      
      {/* Auth Routes */}
      <Route path="/login" element={
        <Suspense fallback={<LoadingSpinner />}>
          <LoginPage />
        </Suspense>
      } />
      <Route path="/register" element={
        <Suspense fallback={<LoadingSpinner />}>
          <RegisterPage />
        </Suspense>
      } />

      {/* Portal Routes - Auth checks disabled for development */}
      <Route path="/admin/*" element={
        <Suspense fallback={<LoadingSpinner />}>
          <AdminPortal />
        </Suspense>
      } />
      
      <Route path="/client/*" element={
        <Suspense fallback={<LoadingSpinner />}>
          <ClientPortal />
        </Suspense>
      } />

      <Route path="/investor/*" element={
        <Suspense fallback={<LoadingSpinner />}>
          <InvestorPortal />
        </Suspense>
      } />

      <Route path="/student/*" element={
        <Suspense fallback={<LoadingSpinner />}>
          <StudentPortal />
        </Suspense>
      } />

      <Route path="/professional/*" element={
        <Suspense fallback={<LoadingSpinner />}>
          <ProfessionalPortal />
        </Suspense>
      } />

      {/* Messages Route */}
      <Route path="/messages/*" element={
        <Suspense fallback={<LoadingSpinner />}>
          <MessagingPortal />
        </Suspense>
      } />
    </Routes>
  );
}