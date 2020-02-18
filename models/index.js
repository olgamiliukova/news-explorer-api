// Mongodb models
const Article = require('./article');
const User = require('./user');
// Initialize connection and setup models
module.exports = (app) => {
  app.set('models', { Article, User });

  return app;
};
