const pool = require('../db/connection');

async function getAllInventory() {
  const sql = 'SELECT * FROM inventory';
  const [rows] = await pool.execute(sql);
  return rows;
}

async function addInventory(item) {
  const sql = 'INSERT INTO inventory (name, price, stock) VALUES (?, ?, ?)';
  const [result] = await pool.execute(sql, [item.name, item.price, item.stock]);
  return result.insertId;
}

async function updateInventory(item) {
  const sql = 'UPDATE inventory SET name = ?, price = ?, stock = ? WHERE id = ?';
  const [result] = await pool.execute(sql, [item.name, item.price, item.stock, item.id]);
  return result.affectedRows;
}

async function deleteInventory(id) {
  const sql = 'DELETE FROM inventory WHERE id = ?';
  const [result] = await pool.execute(sql, [id]);
  return result.affectedRows;
}

module.exports = { getAllInventory, addInventory, updateInventory, deleteInventory };
