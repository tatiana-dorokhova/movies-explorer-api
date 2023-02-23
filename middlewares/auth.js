const jsonwebtoken = require('jsonwebtoken');
const conf = require('../config/appConfig');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  const token = jwt.replace('Bearer ', '');
  let payload;

  try {
    payload = jsonwebtoken.verify(
      token,
      conf.JWT_SECRET,
    );
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};
