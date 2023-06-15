const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorizationerror');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizationError('не удалось выполнить авторизацию'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new AuthorizationError('не удалось выполнить авторизацию'));
    return;
  }

  req.user = payload;
  next();
};
