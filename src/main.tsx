import React from 'react';
import './styles/global.css';
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { SupabaseProvider } from './contexts/SupabaseContext';
import { AppRoutes } from './routes';
// Initialize Sentry
Sentry.init({
  dsn: "https://80cda50e3cf066a524158b31ca370667@o4508848989929472.ingest.us.sentry.io/4508848996155392",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: import.meta.env.MODE
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600">Our team has been notified and is working on a fix.</p>
        </div>
      </div>
  }>
    <BrowserRouter>
      <SupabaseProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </SupabaseProvider>
    </BrowserRouter>
  </Sentry.ErrorBoundary>
</React.StrictMode> ); export default root;   
// Hot Module Replacement (HMR) support
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    root.unmount();
  }
  );
} 