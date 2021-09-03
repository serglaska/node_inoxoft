const router = require('express').Router();

// const { updateUserValidator, createUserValidator } = require('../validators/user.validator');
const {
  isEmailExist,
  isUserByIdExist,
  isValidUserData,
  isValidUpdateUser
} = require('../middlewares/user.middleware');

const {
  createUser,
  updateUser,
  getUserById,
  getAllUsers,
  deleteUserById,
} = require('../controllers/user.controllers');

router.delete('/:user_id', deleteUserById);
router.get('/:user_id', isUserByIdExist, getUserById);
router.patch('/:user_id', isValidUpdateUser, updateUser);

router.get('/', getAllUsers);

router.post('/', isValidUserData, isEmailExist, createUser);

module.exports = router;
