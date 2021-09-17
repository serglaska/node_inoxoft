const router = require('express').Router();

const { getUserByDynamicParam } = require('../services/getItemByParam.service');
const { checkDuplicateCar, checkCarByIdExist } = require('../middlewares/cars.middleware');
const { isValidItemData, isItemValidUpdate } = require('../services/isValidItemData.service');

const {
  createCar,
  getCarById,
  getAllCars,
  updateCars,
  deleteCarById,
} = require('../controllers/cars.controllers');

router.use('/:car_id', getUserByDynamicParam({
  item: 'car',
  dbField: '_id',
  searchIn: 'params',
  paramName: 'car_id',
}));
router.delete('/:car_id', deleteCarById);
router.get('/:car_id', checkCarByIdExist, getCarById);
router.patch('/:car_id', isItemValidUpdate(), updateCars);

router.get('/', getAllCars);

router.post(
  '/',
  isValidItemData(),
  getUserByDynamicParam({
    item: 'car',
    dbField: '_id',
    paramName: 'car_id',
  }),
  checkDuplicateCar,
  createCar
);

module.exports = router;
