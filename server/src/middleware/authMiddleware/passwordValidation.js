const validatePassword = (password) => {
  const errors = [];

  password = password.trim();

  // Minimum length
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  // Uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }

  // Lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }

  // Number
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number.");
  }

  // Special character
  if (!/[!@#$%^&*(),.?":{}|<>_-]/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const passwordValidationMiddleware = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required.",
    });
  }

  const result = validatePassword(password);

  if (!result.isValid) {
    return res.status(400).json({
      success: false,
      message: "Password validation failed.",
      errors: result.errors,
    });
  }

  next();
};

export { validatePassword, passwordValidationMiddleware };