const mongoose = require('mongoose');
const mongooseUnique = require('mongoose-unique-validator');

let categorySchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'description is expected'],
    unique: true,
  },
});

categorySchema.methods.toJSON = function () {
  let schema = this.toObject();
  const {_id} = schema;
  delete schema._id;
  return {...schema, id: _id};
}

categorySchema.plugin(mongooseUnique, { message: '{PATH} must be unique' });
module.exports = mongoose.model('Category', categorySchema);
