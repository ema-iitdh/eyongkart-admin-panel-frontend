import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/common/app-sidebar";

export default function SideBarLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full h-14 bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-full items-center px-4 justify-between">
              {/* Add Header Content Here */}
              <h1 className="text-lg font-semibold">Dashboard</h1>
              <button className="text-muted-foreground hover:text-primary">
                Logout
              </button>
            </div>
          </header>

          {/* Main Outlet (Dashboard Content) */}
          <main className="flex-1 p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
