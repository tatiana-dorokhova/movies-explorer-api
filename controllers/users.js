const { Error } = require('mongoose');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const conf = require('../config/appConfig');
const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');
const NotFoundError = require('../errors/notFoundError');
const {
  JWT_SALT_LENGTH,
  CREATED_STATUS,
  USER_NOT_FOUND_MESSAGE,
  WRONG_USER_DATA_MESSAGE,
  EMAIL_ALREADY_USED_MESSAGE,
  ON_SIGNOUT_MESSAGE,
} = require('../utils/constants');

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      // если формат переданного userId верный,
      // но пользователь по нему не найден (равен null), вернуть ошибку 404
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }

      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, JWT_SALT_LENGTH)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      // удаляем пароль из ответа
      const userObjectWithoutPassword = user.toObject();
      delete userObjectWithoutPassword.password;
      res.status(CREATED_STATUS).send({ data: userObjectWithoutPassword });
    })
    .catch((err) => {
      // если произошла ошибка валидации данных, то выдать ошибку 400
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(WRONG_USER_DATA_MESSAGE));
        return;
      }
      // если в базе есть пользователь с таким же email, выдать ошибку 409
      if (err.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_USED_MESSAGE));
        return;
      }
      next(err);
    });
};

const updateUserData = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      // если пользователь с таким id не найден, то выдать ошибку 404
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      res.send(user);
    })
    .catch((err) => {
      // если произошла ошибка валидации данных, то выдать ошибку 400
      if (err instanceof Error.ValidationError) {
        next(
          new BadRequestError(WRONG_USER_DATA_MESSAGE),
        );
        return;
      }
      // если в базе есть пользователь с таким же email, выдать ошибку 409
      if (err.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_USED_MESSAGE));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password, name } = req.body;

  return User.findUserByCredentials(email, password, name)
    .then((user) => {
      // создадим токен
      const token = jsonwebtoken.sign(
        { _id: user._id },
        conf.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );

      // вернём токен как httpOnly-куку
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({
          _id: user._id,
          email: user.email,
          name: user.name,
        });
    })
    .catch(next);
};

const clearCookie = (req, res) => {
  // ситуации, когда токен не передан или по токену не найден пользователь,
  // отрабатывает мидлварь auth
  res.clearCookie('jwt').send({ messsage: ON_SIGNOUT_MESSAGE });
};

module.exports = {
  createUser,
  getUserMe,
  updateUserData,
  login,
  clearCookie,
};
