const JWT_SALT_LENGTH = 10;

const REGEX_URL_PATTERN =
  /https?:\/\/(w{3}\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([#]*)/;
const REGEX_NAME_PATTERN = /[А-Яа-яЁёa-zA-Z\s-]{2,30}/;

const CREATED_STATUS = 201;

const INTERNAL_SERVER_ERROR = 500;
const INT_SERV_ERR_MESSAGE = 'На сервере произошла ошибка';

const AUTH_ERROR_MESSAGE = 'Необходима авторизация';
const WRONG_AUTH_DATA_MESSAGE = 'Неправильные почта или пароль';
const PAGE_NOT_EXIST_MESSAGE = 'Запрошена несуществующая страница';
const ON_SIGNOUT_MESSAGE = 'Logout is successful';

const FILM_NOT_FOUND_MESSAGE = 'Фильм с указанным id не найден';
const REMOVE_ONLY_YOUR_FILMS_MESSAGE = 'Можно удалять только фильмы из вашего списка сохраненных';
const ON_DELETE_FILM_MESSAGE = 'Фильм удален';
const WRONG_FILM_ID_MESSAGE = 'ID фильма передан в неверном формате';
const WRONG_FILM_DATA_MESSAGE = 'Неверный формат данных при создании фильма';

const USER_NOT_FOUND_MESSAGE = 'Пользователь с указанным id не найден';
const WRONG_USER_DATA_MESSAGE = 'Неверный формат данных при создании или обновлении пользователя';
const EMAIL_ALREADY_USED_MESSAGE = 'Пользователь с таким email уже заведен в системе';

module.exports = {
  JWT_SALT_LENGTH,
  REGEX_URL_PATTERN,
  REGEX_NAME_PATTERN,
  CREATED_STATUS,
  INTERNAL_SERVER_ERROR,
  INT_SERV_ERR_MESSAGE,
  AUTH_ERROR_MESSAGE,
  WRONG_AUTH_DATA_MESSAGE,
  PAGE_NOT_EXIST_MESSAGE,
  ON_SIGNOUT_MESSAGE,
  FILM_NOT_FOUND_MESSAGE,
  REMOVE_ONLY_YOUR_FILMS_MESSAGE,
  ON_DELETE_FILM_MESSAGE,
  WRONG_FILM_ID_MESSAGE,
  WRONG_FILM_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  WRONG_USER_DATA_MESSAGE,
  EMAIL_ALREADY_USED_MESSAGE,
};
