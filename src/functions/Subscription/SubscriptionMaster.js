import axios from "axios";

export const createSubscriptionMaster = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/SubscriptionMaster`,
    values
  );
};

export const removeSubscriptionMaster = async (_id) => { 
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/SubscriptionMaster/${_id}`
  );
};

export const listSubscriptionMaster = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/SubscriptionMaster`
  );
};

export const updateSubscriptionMaster = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/SubscriptionMaster/${_id}`,
    values
  );
};

export const getSubscriptionMaster = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/SubscriptionMaster/${_id}`
  );
};
