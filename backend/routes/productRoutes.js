import express from "express";
import {
  addProduct,
  getProductsByStore,
  updateProduct,
  toggleProductAvailability,
  deleteProduct,
  getDashboardProducts,
} from "../controllers/productController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// ADD PRODUCT
router.post("/add", auth, addProduct);

// GET PRODUCTS FROM STORE
router.get("/store/:storeId", getProductsByStore); // public

router.get("/dashboard/:storeId", auth, getDashboardProducts); // private

// UPDATE PRODUCT
router.put("/:productId", auth, updateProduct);

// Toggle Availibilty
router.patch("/:productId/availability", auth, toggleProductAvailability);

// DELETE PRODUCT
router.delete("/:productId", auth, deleteProduct);

export default router;
