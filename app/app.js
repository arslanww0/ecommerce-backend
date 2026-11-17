const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

const apiRoutes = require('./routes/api.routes');

const app = express();

app.use(express.json());

app.use(cookieParser());

// Initialize Passport
app.use(passport.initialize());

app.use('/api', apiRoutes);

module.exports = app;