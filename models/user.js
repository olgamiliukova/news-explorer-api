const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

const { BadRequestError } = require('../errors');
const {
  MESSAGE_INCORRECT_EMAIL_OR_PASSWORD,
  MESSAGE_EMAIL_VALIDATION_FAILED,
} = require('../config/messages');

const { Schema } = mongoose;
// User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: (props) => MESSAGE_EMAIL_VALIDATION_FAILED
        .replace('%email% is not a valid email', props.value),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
    select: false,
  },
  salt: {
    type: String,
    required: true,
    default: () => bcrypt.genSaltSync(),
    select: false,
  },
});
// make password hash instead plain one
userSchema.pre('save', function save(next) {
  this.password = bcrypt.hashSync([this.password, this.salt].join(), 10);
  next();
});
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .select('+salt')
    .then((user) => {
      if (!user) {
        throw new BadRequestError(MESSAGE_INCORRECT_EMAIL_OR_PASSWORD);
      }

      return bcrypt.compare([password, user.salt].join(), user.password)
        .then((matched) => {
          if (!matched) {
            throw new BadRequestError(MESSAGE_INCORRECT_EMAIL_OR_PASSWORD);
          }

          return user;
        });
    });
};
// User model
module.exports = mongoose.model('User', userSchema);
