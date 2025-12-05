const express = require('express');
const router = express.Router();
const { requireadmin } = require('../middleware/authmiddleware');

// Mock inventory
let inventory = [
  { id: 1, name: 'Item A', price: 10, stock: 5 },
  { id: 2, name: 'Item B', price: 20, stock: 3 },
];

router.get('/manage', requireadmin, (req, res) => {
  res.render('inventory/manage', { items: inventory });
});

router.post('/add', requireadmin, (req, res) => {
  const { name, price, stock } = req.body;
  const id = inventory.length + 1;
  inventory.push({ id, name, price, stock });
  res.send(`Item added with ID: ${id}`);
});

router.post('/update', requireadmin, (req, res) => {
  const { id, name, price, stock } = req.body;
  const item = inventory.find(i => i.id == id);
  if (item) {
    item.name = name;
    item.price = price;
    item.stock = stock;
    res.send(`${id} updated`);
  } else res.status(404).send('Item not found');
});

router.get('/delete/:id', requireadmin, (req, res) => {
  const id = parseInt(req.params.id);
  inventory = inventory.filter(i => i.id !== id);
  res.send(`${id} deleted`);
});

module.exports = router;
