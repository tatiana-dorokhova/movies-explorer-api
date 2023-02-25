const { Error } = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const {
  CREATED_STATUS,
  FILM_NOT_FOUND_MESSAGE,
  REMOVE_ONLY_YOUR_FILMS_MESSAGE,
  ON_DELETE_FILM_MESSAGE,
  WRONG_FILM_ID_MESSAGE,
  WRONG_FILM_DATA_MESSAGE,
} = require('../utils/constants');

// возвращает все сохранённые текущим  пользователем фильмы с подробным полем owner
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((moviesList) => {
      res.send(moviesList);
    })
    .catch(next);
};

// возвращает сообщение об удалении фильма
const deleteMovieById = (req, res, next) => {
  // сначала найти фильм в базе и сравнить id owner-а с текущим пользователем
  Movie.findById(req.params.movieId)
    .populate('owner')
    .then((movie) => {
      // если фильм не найден, то вернуть ошибку 404
      if (!movie) {
        throw new NotFoundError(FILM_NOT_FOUND_MESSAGE);
      }
      // если id пользователя, сохранившего фильм, не равен текущему пользователю,
      // выдать ошибку 403
      if (movie.owner.id !== req.user._id) {
        throw new ForbiddenError(REMOVE_ONLY_YOUR_FILMS_MESSAGE);
      }
      // если id пользователя, сохранившего фильм, равен текущему пользователю,
      // удалить фильм методом remove документа, пришедшего из БД
      return movie.remove();
    })
    .then(() => {
      res.send({ message: ON_DELETE_FILM_MESSAGE });
    })
    .catch((err) => {
      // если формат movieId передан неверно, то выдать ошибку 400
      if (err instanceof Error.CastError) {
        next(new BadRequestError(WRONG_FILM_ID_MESSAGE));
        return;
      }
      next(err);
    });
};

// возвращает все поля фильма с подробным полем owner
const createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => {
      movie.populate('owner').then((movieWithOwner) => {
        res.status(CREATED_STATUS).send(movieWithOwner);
      });
    })
    .catch((err) => {
      // если произошла ошибка валидации данных, то выдать ошибку 400
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(WRONG_FILM_DATA_MESSAGE));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
