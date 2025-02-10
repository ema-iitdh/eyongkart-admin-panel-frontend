import { ROLES } from '@/constants';
import SideBarLayout from '@/layouts/SidebarLayout';
import AdminPage from '@/pages/@super-admin/admin/AdminPage';
import AdminDetail from '@/pages/@super-admin/admin/[adminId]/AdminDetails';
import AdminCreate from '@/pages/@super-admin/admin/create/AdminCreate';
import AdminUpdate from '@/pages/@super-admin/admin/update/[adminId]/AdminUpdate';
import PaymentPage from '@/pages/@super-admin/payments/PaymentPage';
import UpdateProduct from '@/pages/@super-admin/products/[productId]/update/UpdateProduct';
import ShippingPage from '@/pages/@super-admin/shipping/ShippingPage';
import ShippingUpdate from '@/pages/@super-admin/shipping/update/ShippingUpdate';
import { Analytics } from '@/pages/super_admin/analytics';
import Login from '@/pages/super_admin/auth/Login';
import Dashboard from '@/pages/dashboard/Dashboard';
import useAuthenticationStore from '@/store/useAuthenticationStore';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import ProtectedRoute from './ProtectedRoutes';
import { RedirectAuthenticatedUser } from './RedirectAuthenticatedUser';
import SettingPage from '@/pages/@super-admin/settings/SettingPage';
import NotFound from '@/pages/notFound';
import ShopPage from '@/pages/@super-admin/shop/ShopPage';
import OrderPage from '@/pages/@super-admin/order/OrderPage';
import OrderDetail from '@/pages/@super-admin/order/detail/OrderDetail';
import OrderCreate from '@/pages/@super-admin/order/create/OrderCreate';
import CustomerPage from '@/pages/@super-admin/customer/CustomerPage';
import CustomerDetail from '@/pages/@super-admin/customer/detail/CustomerDetail';
import ShopDetail from '@/pages/@super-admin/shop/detail/ShopDetail';
import ShopEdit from '@/pages/@super-admin/shop/edit/ShopEdit';
import ShopCreate from '@/pages/@super-admin/shop/create/ShopCreate';
import ProductPage from '@/pages/@super-admin/products/ProductPage';
import ProductCreate from '@/pages/@super-admin/products/create/ProductCreate';
import ProductDetail from '@/pages/@super-admin/products/[productId]/detail/ProductDetail';
import CategoryPage from '@/pages/@super-admin/category/CategoryPage';
import CategoryDetail from '@/pages/@super-admin/category/detail/CategoryDetail';
import CategoryCreate from '@/pages/@super-admin/category/create/CategoryCreate';
import CategoryUpdate from '@/pages/@super-admin/category/update/CategoryUpdate';
import AddSubCategory from '@/pages/@super-admin/subcategory/create/AddSubCategory';
import CustomerUpdate from '@/pages/@super-admin/customer/update/CustomerUpdate';

export default function AppRoutes() {
  const { user } = useAuthenticationStore();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Authentication Routes */}
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} />} />

        <Route element={<RedirectAuthenticatedUser />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* <Route element={<SideBarLayout />}> */}
          {/* Dashboard Routes */}
          <Route path={ROUTES.DASHBOARD} element={<SideBarLayout />}>
            <Route index element={<Dashboard />} />

            {/* Analytics Routes */}
            {user?.role === ROLES.Super_Admin && (
              <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
            )}
            {/* Admin Routes */}
            {user?.role === ROLES.Super_Admin && (
              <Route path={ROUTES.ADMIN.ROOT}>
                <Route index element={<AdminPage />} />
                <Route path={ROUTES.ADMIN.DETAILS} element={<AdminDetail />} />
                <Route path={ROUTES.ADMIN.CREATE} element={<AdminCreate />} />
                <Route path={ROUTES.ADMIN.UPDATE} element={<AdminUpdate />} />
              </Route>
            )}

            {/* Orders Routes */}
            <Route path={ROUTES.ORDERS.ROOT}>
              <Route index element={<OrderPage />} />
              <Route path={ROUTES.ORDERS.DETAILS} element={<OrderDetail />} />
              <Route path={ROUTES.ORDERS.CREATE} element={<OrderCreate />} />
              {/* <Route path={ROUTES.ORDERS.UPDATE} element={<OrderUpdate />} /> */}
            </Route>

            {/* Customer Routes */}
            <Route path={ROUTES.CUSTOMERS.ROOT}>
              <Route index element={<CustomerPage />} />
              <Route
                path={ROUTES.CUSTOMERS.DETAILS}
                element={<CustomerDetail />}
              />
              <Route
                path={ROUTES.CUSTOMERS.UPDATE}
                element={<CustomerUpdate />}
              />
            </Route>

            {/* Shop Routes */}
            <Route path={ROUTES.SHOP.ROOT}>
              <Route index element={<ShopPage />} />
              <Route path={ROUTES.SHOP.DETAILS} element={<ShopDetail />} />
              <Route path={ROUTES.SHOP.UPDATE} element={<ShopEdit />} />
              <Route path={ROUTES.SHOP.CREATE} element={<ShopCreate />} />
            </Route>

            {/* Product Routes */}
            <Route path={ROUTES.PRODUCTS.ROOT}>
              <Route index element={<ProductPage />} />
              <Route
                path={ROUTES.PRODUCTS.CREATE}
                element={<ProductCreate />}
              />
              <Route
                path={ROUTES.PRODUCTS.DETAILS}
                element={<ProductDetail />}
              />
              <Route
                path={ROUTES.PRODUCTS.UPDATE}
                element={<UpdateProduct />}
              />
            </Route>

            {/* Category Routes */}
            <Route path={ROUTES.CATEGORIES.ROOT}>
              <Route index element={<CategoryPage />} />
              <Route
                path={ROUTES.CATEGORIES.DETAILS}
                element={<CategoryDetail />}
              />
              <Route
                path={ROUTES.CATEGORIES.CREATE}
                element={<CategoryCreate />}
              />
              <Route
                path={ROUTES.CATEGORIES.UPDATE}
                element={<CategoryUpdate />}
              />

              {/* <Route path={ROUTES.CATEGORIES.UPDATE} element={<CategoryUpdate />} /> */}
            </Route>

            {/* Subcategories routes */}
            <Route path={ROUTES.SUBCATEGORIES.ROOT}>
              <Route
                path={ROUTES.SUBCATEGORIES.CREATE}
                element={<AddSubCategory />}
              />
              <Route
                path={ROUTES.SUBCATEGORIES.UPDATE}
                element={<EditSubCategory />}
              />
            </Route>

            {/* Payment Routes */}
            <Route path={ROUTES.PAYMENTS.ROOT}>
              <Route index element={<PaymentPage />} />
            </Route>

            {/* Shipping and Delivery Routes */}
            <Route path={ROUTES.SHIPPING.ROOT}>
              <Route index element={<ShippingPage />} />
              <Route
                path={ROUTES.SHIPPING.UPDATE}
                element={<ShippingUpdate />}
              />
            </Route>

            {/* Settings Routes */}
            <Route path={ROUTES.SETTINGS.ROOT}>
              <Route index element={<SettingPage />} />
            </Route>

            {/* Terms and Conditions Routes */}
            {/* <Route path={ROUTES.TERMS_AND_CONDITIONS.ROOT}>
              <Route index element={<TermsAndConditionsPage />} />
              <Route
                path={ROUTES.TERMS_AND_CONDITIONS.UPDATE}
                element={<TermsAndConditionsUpdate />}
              />
            </Route> */}

            {/* Privacy Policy Routes */}
            {/* <Route path={ROUTES.PRIVACY_POLICY.ROOT}>
              <Route index element={<PrivacyPolicyPage />} />
              <Route
                path={ROUTES.PRIVACY_POLICY.UPDATE}
                element={<PrivacyPolicyUpdate />}
              />
            </Route> */}

            {/* SubCategory Routes */}
            {/* <Route path={ROUTES.SUBCATEGORIES.ROOT}>
              <Route index element={<SubCategoryPage />} />
              <Route
                path={ROUTES.SUBCATEGORIES.DETAILS}
                element={<SubCategoryDetail />}
              />
              <Route
                path={ROUTES.SUBCATEGORIES.CREATE}
                element={<AddSubCategory />}
              />
              <Route
                path={ROUTES.SUBCATEGORIES.UPDATE}
                element={<EditSubCategory />}
              />
            </Route> */}

            {/* Payment Routes */}
            {/* <Route path={ROUTES.PAYMENTS.ROOT}>
              <Route index element={<PaymentPage />} />
              <Route
                path={ROUTES.PAYMENTS.UPDATE}
                element={<PaymentUpdate />}
              />
            </Route> */}
          </Route>
          {/* <Route path={ROUTES.SHOP.CREATE} element={<ShopCreate />} /> */}
          {/* <Route path={ROUTES.PRODUCT.DETAIL} element={<ProductDetail />} /> */}
          {/* <Route path={ROUTES.ORDERPAGE} element={<OrderPage />} /> */}
          {/* <Route path={ROUTES.SPECIFICORDER} element={<OrderDetail />} /> */}
          {/* <Route path={ROUTES.PRODUCT.LIST} element={<ProductPage />} /> */}
          {/* <Route path={ROUTES.SHOP.LIST} element={<ShopPage />} /> */}
          {/* <Route path={ROUTES.SHOP.DETAIL} element={<ShopDetail />} /> */}
          {/* <Route path={ROUTES.SHOP.EDIT} element={<ShopEdit />} /> */}
          {/* Super Admin Routes */}
          {/* {user?.role === 'Super_Admin' && (
            <>
              <Route path={ROUTES.NEW_ADMIN} element={<NewAdmin />} />
              <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
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
              <Route path={ROUTES.PRODUCT.UPDATE} element={<ProductUpdate />} />
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
            </>
          )} */}
          {/* Shop Seller Admin Routes */}
          {/* {user?.role === 'Shop_Seller_Site_Admin' && (
            <>
              <Route
                path={ROUTES.SELLER_PRODUCT}
                element={<SellerProductList />}
              />
              <Route path={ROUTES.SELLER_SHOP} element={<SellerShop />} />
            </>
          )} */}
          {/* </Route> */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
