import Axios from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const subcategoryServices = {
  getSubcategoryByCategoryId: async (categoryId) => {
    const response = await Axios.get(
      API_ENDPOINTS.subcategory.list(categoryId)
    );
    return response.data;
  },
  createSubCategory: async (formData) => {
    const response = await Axios.post(API_ENDPOINTS.subcategory.add, formData);
    return response.data;
  },
  deleteSubCategory: async (subcategoryId) => {
    const response = await Axios.delete(
      API_ENDPOINTS.subcategory.delete(subcategoryId)
    );
    return response.data;
  },
  updateSubCategory: async (formData) => {
    const response = await Axios.put(
      API_ENDPOINTS.subcategory.update(formData.subCategoryId),
      formData
    );
    return response.data;
  },
};
