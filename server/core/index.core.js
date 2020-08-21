const {
  CreateCategory,
  DeleteCategory,
  GetCategories,
  UpdateCategory,
} = require('./category.core');

const { 
  LoginUser ,
  GetUsers,
  CreateUser,
  UpdateDeleteUser
} = require('./user.core');

const {
  GetProducts
} = require('./product.core')


module.exports = {
  CreateCategory,
  DeleteCategory,
  GetCategories,
  UpdateCategory,
  LoginUser,
  GetUsers,
  CreateUser,
  UpdateDeleteUser,
  GetProducts
};