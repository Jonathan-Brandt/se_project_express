const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must contain a valid url',
    }),
  }),
});

const validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must contain a valid url',
    }),
    email: Joi.string().required().email().custom(validateEmail).messages({
      "string.empty": "Please enter an email address",
      "string.uri": "Please enter a valid email",
    }),
    password: Joi.string().required().min(8),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().custom(validateEmail).messages({
      "string.empty": "Please enter an email address",
      "string.uri": "Please enter a valid email",
    }),
    password: Joi.string().required().min(8),
  }),
});

const validateID = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).required().messages({
      "string.length": "ID must be exactly 24 characters long",
      "string.alphanum": "ID must contain only alphanumeric characters",
      "string.empty": "ID is required",
    }),
    itemId: Joi.string().alphanum().length(24).required().messages({
      "string.length": "ID must be exactly 24 characters long",
      "string.alphanum": "ID must contain only alphanumeric characters",
      "string.empty": "ID is required",
    }),
    clothingId: Joi.string().alphanum().length(24).required().messages({
      "string.length": "ID must be exactly 24 characters long",
      "string.alphanum": "ID must contain only alphanumeric characters",
      "string.empty": "ID is required",
    }),
    userId: Joi.string().alphanum().length(24).required().messages({
      "string.length": "ID must be exactly 24 characters long",
      "string.alphanum": "ID must contain only alphanumeric characters",
      "string.empty": "ID is required",
    }),
  }),
});

module.exports = {
  validateCardBody,
  validateUserInfoBody,
  validateAuthentication,
  validateID,
};
