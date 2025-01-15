import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, ShoppingBag, Package, ClipboardList } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

const MotionCard = motion(Card)

export function Dashboard() {
  const navigate = useNavigate()

  const dashboardCards = [
    { 
      title: 'Analytics', 
      icon: BarChart, 
      route: ROUTES.ANALYTICS, 
      description: 'View detailed sales and traffic analytics', 
      color: 'from-blue-500 to-cyan-500',
    },
    { 
      title: 'Products', 
      icon: Package, 
      route: ROUTES.PRODUCT.LIST, 
      description: 'Manage your product catalog', 
      color: 'from-green-500 to-emerald-500',
    },
    { 
      title: 'Customers', 
      icon: Users, 
      route: ROUTES.ALLCUSTOMERS, 
      description: 'View and manage customer information', 
      color: 'from-yellow-500 to-orange-500',
    },
    { 
      title: 'Categories', 
      icon: ClipboardList, 
      route: ROUTES.ALLCATEGORIES, 
      description: 'Organize your product categories', 
      color: 'from-purple-500 to-pink-500',
    },
    { 
      title: 'Orders', 
      icon: ShoppingBag, 
      route: ROUTES.ORDERPAGE, 
      description: 'Process and track customer orders', 
      color: 'from-red-500 to-rose-500',
    },
  ]

  return (
    <div className="container mx-auto p-6">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <MotionCard 
            key={index} 
            className="overflow-hidden relative transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 z-0`}></div>
            <div className='relative z-10'>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <card.icon className="h-8 w-8" />
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={() => navigate(card.route)} className="w-full">
                    View Details
                  </Button>
                </CardFooter>
            </div>
          </MotionCard>
        ))}
      </div>
    </div>
  )
}

export default Dashboard

