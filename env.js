const path = require('path');
const dotenv = require('dotenv');

const {
  MESSAGE_CONFIG_IS_REQUIRED,
  MESSAGE_CONFIG_MISSED_KEYS,
} = require('./config/messages');

module.exports = (app) => {
  const config = dotenv.config();

  if (process.env.NODE_ENV === 'production') {
    if (config.error) {
      throw new Error(
        MESSAGE_CONFIG_IS_REQUIRED.replace('%config%', '.env'),
      );
    }

    const distConfig = dotenv.config({
      path: path.resolve(process.cwd(), '.env.dist'),
    });

    if (distConfig.error) {
      throw new Error(
        MESSAGE_CONFIG_IS_REQUIRED.replace('%config%', '.env.dist'),
      );
    }

    // Check for missed keys
    const missedKeys = Object.keys(distConfig.parsed)
      .filter(
        (key) => !(key in config.parsed),
      );
    if (missedKeys.length > 0) {
      throw new Error(
        MESSAGE_CONFIG_MISSED_KEYS
          .replace('%config%', '.env')
          .replace('%keys%', missedKeys.join(',')),
      );
    }
  }

  if (!config.error) {
    const { parsed: env } = config;

    process.env = {
      ...process.env,
      ...env,
    };
  }

  app.set('config', {
    ...app.get('config'),
    ...process.env,
  });

  return app;
};
