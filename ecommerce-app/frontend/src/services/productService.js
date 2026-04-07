import api from "./api";

export const getProducts = async ({ search = "", category = "" } = {}) => {
  const { data } = await api.get("/products", {
    params: { search, category },
  });
  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const rateProduct = async (id, value) => {
  const { data } = await api.post(`/products/${id}/rate`, { value });
  return data;
};

export const createProduct = async (formData) => {
  const { data } = await api.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await api.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const addDiscount = async (id, discountedPrice) => {
  const { data } = await api.patch(`/products/${id}/discount`, {
    discountedPrice,
  });
  return data;
};
