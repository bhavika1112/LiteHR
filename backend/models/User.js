import crypto from "crypto";
import bcrypt from "bcryptjs";
import { getDB } from "../config/db.js";

// Find user by email
export const findUserByEmail = async (email) => {
  const db = getDB();
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
};

// Find user by id
export const findUserById = async (id) => {
  const db = getDB();
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0] || null;
};

// Create new user (hashes password inside)
export const createUser = async ({ username, email, password }) => {
  const db = getDB();

  // Check if username already exists
  const [existingUsername] = await db.query(
    "SELECT id FROM users WHERE username = ?",
    [username]
  );
  if (existingUsername.length > 0) {
    throw { code: "USERNAME_EXISTS", message: "Username already exists" };
  }

  // Check if email already exists
  const [existingEmail] = await db.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );
  if (existingEmail.length > 0) {
    throw { code: "EMAIL_EXISTS", message: "Email already exists" };
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Insert user
  const [result] = await db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );

  return {
    id: result.insertId,
    username,
    email,
  };
};


// Compare password
export const comparePassword = async (enteredPassword, storedHash) => {
  return bcrypt.compare(enteredPassword, storedHash);
};

// Remove password field before sending to client
export const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
};

export async function updateResetToken(userId, token, expiry) {
  const db = getDB();

  await db.query(
    "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?",
    [token, expiry, userId]
  );
}

// RESET PASSWORD USING TOKEN
export const resetUserPassword = async (token, newPassword) => {
  const db = getDB();

  // 1. Find valid token
  const [rows] = await db.query(
    "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?",
    [token, Date.now()]
  );

  const user = rows[0];
  if (!user) {
    return { error: "Invalid or expired reset token" };
  }

  // 2. Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(newPassword, salt);

  // 3. Generate a NEW reset token + expiry
  const newToken = crypto.randomBytes(32).toString("hex");
  const newExpiry = Date.now() + 3600000; // 1 hour

  // 4. Update password and update reset token + expiry
  await db.query(
    "UPDATE users SET password = ?, reset_token = ?, reset_token_expiry = ? WHERE id = ?",
    [hashed, newToken, newExpiry, user.id]
  );

  return { success: true };
};
