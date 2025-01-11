import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const shopService = {
    getAllShops: async() => {
        const response = await Axios.get(API_ENDPOINTS.shop.list);
        return response.data;
    }
}