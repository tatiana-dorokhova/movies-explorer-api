// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://dorokhova.diploma.nomoredomains.work',
  'http://dorokhova.diploma.nomoredomains.work',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  // если источник запроса есть среди разрешённых, записать его в заголовок ответа
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы из списка выше
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
