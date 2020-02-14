const ItemsController = require('./items');
const {
  NotFoundError,
  ForbiddenError,
} = require('../errors');

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
            throw new NotFoundError('Owner of the article has not been found');
          }

          if (!article.owner.equals(req.user)) {
            throw new ForbiddenError(`Operation "${action}" is not permitted`);
          }

          return article;
        },
      );
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
