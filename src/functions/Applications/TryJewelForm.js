import axios from "axios";

export const listTryJewel = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/list-try-jewel`
  );
};

export const createTryJewel = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/create-try-jewel`,
    values,
    { 
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getTryJewel = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/get-try-jewel/${_id}`
  );
};

export const removeTryJewel = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/remove-try-jewel/${_id}`
  );
};

export const updateTryJewel = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/update-try-jewel/${_id}`,
    values
  );
};
