import axios from "axios";

export const createOrders = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/orders`,
    values
  );
};

export const removeOrders = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/orders/${_id}`
  );
};

export const listOrders = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/orders`
  );
};

export const updateOrders = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/orders/${_id}`,
    values
  );
};

export const getOrders = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/orders/${_id}`
  );
};

export const updateOrderStatus = async (_id, value) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/order-status/${_id}`,
    {OrderStatus: value}
  );
};
