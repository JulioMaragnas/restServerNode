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

module.exports = {
  CreateCategory,
  DeleteCategory,
  GetCategories,
  UpdateCategory,
  LoginUser,
  GetUsers,
  CreateUser,
  UpdateDeleteUser
};