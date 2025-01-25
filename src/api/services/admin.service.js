import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const adminServices = {
    getAllAdmins: async () => {
        const response = await Axios.get(API_ENDPOINTS.admin.getAll);
        return response.data;
    },
    createNewAdmin: async (formData) => {
        const response = await Axios.post(API_ENDPOINTS.adminAuth.createNew, formData);
        return response.data;
    }
}