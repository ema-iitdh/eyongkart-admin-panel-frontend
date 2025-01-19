import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const productService = {
  createProductPost: async (formData) => {
    const response = await Axios.post(API_ENDPOINTS.products.add, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data;
  },
  getProducts: async ({ filter = "" }) => {
    const response = await Axios.get(API_ENDPOINTS.products.list(filter));
    console.log(response.data)
    return response.data;
  },
  updateProduct: async (id, formData) => {
    const response = await Axios.put(
      API_ENDPOINTS.products.update(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response?.data);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await Axios.delete(API_ENDPOINTS.products.delete(id));
    console.log(response?.data);
    return response.data;
  },
  getProductById: async (id) => {
    const response = await Axios.get(API_ENDPOINTS.products.detail(id));
    return response.data;
  },

  getProductByShopId: async (shopId) => {
    const response = await Axios.get(
      API_ENDPOINTS.products.getProductByShopId(shopId)
    );
    return response.data;
  },

  getProductBySellerId: async (sellerId) => {
    const response = await Axios.get(API_ENDPOINTS.products.getProductBySellerId(sellerId));
    return response.data;
  }
};
