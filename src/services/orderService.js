import axios from "../utils/axios-customize";
const createOrder = (data) => {
  return axios.post("/order/create", data);
};

const getOrderByUserId = (userId) => {
  return axios.get(`/order/history/${userId}`);
};
export { createOrder, getOrderByUserId };
