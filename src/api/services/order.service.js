import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const orderService = {
    getAllOrders: async () => {
        const response = await Axios.get(API_ENDPOINTS.orders.getAllOrderForAllUsers);
        return response.data;
    },
    getAllOrdersForCustomer: async (userId) => {
        const response = await Axios.get(API_ENDPOINTS.orders.getAllOrdersForCustomer(userId));
        return response.data;
    }
}