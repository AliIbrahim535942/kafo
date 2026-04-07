const Product = require("../models/Product");

const getUnitPrice = (product) => {
  if (product.hasDiscount && product.discountedPrice) {
    return product.discountedPrice;
  }

  return product.price;
};

const listProducts = async ({ search, category }) => {
  const query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  return Product.find(query).sort({ createdAt: -1 });
};

const createProduct = async (payload, imagePath) => {
  const data = {
    ...payload,
    image: imagePath || "",
  };

  return Product.create(data);
};

const updateProduct = async (id, payload, imagePath) => {
  const product = await Product.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  Object.assign(product, payload);

  if (imagePath) {
    product.image = imagePath;
  }

  await product.save();
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  return { message: "Product deleted" };
};

const addDiscount = async (id, discountedPrice) => {
  const product = await Product.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  if (discountedPrice >= product.price) {
    const error = new Error(
      "Discounted price must be less than original price",
    );
    error.status = 400;
    throw error;
  }

  product.hasDiscount = true;
  product.discountedPrice = discountedPrice;
  await product.save();

  return product;
};

const rateProduct = async (productId, userId, value) => {
  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  const alreadyRated = product.ratings.some(
    (r) => String(r.user) === String(userId),
  );

  if (alreadyRated) {
    const error = new Error("You already rated this product");
    error.status = 400;
    throw error;
  }

  product.ratings.push({ user: userId, value });
  const sum = product.ratings.reduce((acc, item) => acc + item.value, 0);
  product.rating = Number((sum / product.ratings.length).toFixed(1));

  await product.save();
  return product;
};

module.exports = {
  getUnitPrice,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  addDiscount,
  rateProduct,
};
