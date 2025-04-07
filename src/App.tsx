import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseProvider } from './contexts/SupabaseProvider';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';
import { Notifications } from './components/ui/Notifications';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ConnectionStatus } from './components/testing/ConnectionStatus';
import Cart from './components/cart/ShoppingCart'; // Adjusted path to match the correct location

<Routes>
  {/* other routes */}
  <Route path="/cart" element={<Cart />} />
</Routes>
// Removed unused Header import to resolve the error
// import { Footer } from './components/Footer'; // Adjusted the path to match the correct location

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
// Removed unused AppLayout function to resolve the error

function App() {
  return (
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
            </AuthProvider>
          </SupabaseProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;