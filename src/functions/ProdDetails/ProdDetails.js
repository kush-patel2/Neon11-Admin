import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL_COFFEE;

export const createProdDetails = async (values,) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/prod-details`,
    values
  );
};

export const removeProdDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/prod-details/${_id}`
  );
};

export const listProdDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/prod-details`
  );
};

export const updateProdDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/prod-details/${_id}`,
    values
  );
};

export const getProdDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/prod-details/${_id}`
  );
};

export const listProdByCategory = async (categoryId) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/products-by-category/${categoryId}`
  );
};

export const listProdByCategoryName = async (categoryName) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/products-by-category-name/${categoryName}`
  );
};
