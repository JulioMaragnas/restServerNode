const express = require('express');
const app = express();
const { verifytoken } = require('../middleware/verifyToken.middleware');
const { GetCategories, CreateCategory, UpdateCategory, DeleteCategory } = require('../core/index.core');
const { verifyRole } = require('../middleware/verifyRole.middleware');

app.get('/category', [verifytoken], async (req, res) => {
  const responseCategory = await GetCategories();
  const { status } = responseCategory;
  res.status(status).json(responseCategory);
});

app.get('/category/:idCategory', [verifytoken], async (req, res) => {
  const {
    params: { idCategory },
  } = req;
  const responseCategory = await GetCategories(idCategory);
  const { status } = responseCategory;
  res.status(status).json(responseCategory);
});

app.post('/category', [verifytoken, verifyRole], async (req, res) => {
  const { body: category } = req;
  const responseCategory = await CreateCategory(category);
  const { status } = responseCategory;
  res.status(status).json(responseCategory);
});

app.put('/category/:idCategory', [verifytoken, verifyRole], async (req, res) => {

  const {
    body: category,
    params: { idCategory },
  } = req;

  const responseCategory = await UpdateCategory(idCategory ,category);
  const { status } = responseCategory;
  res.status(status).json(responseCategory);
});

app.delete('/category/:idCategory', [verifytoken ,verifyRole], async (req, res)=>{
  const { params: {idCategory} } = req;
  const responseCategory = await DeleteCategory(idCategory);
  const { status } = responseCategory;
  res.status(status).json(responseCategory);
})

module.exports = app;
