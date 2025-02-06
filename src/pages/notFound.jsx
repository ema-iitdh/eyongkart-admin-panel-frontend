import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-9xl font-extrabold text-gray-900'>404</h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className='text-3xl font-bold text-gray-900 mt-8 mb-4'>
              Page Not Found
            </h2>
            <p className='text-gray-600 mb-8'>
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              onClick={() => navigate(-1)}
              variant='outline'
              className='mr-4'
            >
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/')}
              className='bg-primary hover:bg-primary/90'
            >
              Go Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
