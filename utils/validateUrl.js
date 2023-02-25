const { REGEX_URL_PATTERN } = require('./constants');

const validateUrl = (value) => REGEX_URL_PATTERN.test(value);

module.exports = {
  validateUrl,
};
