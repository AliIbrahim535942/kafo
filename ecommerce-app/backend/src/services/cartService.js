const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { getUnitPrice } = require("./productService");

const recalcTotal = (cart) => {
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
};

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await Cart.findById(cart._id).populate("items.product");
  }

  return cart;
};

const addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const existingIndex = cart.items.findIndex(
    (i) => String(i.product) === String(productId),
  );

  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += quantity;
    cart.items[existingIndex].unitPrice = getUnitPrice(product);
  } else {
    cart.items.push({
      product: productId,
      quantity,
      unitPrice: getUnitPrice(product),
    });
  }

  recalcTotal(cart);
  await cart.save();

  return Cart.findById(cart._id).populate("items.product");
};

const updateQuantity = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    const error = new Error("Cart not found");
    error.status = 404;
    throw error;
  }

  const index = cart.items.findIndex(
    (i) => String(i.product) === String(productId),
  );

  if (index < 0) {
    const error = new Error("Product not in cart");
    error.status = 404;
    throw error;
  }

  cart.items[index].quantity = quantity;
  recalcTotal(cart);
  await cart.save();

  return Cart.findById(cart._id).populate("items.product");
};

const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    const error = new Error("Cart not found");
    error.status = 404;
    throw error;
  }

  cart.items = cart.items.filter(
    (i) => String(i.product) !== String(productId),
  );
  recalcTotal(cart);
  await cart.save();

  return Cart.findById(cart._id).populate("items.product");
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (cart) {
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
  }
};

module.exports = {
  getOrCreateCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};
