const mongodb = require('./mongodb');
const messages = require('./messages');
const system = require('./system');

module.exports = (app) => {
  app.set('config', {
    ...mongodb,
    ...messages,
    ...system,
  });

  return app;
};
