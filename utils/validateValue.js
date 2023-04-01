const { REGEX_URL_PATTERN, REGEX_NAME_PATTERN } = require('./constants');

const validateUrl = (value) => REGEX_URL_PATTERN.test(value);
const validateName = (value) => REGEX_NAME_PATTERN.test(value);

module.exports = {
  validateUrl,
  validateName,
};
