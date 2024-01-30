import axios from "axios";

export const createGrindCategoryMaster = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/create/grindMaster`,
      values
    );
  };
  
  export const removeGrindCategoryMaster = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/remove/grindMaster/${_id}`
    );
  };
  
  export const listGrindCategoryMaster = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/list/grindMaster`
    );
  };
  
  
  export const updateGrindCategoryMaster = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/update/grindMaster/${_id}`,
      values
    );
  };
  
  export const getGrindCategoryMaster = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/get/grindMaster/${_id}`
    );
  };
  