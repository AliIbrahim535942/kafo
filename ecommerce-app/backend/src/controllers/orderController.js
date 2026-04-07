const orderService = require("../services/orderService");
const { checkoutSchema } = require("../validations/orderValidation");

const checkout = async (req, res, next) => {
  try {
    const { error, value } = checkoutSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const order = await orderService.checkout(req.user._id, value);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getMyOrders(req.user._id);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const getAdminStats = async (req, res, next) => {
  try {
    const stats = await orderService.getAdminStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkout,
  getMyOrders,
  getAllOrders,
  getAdminStats,
};
