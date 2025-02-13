import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const settingsService = {
  getEyongkartInfo: async () => {
    const response = await Axios.get(API_ENDPOINTS.settings.getEyongkartInfo);
    return response.data;
  },
  updateEyongkartInfo: async (data) => {
    const { id, ...rest } = data;
    const response = await Axios.put(
      API_ENDPOINTS.settings.updateEyongkartInfo(id),
      rest
    );
    return response.data;
  },
  createEyongkartInfo: async (data) => {
    const response = await Axios.post(
      API_ENDPOINTS.settings.createEyongkartInfo,
      data
    );
    return response.data;
  },
  deleteEyongkartInfo: async (data) => {
    const { id, ...rest } = data;
    const response = await Axios.delete(
      API_ENDPOINTS.settings.deleteEyongkartInfo(id),
      rest
    );
    return response.data;
  },
};
