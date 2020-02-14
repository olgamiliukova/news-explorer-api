const express = require('express');
const seeder = require('mongoose-seed');

const config = require('./config');
const dotenv = require('./env');
const models = require('./models');
const seeds = require('./seeds');

// Create and decorate application
const app = [
  config,
  dotenv,
  models,
].reduce(
  (decorated, decorator) => decorator(decorated),
  express(),
);

const {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_NAME,
} = app.get('config');

// Connect to MongoDB via Mongoose
seeder.connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}, () => {
  // Clear specified collections
  seeder.clearModels(seeds.map(({ model }) => model), () => {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(seeds, () => {
      seeder.disconnect();
    });
  });
});
