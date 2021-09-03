const { Cars } = require('../dataBase/index');

module.exports = {
  getCarById: async (req, res, next) => {
    try {
      const { car_id } = req.params;

      const car = await Cars.findById(car_id);

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
      res.status(201).json(car);
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
  }
};
