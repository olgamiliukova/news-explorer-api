const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('./env');
const validators = require('./validators');
const controllers = require('./controllers');
const middlewares = require('./middlewares');
const config = require('./config');
const models = require('./models');
const routes = require('./routes');
const errors = require('./errors');
// Create and decorate application
const app = [
  config,
  dotenv,
  models,
  validators,
  controllers,
  middlewares,
  routes,
  errors,
].reduce(
  (decorated, decorator) => decorator(decorated),
  express(),
);

const {
  EXPRESS_PORT,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_NAME,
} = app.get('config');
// Connect to MongoDB
mongoose
  .connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error(err);
  });

// Start and listen
app.listen(EXPRESS_PORT, () => {
  console.log(
    app.get('config').MESSAGE_APPLICATION_LISTENING_ON_PORT.replace('%port%', EXPRESS_PORT),
  );
});
