const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errors = require('../constants');

module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => res.send(users))
    .catch(() => res.status(errors.internal_error).send({ message: 'Ошибка сервера' }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    });
};

module.exports.getIdUsers = (req, res) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(errors.not_found).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errors.bad_request).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(errors.internal_error).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.getCurrentUser = (req, res) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(errors.not_found).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errors.bad_request).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(errors.internal_error).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errors.bad_request).send({ message: 'Переданы некорректные данные в методы создания пользователя' });
      } else {
        res.status(errors.internal_error).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(errors.not_found).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errors.bad_request).send({ message: 'Переданы некорректные данные в методы обновления профиля' });
      } else {
        res.status(errors.internal_error).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(errors.not_found).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errors.bad_request).send({ message: 'Переданы некорректные данные в методы обновления аватара' });
      } else {
        res.status(errors.internal_error).send({ message: 'Ошибка сервера' });
      }
    });
};
