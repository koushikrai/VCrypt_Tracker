const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { generateKeys, verifyProof } = require('../zk/schnorr');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const { pubKey, salt } = generateKeys(password);
  try {
    const user = new User({ username, password, pubKey });
    await user.save();
    res.send('Signup successful');
  } catch (e) {
    res.status(400).send('Error creating user');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).send('User not found');

  const verified = verifyProof(password, user.pubKey);
  if (!verified) return res.status(401).send('Authentication failed');

  res.send('Login successful');
});

module.exports = router;