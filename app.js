const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const errors = require('./constants');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { celebrate, Joi } = require('celebrate');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/i),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    email: Joi.string().required().regex(/^[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+@[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z]+$/i),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);
app.use(router);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.use('/*', (req, res) => {
  res.status(errors.not_found).send({ message: 'Карточка не найдена' });
});

app.listen(PORT);
