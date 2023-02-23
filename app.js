const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const conf = require('./config/appConfig');
const cors = require('./middlewares/cors');
const router = require('./routes/index');
const handleErr = require('./middlewares/handleErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors);

app.use(cookieParser());

// подключение встроенного body-parser-а json в express для расшифровки тела запросов
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(conf.DB_CONN);

app.use(requestLogger); // логгер запросов

app.use(router);

app.use(errorLogger); // логгер ошибок

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(handleErr);

app.listen(conf.PORT);
