// all payment services

import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

const getAllPayments = async () => {
  const response = await Axios.get(API_ENDPOINTS.payment.getAllPayments);
  return response.data;
};

const getPaymentById = async (id) => {
  const response = await Axios.get(API_ENDPOINTS.payment.getPaymentById(id));
  return response.data;
};

const updatePayment = async (id, data) => {
  const response = await Axios.put(
    API_ENDPOINTS.payment.updatePayment(id),
    data
  );
  return response.data;
};

const deletePayment = async (id) => {
  const response = await Axios.delete(API_ENDPOINTS.payment.deletePayment(id));
  return response.data;
};

export const paymentService = {
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
