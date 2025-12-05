const mysql = require("mysql2/promise");

// Validate required environment variables (prevents silent crashes)
const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1); // Stops deployment with clear error
  }
});

// Create MySQL connection pool with optimized production settings
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 15,       // slightly increased for Render performance
  queueLimit: 0,
  enableKeepAlive: true,     // helps prevent Render idle disconnect
  keepAliveInitialDelay: 0,
});

// Test connection on startup for safer deployments
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Database connection established successfully.");
    conn.release();
  } catch (err) {
    console.error("❌ Database connection FAILED:");
    console.error(err.message);
    process.exit(1); // Prevent running a broken app on Render
  }
})();

module.exports = pool;
