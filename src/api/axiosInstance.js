import axios from 'axios';
import { API_CONFIG } from '../config/api';

const Axios = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
  withCredentials: API_CONFIG.WITH_CREDENTIALS,
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default Axios;
