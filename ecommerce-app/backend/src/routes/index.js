const express = require("express");

const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");
const invoiceRoutes = require("./invoiceRoutes");
const adminRoutes = require("./adminRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
