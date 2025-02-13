export const API_ENDPOINTS = {
  adminAuth: {
    login: '/admin/login',
    register: '/admin/create',
    logout: '/admin/logout',
    createNew: '/admin/create',
    // ! TODO: IMPLEMENT THIS ASAP
    refresh: '/admin/refresh',
  },
  cart: {
    list: '/cart/getCart',
    add: '/cart/add',
    remove: (productId) => `/cart/remove/${productId}`,
    update: '/cart/update',
    // ! TODO: IMPLEMENT THIS AS SOON AS POSSIBLE
    clear: '/cart/clear',
  },
  address: {
    list: (userId) => `/address/getAddressByUserId/${userId}`,
    add: '/address/addNewAddress',
    getMyAddress: '/address/myAddress',
    update: (addressId) => `/address/update/${addressId}`,
    delete: (addressId) => `/address/delete/${addressId}`,
    setDefaultAddress: (addressId) => `/address/setDefaultAddress/${addressId}`,
  },
  categories: {
    list: (filter) => `/category/get-all?${filter}`,
    getAll: '/category/get-all',
    // !!! FOR ADMIN ONLY
    add: '/category/create',
    update: (categoryId) => `/category/update/${categoryId}`,
    delete: (categoryId) => `/category/delete/${categoryId}`,
  },
  subcategory: {
    list: (categoryId) => `/subCategory/category/${categoryId}`,
    getSubcategoryById: (subcategoryId) =>
      `/subCategory/subCategoryId/${subcategoryId}`,
    // !!! SUPER ADMIN ONLY
    add: '/subCategory/create',
    update: (subcategoryId) => `/subCategory/update/${subcategoryId}`,
    delete: (subcategoryId) => `/subCategory/delete/${subcategoryId}`,
  },
  wishlist: {
    list: '/wishlist/get-all',
    toggle: '/wishlist/toggle',
  },
  orders: {
    list: '/order/getOrder',
    getMyOrders: '/order/myOrders',
    getOrderById: (orderId) => `/order/getOrderById/${orderId}`,
    getShippingDetails: '/order/getShippingDetails',
    // !!! ADMIN ONLY
    add: '/order/create',
    updateStatus: (orderId) => `/order/updateOrderStatus/${orderId}`,
    updatePaymentStatus: (orderId) => `/order/updatePaymentStatus/${orderId}`,
    getOrdersByUserId: (userId) => `/order/getAllOrdersForCustomer/${userId}`,
    // !!! SUPER ADMIN ONLY
    getAllOrderForAllUsers: '/order/getAllOrders',
    getAllOrdersForCustomer: (userId) =>
      `/order/getAllOrdersForCustomer/${userId}`,
    deleteAllOrders: '/order/deleteAllOrders',
    delete: (orderId) => `/order/delete/${orderId}`,
    deleteOrderById: (orderId) => `/order/deleteOrderById/${orderId}`,
    updateEstimatedDeliveryDate: (orderId) =>
      `/order/updateEstimatedDeliveryDate/${orderId}`,
  },
  products: {
    list: (filter = '') => `/product/allproducts?${filter}`,
    detail: (id) => `/product/getOneProduct/${id}`,
    getProductByShopId: (shopId) => `/product/shop/${shopId}`,
    getProductBySellerId: (sellerId) => `/product/seller/${sellerId}`,
    // !!! ADMIN ONLY
    add: '/product/create',
    update: (productId) => `/product/update/${productId}`,
    delete: (productId) => `/product/delete/${productId}`,
  },
  // !!! SUPER ADMIN ONLY
  admin: {
    update: (adminId = '') => `/admin/update/${adminId}`,
    getAll: '/admin/getAllAdmins',
    delete: (adminId) => `/admin/delete/${adminId}`,
    getById: (adminId) => `/admin/getAdminById/${adminId}`,
  },
  seller: {
    getSellerById: (sellerId) => `/admin/seller/${sellerId}`,
  },
  // !!! SUPER ADMIN ONLY
  shop: {
    add: '/shop/create',
    getShopById: (shopId) => `/shop/${shopId}`,
    update: (shopId) => `/shop/update/${shopId}`,
    delete: (shopId) => `/shop/delete/${shopId}`,
    getShopBySellerId: (sellerId) => `/shop/getShopBySellerId/${sellerId}`,
    // !! Implement this ASAP
    list: '/shop/getAllShops',
  },
  customer: {
    getAllCustomer: '/user/getAllCustomers',
    deleteCustomer: (customerId) => `/user/delete/${customerId}`,
    getCustomerById: (customerId) => `/user/getCustomerById/${customerId}`,
    updateCustomer: (customerId) => `/user/update/${customerId}`,
  },
};
