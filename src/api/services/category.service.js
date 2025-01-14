import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const categoryServices = {
  getAllCategories: async () => {
    const response = await Axios.get(API_ENDPOINTS.categories.getAll);
    return response.data;
  },
  updateCategory: async (categoryId, formData) => {
    const response = await Axios.put(
      API_ENDPOINTS.categories.update(categoryId),
      formData
    );
    return response.data;
  },
  createCategory: async (formData) => {
    const response = await Axios.post(API_ENDPOINTS.categories.add, formData);
    return response.data;
  },
  createSubCategory: async (formData) => {
    const response = await Axios.post(API_ENDPOINTS.subcategory.add, formData);
    return response.data;
  },
};
