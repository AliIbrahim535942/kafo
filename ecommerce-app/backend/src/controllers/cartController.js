const cartService = require("../services/cartService");
const {
  addToCartSchema,
  updateCartQuantitySchema,
} = require("../validations/cartValidation");

const getMyCart = async (req, res, next) => {
  try {
    const cart = await cartService.getOrCreateCart(req.user._id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { error, value } = addToCartSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const cart = await cartService.addToCart(
      req.user._id,
      value.productId,
      value.quantity,
    );
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

const updateCartQuantity = async (req, res, next) => {
  try {
    const { error, value } = updateCartQuantitySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const cart = await cartService.updateQuantity(
      req.user._id,
      value.productId,
      value.quantity,
    );
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const cart = await cartService.removeFromCart(
      req.user._id,
      req.params.productId,
    );
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
};
