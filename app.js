require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

// Correct paths for Linux/Render
const accountRoute = require('./routes/accountroute');
const inventoryRoute = require('./routes/inventoryroute');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Fix view lookup

// Routes
app.use('/account', accountRoute);
app.use('/inventory', inventoryRoute);

// Home route
app.get('/', (req, res) => {
  let user = null;
  const token = req.cookies?.jwt;

  // Use JWT only if token exists
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT verification failed:', err.message);
    }
  } else {
    // Use mock user for Week 5
    user = { 
      account_id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      role: 'user',
      account_type: 'User'
    };
  }

  res.render('home', { user });
});

// Logout route
app.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
});

// 404 handler
app.use((req, res) => res.status(404).send('Page Not Found'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
