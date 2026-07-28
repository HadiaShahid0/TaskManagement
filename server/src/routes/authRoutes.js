import express from "express";
import {
  register,
  login,
  logout,
  verify,
} from "../controllers/authController/authController.js";
import protect from "../middleware/authMiddleware/authMiddleware.js";
import {
  passwordValidationMiddleware,
} from "../middleware/authMiddleware/passwordValidation.js";
const router = express.Router();

// Public Routes
router.post("/register", passwordValidationMiddleware, register);
router.post("/login", login);

router.post("/logout", logout);

router.get("/verify", protect, verify);

export default router;
