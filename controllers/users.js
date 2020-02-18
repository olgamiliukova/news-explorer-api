const jwt = require('jsonwebtoken');

const ItemsController = require('./items');
const {
  BadRequestError,
  ForbiddenError,
} = require('../errors');
const {
  MESSAGE_OPERATION_FORBIDDEN,
  MESSAGE_USER_BY_EMAIL_ALREADY_EXISTS,
} = require('../config/messages');

class UsersController extends ItemsController {
  _check(req, action) {
    const { id } = req.params;

    return super._check(req, action)
      .then(
        () => this._join(
          this.model.findById(id),
        ),
      )
      .then(
        (user) => {
          if (!user.equals(req.user)) {
            throw new ForbiddenError(
              MESSAGE_OPERATION_FORBIDDEN.replace('%action%', action),
            );
          }

          return user;
        },
      );
  }

  login(req, res, next) {
    const { email, password } = req.body;

    return this.model.findUserByCredentials(email, password)
      .then((user) => {
        const { JWT_SECRET, JWT_EXPIRES_IN } = req.app.get('config');
        const token = jwt.sign(
          { _id: user._id },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN },
        );

        return res.set({
          authorization: `Bearer ${token}`,
        })
          .cookie('jwt', token, {
            maxAge: 1000 * parseInt(JWT_EXPIRES_IN, 10),
            httpOnly: true,
          })
          .send({ token });
      })
      .catch(next);
  }

  createItem(req, res, next) {
    const { email } = this._data(req.body);

    return this.model.exists({ email })
      .then(
        (isExist) => {
          if (isExist) {
            throw new BadRequestError(
              MESSAGE_USER_BY_EMAIL_ALREADY_EXISTS.replace('%email%', email),
            );
          }

          return super.createItem(req, res, next);
        },
      )
      .catch(next);
  }

  getMe(req, res, next) {
    return this._join(
      this.model.findById(req.user._id),
    )
      .then(this._send(res))
      .catch(next);
  }

  updateMe(req, res, next) {
    return this._join(
      this.model.findByIdAndUpdate(
        req.user._id,
        this._data(req.body),
        {
          new: true,
          runValidators: true,
        },
      ),
    )
      .then(this._send(res))
      .catch(next);
  }
}

module.exports = (app) => {
  const { User } = app.get('models');
  return new UsersController(User);
};

module.exports.UsersController = UsersController;
