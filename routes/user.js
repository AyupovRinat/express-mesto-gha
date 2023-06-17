const userRouter = require('express').Router();
const {
  getUsers, getIdUsers, updateUserAvatar, updateUser, getCurrentUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:id', getIdUsers);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
