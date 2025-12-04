// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/inventoryModel');
const { requireAdmin } = require('../middleware/authMiddleware');

// Manage inventory page (Admin only)
router.get('/manage', requireAdmin, async (req, res) => {
  try {
    const items = await inventoryModel.getAllInventory();
    // Render a view if you have EJS templates, otherwise send JSON
    res.render('inventory/manage', { items }); 
    // res.json(items); // Use this line if no view template
  } catch (err) {
    console.error('Error fetching inventory:', err);
    res.status(500).send('Error fetching inventory');
  }
});

// Add a new item (Admin only)
router.post('/add', requireAdmin, async (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null) {
    return res.status(400).send('Missing required fields: name, price, stock');
  }

  try {
    const id = await inventoryModel.addInventory({ name, price, stock });
    res.send(`Item added with ID: ${id}`);
  } catch (err) {
    console.error('Error adding item:', err);
    res.status(500).send('Error adding item');
  }
});

// Update an item (Admin only)
router.post('/update', requireAdmin, async (req, res) => {
  const { id, name, price, stock } = req.body;
  if (!id || !name || price == null || stock == null) {
    return res.status(400).send('Missing required fields: id, name, price, stock');
  }

  try {
    const rows = await inventoryModel.updateInventory({ id, name, price, stock });
    res.send(`${rows} item(s) updated`);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).send('Error updating item');
  }
});

// Delete an item (Admin only)
router.get('/delete/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send('Missing item ID');

  try {
    const rows = await inventoryModel.deleteInventory(id);
    res.send(`${rows} item(s) deleted`);
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).send('Error deleting item');
  }
});

module.exports = router;
