import { useState, useEffect } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { AppSidebar } from "@/components/common/app-sidebar"
import { Button } from "@/components/ui/button"
import { Menu, User } from 'lucide-react'
import { useLogout } from "@/features/auth/hooks/useAuth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SideBarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mutate: logout, isPending } = useLogout();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getPageTitle = () => {  
    const path = location.pathname.split('/')[2];
    return path?.charAt(0)?.toUpperCase() + path?.slice(1) || 'Home';
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full h-14 bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-full items-center px-4 justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="md:hidden mr-2"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
                <SidebarTrigger className="hidden md:inline-flex" />
              </div>
              <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => {/* Navigate to profile settings */}}>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => logout()} disabled={isPending}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Outlet (Content) */}
          <main className="flex-1 overflow-auto bg-background">
            <div className="container mx-auto p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

