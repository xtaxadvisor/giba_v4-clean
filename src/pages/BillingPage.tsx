import React from 'react';
import { Route } from 'react-router-dom';
import { Suspense } from 'react';
import BillingPage from '@/pages/BillingPage';
// Removed duplicate declaration of BillingPage
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const LazyBillingPage = React.lazy(() => import('@/pages/BillingPage'));
const BillingPageContent = () => { // eslint-disable-line no-unused-vars 
    return ( React.createElement('div', null, 'Billing Page Content') ); 
    // return ( React.createElement(Route, { path: '/billing', component: LazyBillingPage }, null) );   
    };
  
  
  export default BillingPageContent;
// import('../components/billing/BillingPage'));    
//         } else {     
//           return <Navigate to="/login" />; 
//         } 
//       />
//     </Routes>    
//       <Route
//         path="/messaging/*"
//         element={
//           <React.Suspense fallback={<LoadingSpinner />}>
//             <MessagingPortal />
//           </React.Suspense>
//         }
//       />
//       <Route
//         path="/videos/*"
//         element={
//           <React.Suspense fallback={<LoadingSpinner />}>
//             <VideoLibrary />
//           </React.Suspense>
//         }
//       />
//       <Route
//         path="/videos/:videoId"
//         element={





//       
export const BillingRoute = (
  <Route
    path="/dashboard/billing"
    element={
      <Suspense fallback={<LoadingSpinner />}>
        <LazyBillingPage />
      </Suspense>
    }
  />
);