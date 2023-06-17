const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardIdValidator, createCardValidator } = require('../utils/validation');

cardRouter.get('/', getCards);
cardRouter.post('/', createCardValidator, createCard);
cardRouter.delete('/:cardId', cardIdValidator, deleteCard);
cardRouter.put('/:cardId/likes', cardIdValidator, likeCard);
cardRouter.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = cardRouter;
