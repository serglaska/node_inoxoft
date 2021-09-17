const { Cars } = require('../dataBase/index');
const { CREATED } = require('../configs/statusCodes.enum');

module.exports = {
  getCarById: (req, res, next) => {
    try {
      const { car } = req;

      res.json(car);
    } catch (e) {
      next(e);
    }
  },

  getAllCars: async (req, res, next) => {
    try {
      const cars = await Cars.find({});

      res.json(cars);
    } catch (e) {
      next(e);
    }
  },

  createCar: async (req, res, next) => {
    try {
      const car = await Cars.create(req.body);
      res.status(CREATED).json(car);
    } catch (e) {
      next(e);
    }
  },

  deleteCarById: async (req, res, next) => {
    try {
      const { car_id } = req.params;
      await Cars.findByIdAndDelete(car_id);

      res.json({ message: `Car ${car_id} was deleted` });
    } catch (e) {
      next(e);
    }
  },

  updateCars: async (req, res, next) => {
    try {
      const { car_id } = req.params;
      await Cars.findByIdAndUpdate(car_id, req.body);

      res.json({ message: `Car ${car_id} was updated` });
      next();
    } catch (e) {
      next(e);
    }
  }
};
