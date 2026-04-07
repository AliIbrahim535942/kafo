const express = require("express");
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", cartController.getMyCart);
router.post("/add", cartController.addToCart);
router.patch("/quantity", cartController.updateCartQuantity);
router.delete("/:productId", cartController.removeFromCart);

module.exports = router;
