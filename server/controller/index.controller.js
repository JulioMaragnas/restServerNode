const express = require('express');
const app = express();

app.use(require('./user.controller'));
app.use(require('./login.controller'));


module.exports = app;