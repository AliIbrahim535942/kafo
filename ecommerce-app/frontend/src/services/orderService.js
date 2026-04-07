import api from "./api";

export const checkout = async (payload) => {
  const { data } = await api.post("/orders/checkout", payload);
  return data;
};

export const getMyOrders = async () => {
  const { data } = await api.get("/orders/my");
  return data;
};

export const getAllOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const getAdminStats = async () => {
  const { data } = await api.get("/orders/admin/stats");
  return data;
};
