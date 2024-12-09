const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const testRoutes = require('./src/routes/tests');
app.use('/api', testRoutes);

module.exports = app;
