const jwt = require('jsonwebtoken');

const ItemsController = require('./items');
const {
  BadRequestError,
  ForbiddenError,
} = require('../errors');

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
            throw new ForbiddenError(`Operation "${action}" is not permitted`);
          }

          return user;
        },
      );
  }

  login(req, res, next) {
    const { email, password } = req.body;

    return this.model.findUserByCredentials(email, password)
      .then((user) => {
        const { JWT_SECRET, JWT_EXPIRES_IN } = req.app.get('.env');
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
            throw new BadRequestError(`User with email "${email}" already exists`);
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
