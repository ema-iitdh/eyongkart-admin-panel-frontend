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
    console.log(response.data);
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
    try {
      const response = await Axios.get(
        API_ENDPOINTS.products.getProductBySellerId(sellerId)
      );
      console.log("Response:", response); // Will log only for successful responses
      return response.data;
    } catch (error) {
      // Check if it's an HTTP error and handle gracefully
      if (error.response) {
        console.log("Error response:", error.response); // Logs backend error response
        return error.response.data; // Return the backend response (e.g., { success: false, message: '...' })
      } else {
        // For network errors or other unexpected issues
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  },
};
