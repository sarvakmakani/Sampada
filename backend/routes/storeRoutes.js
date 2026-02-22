import express from "express";
import {
  createStore,
  getStoreBySlug,
  updateStore,
  trackClicks,
} from "../controllers/storeController.js";
import { getMyStore } from "../controllers/storeController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createStore);

router.put("/update", auth, updateStore);

router.get("/my", auth, getMyStore);

router.get("/:slug", getStoreBySlug);

router.post("/track-click", trackClicks);

export default router;
