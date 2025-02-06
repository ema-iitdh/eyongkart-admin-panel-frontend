// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from '@/components/ui/sidebar';
// import {
//   BarChart3,
//   ShoppingCart,
//   Users,
//   Package,
//   FolderTree,
//   CreditCard,
//   Truck,
//   Settings,
//   X,
//   LayoutDashboard,
//   ShoppingBasket,
// } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import useAuthenticationStore from '@/store/useAuthenticationStore';
// import { ROUTES } from '@/constants/routes';

// const superAdminItems = [
//   { title: 'Dashboard', url: ROUTES.getDashboardLink(), icon: LayoutDashboard },
//   { title: 'Analytics', url: ROUTES.getAnalyticsLink(), icon: BarChart3 },
//   {
//     title: 'Admin Management',
//     url: ROUTES.ADMIN.getRootLink(),
//     icon: Users,
//   },
//   {
//     title: 'Orders Management',
//     url: ROUTES.ORDERS.getRootLink(),
//     icon: ShoppingCart,
//   },
//   {
//     title: 'Customer Management',
//     url: ROUTES.CUSTOMERS.getRootLink(),
//     icon: Users,
//   },
//   {
//     title: 'Shop Management',
//     url: ROUTES.SHOP.getRootLink(),
//     icon: ShoppingBasket,
//   },
//   {
//     title: 'Product Management',
//     url: ROUTES.PRODUCTS.getRootLink(),
//     icon: Package,
//   },
//   {
//     title: 'Categories Management',
//     url: ROUTES.CATEGORIES.getRootLink(),
//     icon: FolderTree,
//   },
//   {
//     title: 'Payments & Transactions',
//     url: ROUTES.PAYMENTS.getRootLink(),
//     icon: CreditCard,
//   },
//   {
//     title: 'Shipping Management',
//     url: ROUTES.SHIPPING.getRootLink(),
//     icon: Truck,
//   },
//   { title: 'Settings', url: ROUTES.SETTINGS.getRootLink(), icon: Settings },
// ];

// const sellerAdminItems = [
//   { title: 'Dashboard', url: ROUTES.SELLER_DASHBOARD, icon: LayoutDashboard },
//   { title: 'Product Management', url: ROUTES.SELLER_PRODUCT, icon: Package },
//   { title: 'Shop Settings', url: ROUTES.SELLER_SHOP, icon: ShoppingBasket },
// ];

// export function AppSidebar() {
//   const location = useLocation();
//   const { user } = useAuthenticationStore();
//   let items;
//   if (user?.role === 'Super_Admin') {
//     items = superAdminItems;
//   } else {
//     items = sellerAdminItems;
//   }

//   const isActiveRoute = (url) => location.pathname.startsWith(url);

//   return (
//     <>
//       {/* Overlay for small screens */}
//       {open && (
//         <div
//           onKeyDown={(e) => {
//             if (e.key === 'Escape') {
//               setOpen(false);
//             }
//           }}
//           className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
//           onClick={() => setOpen(false)}
//         />
//       )}
//       <Sidebar
//         open={open}
//         onOpenChange={setOpen}
//         className={cn(
//           'fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r transition-transform duration-300 ease-in-out transform',
//           open ? 'translate-x-0' : '-translate-x-full',
//           'md:translate-x-0' // Always visible on md screens and up
//         )}
//       >
//         <SidebarContent className='bg-gray-800'>
//           <SidebarGroup>
//             <div className='flex items-center justify-between px-4 py-2 my-4'>
//               <SidebarGroupLabel>
//                 <h2 className='text-xl font-bold text-white'>
//                   Eyongkart Admin
//                 </h2>
//               </SidebarGroupLabel>
//               <Button
//                 variant='ghost'
//                 className='md:hidden text-white'
//                 onClick={() => setOpen(false)}
//               >
//                 <X className='h-6 w-6' />
//               </Button>
//             </div>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {items.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton asChild>
//                       <Link
//                         to={item.url}
//                         className={cn(
//                           'flex items-center my-1 gap-3 py-2 px-4 rounded-md transition-colors duration-200 text-white hover:text-white',
//                           isActiveRoute(item.url)
//                             ? 'bg-black/50 font-medium hover:bg-black/50'
//                             : 'hover:bg-black/40'
//                         )}
//                       >
//                         <item.icon
//                           className={cn(
//                             'h-5 w-5',
//                             isActiveRoute(item.url)
//                               ? 'text-white'
//                               : 'text-muted-foreground hover:bg-transparent hover:text-white'
//                           )}
//                         />
//                         <span className='text-sm'>{item.title}</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>
//       </Sidebar>
//     </>
//   );
// }

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { ROLES } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/features/auth/hooks/useAuth';
import {
  BarChart3,
  CreditCard,
  Crown,
  FolderTree,
  LayoutDashboard,
  Package,
  Settings,
  ShieldCheck,
  ShoppingBasket,
  ShoppingCart,
  Store,
  Truck,
  Users,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebarStore } from '@/store/useSidebarStore';

export default function AppSideBar() {
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();

  const permissions = [
    {
      title: 'Dashboard',
      url: ROUTES.getDashboardLink(),
      icon: LayoutDashboard,
    },
    { title: 'Analytics', url: ROUTES.getAnalyticsLink(), icon: BarChart3 },
    {
      title: 'Admin Management',
      url: ROUTES.ADMIN.getRootLink(),
      icon: Users,
    },
    {
      title: 'Orders Management',
      url: ROUTES.ORDERS.getRootLink(),
      icon: ShoppingCart,
    },
    {
      title: 'Customer Management',
      url: ROUTES.CUSTOMERS.getRootLink(),
      icon: Users,
    },
    {
      title: 'Shop Management',
      url: ROUTES.SHOP.getRootLink(),
      icon: ShoppingBasket,
    },
    {
      title: 'Product Management',
      url: ROUTES.PRODUCTS.getRootLink(),
      icon: Package,
    },
    {
      title: 'Categories Management',
      url: ROUTES.CATEGORIES.getRootLink(),
      icon: FolderTree,
    },
    {
      title: 'Payments & Transactions',
      url: ROUTES.PAYMENTS.getRootLink(),
      icon: CreditCard,
    },
    { title: 'Settings', url: ROUTES.SETTINGS.getRootLink(), icon: Settings },
  ];

  return (
    <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SidebarContent className='pt-3 bg-gray-800 text-customWhite'>
        <SidebarGroup>
          <SidebarGroupLabel className='flex gap-3 items-center text-lg text-customWhite font-semibold mb-10'>
            <div className='relative'>
              {user?.role === ROLES.Super_Admin ? (
                <span className='relative inline-flex'>
                  <ShieldCheck size={40} className='text-emerald-500' />
                  <Crown
                    size={20}
                    className='absolute -top-2 -right-2 text-yellow-400'
                  />
                </span>
              ) : (
                <div>
                  <Store size={40} className='text-blue-500' />
                  <Crown
                    size={20}
                    className='absolute -top-2 -right-2 text-yellow-400'
                  />
                </div>
              )}
            </div>
            <div className='text-md text-slate-200'>
              Eyongkart
              <div className='text-sm text-slate-400'>
                {user?.role?.replace('_', ' ')}
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {permissions?.map((item) => {
                const isActive = location.pathname.includes(item.url);

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`mb-2 rounded-md transition-colors duration-200 ${
                      isActive ? 'bg-gray-200 text-gray-800' : 'text-gray-300'
                    }`}
                    onClick={() => {
                      if (isMobile) {
                        console.log('clicked');
                        // close the sidebar trigger
                        setSidebarOpen(false);
                      }
                    }}
                  >
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url}>
                        <item.icon size={20} />
                        <span className='text-md'>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
