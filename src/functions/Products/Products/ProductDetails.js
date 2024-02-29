import axios from "axios";

export const createProducts = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/product/product-details`,
    values
  );
};

export const removeProducts = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/product/product-details/${_id}`
  );
};

export const listProducts = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/product/product-details`
  );
};

export const updateProducts = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/product/product-details/${_id}`,
    values
  );
};

export const getProducts = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/product/product-details/${_id}`
  );
};
