// src/constants/routes.ts - Route definitions
export const basename = "/admin";

export const ROUTES = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  getDashboardLink: function () {
    return `${this.DASHBOARD}`;
  },
  LOGIN: "/login",
  getLoginLink: function () {
    return `${this.LOGIN}`;
  },
  SIGNUP: "/signup",
  getSignupLink: function () {
    return `${this.SIGNUP}`;
  },
  ANALYTICS: "analytics",
  getAnalyticsLink: function () {
    return `${this.DASHBOARD}/${this.ANALYTICS}`;
  },
  // ORDERPAGE: 'orders',
  // SPECIFICORDER: '/dashboard/orders/:orderId',
  // ALLCUSTOMERS: '/dashboard/customers',
  // ALLCATEGORIES: '/dashboard/categories/',
  // SPECIFICCATEGORY: '/dashboard/categories/:categoryId',
  // EDITCATEGORY: '/dashboard/categories/:categoryId/edit',
  // ADD_SUBCATEGORY: '/dashboard/categories/:categoryId/subcategories/add',
  // EDIT_SUBCATEGORY:
  //   '/dashboard/categories/:categoryId/subcategories/:subCategoryId/edit',
  PRODUCTS: {
    ROOT: "products",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    DETAILS: ":productId",
    getDetailsLink: function (productId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/${productId}`;
    },
    CREATE: "create",
    getCreateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/create`;
    },
    UPDATE: "update/:productId",
    getUpdateLink: function (productId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update/${productId}`;
    },
  },
  ORDERS: {
    ROOT: "orders",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    DETAILS: ":orderId",
    getDetailsLink: function (orderId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/${orderId}`;
    },
    UPDATE: "update/:orderId",
    getUpdateLink: function (orderId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update/${orderId}`;
    },
  },
  SHOP: {
    ROOT: "shops",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    DETAILS: ":shopId",
    getDetailsLink: function (shopId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/${shopId}`;
    },
    UPDATE: "update/:shopId",
    getUpdateLink: function (shopId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update/${shopId}`;
    },
    CREATE: "create",
    getCreateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/create`;
    },
  },
  CUSTOMERS: {
    ROOT: "customers",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    DETAILS: ":customerId",
    getDetailsLink: function (customerId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/${customerId}`;
    },
    UPDATE: "update/:customerId",
    getUpdateLink: function (customerId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update/${customerId}`;
    },
  },
  CATEGORIES: {
    ROOT: "categories",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    DETAILS: ":categoryId",
    getDetailsLink: function (categoryId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/${categoryId}`;
    },
    CREATE: "create",
    getCreateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/create`;
    },
    UPDATE: "update/:categoryId",
    getUpdateLink: function (categoryId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update/${categoryId}`;
    },
  },
  SUBCATEGORIES: {
    ROOT: "subcategories",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    DETAILS: ":subCategoryId",
    getDetailsLink: function (subCategoryId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/${subCategoryId}`;
    },
    CREATE: "create/:categoryId",
    getCreateLink: function (categoryId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/create/${categoryId}`;
    },
    UPDATE: "update/:categoryId/:subCategoryId",
    getUpdateLink: function (categoryId, subCategoryId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update/${categoryId}/${subCategoryId}`;
    },
  },
  PAYMENTS: {
    ROOT: "payments",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    DETAILS: ":paymentId",
    getDetailsLink: function (paymentId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/${paymentId}`;
    },
    CREATE: "create",
    getCreateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/create`;
    },
    UPDATE: "update/:paymentId",
    getUpdateLink: function (paymentId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update/${paymentId}`;
    },
  },
  SHIPPING: {
    ROOT: "shipping",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    DETAILS: ":shippingId",
    getDetailsLink: function (shippingId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/${shippingId}`;
    },
    CREATE: "create",
    getCreateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/create`;
    },
    UPDATE: "update/:shippingId",
    getUpdateLink: function (shippingId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update/${shippingId}`;
    },
  },
  ADMIN: {
    ROOT: "admin",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    CREATE: "create",
    getCreateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/create`;
    },
    DETAILS: ":adminId",
    getDetailsLink: function (adminId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/${adminId}`;
    },
    UPDATE: "update/:adminId",
    getUpdateLink: function (adminId) {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update/${adminId}`;
    },
  },
  PRIVACY_POLICY: {
    ROOT: "privacy-policy",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    UPDATE: "update",
    getUpdateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update`;
    },
  },
  TERMS_AND_CONDITIONS: {
    ROOT: "terms-and-conditions",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    UPDATE: "update",
    getUpdateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update`;
    },
  },
  SHIPPING_AND_DELIVERY: {
    ROOT: "shipping-and-delivery",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    UPDATE: "update",
    getUpdateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update`;
    },
  },
  CONTACT: {
    ROOT: "contact",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    UPDATE: "update",
    getUpdateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update`;
    },
  },
  CANCELLATION_AND_REFUND: {
    ROOT: "cancellation-and-refund",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    UPDATE: "update",
    getUpdateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update`;
    },
  },
  SETTINGS: {
    ROOT: "settings",
    getRootLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}`;
    },
    UPDATE: "update",
    getUpdateLink: function () {
      return `${ROUTES.DASHBOARD}/${this.ROOT}/update`;
    },
  },
  // SELLER_DASHBOARD: '/',
  // SELLER_PRODUCT: '/seller/products',
  // SELLER_ORDER: '/seller/orders',
  // SELLER_SHOP: 'seller/shops',
  // SELLER_SHOP_EDIT: 'seller/shop/edit/:shopId',

  // NEW_ADMIN: '/newadmin/create',

  // COLLECTIONS: '/collections',
  // COLLECTIONS_PRODUCTS: '/collections/:title',
  // SEARCH: '/search',
  // SEARCH_RESULTS: '/search/:searchTerm',
  // ABOUT: '/about',
  // CART: '/cart',

  // SORTED: '/sorted/:categoryId/:subcategoryId?',
  // CATEGORY: '/category',
  // CATEGORY_CREATE: '/dashboard/category/create',
  // CHECKOUT_FROM_CART: '/checkout',
  // CHECKOUT_USING_BUY_NOW: '/checkout/:productId/:variantId/:quantity',
  // ORDER_CONFIRMATION: '/orderconfirm',
  // ORDER_DETAIL: '/order/:orderId',
  // WISHLIST: '/wishlist',
  // MY_ORDER: '/myorder',
  // CHAT: '/chat',
  // SELLER_FORM: '/sellerform',
  // SELL_ON: '/sellOn',
  // PRIVACY_POLICY: '/privacypolicy',
  // TERMS_AND_CONDITIONS: '/tac',
  // CANCELLATION_AND_REFUND: '/cancel',
  // SHIPPING_AND_DELIVERY: '/shipping',
  // CONTACT: '/contact',
};

// export const ROUTES = Object.entries(routesWithoutBaseName).reduce(
//   (acc, [key, value]) => {
//     acc[key] = basename + value;
//     return acc;
//   },
//   {}
// );
