import express from "express";
import {
  registerSeller,
  loginWithPassword,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registerSeller);

router.post("/login", loginWithPassword);

export default router;