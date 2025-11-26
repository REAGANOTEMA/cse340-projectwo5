const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { requireAdmin } = require('../middleware/authMiddleware');

router.get('/manage', requireAdmin, inventoryController.manageInventory);
router.post('/add', requireAdmin, inventoryController.addInventory);
router.post('/update', requireAdmin, inventoryController.updateInventory);
router.get('/delete/:id', requireAdmin, inventoryController.deleteInventory);

module.exports = router;
