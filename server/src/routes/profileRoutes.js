import express from "express";
import protect from "../middleware/authMiddleware/authMiddleware.js";
import upload from "../middleware/profileMiddleware/profileMiddlware.js";
import profileController from "../controllers/profileController/profileController.js";

const router = express.Router();

router.put( "/upload", protect, upload.single("profileImage"),profileController.uploadProfileImage);

export default router;
