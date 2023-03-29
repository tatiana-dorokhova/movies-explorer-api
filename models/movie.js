const mongoose = require('mongoose');
const { validateUrl } = require('../utils/validateValue');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validateUrl,
        message: (props) => `${props.value} - ссылка имеет неправильный формат`,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: validateUrl,
        message: (props) => `${props.value} - ссылка имеет неправильный формат`,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: validateUrl,
        message: (props) => `${props.value} - ссылка имеет неправильный формат`,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }, // не создавать поле версии __v в БД
);

module.exports = mongoose.model('movie', movieSchema);
