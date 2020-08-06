const jwt = require('jsonwebtoken');

let verifytoken = (req, res, next) => {
  let token = req.get('Authorization');
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err
      })
    }
    req.email = decoded.email;
    next();
  })
}
module.exports = {
  verifytoken
}