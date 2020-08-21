const express = require('express');
const app = express();
const { verifytoken } = require('../middleware/verifyToken.middleware');
const { GetProducts } = require('../core/index.core');

app.get('/product', [verifytoken], async (req, res) => {
  const { from, to } = req.query;
  const responseProduct = await GetProducts(null, Number(from), Number(to));
  const { status } = responseProduct;
  res.status(status).json(responseProduct);
});

app.get('/product/:idProduct', [verifytoken], async (req, res) => {
  const { idProduct } = req.params;
  console.log('idProduct', idProduct)
  const responseProduct = await GetProducts(idProduct);
  const { status } = responseProduct;
  res.status(status).json(responseProduct);
});

module.exports = app;
