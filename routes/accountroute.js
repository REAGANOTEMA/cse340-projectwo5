const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const accountmodel = require('../models/accountmodel');
const { requireauth } = require('../middleware/authmiddleware');

router.get('/', requireauth, async (req, res) => {
  try {
    const account = await accountmodel.getAccountById(req.user.account_id);
    res.render('account/manage', { account });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching account');
  }
});

router.post('/update', requireauth, async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;
    await accountmodel.updateAccountInfo(req.user.account_id, firstname, lastname, email);
    res.send('Account info updated!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating account info');
  }
});

router.post('/update-password', requireauth, async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await accountmodel.updatePassword(req.user.account_id, hashedPassword);
    res.send('Password updated!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating password');
  }
});

module.exports = router;
