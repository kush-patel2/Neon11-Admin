import axios from "axios";

export const createParameterValue = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/parameterValue`,
    values
  );
};

export const removeParameterValue = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/parameterValue/${_id}`
  );
};

export const listParameterValue = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/parameterValue`
  );
};

export const updateParameterValue = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/parameterValue/${_id}`,
    values
  );
};

export const getParameterValue = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/parameterValue/${_id}`
  );
};
