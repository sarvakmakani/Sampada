import Product from "../models/Product.js";
import Store from "../models/Store.js";

// ADD PRODUCT to store
export const addProduct = async (req, res) => {
  try {
    const { storeId, name, description, price, image,category, available } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        message: "Product name and price required",
      });
    }

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // 🔐 Security
    if (store.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const product = await Product.create({
      store: storeId,
      name,
      description,
      price,
      image,
      category,
      available: available !== undefined ? available : true,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* GET PRODUCTS BY ADMIN */
export const getDashboardProducts = async (req, res) => {
  try {
    const { storeId } = req.params;

    const products = await Product.find({
      store: storeId,
    }).sort({ createdAt: -1 });

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Dashboard products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* GET PRODUCTS BY STORE */
export const getProductsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) {
      return res.status(400).json({
        message: "Store ID is required",
      });
    }

    const products = await Product.find({
      store: storeId,
      available: true,
    }).sort({ createdAt: -1 });

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

//  UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, image } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (image !== undefined) product.image = image;

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

//  DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


//  TOGGLE PRODUCT AVAILABILITY
export const toggleProductAvailability = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.available = !product.available;

    await product.save();

    res.json({
      message: "Product availability updated",
      available: product.available,
      product,
    });
  } catch (error) {
    console.error("Toggle availability error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
