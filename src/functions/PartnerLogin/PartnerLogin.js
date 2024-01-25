import axios from "axios";

export const createPartner = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/create-partner/ziya`,
    values
  );
};

export const removePartner = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/partners/remove-ziya/${_id}`
  );
};

export const listPartner = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/partners/ziya`
  );
};

export const updatePartner = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/partner/update-ziya/${_id}`,
    values
  );
};

export const getPartner = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/get-partner/${_id}`
  );
};
