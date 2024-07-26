import axios from "axios";

export const registerUser = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/user`,
    values
  );
};

export const removeUser = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/users/${_id}`
  );
};

export const listUser = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/users`
  );
};

export const updateUser = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/users/${_id}`,
    values
  );
};

export const getUser = async (_id, values) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/users/${_id}`,
    values
  );
};


