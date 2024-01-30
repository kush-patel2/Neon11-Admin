import axios from "axios";

export const createFAQ= async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/create/faq`,
      values
    );
  };
  
  export const removeFAQ= async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/remove/faq/${_id}`
    );
  };
  
  export const listFAQ= async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/list/faq`
    );
  };
  
  
  export const updateFAQ= async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/update/faq/${_id}`,
      values
    );
  };
  
  export const getFAQ= async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/get/faq/${_id}`
    );
  };
  