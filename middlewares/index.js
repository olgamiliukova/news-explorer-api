const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const clientIp = require('./client-ip');
const rateLimit = require('./rate-limit');
const auth = require('./auth');
const logs = require('./logs');
// Middlewars
module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(clientIp(app));
  app.use(rateLimit(app));
  app.use(logs(app));
  app.use(auth(app));

  return app;
};
