import express from "express";
const router = express.Router();
import {
  register,
  login,
  logout,
  getUserProfile,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {
  registerLimiter,
  loginLimiter,
} from "../middleware/rateLimit.middleware.js";

/**
 * @desc    Register user
 * @route   POST /api/auth/
 * @access  PUBLIC
 */
router.post("/", registerLimiter, register);

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  PUBLIC
 */
router.post("/login", loginLimiter, login);

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  PUBLIC
 */
router.post("/logout", logout);

/**
 * @desc    Get user profile
 * @route   GET /api/auth/me
 * @access  PRIVATE
 */
router.get("/me", protect, getUserProfile);

export default router;
