import { useLocation, useNavigate } from 'react-router-dom';
import useAuthenticationStore from '../../../store/useAuthenticationStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTES } from '../../../constants/routes';
import { authService } from '../../../api/services/auth.service';
import { useEffect } from 'react';
import { redirect } from 'react-router-dom';
export const useAuth = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useAuthenticationStore();

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('admin-storage');
      if (!storedData) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const parsedData = JSON.parse(storedData);
      const userData = parsedData?.state?.user;
      const isAuthData = parsedData?.state?.isAuthenticated;

      setIsAuthenticated(!!isAuthData);
      setUser(userData || null);
    } catch (error) {
      console.log('Error while parsing auth data: ', error);
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [setIsAuthenticated, setUser]);

  return { isAuthenticated, user };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setUser } = useAuthenticationStore();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.user);
      queryClient.invalidateQueries('user');
      navigate(ROUTES.DASHBOARD, { replace: true });
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      queryClient.invalidateQueries('user');
      navigate(`${ROUTES.LOGIN}`);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthenticationStore();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
      redirect(ROUTES.getLoginLink());
    },
    onError() {
      console.log('error while logging out');
    },
  });
};
