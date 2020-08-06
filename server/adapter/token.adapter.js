const jwt = require('jsonwebtoken');

function Tokenizer(payload, expiresIn) {
  return jwt.sign(
    payload,
    process.env.SEED,
    expiresIn
  );
}
module.exports = {
  Tokenizer
}
