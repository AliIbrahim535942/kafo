const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { DELIVERY_METHODS } = require("../utils/constants");
const { generateCouponCode } = require("../utils/coupon");
const { createInvoice } = require("./invoiceService");

const applyPointsAndCoupons = async (user, finalTotal) => {
  const earnedPoints = Math.floor(finalTotal / 10);
  user.points += earnedPoints;

  while (user.points >= 5) {
    user.points -= 5;
    user.coupons.push({
      code: generateCouponCode(),
      value: 5,
      isUsed: false,
    });
  }

  await user.save();
};

const checkout = async (userId, payload) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    const error = new Error("Cart is empty");
    error.status = 400;
    throw error;
  }

  const delivery = DELIVERY_METHODS[payload.deliveryMethod];

  if (!delivery) {
    const error = new Error("Invalid delivery method");
    error.status = 400;
    throw error;
  }

  for (const item of cart.items) {
    if (!item.product || item.product.stock < item.quantity) {
      const error = new Error(
        `Insufficient stock for ${item.product ? item.product.title : "product"}`,
      );
      error.status = 400;
      throw error;
    }
  }

  const subtotal = cart.totalPrice;
  const deliveryPrice = subtotal > 100 ? 0 : delivery.price;

  const user = await User.findById(userId);
  let couponDiscount = 0;
  let couponCode = "";

  if (payload.couponCode) {
    const coupon = user.coupons.find(
      (c) => c.code === payload.couponCode && !c.isUsed,
    );

    if (!coupon) {
      const error = new Error("Invalid coupon code");
      error.status = 400;
      throw error;
    }

    couponDiscount = coupon.value;
    couponCode = coupon.code;
    coupon.isUsed = true;
  }

  const beforePaymentTotal = subtotal + deliveryPrice - couponDiscount;
  const total = beforePaymentTotal > 0 ? beforePaymentTotal : 0;

  const paymentStatus = payload.paymentInfo.cardNumber.endsWith("0")
    ? "failed"
    : "success";

  const order = await Order.create({
    user: userId,
    items: cart.items.map((item) => ({
      product: item.product._id,
      title: item.product.title,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
    location: payload.location,
    paymentInfo: payload.paymentInfo,
    paymentStatus,
    deliveryMethod: payload.deliveryMethod,
    deliveryPrice,
    subtotal,
    couponCode,
    couponDiscount,
    total,
  });

  if (paymentStatus === "success") {
    for (const item of cart.items) {
      item.product.stock = item.product.stock - item.quantity;
      await item.product.save();
    }

    await applyPointsAndCoupons(user, total);

    await createInvoice({
      orderId: order._id,
      userId,
      amount: total,
    });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
  }

  return order;
};

const getMyOrders = async (userId) => {
  return Order.find({ user: userId }).sort({ createdAt: -1 });
};

const getAllOrders = async () => {
  return Order.find()
    .populate("user", "name email role")
    .sort({ createdAt: -1 });
};

const getAdminStats = async () => {
  const ordersCount = await Order.countDocuments();
  const paidOrders = await Order.countDocuments({ paymentStatus: "success" });
  const revenue = await Order.aggregate([
    { $match: { paymentStatus: "success" } },
    { $group: { _id: null, sum: { $sum: "$total" } } },
  ]);

  return {
    ordersCount,
    paidOrders,
    revenue: revenue[0]?.sum || 0,
  };
};

module.exports = {
  checkout,
  getMyOrders,
  getAllOrders,
  getAdminStats,
};
