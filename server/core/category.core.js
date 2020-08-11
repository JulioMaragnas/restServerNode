const Category = require('../domain/category.domain');
const { MapperMessage } = require('../adapter/index.adapter');
const {
  BadRequest,
  NoContent,
  Success,
  Error,
} = require('../infraestructure/messageType.infraestructure');

async function GetCategories(id) {
  if (id) {
    const categoryDB = await Category.findById(id);
    return GetSingleOrAllCategories(categoryDB, id);
  } else {
    const categoryDB = await Category.find();
    return GetSingleOrAllCategories(categoryDB);
  }
}

function GetSingleOrAllCategories(categoryDB, id) {
  if (id && !categoryDB) {
    const responseCategoryById = {
      message: 'there´s no cateogory with this Id',
    };
    return MapperMessage(NoContent, responseCategoryById);
  }

  if (!categoryDB.length) {
    const responseAllCategories = {
      message: 'there are no categories'
    };
    return MapperMessage(NoContent, responseAllCategories);
  }

  return MapperMessage(
    Success,
    Array.isArray(categoryDB) ? [...categoryDB] : { ...categoryDB }
  );
}

async function CreateCategory(category) {
  const categoryCreated = await Category.create(category);

  const responseCreated = {
    message: 'Category has been created successfully',
    payload: { ...categoryCreated },
  };
  return MapperMessage(Success, responseCreated);
}

async function UpdateCategory(idCategory, category) {
  const categoryUpdated = Category.findByIdAndUpdate(idCategory, category, {
    new: true,
  });

  if (!categoryUpdated) {
    const responseNoContent = {
      message: 'there´s no category to update',
    };
    return MapperMessage(NoContent, responseNoContent);
  }

  const responseUpdated = {
    message: 'Category has been updated successfully',
    payload: { ...categoryCreated },
  };
  return MapperMessage(Success, responseUpdated);
}

async function DeleteCategory({ idCategory }) {
  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    const responseNoContent = {
      message: 'there´s no category to delete',
    };
    return MapperMessage(NoContent, responseNoContent);
  }

  const responseDeleted = {
    message: 'Category has been updated successfully',
    payload: { ...deletedCategory },
  };
  return MapperMessage(Success, responseDeleted);
}

module.exports = {
  GetCategories,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
};
