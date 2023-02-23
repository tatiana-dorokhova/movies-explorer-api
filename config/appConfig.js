require('dotenv').config();

module.exports = {
  DB_CONN: process.env.DB_HOST || 'mongodb://localhost:27017/bitfilmsdb',
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  JWT_SECRET: process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
};
