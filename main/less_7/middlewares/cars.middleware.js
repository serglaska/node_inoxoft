const ErrorHandler = require('../errors/ErrorHandler');
const { CONFLICT, NOT_FOUND } = require('../configs/statusCodes.enum');

module.exports = {
  checkDuplicateCar: (req, res, next) => {
    try {
      const { car } = req;

      if (car) {
        throw new ErrorHandler(CONFLICT, 'Car is already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkCarByIdExist: (req, res, next) => {
    try {
      const { car } = req;

      if (!car) {
        throw new ErrorHandler(NOT_FOUND, 'Car not founded');
      }

      req.car = car;

      next();
    } catch (err) {
      next(err);
    }
  }
};
