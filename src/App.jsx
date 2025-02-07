import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { basename, ROUTES } from './constants/routes';
import AppRoutes from './routes';

import './App.css';
import { Toaster } from './components/ui/toaster';
import ErrorBoundary from './components/ErrorBoundary';
import { toast } from './hooks/use-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 5 * 1000,
      onError: (error) => {
        console.log('Query error: ', error);
        if (error.response?.status === 401) {
          window.location.href = ROUTES.LOGIN;
        } else if (error.response?.status === 404) {
          console.log('Resource not found');
        } else if (error.response?.status >= 500) {
          console.log('Server error');
        }
      },
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        console.log('Mutation error: ', error);
        if (error.response?.status === 401) {
          window.location.href = ROUTES.LOGIN;
        }
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'An error occurred',
          variant: 'destructive',
        });
      },
    },
  },
});
function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={basename}>
          <AppRoutes />
        </BrowserRouter>
        <ReactQueryDevtools
          buttonPosition='bottom-right'
          initialIsOpen={false}
          position='bottom'
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
