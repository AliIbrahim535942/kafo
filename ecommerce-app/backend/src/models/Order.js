const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], default: [] },
    location: { type: String, required: true },
    paymentInfo: {
      cardHolder: { type: String, required: true },
      cardNumber: { type: String, required: true },
    },
    paymentStatus: {
      type: String,
      enum: ["success", "failed"],
      required: true,
    },
    deliveryMethod: { type: String, required: true },
    deliveryPrice: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    couponCode: { type: String, default: "" },
    couponDiscount: { type: Number, default: 0 },
    total: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
