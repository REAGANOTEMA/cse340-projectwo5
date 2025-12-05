const pool = require('../db/connection');

async function getAllInventory() {
  console.log("Fetching all inventory (mock)");
  return [
    { id: 1, name: "Item 1", price: 10, stock: 100 },
    { id: 2, name: "Item 2", price: 20, stock: 50 }
  ];
}

async function addInventory(item) {
  console.log("Adding inventory (mock):", item);
  return 1; // mock inserted ID
}

async function updateInventory(item) {
  console.log("Updating inventory (mock):", item);
  return 1; // mock affected rows
}

async function deleteInventory(id) {
  console.log("Deleting inventory (mock) ID:", id);
  return 1; // mock affected rows
}

module.exports = { getAllInventory, addInventory, updateInventory, deleteInventory };
