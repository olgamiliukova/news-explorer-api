const jwt = require('jsonwebtoken');

const {
  ForbiddenError,
  UnauthorizedError,
} = require('../errors');
const {
  MESSAGE_USER_NOT_FOUND_TO_AUTHORIZE,
} = require('../config/messages');

module.exports = (app) => {
  // required is to add signup/signin routes before authorization middleware
  const { users: controller } = app.get('controllers');
  const { users: validator } = app.get('validators');

  app.post(
    '/signup',
    validator.createItem,
    controller.createItem.bind(controller),
  );

  app.post(
    '/signin',
    validator.login,
    controller.login.bind(controller),
  );

  return (req, _, next) => {
    let { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      const { jwt: token } = req.cookies;

      if (!token) {
        throw new UnauthorizedError();
      }

      authorization = token;
    }

    const token = authorization.replace('Bearer ', '');
    const { JWT_SECRET } = req.app.get('config');

    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      throw new UnauthorizedError(e.message);
    }

    const { User } = app.get('models');

    // Check if user doesn't exist
    User.exists({ _id: req.user._id })
      .then(
        (isExist) => {
          if (!isExist) {
            throw new ForbiddenError(MESSAGE_USER_NOT_FOUND_TO_AUTHORIZE);
          }

          return User.findById(req.user._id)
            .then(
              (user) => {
                req.user = user;
                next();
              },
            );
        },
      )
      .catch(next);
  };
};
