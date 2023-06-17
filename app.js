const express = require('express');

const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('/', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка' : message,
    });
  next();
});

app.listen(PORT);
