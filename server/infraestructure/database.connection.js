const mongoose = require('mongoose');

mongoose.connect(
  process.env.URLBD,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) throw err;
    console.log('Databse OnLine');
  }
);
