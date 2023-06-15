const router = require('express').Router();

const {
  getUsers, getIdUsers, updateUserAvatar, updateUser, getCurrentUser, createUser,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getIdUsers);
router.get('/me', getCurrentUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
