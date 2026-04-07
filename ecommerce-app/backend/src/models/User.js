const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    value: { type: Number, default: 5 },
    isUsed: { type: Boolean, default: false },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    points: { type: Number, default: 0 },
    coupons: { type: [couponSchema], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
