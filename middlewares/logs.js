const winston = require('winston');
const expressWinston = require('express-winston');

const createLogger = (
  filename,
  method = 'logger',
  nodeEnv = 'development',
) => expressWinston[method]({
  transports: nodeEnv === 'development' ? [
    new winston.transports.Console(),
  ] : [
    new winston.transports.File({ filename }),
  ],
  format: winston.format.json(),
});

module.exports = (app) => {
  const { NODE_ENV } = app.get('config');
  app.set(
    'logger.error',
    createLogger(
      'logs/error.log',
      'errorLogger',
      NODE_ENV,
    ),
  );

  return createLogger(
    'logs/request.log',
    'logger',
    NODE_ENV,
  );
};
