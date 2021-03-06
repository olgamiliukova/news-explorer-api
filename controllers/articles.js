const ItemsController = require('./items');
const {
  NotFoundError,
  ForbiddenError,
} = require('../errors');
const {
  MESSAGE_ARTICLE_OWNER_NOT_FOUND,
  MESSAGE_OPERATION_FORBIDDEN,
} = require('../config/messages');

class ArticlesController extends ItemsController {
  _check(req, action) {
    const { id } = req.params;

    return super._check(req, action)
      .then(
        () => this._join(
          this.model.findById(id),
        ),
      )
      .then(
        (article) => {
          if (!article.owner) {
            throw new NotFoundError(MESSAGE_ARTICLE_OWNER_NOT_FOUND);
          }

          if (!article.owner.equals(req.user)) {
            throw new ForbiddenError(
              MESSAGE_OPERATION_FORBIDDEN.replace('%action%', action),
            );
          }

          return article;
        },
      );
  }

  getItems(req, res, next) {
    req.params.filter = {
      owner: req.user,
    };

    return super.getItems(req, res, next);
  }

  getItem(req, res, next) {
    req.params.filter = {
      owner: req.user,
    };

    return super.getItem(req, res, next);
  }

  createItem(req, res, next) {
    req.body.owner = req.user;

    return super.createItem(req, res, next);
  }
}

module.exports = (app) => {
  const { Article } = app.get('models');
  return new ArticlesController(Article, ['owner']);
};

module.exports.ArticlesController = ArticlesController;
