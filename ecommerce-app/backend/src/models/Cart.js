const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, default: 1 },
    unitPrice: { type: Number, required: true },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    items: { type: [cartItemSchema], default: [] },
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cart", cartSchema);
