import axios from "axios";

export const createAboutUs = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/aboutus`,
    values
  );
};

export const removeAboutUs = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/aboutus/${_id}`
  );
};

export const listAboutUs = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/aboutus`
  );
};

export const updateAboutUs = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/aboutus/${_id}`,
    values
  );
};

export const getAboutUs = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/aboutus/${_id}`
  );
};
