require('./infraestructure/app.config');
require('./infraestructure/database.connection');

const express = require('express');
const app = express();
const parser = require('body-parser');

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(require('./controller/index.controller'));

app.listen(process.env.PORT, () => {
  console.log('escuchando por el puerto 3000')
});

