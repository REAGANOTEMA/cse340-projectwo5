// routes/accountRoutes.js
const express = require('express');
const router = express.Router();

// Account home
router.get('/', (req, res) => {
  res.send('Account Management Home');
});

// Update account info
router.post('/update', (req, res) => {
  res.send('Account info updated!');
});

// Update password
router.post('/update-password', (req, res) => {
  res.send('Password updated!');
});

module.exports = router;
