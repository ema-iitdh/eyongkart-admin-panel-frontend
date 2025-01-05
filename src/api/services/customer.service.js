import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const customerService = {
    getAllCustomers: async () => {
        const response = await Axios.get(API_ENDPOINTS.customer.getAllCustomer);
        return response.data;
    }
}