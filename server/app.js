const express = require('express');
const auth = require('./routes/auth');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/my_database'); // TODO: Change to the URL of your mongodb database

app.use('/auth', auth);

module.exports = app;