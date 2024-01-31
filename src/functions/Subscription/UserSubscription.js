import axios from "axios";

export const createUserSubscription = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/UserSubscription`,
    values
  );
};

export const removeUserSubscription = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/UserSubscription/${_id}`
  );
};

export const listUserSubscription = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/UserSubscription`
  );
};

export const updateUserSubscription = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/UserSubscription/${_id}`,
    values
  );
};

export const getUserSubscription = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/UserSubscription/${_id}`
  );
};