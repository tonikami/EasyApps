const express = require('express');
const auth = require('./routes/auth');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.databaseUrl, { useMongoClient: true }); // TODO: Change to the URL of your mongodb database

app.use('/auth', auth);

app.listen(port, function(){
    console.log("Listening on port: :" + port);
});

module.exports = app;