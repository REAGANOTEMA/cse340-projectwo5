require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const accountRoute = require('./routes/accountroute');
const inventoryRoute = require('./routes/inventoryroute');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/account', accountRoute);
app.use('/inventory', inventoryRoute);

// Home
app.get('/', (req, res) => {
  let user = null;
  const token = req.cookies?.jwt;
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {}
  }
  res.render('home', { user });
});

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
});

// 404
app.use((req, res) => res.status(404).send('Page Not Found'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
