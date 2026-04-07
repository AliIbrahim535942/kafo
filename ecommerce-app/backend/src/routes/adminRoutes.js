const express = require("express");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, adminController.getMyProfile);
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.listUsers,
);

module.exports = router;
