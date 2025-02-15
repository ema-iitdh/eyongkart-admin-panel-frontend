import AppSideBar from '@/components/common/app-sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ROUTES } from '@/constants/routes';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebarStore } from '@/store/useSidebarStore';
import { Menu, User } from 'lucide-react';
import { Suspense, useLayoutEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

function SuperAdminHeader() {
  const { mutate: logout, isPending } = useLogout();
  const { toggleSidebar } = useSidebarStore();

  const navigate = useNavigate();
  
  return (
    <header className='sticky top-0 z-50 w-full h-14 bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-full items-center px-4 justify-between'>
        <div className='flex items-center'>
          <Button variant='ghost' size='icon' onClick={toggleSidebar}>
            <SidebarTrigger />
          </Button>
        </div>
        {/* <h1 className='text-lg font-semibold'>{getPageTitle()}</h1> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon'>
              <User className='h-5 w-5' />
              <span className='sr-only'>User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onSelect={() => {
                /* Navigate to profile settings */
                navigate(ROUTES.SETTINGS.getRootLink())
              }}
            >
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              // onSelect={() => logout()}
              onClick={logout}
              disabled={isPending}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function MainContent() {
  const location = useLocation();

  // The window.scrollTo(0,0) wasn't working because the scroll container is the SidebarInset element, not the window
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [location.pathname]);

  if (location.pathname === '/') {
    return <Navigate to={ROUTES.getDashboardLink()} />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main
        id='main-content'
        className='flex-1  px-4  pt-5  sm:px-10 flex flex-col  '
      >
        <Outlet />
      </main>
    </Suspense>
  );
}

export default function SideBarLayout() {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();

  return (
    <SidebarProvider>
      {/* <div className='flex w-full h-screen '> */}
      <AppSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <SidebarInset className='relative bg-whitedark:bg-gray-900 h-svh overflow-y-auto flex flex-col overflow-x-hidden'>
        <SuperAdminHeader />
        <MainContent />
      </SidebarInset>
      {/* </div> */}
    </SidebarProvider>
  );

  // return (
  //   <SidebarProvider defaultOpen={true}>
  //     <div className='flex min-h-screen w-full'>
  //       {/* Sidebar */}
  //       <AppSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

  //       {/* Main content area */}
  //       <div className='flex-1 flex flex-col'>
  //         {/* Header */}
  //         <header className='sticky top-0 z-50 w-full h-14 bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60'>
  //           <div className='flex h-full items-center px-4 justify-between'>
  //             <div className='flex items-center'>
  //               <Button
  //                 variant='ghost'
  //                 className='md:hidden mr-2'
  //                 onClick={() => setSidebarOpen(!sidebarOpen)}
  //               >
  //                 <Menu className='h-6 w-6' />
  //               </Button>
  //               <SidebarTrigger className='hidden md:inline-flex' />
  //             </div>
  //             <h1 className='text-lg font-semibold'>{getPageTitle()}</h1>
  //             <DropdownMenu>
  //               <DropdownMenuTrigger asChild>
  //                 <Button variant='ghost' size='icon'>
  //                   <User className='h-5 w-5' />
  //                   <span className='sr-only'>User menu</span>
  //                 </Button>
  //               </DropdownMenuTrigger>
  //               <DropdownMenuContent align='end'>
  //                 <DropdownMenuItem
  //                   onSelect={() => {
  //                     /* Navigate to profile settings */
  //                   }}
  //                 >
  //                   Profile Settings
  //                 </DropdownMenuItem>
  //                 <DropdownMenuItem
  //                   // onSelect={() => logout()}
  //                   onClick={logout}
  //                   disabled={isPending}
  //                 >
  //                   Logout
  //                 </DropdownMenuItem>
  //               </DropdownMenuContent>
  //             </DropdownMenu>
  //           </div>
  //         </header>

  //         {/* Main Outlet (Content) */}
  //         <main className='flex-1 overflow-auto bg-background'>
  //           <div className='container mx-auto p-6'>
  //             <Outlet />
  //           </div>
  //         </main>
  //       </div>
  //     </div>
  //   </SidebarProvider>
  // );
}
