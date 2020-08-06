// PORT
process.env.PORT = process.env.PORT || 3000;
// ENVIRONMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
// SEED
process.env.SEED = 'este-es-el-key'
// DATABASE
let urlDB;
if (process.env.NODE_ENV === 'dev')
  urlDB = 'mongodb://localhost:27017/Cafe';
else urlDB = 'mongodb://jrgongdev:0Urv2JtPtVgHwID7@cluster0-shard-00-00-yryv4.mongodb.net:27017,cluster0-shard-00-01-yryv4.mongodb.net:27017,cluster0-shard-00-02-yryv4.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
process.env.URLBD = urlDB;
