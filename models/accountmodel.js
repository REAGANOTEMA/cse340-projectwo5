const pool = require('../db/connection');

async function getAccountById(account_id) {
  console.log(`Fetching account by ID (mock): ${account_id}`);
  return { account_id, firstname: "John", lastname: "Doe", email: "john@example.com", role: "user" };
}

async function updateAccountInfo(account_id, firstname, lastname, email) {
  console.log(`Updating account info (mock):`, { account_id, firstname, lastname, email });
  return 1; // mock affected rows
}

async function updatePassword(account_id, hashedPassword) {
  console.log(`Updating password (mock) for account ID: ${account_id}`);
  return 1; // mock affected rows
}

module.exports = { getAccountById, updateAccountInfo, updatePassword };
