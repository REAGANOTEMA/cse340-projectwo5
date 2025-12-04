require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const accountroutes = require('./routes/accountroutes');
const inventoryroutes = require('./routes/inventoryroutes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/account', accountroutes);
app.use('/inventory', inventoryroutes);

// Home
app.get('/', (req, res) => res.render('home'));

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
});

// 404
app.use((req, res) => res.status(404).send('Page Not Found'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
