import express from "express";
import {
  register,
  login,
  logout,
  changePassword,
  verify,
} from "../controllers/authController/authController.js";
import protect from "../middleware/authMiddleware/authMiddleware.js";
import { passwordValidationMiddleware } from "../middleware/authMiddleware/passwordValidation.js";
const router = express.Router();

// Public Routes
router.post("/register", passwordValidationMiddleware, register);
router.post("/login", login);

router.post("/logout", logout);

//protect
router.get("/verify", protect, verify);
router.patch("/change-password", protect, changePassword);
export default router;
