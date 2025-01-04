import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const authService = {
    login: async ({ email, password }) => {
        const response = await Axios.post(API_ENDPOINTS.adminAuth.login, { email, password });
        return response.data;
    },
    register: async ({ username, email, password, phone }) => {
        const response = await Axios.post(API_ENDPOINTS.adminAuth.register, { username, email, password, phone });
        return response.data;
    },
    logout: async () => {
        const response = await Axios.post(API_ENDPOINTS.adminAuth.logout);
        return response.data;
    }
}