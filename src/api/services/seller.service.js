import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const sellerService = {
    getSellerById: async (sellerId) => {
        const response = Axios.get(API_ENDPOINTS.seller.getSellerById(sellerId));
        return (await response).data;
    }
}