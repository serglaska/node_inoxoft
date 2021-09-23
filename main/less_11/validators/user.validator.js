const Joi = require('joi');

const usersRolesEnum = require('../configs/userRoles.enum');
const { CURRENT_YEAR, EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');

const girlSubSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number().min(15).max(60)
});

const createUserValidator = Joi.object({
  email: Joi.string().required().regex(EMAIL_REGEXP),
  password: Joi.string().required().regex(PASSWORD_REGEXP),
  name: Joi.string().required().alphanum().min(2)
    .max(30),
  role: Joi.string().allow(...Object.values(usersRolesEnum)),
  born_year: Joi.number().integer().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),

  car: Joi.boolean(),

  girls: Joi.array()
    .items(girlSubSchema)
    .when('car', { is: true, then: Joi.required() }),
});

const updateUserValidator = Joi.object({
  name: Joi.string().alphanum().min(2).max(30)
    .trim(),
  email: Joi.string().regex(EMAIL_REGEXP).trim(),
});

const passwordValidator = Joi.object({
  password: Joi.string().required().regex(PASSWORD_REGEXP),
});

module.exports = {
  passwordValidator,
  createUserValidator,
  updateUserValidator,
};
