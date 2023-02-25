const {
  INTERNAL_SERVER_ERROR,
  INT_SERV_ERR_MESSAGE,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message:
      statusCode === INTERNAL_SERVER_ERROR ? INT_SERV_ERR_MESSAGE : message,
  });

  next();
};
