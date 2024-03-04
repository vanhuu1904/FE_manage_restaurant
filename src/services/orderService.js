import axios from "../utils/axios-customize";
const createOrder = (data) => {
  return axios.post("/order/create", data);
};
export { createOrder };
