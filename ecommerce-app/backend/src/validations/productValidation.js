const Joi = require("joi");
const { CATEGORIES } = require("../utils/constants");

const productSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  barcode: Joi.string().required(),
  category: Joi.string()
    .valid(...CATEGORIES)
    .required(),
  stock: Joi.number().integer().min(0).default(50),
  isBestSeller: Joi.boolean().default(false),
});

const ratingSchema = Joi.object({
  value: Joi.number().integer().min(1).max(5).required(),
});

const discountSchema = Joi.object({
  discountedPrice: Joi.number().positive().required(),
});

module.exports = {
  productSchema,
  ratingSchema,
  discountSchema,
};
