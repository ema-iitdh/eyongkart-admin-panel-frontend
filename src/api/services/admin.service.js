import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const adminServices = {
    getAllAdmins: async () => {
        const response = await Axios.get(API_ENDPOINTS.admin.getAll);
        return response.data;
    },
}