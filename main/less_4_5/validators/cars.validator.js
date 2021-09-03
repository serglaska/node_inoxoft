const Joi = require('joi');

const createUserValidator = Joi.object({
  status: Joi.boolean().required(),
  id: Joi.number().required().min(3).max(10),
  brand: Joi.string().required().min(3).max(50),
  price: Joi.number().required().min(3).max(10),
  name: Joi.string().required().alphanum().min(2)
    .max(30),
});

// const updateUserValidator = Joi.object({
//   name: Joi.string().alphanum().min(2).max(30)
//     .trim(),
//   email: Joi.string().regex(EMAIL_REGEXP).trim(),
// });

module.exports = {
  createUserValidator,
  // updateUserValidator
};
