// src/constants/routes.ts - Route definitions
export const basename = '/admin';

export const ROUTES = {
  DASHBOARD: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ANALYTICS: '/dashboard/analytics',
  ORDERPAGE: '/dashboard/orders',
  SPECIFICORDER: '/dashboard/orders/:orderId',
  ALLCUSTOMERS: '/dashboard/customers',
  SPECIFICCUSTOMER: '/dashboard/customers/:customerId',
  ALLCATEGORIES: '/dashboard/categories/',
  SPECIFICCATEGORY: '/dashboard/categories/:categoryId',
  EDITCATEGORY: '/dashboard/categories/:categoryId/edit',
  ADD_SUBCATEGORY: '/dashboard/categories/:categoryId/subcategories/add',
  EDIT_SUBCATEGORY:
    '/dashboard/categories/:categoryId/subcategories/:subCategoryId/edit',
  PRODUCT: {
    LIST: '/dashboard/products',
    DETAIL: '/dashboard/products/:productId',
    CREATE: '/dashboard/products/create',
    UPDATE: '/products/update/:productId',
  },
  SHOP: {
    LIST: '/dashboard/shops',
    DETAIL: '/dashboard/shops/:shopId',
    EDIT: '/dashboard/shops/:shopId/edit',
    CREATE: '/dashboard/shops/create',
  },
  SELLER_DASHBOARD: '/',
  SELLER_PRODUCT: '/seller/products',
  SELLER_ORDER: '/seller/orders',
  SELLER_SHOP: 'seller/shops',
  SELLER_SHOP_EDIT: 'seller/shop/edit/:shopId',

  NEW_ADMIN: '/newadmin/create',

  COLLECTIONS: '/collections',
  COLLECTIONS_PRODUCTS: '/collections/:title',
  SEARCH: '/search',
  SEARCH_RESULTS: '/search/:searchTerm',
  ABOUT: '/about',
  CART: '/cart',

  SORTED: '/sorted/:categoryId/:subcategoryId?',
  CATEGORY: '/category',
  CATEGORY_CREATE: '/dashboard/category/create',
  CHECKOUT_FROM_CART: '/checkout',
  CHECKOUT_USING_BUY_NOW: '/checkout/:productId/:variantId/:quantity',
  ORDER_CONFIRMATION: '/orderconfirm',
  ORDER_DETAIL: '/order/:orderId',
  WISHLIST: '/wishlist',
  MY_ORDER: '/myorder',
  CHAT: '/chat',
  SELLER_FORM: '/sellerform',
  SELL_ON: '/sellOn',
  PRIVACY_POLICY: '/privacypolicy',
  TERMS_AND_CONDITIONS: '/tac',
  CANCELLATION_AND_REFUND: '/cancel',
  SHIPPING_AND_DELIVERY: '/shipping',
  CONTACT: '/contact',
};

// export const ROUTES = Object.entries(routesWithoutBaseName).reduce(
//   (acc, [key, value]) => {
//     acc[key] = basename + value;
//     return acc;
//   },
//   {}
// );
