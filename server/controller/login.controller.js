const express = require('express');
const app = express();
const { LoginUser } =require('../core/user.core')

app.post('/login', async (req, res) => {
  let { body } = req;
  const response = await LoginUser(body);
  const { status } = response;
  res.status(status).json(response);  
});

module.exports = app;