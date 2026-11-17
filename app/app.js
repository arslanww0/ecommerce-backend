const express = require('express');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/api.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRoutes);

module.exports = app;
