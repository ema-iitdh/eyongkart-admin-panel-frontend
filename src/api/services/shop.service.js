import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const shopService = {
    getAllShops: async() => {
        const response = await Axios.get(API_ENDPOINTS.shop.list);
        return response.data;
    },
    updateCategory: async (shopId, formData) => {
        const response = await Axios.get(API_ENDPOINTS.shop.update(shopId), formData);
        return response.data;
    },
    getShopById: async (id) => {
        const response = await Axios.get(API_ENDPOINTS.shop.getShopById(id));
        return response.data;
    },
    getShopBySellerId: async (sellerId) => {
        const response = await Axios.get(API_ENDPOINTS.shop.getShopBySellerId(sellerId));
        return response.data;
    },
    createShopPost: async (formData) => {
        const response = await Axios.post(API_ENDPOINTS.shop.add, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response);
          return response.data;
    }

}