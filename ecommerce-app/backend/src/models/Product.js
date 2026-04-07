const mongoose = require("mongoose");
const { CATEGORIES } = require("../utils/constants");

const ratingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    value: { type: Number, min: 1, max: 5, required: true },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    barcode: { type: String, required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    stock: { type: Number, default: 50 },
    isBestSeller: { type: Boolean, default: false },
    hasDiscount: { type: Boolean, default: false },
    discountedPrice: { type: Number, default: null },
    rating: { type: Number, default: 0 },
    ratings: { type: [ratingSchema], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
