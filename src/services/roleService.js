import axios from "../utils/axios-customize";

const createRoles = (data) => {
  return axios.post("/role/create", [...data]);
};

const fetchAllRoles = () => {
  return axios.get("/role/read");
};

const deleteRole = (role) => {
  return axios.delete("/role/delete", { data: { id: role.id } });
};

const updateRole = (data) => {
  return axios.put("/role/update", { ...data });
};

const fetchRolesByGroup = (groupId) => {
  return axios.get(`/role/by-group/${groupId}`);
};

const assignRolesToGroup = (data) => {
  return axios.post("/role/asssign-to-group", { data });
};
const fetchGroup = () => {
  return axios.get("/group/read");
};

export {
  createRoles,
  fetchAllRoles,
  deleteRole,
  updateRole,
  fetchRolesByGroup,
  assignRolesToGroup,
  fetchGroup,
};
