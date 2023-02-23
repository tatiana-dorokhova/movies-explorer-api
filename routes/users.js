const router = require('express').Router(); // создали роутер
const { validateUserData } = require('../utils/validateRequestsData');

const { getUserMe, updateUserData } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserMe);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', validateUserData, updateUserData);

module.exports = router;
