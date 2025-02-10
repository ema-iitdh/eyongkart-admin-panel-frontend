import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { basename, ROUTES } from './constants/routes';
import AppRoutes from './routes';

import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { toast } from './hooks/use-toast';

// Create queryClient outside of App component so it can be passed to ErrorBoundary
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 5 * 1000,
      useErrorBoundary: true, // This will make errors propagate to error boundary
      throwOnError: true, // This ensures errors are thrown and can be caught
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        console.log('Mutation error: ', error);
        if (error.response?.status === 401) {
          window.location.href = ROUTES.getLoginLink();
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
    // Wrap ErrorBoundary inside QueryClientProvider so it has access to queryClient
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter basename={basename}>
          <AppRoutes />
        </BrowserRouter>
        <ReactQueryDevtools
          buttonPosition='bottom-right'
          initialIsOpen={false}
          position='bottom'
        />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
