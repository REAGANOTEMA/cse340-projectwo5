const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { requireLogin } = require('../middleware/authMiddleware');

router.get('/manage', requireLogin, accountController.accountManagement);
router.get('/update/:id', requireLogin, accountController.updateAccountView);
router.post('/update', requireLogin, accountController.processAccountUpdate);
router.post('/update-password', requireLogin, accountController.processPasswordUpdate);

module.exports = router;
