import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};
const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const phoneService = {
  getAll,
  create,
  removePerson,
  updatePerson,
};
export default phoneService;
