async function Find(Context, filter = null, projection = null, options = null) {
  try {
    return await Context.find(filter, projection, options);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

async function FindById(Context, id = null, projection = null, options = null) {
  try {
    return await (await Context.findById(id, projection, options)).toJSON();
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

async function FindOne(Context, queryParameter, projection = null, options = null) {
  try {
    return await Context.findOne(configureParameter(queryParameter), projection, options);
  } catch (error) {
    throw new Error(JSON.stringify(error));
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
};
