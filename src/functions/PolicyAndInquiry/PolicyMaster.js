import axios from "axios";

export const createPolicyMaster= async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/create/policyMaster`,
      values
    );
  };
  
  export const removePolicyMaster= async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/remove/policyMaster/${_id}`
    );
  };
  
  export const listPolicyMaster= async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/list/policyMaster`
    );
  };
  
  
  export const updatePolicyMaster= async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/update/policyMaster/${_id}`,
      values
    );
  };
  
  export const getPolicyMaster= async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/get/policyMaster/${_id}`
    );
  };
  