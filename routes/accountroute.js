const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const accountmodel = require('../models/accountmodel');
const { requireauth } = require('../middleware/authmiddleware');

// GET /account - show account management page
router.get('/', requireauth, async (req, res) => {
  try {
    const account = await accountmodel.getAccountById(req.user.account_id);

    // Ensure user info is available for EJS
    const user = {
      account_id: req.user.account_id,
      role: req.user.role,
      firstname: account?.firstname || 'User', // fallback if mock
    };

    res.render('account/manage', { account, user, message: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching account');
  }
});

// POST /account/update - update account info
router.post('/update', requireauth, async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;
    await accountmodel.updateAccountInfo(req.user.account_id, firstname, lastname, email);

    // Return success message
    res.render('account/manage', {
      account: { firstname, lastname, email },
      user: { account_id: req.user.account_id, role: req.user.role, firstname },
      message: 'Account info updated successfully!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating account info');
  }
});

// POST /account/update-password - update password
router.post('/update-password', requireauth, async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await accountmodel.updatePassword(req.user.account_id, hashedPassword);

    // Render page with success message
    const account = await accountmodel.getAccountById(req.user.account_id);
    res.render('account/manage', {
      account,
      user: { account_id: req.user.account_id, role: req.user.role, firstname: account.firstname },
      message: 'Password updated successfully!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating password');
  }
});

module.exports = router;
