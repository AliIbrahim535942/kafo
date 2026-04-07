const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../models/User");
const PasswordResetToken = require("../models/PasswordResetToken");
const createToken = require("../utils/createToken");
const { sendResetEmail } = require("../utils/email");

const register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });

  if (existing) {
    const error = new Error("Email already exists");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = createToken(user);
  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const token = createToken(user);
  return { user, token };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return { message: "If this email exists, a reset link was sent" };
  }

  await PasswordResetToken.deleteMany({ user: user._id });

  const resetToken = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await PasswordResetToken.create({
    user: user._id,
    token: resetToken,
    expiresAt,
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  await sendResetEmail({ to: user.email, resetLink });

  return {
    message: "Reset email sent",
    resetLink,
  };
};

const resetPassword = async ({ token, password }) => {
  const tokenDoc = await PasswordResetToken.findOne({ token });

  if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
    const error = new Error("Invalid or expired token");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findByIdAndUpdate(tokenDoc.user, {
    password: hashedPassword,
  });

  await PasswordResetToken.deleteMany({ user: tokenDoc.user });

  return { message: "Password reset successful" };
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
