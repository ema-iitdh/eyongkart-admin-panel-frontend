import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const sellerService = {
    getSellerById: async (sellerId) => {
        console.log("hereeeee with sellerId:", sellerId)
        try {
            const url = API_ENDPOINTS.seller.getSellerById(sellerId);
            console.log("Making request to:", url);
            const response = await Axios.get(url);
            console.log(response, "response")
            return response.data;
        } catch (error) {
            console.error("API call error:", error);
            throw error;
        }
    }
}