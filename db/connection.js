// src/db/connection.js - Database mock for Week 5
console.log("⚠️ Database mock active. No real database connection required.");

// Minimal mock pool to satisfy your models
const pool = {
  execute: async (query, params) => {
    console.log("DB query executed (mock):", query, params);
    return [[], []]; // empty rows and metadata
  },
  getConnection: async () => ({
    release: () => console.log("DB connection released (mock)"),
  }),
};

module.exports = pool;
