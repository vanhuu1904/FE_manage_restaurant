import axios from "../utils/axios-customize";

const createUser = (data) => {
  return axios.post("/user/create", { data });
};

const updateUser = (data) => {
  return axios.put("/user/update", { data });
};

const fetchAllUsers = () => {
  return axios.get("/user/read");
};

const deleteUser = (id) => {
  return axios.delete(`/user/delete/${id}`);
};

export { createUser, updateUser, fetchAllUsers, deleteUser };
