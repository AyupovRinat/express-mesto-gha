const Card = require('../models/card');
const errors = require('../constants');

module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(errors.internal_error).send({ message: 'Ошибка сервера' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card
    .create({ name, link, owner })
    .then((card) => res.status(201).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errors.bad_request).send({ message: 'Переданы некорректные данные в методы создания карточки' });
      } else {
        res.status(errors.internal_error).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(errors.not_found).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errors.bad_request).send({ message: 'Переданы некорректные данные в методы удаления карточки' });
      } else {
        res.status(errors.internal_error).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(errors.not_found).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errors.bad_request).send({ message: 'Переданы некорректные данные для лайка' });
      } else {
        res.status(errors.internal_error).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(errors.not_found).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errors.bad_request).send({ message: 'Переданы некорректные данные для дизлайка' });
      } else {
        res.status(errors.internal_error).send({ message: 'Ошибка сервера' });
      }
    });
};
