const session = require('express-session');

module.exports = (app) => {
  const {
    SESSION_SECRET,
  } = app.get('config');

  return session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
    },
  });
};
