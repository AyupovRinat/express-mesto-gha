const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const errors = require('./constants');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(router);

app.use('/*', (req, res) => {
  res.status(errors.not_found).send({ message: 'Карточка не найдена' });
});

app.listen(PORT);
