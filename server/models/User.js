const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Add additional fields your app needs to store.
const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    token: String
});

module.exports = mongoose.model('User', userSchema);