const express = require('express');
const app = express();
const { verifytoken } = require('../middleware/verifyToken.middleware');
const { verifyRole } = require('../middleware/verifyRole.middleware');
const { GetUsers, CreateUser, UpdateUser, UpdateDeleteUser } = require('../core/index.core');
const hashJS = require('hash.js');
const _ = require('underscore');


app.get('/usuarios', verifytoken, async (req, res) => {
  const { from, to } = req.query;
  const responseUser =  await GetUsers(Number(from), Number(to));
  const { status } = responseUser;
  res.status(status).json(responseUser);
});

app.post('/usuario', [verifytoken, verifyRole], async (req, res) => {
  const { body: { name }, body : user } = req;
  
  if (!name)
    res.status(400).json('{message: "el nombre es requerido"}');

  const responseUser = await CreateUser(user);
  const { status } = responseUser;
  res.status(status).json(responseUser);
});

app.put('/usuario/:id', [verifytoken, verifyRole], async (req, res) => {
  let { body: user, params: { id } } = req;
  const responseUser = await UpdateUser(id, user);
  const { status } = responseUser;
  res.status(status).json(responseUser);
});

app.delete('/usuario/:id', [verifytoken, verifyRole], async (req, res) => {
  let { id } = req.params;
  const responseUser = await UpdateDeleteUser(id, { state: false });
  const { status } = responseUser;
  res.status(status).json(responseUser);
});

module.exports = app