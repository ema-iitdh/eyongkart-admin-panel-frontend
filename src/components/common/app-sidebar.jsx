import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BarChart3, ShoppingCart, Users, Package, FolderTree, CreditCard, Truck, Settings, X, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard},
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Orders Management", url: "/dashboard/orders", icon: ShoppingCart },
  { title: "Customer Management", url: "/dashboard/customers", icon: Users },
  { title: "Shop Management", url: "/dashboard/shops", icon: ShoppingBasket},
  { title: "Product Management", url: "/dashboard/products", icon: Package },
  { title: "Categories Management", url: "/dashboard/categories", icon: FolderTree },
  { title: "Payments & Transactions", url: "/dashboard/payments", icon: CreditCard },
  { title: "Shipping Management", url: "/dashboard/shipping", icon: Truck },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar({ open, setOpen }) {
  const location = useLocation()

  const isActiveRoute = (url) => location.pathname.startsWith(url)

  return (
    <>
      {/* Overlay for small screens */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => setOpen(false)}
        />
      )}
      <Sidebar
        open={open}
        onOpenChange={setOpen}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r transition-transform duration-300 ease-in-out transform",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0" // Always visible on md screens and up
        )}
      >
        <SidebarContent  className="bg-gray-800">
          <SidebarGroup>
            <div className="flex items-center justify-between px-4 py-2 my-4">
              <SidebarGroupLabel>
                <h2 className="text-xl font-bold text-white">Eyongkart Admin</h2>
              </SidebarGroupLabel>
              <Button
                variant="ghost"
                className="md:hidden text-white"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={cn(
                          "flex items-center my-1 gap-3 py-2 px-4 rounded-md transition-colors duration-200",
                          isActiveRoute(item.url)
                            ? "bg-black/50 text-white font-medium hover:text-white"
                            : "text-muted-foreground text-white hover:bg-black/30 hover:text-white"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5",
                            isActiveRoute(item.url) ? "text-white" : "text-muted-foreground hover:bg-transparent hover:text-white"
                          )}
                        />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}

