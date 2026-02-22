import bcrypt from "bcryptjs";
import Seller from "../models/Seller.js";
import jwt from "jsonwebtoken";

const generateToken = (sellerId) => {
  return jwt.sign({ id: sellerId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// register
export const registerSeller = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password required" });
    }

    const existingSeller = await Seller.findOne({ phone });
    if (existingSeller) {
      return res.status(400).json({ message: "Seller already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = await Seller.create({
      phone,
      password: hashedPassword,
      isVerified: false,
    });

    const otp = "123456";

    res.status(201).json({
      message: "Seller registered. Verify OTP.",
      otp, // remove later when real SMS
      sellerId: seller._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VERIFY OTP (for register or login)
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (otp !== "123456") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const seller = await Seller.findOne({ phone });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.isVerified = true;
    await seller.save();

    const token = generateToken(seller._id);

    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN WITH PASSWORD
export const loginWithPassword = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const seller = await Seller.findOne({ phone });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    console.log("JWT_SECRET in sign:", process.env.JWT_SECRET);

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(seller._id);

    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN WITH OTP (SEND OTP)
export const loginWithOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone required" });
  }

  // Mock OTP
  res.json({
    message: "OTP sent",
    otp: "123456",
  });
};
