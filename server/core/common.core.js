const { MapperMessage } = require('../adapter/index.adapter');
const { NoContent, Success } = require('../infraestructure/messageType.infraestructure');
async function GetSingleOrAllEntities(entityDB, id) {
  try {
    if (id && !entityDB) {
      const responseEntityById = {
        message: 'there´s no entity with this Id',
      };
      return MapperMessage(NoContent, responseEntityById);
    }
    console.log('pasa la primera');
    if (Array.isArray(entityDB) && !entityDB.length) {
      const responseAllEntyties = {
        message: 'there are no entities',
      };
      return MapperMessage(NoContent, responseAllEntyties);
    }
    console.log('pasa la segunda y retorna success');
    return MapperMessage(
      Success,
      Array.isArray(entityDB) ? [...entityDB] : { ...entityDB }
    );
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  GetSingleOrAllEntities,
};
