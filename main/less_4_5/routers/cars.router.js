const router = require('express').Router();
const { isCarExist, isCarByIdExist } = require('../middlewares/cars.middleware');

const {
  createCar,
  getCarById,
  getAllCars,
  deleteCarById,
} = require('../controllers/cars.controllers');

router.get('/:car_id', isCarByIdExist, getCarById);
router.delete('/:car_id', deleteCarById);

router.get('/', getAllCars);

router.post('/', isCarExist, createCar);

module.exports = router;
