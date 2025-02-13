import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const orderService = {
  getAllOrders: async () => {
    const response = await Axios.get(
      API_ENDPOINTS.orders.getAllOrderForAllUsers
    );
    return response.data;
  },
  getAllOrdersForCustomer: async (userId) => {
    const response = await Axios.get(
      API_ENDPOINTS.orders.getAllOrdersForCustomer(userId)
    );
    return response.data;
  },
  updateOrderStatus: async (orderId, status) => {
    const response = await Axios.put(
      API_ENDPOINTS.orders.updateStatus(orderId),
      { status }
    );
    return response.data;
  },
  updatePaymentStatus: async (orderId, paymentStatus) => {
    const response = await Axios.put(
      API_ENDPOINTS.orders.updatePaymentStatus(orderId),
      { paymentStatus }
    );
    return response.data;
  },
  deleteOrderById: async (orderId) => {
    const response = await Axios.delete(
      API_ENDPOINTS.orders.deleteOrderById(orderId)
    );
    return response.data;
  },
  updateEstimatedDeliveryDate: async (orderId, estimatedDeliveryDate) => {
    const response = await Axios.put(
      API_ENDPOINTS.orders.updateEstimatedDeliveryDate(orderId),
      { estimatedDeliveryDate }
    );
    return response.data;
  },
};
