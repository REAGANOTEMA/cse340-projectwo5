// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountModel = require('../models/accountmodel'); // your model
const { requireAuth } = require('../middleware/authmiddleware'); // optional auth

// Get account management page
router.get('/', requireAuth, async (req, res) => {
  try {
    const accountId = req.user?.account_id; // make sure req.user is set in auth middleware
    const account = await accountModel.getAccountById(accountId);
    res.render('account/manage', { account });
  } catch (err) {
    console.error('Error fetching account:', err);
    res.status(500).send('Error fetching account');
  }
});

// Update account info
router.post('/update', requireAuth, async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;
    const accountId = req.user?.account_id;
    await accountModel.updateAccountInfo(accountId, firstname, lastname, email);
    res.send('Account info updated!');
  } catch (err) {
    console.error('Error updating account info:', err);
    res.status(500).send('Error updating account info');
  }
});

// Update password
router.post('/update-password', requireAuth, async (req, res) => {
  try {
    const { password } = req.body;
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);
    const accountId = req.user?.account_id;
    await accountModel.updatePassword(accountId, hashedPassword);
    res.send('Password updated!');
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).send('Error updating password');
  }
});

module.exports = router;
