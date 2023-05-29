const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getIdUsers = (req, res) => {
  User
    .findById(req.params.userId)
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === ('CastError' || 'ValidationError')) {
        return res.status(400).send({
          message: `Некорректный id ${req.params.userId}`,
        });
      }
      if (err.name === 'NotValidId') {
        return res.status(400).send({
          message: `Некорректный id ${req.params.userId}`,
        });
      }
      if (err.name === 'NotFound') {
        return res.status(404).send({
          message: `Пользователь не найден ${req.params.userId}`,
        });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name}` });
    });
};

module.exports.createUser = (req, res) => {
  User
    .create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `Переданы некорректные данные с ошибкой ${err.name}`,
        });
      } else {
        res.status(500).send({message: `Произошла ошибка ${err.name}`});
      }
    });
};

module.exports.updateUser = (req, res) => {
  User
    .create(req.body)
    .findByIdAndUpdate(
      req.user._id,
      { new: true, runValidators: true },
    )
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `Переданы некорректные данные с ошибкой ${err.name}`,
        });
      }
      if (err.name === 'CastError') {
        res.status(404).send({
          message: `Юзер не найден по указанному id ${req.params.userId}`,
        });
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err.name}` });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  User
    .create(req.body)
    .findByIdAndUpdate(
      req.user._id,
      { new: true, runValidators: true },
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};
