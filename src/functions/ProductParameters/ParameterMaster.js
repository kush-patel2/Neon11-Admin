import axios from "axios";

export const createParameterMaster = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/parameterMaster`,
    values
  );
};

export const removeParameterMaster = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/parameterMaster/${_id}`
  );
};

export const listParameterMaster = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/parameterMaster`
  );
};

export const updateParameterMaster = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/parameterMaster/${_id}`,
    values
  );
};

export const getParameterMaster = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/parameterMaster/${_id}`
  );
};
