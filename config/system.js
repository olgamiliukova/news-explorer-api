module.exports = {
  EXPRESS_PORT: 3000,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: 'jwt-secret',
  // seconds, default 7d
  JWT_EXPIRES_IN: 604800,
};
