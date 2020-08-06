const express = require('express');
const app = express();
const { verifytoken } = require('../middleware/verifyToken.middleware');
const { verifyRole } = require('../middleware/verifyRole.middleware');
const Usuario = require('../domain/user.domain');
const hashJS = require('hash.js');
const _ = require('underscore');


app.get('/usuario/:from*?/:to*?', verifytoken, (req, res) => {
  let { from, to } = req.params;
  console.log(req.params)
  Usuario.find({state: true}, )
  .skip(Number(from))
  .limit(Number(to | 10))
  .exec((err,usuarios)=> err ? 
    res.status(400).json({
      ok: false,
      err
    }) 
    : res.json({
      ok: true,
      count: usuarios.length,
      usuarios
    })
  )
});

app.post('/usuario', [verifytoken, verifyRole], (req, res) => {
  const { body: { name, email, password, role } } = req;
  if (!name)
    res.status(400).json('{message: "el nombre es requerido"}');
  let user = new Usuario({
    name,
    email,
    password: hashJS.sha256().update(password).digest('hex'),
    role
  });
  user.save((err, userDB) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        err
      })
    }
    res.json({
      status: 200,
      payload: userDB
    })
  });
});

app.put('/usuario/:id', [verifytoken, verifyRole], (req, res) => {
  let { body: payload, params: { id } } = req;
  payload = _.pick(payload, ['name', 'email', 'img', 'role', 'state']);
  Usuario.findByIdAndUpdate(id, payload, { new: true }, (err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
    res.json({
      ok: true,
      user
    })
  })
});

app.delete('/usuario/:id', [verifytoken, verifyRole], (req, res) => {
  let { id } = req.params;
  Usuario.findByIdAndUpdate(id, { state: false }, { new: true }, (err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
    res.json({
      ok: true,
      user
    })
  })
});

module.exports = app