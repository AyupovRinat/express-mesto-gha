const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/notFoundError');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(router);
app.use('/', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
