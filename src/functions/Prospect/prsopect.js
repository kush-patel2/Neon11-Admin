import axios from "axios";

export const getProspect = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/get-prospect/${_id}`
  );
};

export const removeProspect = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/prospect-remove/${_id}`
  );
};

export const updateProspect = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/prospect-update/${_id}`,
    values
  );
};
