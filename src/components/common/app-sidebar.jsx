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
import { BarChart3, ShoppingCart, Users, Package, FolderTree, CreditCard, Truck, Settings } from 'lucide-react'
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const items = [
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Orders Management", url: "/dashboard/orders", icon: ShoppingCart },
  { title: "Customer Management", url: "/dashboard/customers", icon: Users },
  { title: "Product Management", url: "/dashboard/products", icon: Package },
  { title: "Categories Management", url: "/dashboard/categories", icon: FolderTree },
  { title: "Payments & Transactions", url: "/dashboard/payments", icon: CreditCard },
  { title: "Shipping Management", url: "/dashboard/shipping", icon: Truck },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()

  const isActiveRoute = (url) => location.pathname.startsWith(url)

  return (
    <Sidebar className="bg-gray-800 border-r w-64 hidden md:block">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 my-4">
            <h2 className="text-xl font-bold text-white">Eyongkart Admin</h2>
          </SidebarGroupLabel>
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
                          : "text-muted-foreground text-white hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          isActiveRoute(item.url) ? "text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
  )
}

