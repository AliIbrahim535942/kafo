const express = require("express");
const invoiceController = require("../controllers/invoiceController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/my", authMiddleware, invoiceController.getMyInvoices);
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  invoiceController.getAllInvoices,
);

module.exports = router;
