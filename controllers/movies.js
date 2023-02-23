const { Error } = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const { CREATED_STATUS } = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((moviesList) => {
      res.send(moviesList);
    })
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  // сначала найти фильм в базе и сравнить id owner-а с текущим пользователем
  Movie.findById(req.params.movieId)
    .populate('owner')
    .then((movie) => {
      // если фильм не найден, то вернуть ошибку 404
      if (!movie) {
        throw new NotFoundError('Фильм с указанным id не найден');
      }
      // если id пользователя, сохранившего фильм, не равен текущему пользователю,
      // выдать ошибку 403
      if (movie.owner.id !== req.user._id) {
        throw new ForbiddenError('Можно удалять только фильмы, которые сохранили именно вы');
      }
      // если id пользователя, сохранившего фильм, равен текущему пользователю,
      // удалить фильм методом remove документа, пришедшего из БД
      return movie.remove();
    })
    .then(() => {
      res.send({ message: 'Фильм удален' });
    })
    .catch((err) => {
      // если формат movieId передан неверно, то выдать ошибку 400
      if (err instanceof Error.CastError) {
        next(new BadRequestError('ID фильма передан в неверном формате'));
        return;
      }
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
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
        next(new BadRequestError('Неверный формат данных при создании фильма'));
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
