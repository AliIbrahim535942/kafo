const User = require("../models/User");

const getMyProfile = async (req, res) => {
  res.json(req.user);
};

const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyProfile,
  listUsers,
};
