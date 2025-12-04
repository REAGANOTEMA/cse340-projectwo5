const express = require('express');
const router = express.Router();
const inventorymodel = require('../model/inventorymodel');
const { requireadmin } = require('../middleware/authmiddleware');

router.get('/manage', requireadmin, async (req, res) => {
  try {
    const items = await inventorymodel.getAllInventory();
    res.render('inventory/manage', { items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching inventory');
  }
});

router.post('/add', requireadmin, async (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null) return res.status(400).send('Missing fields');

  try {
    const id = await inventorymodel.addInventory({ name, price, stock });
    res.send(`Item added with ID: ${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding item');
  }
});

router.post('/update', requireadmin, async (req, res) => {
  const { id, name, price, stock } = req.body;
  if (!id || !name || price == null || stock == null) return res.status(400).send('Missing fields');

  try {
    const rows = await inventorymodel.updateInventory({ id, name, price, stock });
    res.send(`${rows} item(s) updated`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating item');
  }
});

router.get('/delete/:id', requireadmin, async (req, res) => {
  try {
    const rows = await inventorymodel.deleteInventory(req.params.id);
    res.send(`${rows} item(s) deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting item');
  }
});

module.exports = router;
