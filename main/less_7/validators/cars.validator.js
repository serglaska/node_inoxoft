const Joi = require('joi');

const createCarsValidator = Joi.object({
  status: Joi.boolean().required(),
  brand: Joi.string().required().min(3).max(50),
  car_id: Joi.string().required().min(3).max(50),
  price: Joi.number().required().min(3).max(100000),
  name: Joi.string().required().alphanum().min(2)
    .max(30),
});

const updateCarValidator = Joi.object({
  status: Joi.boolean(),
  price: Joi.number().min(3).max(100000),
});

module.exports = {
  updateCarValidator,
  createCarsValidator
};
