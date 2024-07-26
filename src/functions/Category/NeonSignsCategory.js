import axios from "axios";

export const createNeonSignsCategory = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/NeonSignsCategoryMaster`,
      values
    );
  };
  
  export const removeNeonSignsCategory = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/NeonSignsCategoryMaster/${_id}`
    );
  };
  
  export const listNeonSignsCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/NeonSignsCategoryMaster`
    );
  };
  export const listNeonSignsActiveCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list-active/NeonSignsCategoryMaster`
    );
  };
  
  
  export const updateNeonSignsCategory = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/NeonSignsCategoryMaster/${_id}`,
      values
    );
  };
  
  export const getNeonSignsCategory = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/NeonSignsCategoryMaster/${_id}`
    );
  };
  