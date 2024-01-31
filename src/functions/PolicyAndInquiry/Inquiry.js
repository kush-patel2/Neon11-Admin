import axios from "axios";

export const createInquiry= async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/Inquiry`,
      values
    );
  };
  
  export const removeInquiry= async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/Inquiry/${_id}`
    );
  };
  
  export const listInquiry= async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/Inquiry`
    );
  };
  
  
  export const updateInquiry= async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/Inquiry/${_id}`,
      values
    );
  };
  
  export const getInquiry= async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/Inquiry/${_id}`
    );
  };
  