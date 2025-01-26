import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/features/auth/hooks/useAuth';
import useAuthenticationStore from '@/store/useAuthenticationStore';
import { Navigate, Outlet } from 'react-router-dom';

export const RedirectAuthenticatedUser = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};
