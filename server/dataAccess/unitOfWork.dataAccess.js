async function Create(Context, entity) {
  try {
    return await (await Context.create(entity)).toJSON();
  } catch (error) {
    console.log(error);
    throw new Error(error._message);
    
  }
}

async function FindByIdAndUpdate(Context, id, entity, options = {}) {
  try {
    console.log('options', options)
    return await Context.findByIdAndUpdate(id, entity, options);
  } catch (error) {
    console.log(error);
    throw new Error(error._message);
  }
}

async function FindByIdAndDelete(Context, id, options = null){
  try {
    return await Context.findByIdAndDelete(id, options);
  } catch (error) {
    console.log(error);
    throw new Error(error._message);
  }
}

module.exports = {
  Create,
  FindByIdAndUpdate,
  FindByIdAndDelete
};
