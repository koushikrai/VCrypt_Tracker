const crypto = require('crypto');

// More robust key derivation using PBKDF2
function generateKeys(secret) {
  const salt = crypto.randomBytes(16).toString('hex');
  const x = parseInt(
    crypto.pbkdf2Sync(secret, salt, 1000, 32, 'sha256').toString('hex').slice(0, 8),
    16
  );
  const g = 2;
  const p = 7919;
  const pubKey = Math.pow(g, x) % p;
  return { x, pubKey, salt, p, g };
}

function verifyProof(secret, storedPubKey) {
  const g = 2;
  const p = 7919;
  const x = parseInt(
    crypto.createHash('sha256').update(secret).digest('hex').slice(0, 8),
    16
  );
  const pubKey = Math.pow(g, x) % p;
  return parseInt(pubKey) === parseInt(storedPubKey);
}

module.exports = { generateKeys, verifyProof };
