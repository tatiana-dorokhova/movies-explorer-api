const router = require('express').Router(); // создали роутер
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser, clearCookie } = require('../controllers/users');
const { validateSignIn, validateSignUp } = require('../utils/validateRequestsData');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const { PAGE_NOT_EXIST_MESSAGE } = require('../utils/constants');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);

// в случае успеха добавляет в каждый запрос свойство req.user
// с записанным в него токеном
router.use(auth);

router.post('/signout', clearCookie);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// если обращение происходит к ресурсу, не описанному выше в роутах, то выдавать ошибку 404
router.all('*', (req, res, next) => next(new NotFoundError(PAGE_NOT_EXIST_MESSAGE)));

module.exports = router;
