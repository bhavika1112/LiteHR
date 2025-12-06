  import { transporter } from "../config/email.js";
  import crypto from "crypto";
  import express from "express";
  import jwt from "jsonwebtoken";
  import {
    createUser,
    findUserByEmail,
    findUserById,
    comparePassword,
    sanitizeUser,
    updateResetToken,
    resetUserPassword ,
  } from "../models/User.js";
  import { protect } from "../middleware/auth.js";

  const router = express.Router();

  // Generate JWT token
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  };

  //forgot password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user)
    return res.status(404).json({ message: "User not found" });

  // Generate token
  const token = crypto.randomBytes(32).toString("hex");
  await updateResetToken(user.id, token, Date.now() + 3600000);


  // RESET LINK
  const resetLink = `http://localhost:5173/reset-password/${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link is valid for 1 hour.</p>
      `
    });
    console.log(">>> Email received:", email);
    console.log(">>> User found:", user);

  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ message: "Failed to send email" });
  }

  res.json({ message: "Reset link sent to your email" });
});

// RESET PASSWORD 
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const result = await resetUserPassword(token, password);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

  // Register
  router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      const existing = await findUserByEmail(email);
      if (existing) {
        return res
          .status(400)
          .json({ message: "User already exists with this email" });
      }

      const user = await createUser({ username, email, password });
      const safeUser = sanitizeUser(user);

      return res.status(201).json({
        message: "User registered successfully",
        user: safeUser,
        token: generateToken(user.id),
      });
    } catch (err) {
      console.error("Register error:", err.message);
      return res.status(500).json({ message: "Server error" });
    }
  });

  // Login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const safeUser = sanitizeUser(user);

      return res.status(200).json({
        message: "Logged in successfully",
        user: safeUser,
        token: generateToken(user.id),
      });
    } catch (err) {
      console.error("Login error:", err.message);
      return res.status(500).json({ message: "Server error" });
    }
  });

  // Me
  router.get("/me", protect, async (req, res) => {
    try {
      // protect middleware already attaches user (without password)
      return res.status(200).json(req.user);
    } catch (err) {
      console.error("Me route error:", err.message);
      return res.status(500).json({ message: "Server error" });
    }
  });

  export default router;
