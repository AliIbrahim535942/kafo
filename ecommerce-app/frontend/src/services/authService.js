import api from "./api";

export const register = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const forgotPassword = async (payload) => {
  const { data } = await api.post("/auth/forgot-password", payload);
  return data;
};

export const resetPassword = async (payload) => {
  const { data } = await api.post("/auth/reset-password", payload);
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/admin/me");
  return data;
};
