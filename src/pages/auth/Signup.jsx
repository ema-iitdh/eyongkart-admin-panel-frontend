import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useSignup } from '../../features/auth/hooks/useAuth';
import { z } from 'zod';

const signupSchema = z.object({
  userName: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    ),
});

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { mutate: signup, isLoading, isError, error } = useSignup();

  const validateForm = () => {
    try {
      signupSchema.parse({ userName, email, password, phone });
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

  const isFormValid = () => {
    try {
      signupSchema.parse({ userName, email, password, phone });
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    signup({ userName, email, password, phone });
  };

  const errorMessage = error?.response?.data?.message || error?.message;

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-2'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-sm'
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className='text-center mb-4'
        >
          <h1 className='text-2xl font-bold text-gray-800 mb-1'>
            Create Account
          </h1>
          <p className='text-sm text-gray-600'>Join us and start shopping</p>
        </motion.div>

        {isError && (
          <div className='mb-4 px-3 py-2 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm'>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='userName'
              className='block text-xs font-medium text-gray-700 mb-1'
            >
              Username
            </label>
            <motion.input
              id='userName'
              whileFocus={{ scale: 1.01 }}
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ease-in-out text-sm'
              placeholder='Enter your username'
            />
            {validationErrors.userName && (
              <p className='mt-1 text-xs text-red-600'>
                {validationErrors.userName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-xs font-medium text-gray-700 mb-1'
            >
              Email Address
            </label>
            <motion.input
              id='email'
              whileFocus={{ scale: 1.01 }}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ease-in-out text-sm'
              placeholder='Enter your email'
            />
            {validationErrors.email && (
              <p className='mt-1 text-xs text-red-600'>
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='phone'
              className='block text-xs font-medium text-gray-700 mb-1'
            >
              Phone Number
            </label>
            <motion.input
              id='phone'
              whileFocus={{ scale: 1.01 }}
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ease-in-out text-sm'
              placeholder='Enter your phone number'
            />
            {validationErrors.phone && (
              <p className='mt-1 text-xs text-red-600'>
                {validationErrors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-xs font-medium text-gray-700 mb-1'
            >
              Password
            </label>
            <motion.input
              id='password'
              whileFocus={{ scale: 1.01 }}
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 ease-in-out text-sm'
              placeholder='Create a password'
            />
            {validationErrors.password && (
              <p className='mt-1 text-xs text-red-600'>
                {validationErrors.password}
              </p>
            )}
          </div>

          <div className='flex items-center gap-2'>
            <Checkbox
              id='terms'
              className='cursor-pointer h-4 w-4'
              checked={agreeToTerms}
              onCheckedChange={setAgreeToTerms}
              required
            />
            <label htmlFor='terms' className='text-xs text-gray-600'>
              I agree to the{' '}
              <Link
                to={ROUTES.TERMS_AND_CONDITIONS}
                className='text-purple-600 hover:text-purple-500'
              >
                Terms and Conditions
              </Link>
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading || !agreeToTerms || !isFormValid()}
            className='w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                Creating Account...
              </div>
            ) : (
              'Sign Up'
            )}
          </motion.button>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-xs text-gray-600'>
            Already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
              className='text-purple-600 hover:text-purple-500 font-semibold transition-colors'
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
