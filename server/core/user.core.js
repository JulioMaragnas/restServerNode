const Usuario = require('../domain/user.domain');
const {
  EncryptAdapter,
  MapperMessage,
  Tokenizer,
} = require('../adapter/index.adapter');
const {
  Error: ErrorMessage,
  BadRequest,
  Success,
  NoContent,
} = require('../infraestructure/messageType.infraestructure');
const Repository = require('../dataAccess/repository.dataAccess');

// const hashJS = require('hash.js');

const jwt = require('jsonwebtoken');

async function LoginUser({ email, password }) {
  try {
    const user = await Repository.FindOne(Usuario, { email });
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
  } catch (error) {
    return MapperMessage(ErrorMessage, { ...error });
  }
}

async function GetUsers(from, to) {
  try {
    const users = await Repository.Find(Usuario, {state: true}, null, {
      skip: from || 0,
      limit: to || 0,
    });

    if (!users) {
      const responseUsers = {
        message: 'there are no users to query',
      };
      return MapperMessage(NoContent, responseUsers);
    }

    return MapperMessage(Success, { users, count: users.length });
  } catch (error) {
    return MapperMessage(ErrorMessage, { ...error });
  }
}

async function CreateUser(user) {
  try {
    const userCreated = await (await Usuario.create(user)).toJSON();

    return MapperMessage(Success, { ...userCreated });
  } catch (error) {
    return MapperMessage(ErrorMessage, { ...error });
  }
}

async function UpdateDeleteUser(id, user) {
  try {
    const userUpdated = Usuario.findByIdAndUpdate(id, user, { new: true });

    if (!userUpdated) {
      const responseUser = {
        message: 'there´s no user to update',
      };
      return MapperMessage(NoContent, responseUser);
    }

    return MapperMessage(Success, userUpdated);
  } catch (error) {
    return MapperMessage(ErrorMessage, { ...error });
  }
}

module.exports = {
  LoginUser,
  GetUsers,
  CreateUser,
  UpdateDeleteUser,
};
