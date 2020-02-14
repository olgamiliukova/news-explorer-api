// Errors and Validation
const { errors } = require('celebrate');

const { NotFoundError } = require('../errors');
// Routes
const articles = require('./articles');
const users = require('./users');

// Setup routes
module.exports = (app) => {
  app.use('/articles', articles(app));
  app.use('/users', users(app));

  const { MESSAGE_REQUESTED_RESOURCE_404 } = app.get('config');

  app.use('/', (_, res, next) => {
    next(new NotFoundError(MESSAGE_REQUESTED_RESOURCE_404));
  });

  // Add error logger
  app.use(app.get('logger.error'));
  // Add validation errors middleware
  app.use(errors());

  return app;
};
