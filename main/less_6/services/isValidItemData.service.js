const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST } = require('../configs/statusCodes.enum');
const { createCarsValidator, updateCarValidator } = require('../validators/cars.validator');
const { createUserValidator, updateUserValidator } = require('../validators/user.validator');

module.exports = {
  isValidItemData: (item) => (req, res, next) => {
    try {
      const itemCreateValidator = item === 'user' ? createUserValidator : createCarsValidator;
      const { error, value } = itemCreateValidator.validate(req.body);

      if (error) throw new ErrorHandler(BAD_REQUEST, error.details[0].message);

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  },

  isItemValidUpdate: (item) => (req, res, next) => {
    try {
      const itemUpdateValidator = item === 'user' ? updateUserValidator : updateCarValidator;
      const { error, value } = itemUpdateValidator.validate(req.body);

      if (error) throw new ErrorHandler(BAD_REQUEST, error.details[0].message);

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  },
};
