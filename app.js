const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());

app.use(router);

app.use((req, res, next) => {
  req.user = {
    _id: '64753796bd8e7c9b0d7b3b0f',
  };

  next();
});

app.listen(PORT);
