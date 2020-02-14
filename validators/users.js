const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

module.exports = () => ({
  getItem: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }),
  createItem: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(30),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateItem: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().min(2).max(30),
      name: Joi.string().min(2).max(30),
    }),
  }),
  deleteItem: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }),
  updateMe: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().min(2).max(30),
      name: Joi.string().min(2).max(30),
    }),
  }),
  login: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
});
