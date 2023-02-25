const jsonwebtoken = require('jsonwebtoken');
const conf = require('../config/appConfig');
const UnauthorizedError = require('../errors/unauthorizedError');
const { AUTH_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    next(new UnauthorizedError(AUTH_ERROR_MESSAGE));
    return;
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(
      jwt,
      conf.JWT_SECRET,
    );
  } catch (err) {
    next(new UnauthorizedError(AUTH_ERROR_MESSAGE));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};
