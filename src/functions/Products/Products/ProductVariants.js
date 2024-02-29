import axios from "axios";

export const createProductVariants = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/productVariants`,
    values
  );
};

export const removeProductVariants = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/productVariants/${_id}`
  );
};

export const listProductVariants = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/productVariants`
  );
};

export const updateProductVariants = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/productVariants/${_id}`,
    values
  );
};

export const getProductVariants = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/productVariants/${_id}`
  );
};

export const listProductVariantsByProductId = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/productVariantsByProductId/${_id}`
  );
};

export const updateProductVariantPrice = async (_id, value) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/productVariantPrice/${_id}`,
    {value: value}
  );
};

export const updateProductVariantSubs = async (_id, value) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/productVariantSubs/${_id}`,
    {value: value}
  );
};

export const updateProductVariantStock = async (_id, value) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/productVariantStock/${_id}`,
    {value: value}
  );
};

export const updateProductVariantActive = async (_id, value) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/productVariantActive/${_id}`,
    {value: value}
  );
};
