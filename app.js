const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/user');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(router);

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.listen(PORT);
