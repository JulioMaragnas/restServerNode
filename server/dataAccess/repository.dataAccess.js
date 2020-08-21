async function Find(Context, filter = null, projection = null, options = null) {
  try {
    return await Context.find(filter, projection, options);
  } catch (error) {
    console.log(error)
  }
}

async function FindById(Context, id = null, projection = null, options = null) {
  try {
    const entity = await Context.findById(id, projection, options)
    return (entity && await entity.toJSON()) || entity;
  } catch (error) {
    console.log(error)
  }
}

async function FindOne(Context, queryParameter, projection = null, options = null) {
  try {
    return await Context.findOne(configureParameter(queryParameter), projection, options);
  } catch (error) {
    console.log(error)
  }
}

function configureParameter(parameter) {
  switch (typeof queryParameter) {
    case 'number':
      return { _id: parameter }
    default:
      return parameter
  }
}

module.exports = {
  Find,
  FindById,
  FindOne
};
