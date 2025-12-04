// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/inventoryModel');
const { requireAdmin } = require('../middleware/authMiddleware');

// Manage inventory page (Admin only)
router.get('/manage', requireAdmin, async (req, res) => {
  const items = await inventoryModel.getAllInventory();
  res.render('inventory/manage', { items }); // or res.json(items) if API
});

// Add a new item (Admin only)
router.post('/add', requireAdmin, async (req, res) => {
  try {
    const id = await inventoryModel.addInventory(req.body);
    res.send(`Item added with ID: ${id}`);
  } catch (err) {
    res.status(500).send('Error adding item');
  }
});

// Update an item (Admin only)
router.post('/update', requireAdmin, async (req, res) => {
  try {
    const rows = await inventoryModel.updateInventory(req.body);
    res.send(`${rows} item(s) updated`);
  } catch (err) {
    res.status(500).send('Error updating item');
  }
});

// Delete an item (Admin only)
router.get('/delete/:id', requireAdmin, async (req, res) => {
  try {
    const rows = await inventoryModel.deleteInventory(req.params.id);
    res.send(`${rows} item(s) deleted`);
  } catch (err) {
    res.status(500).send('Error deleting item');
  }
});

module.exports = router;
