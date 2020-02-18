const mongodb = require('./mongodb');
const messages = require('./messages');
const rateLimit = require('./rate-limit');
const system = require('./system');

module.exports = (app) => {
  app.set('config', {
    ...mongodb,
    ...messages,
    ...rateLimit,
    ...system,
  });

  return app;
};
