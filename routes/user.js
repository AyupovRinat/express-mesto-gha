const userRouter = require('express').Router();
const {
  getUsers, getIdUsers, updateUserAvatar, updateUser, getCurrentUser,
} = require('../controllers/users');
const { userAvatarValidator, idUsersValidator, updateUserValidator } = require('../utils/validation');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', idUsersValidator, getIdUsers);
userRouter.patch('/me', updateUserValidator, updateUser);
userRouter.patch('/me/avatar', userAvatarValidator, updateUserAvatar);

module.exports = userRouter;
