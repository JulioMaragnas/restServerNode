const mongoose = require('mongoose');
const mongooseUnique = require('mongoose-unique-validator')

let validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not valid'
}

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is expected']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is expected']
  },
  password: {
    type: String,
    required: [true, 'password is expected']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: [true, 'role is expected'],
    default: 'USER_ROLE',
    enum: validRoles
  },
  state: {
    type: Boolean,
    required: [true, 'state is expected'],
    default: true
  },
  google: {
    type: Boolean,
    required: [true, 'google is expected'],
    default: false
  }
});

userSchema.methods.toJSON = function () {
  let schema = this.toObject();
  delete schema.password;
  return schema;
}

userSchema.plugin(mongooseUnique, { message: '{PATH} must be unique' })

module.exports = mongoose.model('User', userSchema);