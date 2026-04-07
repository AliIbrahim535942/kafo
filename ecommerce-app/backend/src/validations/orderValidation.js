const Joi = require("joi");

const checkoutSchema = Joi.object({
  location: Joi.string().required(),
  paymentInfo: Joi.object({
    cardHolder: Joi.string().required(),
    cardNumber: Joi.string().min(8).required(),
  }).required(),
  deliveryMethod: Joi.string()
    .valid("standard", "express", "sameDay")
    .required(),
  couponCode: Joi.string().allow("", null),
});

module.exports = {
  checkoutSchema,
};
