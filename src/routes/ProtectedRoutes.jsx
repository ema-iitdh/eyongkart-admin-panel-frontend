import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../features/auth/hooks/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
