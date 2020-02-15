const dotenv = require('dotenv');

module.exports = (app) => {
  const config = dotenv.config();

  if (!config.error) {
    const { parsed: env } = config;

    app.set('config', {
      ...app.get('config'),
      ...env,
    });
  }

  app.set('config', {
    ...app.get('config'),
    ...process.env,
  });

  return app;
};
