import api from "./api";

export const getMyInvoices = async () => {
  const { data } = await api.get("/invoices/my");
  return data;
};

export const getAllInvoices = async () => {
  const { data } = await api.get("/invoices");
  return data;
};
