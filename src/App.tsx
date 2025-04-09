import { BrowserRouter } from 'react-router-dom';
import '../styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseProvider } from './contexts/SupabaseProvider';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';
import { Notifications } from './components/ui/Notifications';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ConnectionStatus } from './components/testing/ConnectionStatus';
import React from 'react'; // Add this if not already imported

// Create a Devtools component to conditionally load React Query Devtools in development mode
const Devtools = () => {
  if (import.meta.env.DEV) {
    const { ReactQueryDevtools } = require('@tanstack/react-query-devtools');
    return <ReactQueryDevtools initialIsOpen={false} />;
  }
  return null;
};

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <SupabaseProvider>
              <AuthProvider>
                <div className="min-h-screen bg-gray-50">
                  <ConnectionStatus />
                  <AppRoutes />
                  <Notifications />
                </div>
                <Devtools />
              </AuthProvider>
            </SupabaseProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;