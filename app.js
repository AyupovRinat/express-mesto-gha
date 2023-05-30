const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const errors = require('./constants');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6475d0ad47b23362ffa02da2',
  };

  next();
});

app.use(router);

app.use('/*', (req, res) => {
  res.status(errors.not_found).send({ message: 'Карточка не найдена' });
});

app.listen(PORT);
