// src/db/connection.js - PostgreSQL version
const { Pool } = require("pg");

// Validate environment variables
const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME", "DB_PORT"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  max: 15,           // connection limit
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL DB connected successfully");
    client.release();
  } catch (err) {
    console.error("❌ PostgreSQL DB connection FAILED:", err.message);
    process.exit(1);
  }
})();

module.exports = pool;
