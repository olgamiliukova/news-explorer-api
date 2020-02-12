const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;
const userSchema = {
  type: Schema.Types.ObjectId,
  ref: 'User',
};
// Article schema
const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate(value) {
      return validator.isURL(value);
    },
    required: true,
  },
  image: {
    type: String,
    validate(value) {
      return validator.isURL(value);
    },
    required: true,
  },
  owner: {
    ...userSchema,
    required: true,
  },
});
// Article model
module.exports = mongoose.model('Article', articleSchema);
