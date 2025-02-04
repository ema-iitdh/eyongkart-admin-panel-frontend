import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { basename, ROUTES } from './constants/routes';
import AppRoutes from './routes';

import './App.css';
import { Toaster } from './components/ui/toaster';

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
      },
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={basename}>
        <AppRoutes />
        <Toaster />
      </BrowserRouter>
      <ReactQueryDevtools
        buttonPosition='bottom-right'
        initialIsOpen={false}
        position='bottom'
      />
    </QueryClientProvider>
  );
}

export default App;
