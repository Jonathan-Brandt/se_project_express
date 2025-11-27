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

const validateSignIn = celebrate({
  body: Joi.object.keys({
    email: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.uri": 'the "email" field must contain a valid email',
    }),
    password: Joi.string().required().min(8),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.uri": 'the "email" field must contain a valid email',
    }),
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must contain a valid url',
    }),
    password: Joi.string().required().min(8),
  }),
});

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
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

const validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must contain a valid url',
    }),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24).required().messages({
      "string.length": "ID must be exactly 24 characters long",
      "string.alphanum": "ID must contain only alphanumeric characters",
      "string.empty": "ID is required",
    }),
  }),
});

const validateClothingId = celebrate({
  params: Joi.object().keys({
    clothingId: Joi.string().alphanum().length(24).required().messages({
      "string.length": "ID must be exactly 24 characters long",
      "string.alphanum": "ID must contain only alphanumeric characters",
      "string.empty": "ID is required",
    }),
  }),
});

module.exports = {
  validateCardBody,
  validateUserInfoBody,
  validateItemId,
  validateClothingId,
  validateSignIn,
  validateSignUp,
};
