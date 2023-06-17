const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const userRouter = ('./routes/user');
const cardRouter = ('./routes/card');

const { signupValidator, signinValidator } = require('./utils/validation');

const { PORT = 3000 } = process.env;

const NotFoundError = require('./errors/notFoundError');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', signupValidator, login);
app.post('/signup', signinValidator, createUser);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('/*', (req, res, next) => {
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
