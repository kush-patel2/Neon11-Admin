import axios from "axios";

export const createAdminUser = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/admin-user`,
    values
  );
};

export const removeAdminUser = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/admin-user/${_id}`
  );
};

export const listAdminUser = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/admin-user`
  );
};

export const updateAdminUser = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/admin-user/${_id}`,
    values
  );
};

export const getAdminUser = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/admin-user/${_id}`
  );
};
