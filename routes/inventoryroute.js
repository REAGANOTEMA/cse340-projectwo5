const express = require('express');
const router = express.Router();
const { requireadmin } = require('../middleware/authmiddleware');

// Mock inventory data
let inventory = [
  { id: 1, name: 'Item A', price: 10, stock: 5 },
  { id: 2, name: 'Item B', price: 20, stock: 3 },
];

// GET /inventory/manage - display inventory management page
router.get('/manage', requireadmin, (req, res) => {
  res.render('inventory/manage', { items: inventory, message: null });
});

// POST /inventory/add - add a new item
router.post('/add', requireadmin, (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null) {
    return res.status(400).send('Missing required fields');
  }

  const id = inventory.length ? inventory[inventory.length - 1].id + 1 : 1;
  inventory.push({ id, name, price: Number(price), stock: Number(stock) });

  res.render('inventory/manage', {
    items: inventory,
    message: `Item "${name}" added successfully with ID: ${id}`,
  });
});

// POST /inventory/update - update existing item
router.post('/update', requireadmin, (req, res) => {
  const { id, name, price, stock } = req.body;
  const item = inventory.find((i) => i.id == id);

  if (!item) return res.status(404).send('Item not found');

  item.name = name;
  item.price = Number(price);
  item.stock = Number(stock);

  res.render('inventory/manage', {
    items: inventory,
    message: `Item ID ${id} updated successfully!`,
  });
});

// GET /inventory/delete/:id - delete an item
router.get('/delete/:id', requireadmin, (req, res) => {
  const id = parseInt(req.params.id);
  const item = inventory.find((i) => i.id === id);

  if (!item) return res.status(404).send('Item not found');

  inventory = inventory.filter((i) => i.id !== id);

  res.render('inventory/manage', {
    items: inventory,
    message: `Item ID ${id} deleted successfully!`,
  });
});

module.exports = router;
