import {
  BarChart,
  Users,
  ShoppingBag,
  Package,
  ClipboardList,
  ShoppingBasket,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import DashboardComponent from '@/components/DashboardComponent';
import useAuthenticationStore from '@/store/useAuthenticationStore';
import { ROLES } from '@/constants';

export function Dashboard() {
  const { user } = useAuthenticationStore();
  const isSuperAdmin = user?.role === ROLES.Super_Admin;

  const superAdmin = [
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
      route: ROUTES.PRODUCTS.LIST,
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
      color: 'from-indigo-500 to-blue-500',
    },
  ];
  const sellerAdmin = [
    {
      title: 'Products',
      icon: Package,
      route: ROUTES.SELLER_PRODUCT,
      description: 'Manage your product catalog',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Shops',
      icon: ShoppingBasket,
      route: ROUTES.SELLER_SHOP,
      description: 'View and manage all shops',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  if (isSuperAdmin) {
    return <DashboardComponent dashboardCards={superAdmin} />;
  }
  return <DashboardComponent dashboardCards={sellerAdmin} />;
}

export default Dashboard;
