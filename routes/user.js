const router = require('express').Router();

const { getUsers, getIdUsers, createUser, updateUserAvatar, updateUser } = require('../controllers/users');

router.get('/', getUsers);

router.post('/:userId', getIdUsers);

router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
