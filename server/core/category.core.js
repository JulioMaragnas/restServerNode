const Category = require('../domain/category.domain');
const { MapperMessage } = require('../adapter/index.adapter');
const {
  BadRequest,
  NoContent,
  Success,
  Error: ErrorMessage,
} = require('../infraestructure/messageType.infraestructure');
const Repository = require('../dataAccess/repository.dataAccess');
const UnitOfWork = require('../dataAccess/unitOfWork.dataAccess');
const { GetSingleOrAllEntities } = require('./common.core');

async function GetCategories(id) {
  try {
    if (id) {
      const categoryDB = await Repository.FindById(Category, id);

      return await GetSingleOrAllEntities(categoryDB, id);
    } else {
      const categoryDB = await Repository.Find(Category);

      return await GetSingleOrAllEntities(categoryDB);
    }
  } catch (error) {
    return MapperMessage(ErrorMessage, { ...error });
  }
}

async function CreateCategory(category) {
  try {
    const categoryCreated =  await UnitOfWork.Create(Category, category);

    const responseCreated = {
      message: 'Category has been created successfully',
      payload: { ...categoryCreated },
    };
    return MapperMessage(Success, responseCreated);
  } catch (error) {
    
    return MapperMessage(ErrorMessage, { ...error });
  }
}

async function UpdateCategory(id, category) {
  try {
    const categoryUpdated = await UnitOfWork.FindByIdAndUpdate(Category ,id, category, {
      new: true,
      runValidators: true,
      context: 'query'
    });

    if (!categoryUpdated) {
      const responseNoContent = {
        message: 'there´s no category to update',
      };
      return MapperMessage(NoContent, responseNoContent);
    }

    const responseUpdated = {
      message: 'Category has been updated successfully',
      payload: { ...categoryUpdated.toJSON() },
    };
    return MapperMessage(Success, responseUpdated);
  } catch (error) {
    console.log('pasa por acá');
    return MapperMessage(ErrorMessage, { ...error });
  }
}

async function DeleteCategory(id) {
  try {
    const deletedCategory = await UnitOfWork.FindByIdAndDelete(Category,id, {
      new: true,
      runValidators: true,
      context: 'query'
    });

    if (!deletedCategory) {
      const responseNoContent = {
        message: 'there´s no category to delete',
      };
      return MapperMessage(NoContent, responseNoContent);
    }

    const responseDeleted = {
      message: 'Category has been deleted successfully',
      payload: { ...deletedCategory.toJSON() },
    };
    return MapperMessage(Success, responseDeleted);
  } catch (error) {
    return MapperMessage(ErrorMessage, { ...error });
  }
}

module.exports = {
  GetCategories,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
};
