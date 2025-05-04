// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  pubKey: { type: String, required: true }, // Public key derived from password
});

module.exports = mongoose.model('User', userSchema);
