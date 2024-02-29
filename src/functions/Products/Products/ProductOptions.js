import axios from "axios";

export const createProductOptions = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/productOptions`,
    values
  );
};

export const removeProductOptions = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/productOptions/${_id}`
  );
};

export const listProductOptions = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/productOptions`
  );
};

export const updateProductOptions = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/productOptions/${_id}`,
    values
  );
};

export const getProductOptions = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/productOptions/${_id}`
  );
};

export const createProductOptionsForvariants = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/productOptionsForVariants`,
    values
  );
};

export const updateProductOptionsForvariants = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/updateProductOptionsForvariants`,
    values
  );
};

export const listProductOptionsByProductId = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/productOptionsByProductId/${_id}`
  );
};
