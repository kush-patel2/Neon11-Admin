import axios from "axios";

export const createProdCategoryMaster = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/ProductsCategoryMaster`,
      values
    );
  };
  
  export const removeProdCategoryMaster = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/ProductsCategoryMaster/${_id}`
    );
  };
  
  export const listProdCategoryMaster = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/ProductsCategoryMaster`
    );
  };
  export const listProdActiveCategories = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list-active/ProductsCategoryMaster`
    );
  };
  
  
  export const updateProdCategoryMaster = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/ProductsCategoryMaster/${_id}`,
      values
    );
  };
  
  export const getProdCategoryMaster = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/ProductsCategoryMaster/${_id}`
    );
  };
  