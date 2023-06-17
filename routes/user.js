const router = require('express').Router();
const {
  getUsers, getIdUsers, updateUserAvatar, updateUser, getCurrentUser,
} = require('../controllers/users');
const { idUsersValidator, updateUserValidator, userAvatarValidator } = require('../utils/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', idUsersValidator, getIdUsers);
router.patch('/me', updateUserValidator, updateUser);
router.patch('/me/avatar', userAvatarValidator, updateUserAvatar);

module.exports = router;
