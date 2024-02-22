// models/User.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pages: [{ id: String, name: String }] // Assuming pages are stored as an array of objects with id and name
});

module.exports = mongoose.model('User', userSchema);