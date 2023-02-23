const CREATED_STATUS = 201;

const INTERNAL_SERVER_ERROR = 500;
const INT_SERV_ERR_MESSAGE = 'На сервере произошла ошибка';

const REGEX_URL_PATTERN = /https?:\/\/(w{3}\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([#]*)/;

module.exports = {
  CREATED_STATUS,
  INTERNAL_SERVER_ERROR,
  INT_SERV_ERR_MESSAGE,
  REGEX_URL_PATTERN,
};
