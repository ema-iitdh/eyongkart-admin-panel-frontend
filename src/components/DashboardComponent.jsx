import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useAuthenticationStore from '@/store/useAuthenticationStore';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants';

const MotionCard = motion(Card);

function DashboardComponent({ dashboardCards = [] }) {
  const { user } = useAuthenticationStore();
  const isSuperAdmin = user?.role === ROLES.Super_Admin;

  const navigate = useNavigate();
  return (
    <div className='container mx-auto p-6'>
      <div className='flex justify-between'>
        <motion.h1
          className='text-4xl font-bold mb-8 text-gray-800'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {dashboardCards.map((card, index) => (
          <MotionCard
            key={card?.title}
            className='overflow-hidden relative transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 z-0`}
            />
            <div className='relative z-10'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-2xl'>
                  <card.icon className='h-8 w-8' />
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  onClick={() => navigate(`${card.route}`)}
                  className='w-full'
                >
                  View Details
                </Button>
              </CardFooter>
            </div>
          </MotionCard>
        ))}
      </div>
    </div>
  );
}

export default DashboardComponent;
