const Usuario = require('../domain/user.domain');
const {
  EncryptAdapter,
  MapperMessage,
  Tokenizer,
} = require('../adapter/index.adapter');
const {
  Error,
  BadRequest,
  Success,
} = require('../infraestructure/messageType.infraestructure');

// const hashJS = require('hash.js');

const jwt = require('jsonwebtoken');

async function LoginUser({ email, password }) {
  const user = await Usuario.findOne({ email });
  const EncryptInstace = new EncryptAdapter(user.password);
  if (!EncryptInstace.CompareEncryptedPassword(password)) {
    const errorPassword = {
      err: {
        message: 'Incorrect password',
      },
    };
    return MapperMessage(BadRequest, errorPassword);
  }
  
  const response = {
    user,
    token: Tokenizer({ user }, { expiresIn: 60 * 60 * 24 }),
  };

  return MapperMessage(Success, response);
}

module.exports = {
  LoginUser,
};
