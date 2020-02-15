const path = require('path');
const dotenv = require('dotenv');

module.exports = (app) => {
  const config = dotenv.config();

  if (process.env.NODE_ENV === 'production') {
    if (config.error) {
      throw new Error('Config .env is required on production');
    }

    const distConfig = dotenv.config({
      path: path.resolve(process.cwd(), '.env.dist'),
    });

    if (distConfig.error) {
      throw new Error('Config .env.dist is required on production');
    }

    // Check for missed keys
    const missedKeys = Object.keys(distConfig.parsed)
      .filter(
        (key) => !(key in config.parsed),
      );
    if (missedKeys.length > 0) {
      throw new Error(
        'Missed keys for .env: %s'.replace('%s', missedKeys.join(',')),
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
