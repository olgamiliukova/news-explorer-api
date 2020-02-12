const { Router } = require('express');
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

module.exports = (app) => {
  const router = Router();
  const { articles } = app.get('controllers');
  // Get article list
  router.get('/', articles.getArticles.bind(articles));
  // Get article by id
  router.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }), articles.getItem.bind(articles));
  // Create new article
  router.post('/', celebrate({
    [Segments.BODY]: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.date().required(),
      source: Joi.string().required(),
      link: Joi.string().required().uri(),
      image: Joi.string().required().uri(),
    }),
  }), articles.createArticle.bind(articles));
  // Update article by id
  router.put('/:id', celebrate({
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
  }), articles.updateItem.bind(articles));
  // Delete article by id
  router.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }), articles.deleteItem.bind(articles));

  return router;
};
