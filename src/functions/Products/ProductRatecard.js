import axios from "axios";

export const createProductRatecard = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/ProductRatecard`,
    values
  );
};

export const removeProductRatecard = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/ProductRatecard/${_id}`
  );
};

export const listProductRatecard = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/ProductRatecard`
  );
};

export const updateProductRatecard = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/ProductRatecard/${_id}`,
    values
  );
};

export const getProductRatecard = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/ProductRatecard/${_id}`
  );
};
