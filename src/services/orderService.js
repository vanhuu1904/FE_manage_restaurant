import axios from "../utils/axios-customize";
const createOrder = (data) => {
  return axios.post("/order/create", data);
};

const getOrderByUserId = (userId) => {
  return axios.get(`/order/history/${userId}`);
};

const updateOrder = (data) => {
  return axios.put(`/orderItem/update`, data);
};

const getAllOrder = () => {
  return axios.get(`/orderItem/read`);
};
export { createOrder, getOrderByUserId, updateOrder, getAllOrder };
