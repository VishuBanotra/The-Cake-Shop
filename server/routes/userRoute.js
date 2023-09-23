import express from "express";
import {
  getAdminStats,
  getAdminUsers,
  myProfile,
  registerUser,
  loginUser,
  contactForm,
  adminForm,
} from "../controllers/userController.js";

import {
  authorizeAdmin,
  authenticateToken,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authenticateToken, myProfile);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/contact", authenticateToken, contactForm);

// Admin Routes
router.get("/admin/users", authenticateToken, authorizeAdmin, getAdminUsers);
router.get("/admin/stats", authenticateToken, authorizeAdmin, getAdminStats);
router.get("/admin/contact", authenticateToken, authorizeAdmin, adminForm);

export default router;
