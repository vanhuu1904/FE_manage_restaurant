import axios from "../utils/axios-customize";

const getAllUser = () => {
  return axios.get("/account/allAccounts");
};

const getAllFood = () => {
  return axios.get("/food");
};

const createAFood = (data) => {
  return axios.post("/food/register", data);
};

const fetchFoodById = (id) => {
  return axios.post("/food/id", id);
};

const callLogout = () => {
  return axios.post("/auth/logout");
};

export const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

const registerOrder = (data) => {
  return axios.post("order/register", data);
};

// const fetchAccount = () => {
//   return axios.get("/auth/account");
// };

const fetchListUser = (query) => {
  return axios.get(`/user?${query}`);
};

const getAUser = (_id) => {
  return axios.get(`/user/${_id}`);
};

const createANewUser = (username, password, fullname, studentcode, address) => {
  return axios.post("/user", {
    username,
    password,
    fullname,
    studentcode,
    address,
  });
};

const updateAUser = (_id, fullname, studentcode, address) => {
  return axios.patch("/user", { _id, fullname, studentcode, address });
};

const deleteAUser = (_id) => {
  return axios.delete(`/user/${_id}`);
};

const changePassword = (currentpassword, newpassword) => {
  return axios.post(`/auth/change_password`, { currentpassword, newpassword });
};

export {
  getAllFood,
  createAFood,
  fetchFoodById,
  callLogout,
  // fetchAccount,
  registerOrder,
  fetchListUser,
  createANewUser,
  updateAUser,
  deleteAUser,
  getAUser,
  changePassword,
  getAllUser,
};
