import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  FolderTree,
  CreditCard,
  Truck,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Orders Management", url: "/dashboard/orders", icon: ShoppingCart },
  { title: "User Management", url: "/dashboard/users", icon: Users },
  { title: "Product Management", url: "/dashboard/products", icon: Package },
  { title: "Categories Management", url: "/dashboard/categories", icon: FolderTree },
  { title: "Payments & Transactions", url: "/dashboard/payments", icon: CreditCard },
  { title: "Shipping Management", url: "/dashboard/shipping", icon: Truck },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  const isActiveRoute = (url) => location.pathname.startsWith(url);

  return (
    <Sidebar className="bg-gray-800 text-white w-64">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-2 text-xl mb-4 font-semibold">
            Eyongkart Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center gap-3 py-2 px-4 rounded-md transition-colors duration-200 ${
                        isActiveRoute(item.url)
                          ? "bg-primary text-white"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${
                          isActiveRoute(item.url) ? "text-white" : "text-gray-400"
                        }`}
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
  );
}
