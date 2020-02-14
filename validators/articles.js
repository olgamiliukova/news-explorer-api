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
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.date().required(),
      source: Joi.string().required(),
      link: Joi.string().required().uri(),
      image: Joi.string().required().uri(),
    }),
  }),
  updateItem: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
    [Segments.BODY]: Joi.object().keys({
      keyword: Joi.string(),
      title: Joi.string(),
      text: Joi.string(),
      date: Joi.date(),
      source: Joi.string(),
      link: Joi.string().uri(),
      image: Joi.string().uri(),
    }),
  }),
  deleteItem: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }),
});
