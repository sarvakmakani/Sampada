import bcrypt from "bcryptjs";
import Seller from "../models/Seller.js";
import jwt from "jsonwebtoken";

const generateToken = (sellerId) => {
  return jwt.sign({ id: sellerId }, process.env.JWT_SECRET, {
    expiresIn: "1d", // more secure than 7d
  });
};

// ================= REGISTER =================
export const registerSeller = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Basic validation
    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password required" });
    }

    // Phone format validation (India)
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // Strong password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include letters and numbers",
      });
    }

    // Check existing seller
    const existingSeller = await Seller.findOne({ phone });
    if (existingSeller) {
      return res.status(400).json({ message: "Seller already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create seller
    const seller = await Seller.create({
      phone,
      password: hashedPassword,
    });

    // Generate JWT immediately
    const token = generateToken(seller._id);

    res.status(201).json({
      message: "Seller registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
export const loginWithPassword = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password required" });
    }

    const seller = await Seller.findOne({ phone });

    // Generic error for security
    if (!seller) {
      return res.status(400).json({
        message: "Invalid phone or password",
      });
    }

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid phone or password",
      });
    }

    const token = generateToken(seller._id);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};