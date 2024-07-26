import axios from "axios";

export const createLEDCategory = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/LEDCategoryMaster`,
      values
    );
  };
  
  export const removeLEDCategory = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/LEDCategoryMaster/${_id}`
    );
  };
  
  export const listLEDCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/LEDCategoryMaster`
    );
  };
  export const listLEDActiveCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list-active/LEDCategoryMaster`
    );
  };
  
  
  export const updateLEDCategory = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/LEDCategoryMaster/${_id}`,
      values
    );
  };
  
  export const getLEDCategory = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/LEDCategoryMaster/${_id}`
    );
  };
  