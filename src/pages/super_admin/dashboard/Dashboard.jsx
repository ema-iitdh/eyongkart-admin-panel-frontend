import { BarChart, Users, ShoppingBag, Package, ClipboardList, ShoppingBasket } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import DashboardComponent from '@/components/DashboardComponent'



export function Dashboard() {
  

  const adminDashboard = [
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
    {
      title: 'Shops',
      icon: ShoppingBasket,
      route: ROUTES.SHOP.LIST,
      description: 'View and manage all shops',
      color: 'from-indigo-500 to-blue-500'
    }
  ]

  return (
    <DashboardComponent dashboardCards={adminDashboard} />
    
  )
}

export default Dashboard

