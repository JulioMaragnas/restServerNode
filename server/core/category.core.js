const Category = require('../domain/category.domain');
const { MapperMessage } = require('../adapter/index.adapter');
const {
  BadRequest,
  NoContent,
  Success,
  Error: ErrorMessage,
} = require('../infraestructure/messageType.infraestructure');
const Repository = require('../dataAccess/repository.dataAccess');

async function GetCategories(id) {
  console.log('id', id)
  try {
    if (id) {
      console.log('si mandamos parametro');
      const categoryDB = await Repository.FindById(Category, id);
      console.log('categoryDB', categoryDB)

      return GetSingleOrAllCategories(categoryDB, id);
    } else {
      const categoryDB = await Repository.Find(Category);

      return GetSingleOrAllCategories(categoryDB);
    }
  } catch (error) {
    console.log('por aca se explota el hpta');
    return MapperMessage(ErrorMessage, { ...error });
  }
}

function GetSingleOrAllCategories(categoryDB, id) {
  if (id && !categoryDB) {
    const responseCategoryById = {
      message: 'there´s no cateogory with this Id',
    };
    return MapperMessage(Success, responseCategoryById);
  }

  if (Array.isArray(categoryDB) && !categoryDB.length) {
    const responseAllCategories = {
      message: 'there are no categories',
    };
    return MapperMessage(NoContent, responseAllCategories);
  }

  return MapperMessage(
    Success,
    Array.isArray(categoryDB) ? [...categoryDB] : { ...categoryDB }
  );
}

async function CreateCategory(category) {
  try {
    const categoryCreated = await (await Category.create(category)).toJSON();

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
  console.log('antes de entrar al try ');
  try {
    const categoryUpdated = await Category.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
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
    const deletedCategory = await Category.findByIdAndDelete(id);

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
