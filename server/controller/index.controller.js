const express = require('express');
const app = express();

app.use(require('./user.controller'));
app.use(require('./login.controller'));
app.use(require('./category.controller'));
app.use(require('./product.controller'));

module.exports = app;