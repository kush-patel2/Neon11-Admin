import axios from "axios";

export const createVisionmission = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/vision-mission`,
    values
  );
};

export const removeVisionmission = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/vision-mission/${_id}`
  );
};

//   export const listContact = async () => {
//     return await axios.get(
//       `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/company-locations`
//     );
//   };

export const updateVisionmission = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/vision-mission/${_id}`,
    values
  );
};

export const getVisionmission = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/vision-mission/${_id}`
  );
};

// export const findContact = async (_id, country, city) => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/find/company-locations/${country}/${city}`
//   );
// };
