import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useLogin } from '../../features/auth/hooks/useAuth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(
      8,
      'Password must be at least 8 characters, 1 uppercase letter, 1 number, and 1 special character, 1 lowercase letter'
    )
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters, 1 uppercase letter, 1 number, and 1 special character, 1 lowercase letter'
    ),
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { mutate: login, isLoading, isError, error } = useLogin();

  useEffect(() => {
    if (localStorage.getItem('rememberMe') === 'true') {
      setRememberMe(true);
      const savedEmail = localStorage.getItem('rememberMeEmail');
      const savedPassword = localStorage.getItem('rememberMePassword');

      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
      }
    } else {
      setRememberMe(false);
    }
  }, []);

  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = {};
        for (const error of err.errors) {
          errors[error.path[0]] = error.message;
        }
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('rememberMeEmail', email);
      localStorage.setItem('rememberMePassword', password);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('rememberMeEmail');
      localStorage.removeItem('rememberMePassword');
    }
    login({ email, password });
  };

  const isFormValid = () => {
    try {
      loginSchema.parse({ email, password });
      return true;
    } catch {
      return false;
    }
  };

  const errorMessage = error?.response?.data?.message || error?.message;

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md'
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className='text-center mb-8'
        >
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>
            Welcome Back
          </h1>
          <p className='text-gray-600'>Sign in to continue to your account</p>
        </motion.div>

        {isError && (
          <div className='mb-4 px-2 py-1 bg-red-100  border-red-200 text-red-700 rounded'>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ease-in-out'
              placeholder='Enter your email'
            />
            {validationErrors.email && (
              <p className='mt-1 text-sm text-red-600'>
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ease-in-out'
              placeholder='Enter your password'
            />
            {validationErrors.password && (
              <p className='mt-1 text-sm text-red-600'>
                {validationErrors.password}
              </p>
            )}
          </div>

          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center gap-2' htmlFor='remember-me'>
              <Checkbox
                id='remember-me'
                className='cursor-pointer '
                checked={rememberMe}
                onCheckedChange={setRememberMe}
              />
              <span className='text-gray-600 select-none'>Remember me</span>
            </label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className='text-purple-600 hover:text-purple-500 transition-colors'
            >
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading || !isFormValid()}
            className='w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            Don't have an account?{' '}
            <Link
              to={ROUTES.SIGNUP}
              className='text-purple-600 hover:text-purple-500 font-semibold transition-colors'
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
