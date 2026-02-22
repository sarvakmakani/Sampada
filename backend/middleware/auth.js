import jwt from "jsonwebtoken";
export default function auth(req, res, next) {
  console.log("Auth middleware running");

  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("JWT_SECRET in verify:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT verify error:", err.message);   // 🔥 THIS IS CRITICAL
    return res.status(401).json({ message: "Invalid token" });
  }
}
