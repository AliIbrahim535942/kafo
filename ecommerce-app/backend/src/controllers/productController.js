const Product = require("../models/Product");
const productService = require("../services/productService");
const {
  productSchema,
  ratingSchema,
  discountSchema,
} = require("../validations/productValidation");

const listProducts = async (req, res, next) => {
  try {
    const products = await productService.listProducts({
      search: req.query.search || "",
      category: req.query.category || "",
    });

    res.json(products);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
    const product = await productService.createProduct(value, imagePath);

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
    const product = await productService.updateProduct(
      req.params.id,
      value,
      imagePath,
    );

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const addDiscount = async (req, res, next) => {
  try {
    const { error, value } = discountSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const product = await productService.addDiscount(
      req.params.id,
      value.discountedPrice,
    );
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const rateProduct = async (req, res, next) => {
  try {
    const { error, value } = ratingSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const product = await productService.rateProduct(
      req.params.id,
      req.user._id,
      value.value,
    );
    res.json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addDiscount,
  rateProduct,
};
