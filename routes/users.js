const { Router } = require('express');

module.exports = (app) => {
  const router = Router();
  const { users: controller } = app.get('controllers');
  const { users: validator } = app.get('validators');
  // Get user list
  router.get(
    '/',
    controller.getItems.bind(controller),
  );
  // Get yourself
  router.get(
    '/me',
    controller.getMe.bind(controller),
  );
  // Get user by id
  router.get(
    '/:id',
    validator.getItem,
    controller.getItem.bind(controller),
  );
  // Create new user
  router.post(
    '/',
    validator.createItem,
    controller.createItem.bind(controller),
  );
  // Update yourself
  router.patch(
    '/me',
    validator.updateMe,
    controller.updateMe.bind(controller),
  );
  // Update user by id
  router.put(
    '/:id',
    validator.updateItem,
    controller.updateItem.bind(controller),
  );
  // Delete user by id
  router.delete(
    '/:id',
    validator.deleteItem,
    controller.deleteItem.bind(controller),
  );

  return router;
};
