const articles = require('./articles');
const users = require('./users');
// Setup controllers
module.exports = (app) => {
  app.set('controllers', {
    articles: articles(app),
    users: users(app),
  });

  return app;
};
