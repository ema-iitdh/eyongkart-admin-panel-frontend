import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import ProtectedRoute from "./ProtectedRoutes";
import Login from "@/pages/super_admin/auth/Login";
import Signup from "@/pages/super_admin/auth/Signup";
import Dashboard from "@/pages/super_admin/dashboard/Dashboard";
import SideBarLayout from "@/layouts/SidebarLayout";
import { OrderPage } from "@/pages/super_admin/orderPage/OrderPage";
import { OrderDetail } from "@/pages/super_admin/orderDetail/OrderDetail";
import CustomerPage from "@/pages/super_admin/customerPage/CustomerPage";
import CustomerDetail from "@/pages/super_admin/customerDetail/CustomerDetail";
import CategoryUpdate from "@/pages/super_admin/categoryUpdate/CategoryUpdate";
import { ProductPage } from "@/pages/super_admin/productPage/ProductPage";
import ProductDetail from "@/pages/super_admin/productDetail/ProductDetail";
import ProductCreate from "@/pages/super_admin/productCreate/ProductCreate";
import { Analytics } from "@/pages/super_admin/analytics";
import ProductUpdate from "@/pages/super_admin/productUpdate/ProductUpdate";
import CategoryCreate from "@/pages/super_admin/categoryCreate/CategoryCreate";
import AddSubCategory from "@/pages/super_admin/categoryCreate/AddSubCategory"; // Import AddSubCategory
import EditSubCategory from "@/pages/super_admin/categoryUpdate/EditSubCategory"; // Import EditSubCategory
import { ShopPage } from "@/pages/super_admin/shopPage/ShopPage";
import ShopDetail from "@/pages/super_admin/shopDetail/ShopDetail";
import ShopCreate from "@/pages/super_admin/shopCreate/ShopCreate";
import CategoryPage from "@/pages/super_admin/categoryPage/CategoryPage";
import CategoryDetail from "@/pages/super_admin/categoryDetail/CategoryDetail";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { SellerDashboard } from "@/pages/seller_admin/dashboard/Dashboard";
import { RedirectAuthenticatedUser } from "./RedirectAuthenticatedUser";
import SellerProductList from "@/pages/seller_admin/sellerProductList/SellerProductList";
import SellerShop from "@/pages/seller_admin/sellerShop/SellerShop";
export default function AppRoutes() {
  const { user } = useAuthenticationStore();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<SideBarLayout />}>
            <Route path={ROUTES.PRODUCT.CREATE} element={<ProductCreate />} />
            <Route path={ROUTES.SHOP.CREATE} element={<ShopCreate />} />
            <Route path={ROUTES.PRODUCT.DETAIL} element={<ProductDetail />} />
            {user?.role == "Super_Admin" && (
              <Route>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
                <Route path={ROUTES.ORDERPAGE} element={<OrderPage />} />
                <Route path={ROUTES.SPECIFICORDER} element={<OrderDetail />} />
                <Route path={ROUTES.ALLCUSTOMERS} element={<CustomerPage />} />
                <Route
                  path={ROUTES.SPECIFICCUSTOMER}
                  element={<CustomerDetail />}
                />

                <Route path={ROUTES.PRODUCT.LIST} element={<ProductPage />} />
                <Route
                  path={ROUTES.PRODUCT.UPDATE}
                  element={<ProductUpdate />}
                />
                <Route path={ROUTES.ALLCATEGORIES} element={<CategoryPage />} />
                <Route
                  path={ROUTES.SPECIFICCATEGORY}
                  element={<CategoryDetail />}
                />
                <Route
                  path={ROUTES.EDITCATEGORY}
                  element={<CategoryUpdate />}
                />
                <Route
                  path={ROUTES.CATEGORY_CREATE}
                  element={<CategoryCreate />}
                />
                <Route
                  path={ROUTES.ADD_SUBCATEGORY}
                  element={<AddSubCategory />}
                />
                <Route
                  path={ROUTES.EDIT_SUBCATEGORY}
                  element={<EditSubCategory />}
                />
                <Route path={ROUTES.SHOP.LIST} element={<ShopPage />} />
                <Route path={ROUTES.SHOP.DETAIL} element={<ShopDetail />} />
              </Route>
            )}
            {user?.role === "Shop_Seller_Site_Admin" && (
              <Route>
                <Route
                  path={ROUTES.SELLER_DASHBOARD}
                  element={<SellerDashboard />}
                />
                <Route
                  path={ROUTES.SELLER_PRODUCT}
                  element={<SellerProductList />}
                />
                <Route path={ROUTES.SELLER_SHOP} element={<SellerShop />} />
              </Route>
            )}
          </Route>
        </Route>
        <Route element={<RedirectAuthenticatedUser />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
