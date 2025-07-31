import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const register = asyncHandler(async (req, res) => {
  console.log("Register route hit with data:", req.body);
  const {
    fullName,
    email,
    phone,
    password,
    course,
    role: requestedRole,
  } = req.body;

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ message: "Email already in use" });

  // ✅ Secure admin creation
  let role = "student";

  // ✅ Allow role=admin ONLY if secret is correct
  if (req.body.role === "admin") {
    const adminSecret = req.headers["x-admin-secret"];
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: "Unauthorized to create admin" });
    }
    role = "admin";
  } else if (req.body.role) {
    role = req.body.role; // accept 'student' explicitly
  }

  const user = await User.create({
    fullName,
    email,
    phone,
    password,
    course,
    role,
  });

  const token = generateToken(user._id);
  res.status(201).json({
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user._id);
  res.status(200).json({
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json(req.user);
});
