import axios from "axios";

export const createImages = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/galleryimg`,
    values
  );
};

export const removeImages = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/galleryimg/${_id}`
  );
};

export const listImages = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/galleryimg`
  );
};

export const updateImages = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/galleryimg/${_id}`,
    values
  );
};

export const getImages = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/galleryimg/${_id}`
  );
};
