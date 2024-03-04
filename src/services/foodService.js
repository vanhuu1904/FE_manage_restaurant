import axios from "../utils/axios-customize";

const createFood = (data) => {
  return axios.post("/food/create", { ...data });
};

const updateFood = (data) => {
  return axios.put("/food/update", { data });
};

const fetchAllFoods = () => {
  return axios.get("/food/read");
};

const deleteFood = (id) => {
  return axios.delete(`/food/delete/${id}`);
};

const createAllFoods = (data) => {
  return axios.post("/food/createFoods", { data });
};

const getFoodById = (id) => {
  return axios.get(`/food/getAFood/${id}`);
};

const getFoodsByName = (data) => {
  return axios.get(`/food/getFoodByName/${data}`);
};

export {
  createFood,
  updateFood,
  fetchAllFoods,
  deleteFood,
  createAllFoods,
  getFoodById,
  getFoodsByName,
};
