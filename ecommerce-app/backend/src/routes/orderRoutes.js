const express = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/checkout",
  authMiddleware,
  roleMiddleware("customer"),
  orderController.checkout,
);
router.get("/my", authMiddleware, orderController.getMyOrders);
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  orderController.getAllOrders,
);
router.get(
  "/admin/stats",
  authMiddleware,
  roleMiddleware("admin"),
  orderController.getAdminStats,
);

module.exports = router;
