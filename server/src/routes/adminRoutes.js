import express from "express";
import protect from "../middleware/authMiddleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware/roleMiddleware.js";
import {
  getAllUsers,
  updatePermissions,
} from "../controllers/adminController/adminController.js";

const adminRoutes = express.Router();

// Get all users
adminRoutes.get("/users", protect, isAdmin, getAllUsers);

// Update user permissions
adminRoutes.put("/permissions/:id", protect, isAdmin, updatePermissions);

export default adminRoutes;
