import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import ProtectedRoute from "./ProtectedRoutes";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Dashboard from "@/pages/dashboard/Dashboard";
import SideBarLayout from "@/layouts/SidebarLayout";
import { OrderPage } from "@/pages/orderPage/OrderPage";
import { OrderDetail } from "@/pages/orderDetail/OrderDetail";
import CustomerPage from "@/pages/customerPage/CustomerPage";
import CustomerDetail from "@/pages/customerDetail/CustomerDetail";
import CategoryPage from "@/pages/categoryPage/CategoryPage";
import CategoryDetail from "@/pages/categoryDetail/CategoryDetail";
import CategoryUpdate from "@/pages/categoryUpdate/CategoryUpdate";
import { ProductPage } from "@/pages/productPage/ProductPage";
import ProductDetail from "@/pages/productDetail/ProductDetail";
import ProductCreate from "@/pages/productCreate/ProductCreate";
import { Analytics } from "@/pages/analytics";
import ProductUpdate from "@/pages/productUpdate/ProductUpdate";
import CategoryCreate from "@/pages/categoryCreate/CategoryCreate";
import AddSubCategory from "@/pages/categoryCreate/AddSubCategory"; // Import AddSubCategory

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<SideBarLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
            <Route path={ROUTES.ORDERPAGE} element={<OrderPage />} />
            <Route path={ROUTES.SPECIFICORDER} element={<OrderDetail />} />
            <Route path={ROUTES.ALLCUSTOMERS} element={<CustomerPage />} />
            <Route
              path={ROUTES.SPECIFICCUSTOMER}
              element={<CustomerDetail />}
            />
            <Route path={ROUTES.ALLCATEGORIES} element={<CategoryPage />} />
            <Route
              path={ROUTES.SPECIFICCATEGORY}
              element={<CategoryDetail />}
            />
            <Route path={ROUTES.EDITCATEGORY} element={<CategoryUpdate />} />
            <Route path={ROUTES.PRODUCT.LIST} element={<ProductPage />} />
            <Route path={ROUTES.PRODUCT.DETAIL} element={<ProductDetail />} />
            <Route path={ROUTES.PRODUCT.CREATE} element={<ProductCreate />} />
            <Route path={ROUTES.PRODUCT.UPDATE} element={<ProductUpdate />} />
            <Route path={ROUTES.CATEGORY_CREATE} element={<CategoryCreate />} />
            <Route
              path={ROUTES.ADD_SUBCATEGORY}
              element={<AddSubCategory />}
            />{" "}
            {/* Add route for AddSubCategory */}
          </Route>
        </Route>

        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
      </Routes>
    </Suspense>
  );
}
