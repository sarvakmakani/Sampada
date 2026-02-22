import express from "express";
import {
  registerSeller,
  verifyOtp,
  loginWithPassword,
  loginWithOtp,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registerSeller);
router.post("/verify-otp", verifyOtp);
router.post("/login-password", loginWithPassword);
router.post("/login-otp", loginWithOtp);

export default router;
