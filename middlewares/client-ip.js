const requestIp = require('request-ip');

module.exports = (app) => {
  app.set('trust proxy', true);
  return (req, _, next) => {
    req.clientIp = requestIp.getClientIp(req);
    if (!req.clientIp) {
      req.clientIp = '127.0.0.1';
    }

    next();
  };
};
