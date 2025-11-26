const inventoryModel = require('../models/inventoryModel');

// Manage Inventory View
async function manageInventory(req, res) {
  const items = await inventoryModel.getAllInventory();
  res.render('inventory/manageInventory', { items, message: null, errors: null });
}

// Add Inventory
async function addInventory(req, res) {
  try {
    await inventoryModel.addInventory(req.body);
    res.redirect('/inventory/manage');
  } catch (err) {
    const items = await inventoryModel.getAllInventory();
    res.render('inventory/manageInventory', { items, message: null, errors: [err.message] });
  }
}

// Update Inventory
async function updateInventory(req, res) {
  try {
    await inventoryModel.updateInventory(req.body);
    res.redirect('/inventory/manage');
  } catch (err) {
    const items = await inventoryModel.getAllInventory();
    res.render('inventory/manageInventory', { items, message: null, errors: [err.message] });
  }
}

// Delete Inventory
async function deleteInventory(req, res) {
  try {
    await inventoryModel.deleteInventory(req.params.id);
    res.redirect('/inventory/manage');
  } catch (err) {
    const items = await inventoryModel.getAllInventory();
    res.render('inventory/manageInventory', { items, message: null, errors: [err.message] });
  }
}

module.exports = { manageInventory, addInventory, updateInventory, deleteInventory };
