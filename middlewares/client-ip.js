const requestIp = require('request-ip');

module.exports = (app) => {
  app.set('trust proxy', true);
  return requestIp.mw();
};
