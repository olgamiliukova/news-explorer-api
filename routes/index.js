// Errors and Validation
const { errors } = require('celebrate');

const { NotFoundError } = require('../errors');
// Routes
const articles = require('./articles');
const users = require('./users');

const {
  MESSAGE_REQUESTED_RESOURCE_NOT_FOUND,
} = require('../config/messages');

// Setup routes
module.exports = (app) => {
  app.use('/articles', articles(app));
  app.use('/users', users(app));

  app.use('/', (_, res, next) => {
    next(new NotFoundError(MESSAGE_REQUESTED_RESOURCE_NOT_FOUND));
  });

  // Add error logger
  app.use(app.get('logger.error'));
  // Add validation errors middleware
  app.use(errors());

  return app;
};
