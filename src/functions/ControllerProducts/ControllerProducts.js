import axios from "axios";

export const createControllerProds = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/controllerproducts`,
    values
  );
};

export const removeControllerProds = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/controllerproducts/${_id}`
  );
};

export const listControllerProds = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/controllerproducts`
  );
};

export const updateControllerProds = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/controllerproducts/${_id}`,
    values
  );
};

export const getControllerProds = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/controllerproducts/${_id}`
  );
};
