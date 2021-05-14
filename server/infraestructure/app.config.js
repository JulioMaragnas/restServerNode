// PORT
process.env.PORT = process.env.PORT || 3000;
// ENVIRONMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'test'
// SEED
process.env.SEED = 'este-es-el-key'
// DATABASE
let urlDB;
if (process.env.NODE_ENV === 'dev')
  urlDB = 'mongodb://localhost:27017/Cafe';
else urlDB = 'mongodb+srv://jrgongAdmin:ViQMgLcx5OUqEYtI@cluster0.mgfgz.mongodb.net/universityDatabase?retryWrites=true&w=majority';
process.env.URLBD = urlDB;
