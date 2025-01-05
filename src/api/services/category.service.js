import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const categoryServices = {
    getAllCategories: async () => {
        const response = await Axios.get(API_ENDPOINTS.categories.getAll);
        return response.data;
    },
    updateCategory: async (categoryId, formData) => {
        const response = await Axios.get(API_ENDPOINTS.categories.update(categoryId), formData);
        return response.data;
    }
}