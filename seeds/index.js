const articles = require('./articles.json');
const users = require('./users.json');

module.exports = [
  {
    model: 'Article',
    documents: articles,
  },
  {
    model: 'User',
    documents: users,
  },
];
