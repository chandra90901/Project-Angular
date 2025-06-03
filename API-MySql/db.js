const mysql = require("mysql2/promise");
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);
require("dotenv").config();

// Create a connection pool with promises enabled
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export the promise-based pool
const db = pool  // ✅ Ensure you use `.promise()`



module.exports = { db, knex };

// (async () => {
//   try {
//     const [rows] = await pool.query("SELECT 1 + 1 AS result");
//     console.log("Database connection successful:", rows);
//   } catch (error) {
//     console.error("Database connection failed:", error);
//   }
// })();
