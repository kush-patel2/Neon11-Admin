import axios from "axios";

export const createuserNotifcation = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/createUserNotification`,
    values
  );
};

export const removeUserNotification = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/removeUserNotification/${_id}`
  );
};

export const listuserNotification = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/listUserNotification`
  );
};

export const updateUserNotification = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/updateUserNotification/${_id}`,
    values
  );
};

export const getNotification = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/getNotification/${_id}`
  );
};
