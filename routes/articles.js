const { Router } = require('express');

module.exports = (app) => {
  const router = Router();
  const { articles: controller } = app.get('controllers');
  const { articles: validator } = app.get('validators');
  // Get article list
  router.get(
    '/',
    controller.getItems.bind(controller),
  );
  // Get article by id
  router.get(
    '/:id',
    validator.getItem,
    controller.getItem.bind(controller),
  );
  // Create new article
  router.post(
    '/',
    validator.createItem,
    controller.createItem.bind(controller),
  );
  // Update article by id
  router.put(
    '/:id',
    validator.updateItem,
    controller.updateItem.bind(controller),
  );
  // Delete article by id
  router.delete(
    '/:id',
    validator.deleteItem,
    controller.deleteItem.bind(controller),
  );

  return router;
};
