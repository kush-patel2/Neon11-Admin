import axios from "axios";

export const createDrinkCategory = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/create/drinkMaster`,
      values
    );
  };
  
  export const removeDrinkCategory = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/remove/drinkMaster/${_id}`
    );
  };
  
  export const listDrinkCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/list/drinkMaster`
    );
  };
  
  
  export const updateDrinkCategory = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/update/drinkMaster/${_id}`,
      values
    );
  };
  
  export const getDrinkCategory = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/get/drinkMaster/${_id}`
    );
  };
  