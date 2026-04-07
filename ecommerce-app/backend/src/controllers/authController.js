const authService = require("../services/authService");
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validations/authValidation");

const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const result = await authService.register(value);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const result = await authService.login(value);
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { error, value } = forgotPasswordSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const result = await authService.forgotPassword(value.email);
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { error, value } = resetPasswordSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const result = await authService.resetPassword(value);
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
