import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const subcategoryServices = {
    getSubcategoryByCategoryId: async(categoryId) => {
        const response = await Axios.get(API_ENDPOINTS.subcategory.list(categoryId));
        return response.data;
    }
}