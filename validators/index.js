const { Joi } = require('celebrate');
const objectId = require('joi-objectid');

const articles = require('./articles');
const users = require('./users');
// Setup validators
module.exports = (app) => {
  // Extends Joi
  Joi.objectId = objectId(Joi);

  app.set('validators', {
    articles: articles(app),
    users: users(app),
  });

  return app;
};
