const accountModel = require('../models/accountModel');
const bcrypt = require('bcrypt');

// Account Management View
async function accountManagement(req, res) {
  const user = req.user;
  res.render('account/accountManagement', { user, message: null, errors: null });
}

// Update Account View
async function updateAccountView(req, res) {
  const account_id = req.params.id;
  const account = await accountModel.getAccountById(account_id);
  res.render('account/updateAccount', { account, errors: null, message: null });
}

// Process Account Update
async function processAccountUpdate(req, res) {
  const { account_id, firstname, lastname, email } = req.body;

  // Basic server-side validation
  const errors = [];
  if (!firstname || !lastname || !email) errors.push('All fields are required');
  if (errors.length) return res.render('account/updateAccount', { account: req.body, errors, message: null });

  try {
    await accountModel.updateAccountInfo(account_id, firstname, lastname, email);
    const account = await accountModel.getAccountById(account_id);
    res.render('account/accountManagement', { user: account, message: 'Account updated successfully', errors: null });
  } catch (err) {
    res.render('account/updateAccount', { account: req.body, errors: [err.message], message: null });
  }
}

// Process Password Update
async function processPasswordUpdate(req, res) {
  const { account_id, password } = req.body;
  const errors = [];
  if (!password || password.length < 8) errors.push('Password must be at least 8 characters');
  if (errors.length) return res.render('account/updateAccount', { account: req.body, errors, message: null });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await accountModel.updatePassword(account_id, hashedPassword);
    const account = await accountModel.getAccountById(account_id);
    res.render('account/accountManagement', { user: account, message: 'Password updated successfully', errors: null });
  } catch (err) {
    res.render('account/updateAccount', { account: req.body, errors: [err.message], message: null });
  }
}

module.exports = { accountManagement, updateAccountView, processAccountUpdate, processPasswordUpdate };
