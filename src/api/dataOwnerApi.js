import api from "./axiosConfig";

export const uploadDocument = async (document, keyword) => {
  return api.post("/DataOwner", { document, keyword });
};

export const fetchDocuments = async () => {
  return api.get("/DataOwner");
};

export const deleteDocument = async (id) => {
  return api.delete(`/DataOwner/${id}`);
};
