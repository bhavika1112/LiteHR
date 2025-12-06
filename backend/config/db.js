import mysql from "mysql2/promise";

let pool;

export const connectDB = async () => {
  try {
    pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test a connection
    await pool.query("SELECT 1");
    console.log("MySQL connected");
  } catch (err) {
    console.error("MySQL connection error:", err.message);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!pool) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return pool;
};
