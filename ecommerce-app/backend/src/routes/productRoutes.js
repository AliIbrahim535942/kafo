const express = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/", productController.listProducts);
router.get("/:id", productController.getProductById);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  productController.createProduct,
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  productController.updateProduct,
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  productController.deleteProduct,
);
router.patch(
  "/:id/discount",
  authMiddleware,
  roleMiddleware("admin"),
  productController.addDiscount,
);
router.post(
  "/:id/rate",
  authMiddleware,
  roleMiddleware("customer"),
  productController.rateProduct,
);

module.exports = router;
