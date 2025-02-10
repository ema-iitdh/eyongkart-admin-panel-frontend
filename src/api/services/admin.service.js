import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const adminServices = {
  getAllAdmins: async () => {
    const response = await Axios.get(API_ENDPOINTS.admin.getAll);
    return response.data;
  },
  createNewAdmin: async (formData) => {
    const response = await Axios.post(
      API_ENDPOINTS.adminAuth.createNew,
      formData
    );
    return response.data;
  },
  getAdminById: async (adminId) => {
    const response = await Axios.get(API_ENDPOINTS.admin.getById(adminId));
    return response.data;
  },
  deleteAdmin: async (adminId) => {
    const response = await Axios.delete(API_ENDPOINTS.admin.delete(adminId));
    return response.data;
  },
  updateAdmin: async (formData) => {
    const response = await Axios.put(
      API_ENDPOINTS.admin.update(formData.adminId),
      formData
    );
    return response.data;
  },
};
