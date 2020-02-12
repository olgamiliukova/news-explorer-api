// Errors and Validation
const { Joi, errors } = require('celebrate');
const joiObjectId = require('joi-objectid');

const { NotFoundError } = require('../errors');
// Routes
const articles = require('./articles');
const users = require('./users');
// Extends Joi
Joi.objectId = joiObjectId(Joi);

// Setup routes
module.exports = (app) => {
  app.use('/articles', articles(app));
  app.use('/users', users(app));
  app.use('/', (_, res, next) => {
    next(new NotFoundError('The requested resource has not been found'));
  });

  // Add error logger
  app.use(app.get('logger.error'));
  // Add validation errors middleware
  app.use(errors());

  return app;
};
