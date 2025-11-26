const pool = require('../db/connection'); // MySQL or Postgres connection

async function getAccountById(account_id) {
  const sql = 'SELECT * FROM accounts WHERE account_id = ?';
  const [rows] = await pool.execute(sql, [account_id]);
  return rows[0];
}

async function updateAccountInfo(account_id, firstname, lastname, email) {
  const sql = 'UPDATE accounts SET firstname = ?, lastname = ?, email = ? WHERE account_id = ?';
  const [result] = await pool.execute(sql, [firstname, lastname, email, account_id]);
  return result.affectedRows;
}

async function updatePassword(account_id, hashedPassword) {
  const sql = 'UPDATE accounts SET password = ? WHERE account_id = ?';
  const [result] = await pool.execute(sql, [hashedPassword, account_id]);
  return result.affectedRows;
}

module.exports = { getAccountById, updateAccountInfo, updatePassword };
