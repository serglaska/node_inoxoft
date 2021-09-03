const { Cars } = require('../dataBase/index');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
  isCarExist: async (req, res, next) => {
    try {
      const { id } = req.body;

      const carById = await Cars.findOne({ id: id }); //eslint-disable-line
      if (carById) {
        throw new ErrorHandler(409, 'Car is already exist');
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isCarByIdExist: async (req, res, next) => {
    try {
      const { car_id } = req.params;
      const car = await Cars.findById(car_id);

      if (!car) {
        throw new ErrorHandler(404, 'Car not founded');
      }

      req.locals = {
        car,
        testParam: 'Check locals changes'
      };

      next();
    } catch (err) {
      next(err);
    }
  }
};
