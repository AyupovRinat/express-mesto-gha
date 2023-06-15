const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const { createUser, login } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
