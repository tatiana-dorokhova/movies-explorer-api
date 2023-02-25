const router = require('express').Router();
const { validateMovieId, validateMovieData } = require('../utils/validateRequestsData');

const { getMovies, deleteMovieById, createMovie } = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', validateMovieData, createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', validateMovieId, deleteMovieById);

module.exports = router;
