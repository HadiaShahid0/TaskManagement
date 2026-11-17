import express from "express";
import {
  createAccessRequest,
  getMyRequests,
  getAllRequests,
  acceptRequest,
  rejectRequest,
} from "../controllers/accessRequestController/accessRequestController.js";

import protect from "../middleware/authMiddleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware/roleMiddleware.js";

const router = express.Router();

// User
router.post("/", protect, createAccessRequest);
router.get("/my", protect, getMyRequests);

// Admin
router.get("/", protect, isAdmin, getAllRequests);
router.patch("/:id/accept", protect, isAdmin, acceptRequest);
router.patch("/:id/reject", protect, isAdmin, rejectRequest);

export default router;
