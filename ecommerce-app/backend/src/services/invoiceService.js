const Invoice = require("../models/Invoice");

const createInvoice = async ({ orderId, userId, amount }) => {
  return Invoice.create({
    order: orderId,
    user: userId,
    amount,
  });
};

const getUserInvoices = async (userId) => {
  return Invoice.find({ user: userId })
    .populate({
      path: "order",
      select: "total paymentStatus deliveryMethod createdAt",
    })
    .sort({ createdAt: -1 });
};

const getAllInvoices = async () => {
  return Invoice.find()
    .populate("user", "name email")
    .populate("order", "total paymentStatus deliveryMethod createdAt")
    .sort({ createdAt: -1 });
};

module.exports = {
  createInvoice,
  getUserInvoices,
  getAllInvoices,
};
