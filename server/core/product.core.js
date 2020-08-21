const { MapperMessage } = require("../adapter/index.adapter");
const Product = require('../domain/product.domain')
const { Error: ErrorMessage } = require('../infraestructure/messageType.infraestructure');
const { GetSingleOrAllEntities } = require('./common.core');
const Repository = require('../dataAccess/repository.dataAccess');

async function GetProducts(id = null, from = null, to = null) {
  try {
    console.log('entra por acá')
    if (id) {
      const productDB = await Repository.FindById(Product, id);
      console.log('productDB', productDB)
      return await GetSingleOrAllEntities(productDB, id);
    } else {
      const productDB = await Repository.Find(Product,null, null, {
        skip: from || 0,
        limit: to || 0,
      });

      return await GetSingleOrAllEntities(productDB);
    }
  } catch (error) {
    return MapperMessage(ErrorMessage, { ...error });
  }
}

module.exports = {
  GetProducts
};
