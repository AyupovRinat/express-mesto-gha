const jwt = require('jsonwebtoken');

const SECRET_KEY = 'super-secret';

const signToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
const checkToken = (token) => jwt.verify(token, 'super-secret');

module.exports = {
  signToken, checkToken,
};
