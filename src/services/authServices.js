import axios from "../utils/axios-customize";

const loginUser = (data) => {
  return axios.post("auth/login", data);
};
const logout = () => {
  return axios.get("auth/logout");
};

const register = (data) => {
  return axios.post("auth/register", data);
};

const fetchAccount = () => {
  return axios.get("/auth/account");
};

export { loginUser, logout, register, fetchAccount };
