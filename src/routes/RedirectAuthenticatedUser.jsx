import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Navigate, Outlet, redirect } from 'react-router-dom';

export const RedirectAuthenticatedUser = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};
