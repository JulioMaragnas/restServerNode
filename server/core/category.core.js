const Category = require('../domain/category.domain');
const { MapperMessage } = require('../adapter/index.adapter');
const {
  BadRequest, NoContent, Success,
} = require('../infraestructure/messageType.infraestructure');

async function GetCategories(id = null) {
  if (id) return Category.findById(id, (err, categgoryDB) => GetSingleOrAllCategories); 
  else return Category.find((err, categoryDB)=> GetSingleOrAllCategories)
}

function GetSingleOrAllCategories(err, categoryDB) {
  if (err) return MapperMessage(BadRequest, { ...err });

  if (id && !categoryDB)  {
    const responseCategoryById = {
      message:'there´s no cateogory with this Id'
    }
    return MapperMessage(NoContent, responseCategoryById);
  }

  if(!categoryDB.length){
    const responseAllCategories = {
      message: 'there are no categories'
    }
    return MapperMessage(NoContent, responseAllCategories)
  }

  return MapperMessage(Success, Array.isArray(categoryDB)? [...categoryDB] : {...categoryDB})
}

async function CreateCategory(category){
  return Category.create(category, (err, categoryCreated)=>{
    if (err) return MapperMessage(BadRequest, {...err});

    const responseCreated = {
      message: 'Category has been created successfully',
      payload: {...categoryCreated}
    }
    return MapperMessage(Success, responseCreated);
  })
}

async function UpdateCategory(category) {
  return Category.findByIdAndUpdate(category.id,(err, categoryUpdated)=> false)
}

module.exports = {
  GetCategories,
  CreateCategory,
  UpdateCategory
}
